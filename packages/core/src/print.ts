import { Expression, ModuleItem, Options, Program, TsType, print as _printAsync, printSync } from "@swc/core"

import { BaseNode } from "./types"
import { dummySpan } from "./defaults"

/**
 * Turns an AST into code, maintaining sourcemaps, user preferences, and valid output.
 * @param ast - the abstract syntax tree from which to generate output code.
 * @param options - used for specifying options for code generation.
 * @returns - an object containing the output code and source map.
 */
export function print (
  ast: BaseNode | BaseNode[],
  options?: Options
) {
  const { code, map } = printSync({
    type: "Script",
    span: dummySpan,
    body: Array.isArray(ast) ? ast as unknown as ModuleItem[] : [ast as unknown as ModuleItem],
  } as Program, options)

  return { code: code.trim(), map }
}

export async function printAsync (
  ast: BaseNode | BaseNode[],
  options?: Options
) {
  const { code, map } = await _printAsync({
    type: "Script",
    span: dummySpan,
    body: Array.isArray(ast) ? ast as unknown as ModuleItem[] : [ast as unknown as ModuleItem],
  } as Program, options)

  return { code: code.trim(), map }
}

export function printExpr (expr: BaseNode, options?: Options) {
  const { code, map } = print({
    type: "ExpressionStatement",
    span: dummySpan,
    expression: expr as Expression
  }, options)

  return { code: code.replace(/\s*;\s*$/, ""), map }
}

export async function printExprAsync (expr: BaseNode, options?: Options) {
  const { code, map } = await printAsync({
    type: "ExpressionStatement",
    span: dummySpan,
    expression: expr as Expression
  }, options)

  return { code: code.replace(/\s*;\s*$/, ""), map }
}

export function printType (ty: TsType, options?: Options) {
  const { code, map } = print({
    type: "TsTypeAliasDeclaration",
    span: dummySpan,
    declare: false,
    id: {
      type: "Identifier",
      span: dummySpan,
      value: "__PrintType__",
      optional: false
    },
    typeAnnotation: ty,
  }, options)

  return { code: code.replace(/\s*type\s+__PrintType__\s*=\s*/, "").replace(/\s*;\s*$/, ""), map }
}

export async function printTypeAsync (ty: TsType, options?: Options) {
  const { code, map } = await printAsync({
    type: "TsTypeAliasDeclaration",
    span: dummySpan,
    declare: false,
    id: {
      type: "Identifier",
      span: dummySpan,
      value: "__PrintType__",
      optional: false
    },
    typeAnnotation: ty,
  }, options)

  return { code: code.replace(/\s*type\s+__PrintType__\s*=\s*/, "").replace(/\s*;\s*$/, ""), map }
}
