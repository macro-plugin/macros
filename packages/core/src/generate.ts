import { Expression, ModuleItem, Options, Program, printSync as print } from "@swc/core";

import { BaseNode } from "./types";

/**
 * Turns an AST into code, maintaining sourcemaps, user preferences, and valid output.
 * @param ast - the abstract syntax tree from which to generate output code.
 * @param options - used for specifying options for code generation.
 * @returns - an object containing the output code and source map.
 */
export function generate(
  ast: BaseNode | BaseNode[],
  options?: Options
) {
  let { code, map } = print({
    type: "Script",
    span: { start: 0, end: 0, ctxt: 0 },
    body: Array.isArray(ast) ? ast as unknown as ModuleItem[] : [ast as unknown as ModuleItem],
  } as Program, options)

  return { code: code.trim(), map }
}

export function generateExpr(expr: BaseNode, options?: Options) {
  let { code, map } = generate({
    type: "ExpressionStatement",
    span: {
      start: 0,
      end: 0,
      ctxt: 0
    },
    expression: expr as Expression
  }, options)

  return { code: code.replace(/\s*;\s*$/, ''), map }
}
