import {
  Program,
  print,
  printSync,
} from "@swc/core"
import { parse, parseAsync } from "./parse"

import type { Config } from "./types"
import { Walker } from "./walk"

export function createSwcPlugin (config: Config) {
  return (program: Program) => {
    const plugins = config.plugins || []
    const walker = new Walker({
      enter (node, parent, prop, index) {
        let r, e

        const run = (fn: Function) => {
          r = fn.apply(this, [node, parent, prop, index])
          if (r) this.replace(r)
        }

        for (const p of plugins) {
          if (typeof p === "function") {
            run(p)
            continue
          }
          if (p.enter) run(p.enter)
          if (node.type in p) {
            e = p[node.type as keyof typeof p]
            if (typeof e === "function") {
              run(e)
            } else if (typeof e === "object" && e.enter) {
              run(e.enter)
            }
          }
        }
      },
      leave (node, parent, prop, index) {
        let r, e

        const run = (fn: Function) => {
          r = fn.apply(this, [node, parent, prop, index])
          if (r) this.replace(r)
        }

        for (const p of plugins) {
          if (typeof p !== "object") continue
          if (p.leave) run(p.leave)
          if (node.type in p) {
            e = p[node.type as keyof typeof p]
            if (typeof e === "object" && e.leave) run(e.leave)
          }
        }
      }
    })

    program = walker.walk(program) as Program
    if (config.emitDts) (program as Program & { dts?: string }).dts = walker.emit()
    return program
  }
}

export function transformAst (ast: Program, config: Config): Program & { dts?: string } {
  return createSwcPlugin(config)(ast)
}

/**
 * Transform code with your labeled macro plugins.
 * @param code - input source code.
 * @param config - an object containing your macro config.
 * @returns - an object containing the output code and source map.
 */
export function transform (code: string, config: Config) {
  const ast = transformAst(parse(code, config.jsc?.parser), config)
  const dts = ast.dts
  if (dts) delete ast.dts
  return { ...printSync(ast), ast: ast as Program, dts }
}

/**
 * Transform code with your labeled macro plugins.
 * @param code - input source code.
 * @param config - an object containing your macro config.
 * @returns - an object containing the output code and source map.
 */
export async function transformAsync (code: string, config: Config) {
  const parsed = await parseAsync(code, config.jsc?.parser)
  const ast = transformAst(parsed, config)
  const result = await print(ast)
  const dts = ast.dts
  if (dts) delete ast.dts
  return { ...result, ast: ast as Program, dts }
}
