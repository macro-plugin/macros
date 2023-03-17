import type { Config, MacroPlugin } from "./types";
import {
  Program,
  print,
  printSync,
} from "@swc/core"
import { transformSync as _transform, transform as _transformAsync } from "@swc/core"
import { parse, parseAsync } from "./parse"

import { walk } from "./walk"

export function createPlugin(plugin: MacroPlugin) {
  return plugin;
}

export function createSwcPlugin(config: Config) {
  return (module: Program) => {
    const plugins = config.plugins || [];

    return walk(module, {
      enter(node, parent, prop, index) {
        let r, e;

        const run = (fn: Function) => {
          r = fn.apply(this, [node, parent, prop, index]);
          if (r) this.replace(r);
        }

        for (const p of plugins) {
          if (typeof p == 'function') {
            run(p);
            continue;
          }
          if (p.enter) run(p.enter);
          if (node.type in p) {
            e = p[node.type as keyof typeof p];
            if (typeof e == 'function') {
              run(e)
            } else if (typeof e == 'object' && e.enter) {
              run(e.enter)
            }
          }
        }
      },
      leave(node, parent, prop, index) {
        let r, e;

        const run = (fn: Function) => {
          r = fn.apply(this, [node, parent, prop, index]);
          if (r) this.replace(r);
        }

        for (const p of plugins) {
          if (typeof p != 'object') continue;
          if (p.leave) run(p.leave);
          if (node.type in p) {
            e = p[node.type as keyof typeof p];
            if (typeof e == 'object' && e.leave) run(e.leave);
          }
        }
      }
    }) as Program;
  }
}

/**
 * Transform code with your labeled macro plugins.
 * @param code - input source code.
 * @param config - an object containing your macro config.
 * @returns - an object containing the output code and source map.
 */
export function transform(code: string, config: Config) {
  const plugin = createSwcPlugin(config)
  return printSync(plugin(parse(code, config.jsc?.parser)))
}

/**
 * Transform code with your labeled macro plugins.
 * @param code - input source code.
 * @param config - an object containing your macro config.
 * @returns - an object containing the output code and source map.
 */
export function transformAsync(code: string, config: Config) {
  const plugin = createSwcPlugin(config)
  return parseAsync(code, config.jsc?.parser).then((m) => print(plugin(m)))
}

