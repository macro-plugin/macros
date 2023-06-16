import type { Expression, ModuleItem, ParseOptions, TsType, TsTypeAliasDeclaration } from "@swc/core"

import { dummySpan } from "./defaults"
import { parseSync } from "@swc/core"

export { parse as parseAsync, parseSync as parse } from "@swc/core"

function extractExpr (stmt: ModuleItem | undefined): Expression {
  if (stmt && stmt.type === "ExpressionStatement" && stmt.expression.type === "ParenthesisExpression") return stmt.expression.expression
  return {
    type: "Invalid",
    span: dummySpan
  }
}

export function parseExpr (expr: string, options?: ParseOptions): Expression {
  return extractExpr(parseSync("(" + expr + ")", options).body[0])
}

export function parseType (ty: string, options?: ParseOptions): TsType {
  return (parseSync(`type A = ${ty}`, { ...options, syntax: "typescript" }).body[0] as TsTypeAliasDeclaration).typeAnnotation
}
