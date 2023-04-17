import {
  Program,
  print,
  printSync,
} from "@swc/core"
import { createWalkPlugin, getSpanOffset } from "./utils"
import { parse, parseAsync } from "./parse"

import type { Config } from "./types"
import { Walker } from "./walk"

export function createSwcPlugin (config: Config, spanOffset = 0) {
  return (program: Program) => {
    const walker = new Walker(createWalkPlugin(config.macros || []), true)

    program = walker.walk(program, spanOffset) as Program
    if (config.emitDts) {
      const dts = walker.emit()
      config.onEmitDts?.(dts);
      (program as Program & { dts?: string }).dts = dts
    }

    return program
  }
}

export function transformAst (ast: Program, config: Config, spanOffset = 0): Program & { dts?: string } {
  return createSwcPlugin(config, spanOffset)(ast)
}

/**
 * Transform code with your labeled macro plugins.
 * @param code - input source code.
 * @param config - an object containing your macro config.
 * @returns - an object containing the output code and source map.
 */
export function transform (code: string, config: Config) {
  const spanOffset = getSpanOffset()
  const ast = transformAst(parse(code, config.jsc?.parser), config, spanOffset)
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
  const spanOffset = getSpanOffset()
  const parsed = await parseAsync(code, config.jsc?.parser)
  const ast = transformAst(parsed, config, spanOffset)
  const result = await print(ast)
  const dts = ast.dts
  if (dts) delete ast.dts
  return { ...result, ast: ast as Program, dts }
}
