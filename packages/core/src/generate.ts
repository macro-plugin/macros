import { GeneratorOptions, GeneratorResult, default as _generate } from "@babel/generator"

import { Statement } from "./types";

/**
 * Turns an AST into code, maintaining sourcemaps, user preferences, and valid output.
 * @param ast - the abstract syntax tree from which to generate output code.
 * @param opts - used for specifying options for code generation.
 * @param code - the original source code, used for source maps.
 * @returns - an object containing the output code and source map.
 */
export function generate(
  ast: Statement | Parameters<typeof _generate>[0],
  opts?: GeneratorOptions,
  code?: string | { [filename: string]: string },
): GeneratorResult {
  // @ts-ignore
  return _generate(ast, opts, code)
}

