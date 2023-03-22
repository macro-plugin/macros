import {
  Program,
  print,
  printSync,
} from "@swc/core"
import { Walker, combinePlugins } from "./walk"
import { parse, parseAsync } from "./parse"

import type { Config } from "./types"

export function createSwcPlugin (config: Config) {
  return (program: Program) => {
    const walker = new Walker(combinePlugins(config.plugins || []))

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
