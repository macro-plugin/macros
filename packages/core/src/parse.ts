import type { Expression, ModuleItem, ParseOptions } from "@swc/core"
import { parse, parseSync } from "@swc/core"

export { parse as parseAsync, parseSync as parse } from "@swc/core"

function extractExpr (stmt: ModuleItem | undefined): Expression {
  if (stmt && stmt.type == "ExpressionStatement" && stmt.expression.type == "ParenthesisExpression") return stmt.expression.expression
  return {
    type: "Invalid",
    span: {
      start: 0,
      end: 0,
      ctxt: 0
    }
  }
}

export function parseExpr (expr: string, options?: ParseOptions): Expression {
  return extractExpr(parseSync("(" + expr + ")", options).body[0])
}

export async function parseExprAsync (expr: string, options: ParseOptions) {
  const stmt = (await parse("(" + expr + ")", options)).body[0]
  return extractExpr(stmt)
}
