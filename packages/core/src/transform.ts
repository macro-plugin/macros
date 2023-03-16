import type { BaseNode, Config, Handler } from "./types";
import {
  LabeledStatement,
  Program,
  parseSync,
  print,
  printSync,
} from "@swc/core"
import { transformSync as _transform, transform as _transformAsync } from "@swc/core"
import { parse, parseAsync } from "./parse"

import { walk } from "./walk"

export function createSwcPlugin(code: string, config: Config) {
  return (module: Program) => {
    const globalMacros = config.global || {};
    const labeledMacros = config.labeled || {};

    function walkLabel(ast: LabeledStatement, handler: Handler): BaseNode | BaseNode[] | undefined {
      const { start, end } = ast.span;

      if (ast.label.value in labeledMacros) {
        const r = labeledMacros[ast.label.value](ast.body, code.slice(start, end), handler)
        if (typeof r == 'string') {
          //parserOptions
          return parse(r).body as BaseNode[];
        }
        return r;
      }
    }

    function visit(node: BaseNode | Program) {
      walk(node, {
        enter(node, parent, prop, index) {
          let newNode: BaseNode | BaseNode[] | void | undefined
          for (const plugin of Object.values(globalMacros)) {
            if ('enter' in plugin) {
              newNode = plugin.enter(node as BaseNode, this, parent as BaseNode, prop, index)
            } else {
              newNode = plugin(node as BaseNode, this, parent as BaseNode, prop, index)
            }

            if (newNode) this.replace(newNode)
          }
          if (node.type === "LabeledStatement") {
            newNode = walkLabel(node as LabeledStatement, this)
            if (newNode) this.replace(newNode as BaseNode)
          }
        },
        leave(node, parent, prop, index) {
          let newNode: BaseNode | BaseNode[] | void | undefined

          for (const plugin of Object.values(globalMacros)) {
            if ('leave' in plugin) {
              newNode = plugin.leave(node as BaseNode, this, parent as BaseNode, prop, index)
            }
          }

          if (newNode) this.replace(newNode)
        },
      })
    }

    visit(module);

    return module;
  }
}

/**
 * Transform code with your labeled macro plugins.
 * @param code - input source code.
 * @param config - an object containing your macro config.
 * @returns - an object containing the output code and source map.
 */
export function transform(code: string, config: Config) {
  const plugin = createSwcPlugin(code, config)
  return printSync(plugin(parseSync(code, config.jsc?.parser)))
}

/**
 * Transform code with your labeled macro plugins.
 * @param code - input source code.
 * @param config - an object containing your macro config.
 * @returns - an object containing the output code and source map.
 */
export function transformAsync(code: string, config: Config) {
  const plugin = createSwcPlugin(code, config)
  return parseAsync(code, config.jsc?.parser).then((m) => print(plugin(m)))
}

