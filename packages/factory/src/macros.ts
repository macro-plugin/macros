import type { ArrayExpression, BooleanLiteral, Expression, NullLiteral } from "@swc/core"
import { createArgument, createBigIntLiteral, createBooleanLiteral, createCallExpression, createIdentifier, createInvalid, createNumericLiteral, createRegExpLiteral, createStringLiteral } from "./runtime"
import { createExprMacro, parseExpr, printExpr, span } from "@macro-plugin/core"

const spanStr = JSON.stringify(span)

export const createAst = (type: string, props: Record<string, Expression> = {}) => {
  return parseExpr(`{
    "type": "${type}",
    ${Object.entries(props).map(([k, v]) => '"' + k + '": ' + (v ? printExpr(v).code : undefined)) + ","}
    "span": ${spanStr},
  }`)
}

export const $True: BooleanLiteral = {
  type: "BooleanLiteral",
  span,
  value: true
}

export const $False: BooleanLiteral = {
  type: "BooleanLiteral",
  span,
  value: false
}

export const $Null: NullLiteral = {
  type: "NullLiteral",
  span
}

export const $Void: ArrayExpression = {
  type: "ArrayExpression",
  span,
  elements: []
}

export const $Identifier = createExprMacro("$Identifier", function ([value, optional = $False]) {
  return createAst("Identifier", { value, optional })
}, "(value: string, optional?: boolean) => import(\"@swc/core\").Identifier").proxy(createIdentifier)

export const $StringLiteral = createExprMacro("$StringLiteral", function ([value, raw]) {
  return createAst("StringLiteral", { value, raw })
}, "(value: string, raw?: string) => import(\"@swc/core\").StringLiteral").proxy(createStringLiteral)

export const $NumericLiteral = createExprMacro("$NumericLiteral", function ([value, raw]) {
  return createAst("NumericLiteral", { value, raw })
}, "(value: number, raw?: string) => import(\"@swc/core\").NumericLiteral").proxy(createNumericLiteral)

export const $BigIntLiteral = createExprMacro("$BigIntLiteral", function ([value, raw]) {
  return createAst("BigIntLiteral", { value, raw })
}, "(value: bigint, raw?: string) => import(\"@swc/core\").BigIntLiteral").proxy(createBigIntLiteral)

export const $BooleanLiteral = createExprMacro("$BooleanLiteral", function ([value]) {
  return createAst("BooleanLiteral", { value })
}, "(value: boolean) => import(\"@swc/core\").BooleanLiteral").proxy(createBooleanLiteral)

export const $RegExpLiteral = createExprMacro("$RegExpLiteral", function ([pattern, flags]) {
  return createAst("RegExpLiteral", { pattern, flags })
}, "(pattern: string, flags: string) => import(\"@swc/core\").RegExpLiteral").proxy(createRegExpLiteral)

export const $Argument = createExprMacro("$Argument", function ([expression, spread]) {
  return this.parseExpr(`{
    ${spread ? ('"spread": ' + JSON.stringify(span) + ",") : ""}
    "expression": ${this.printExpr(expression)}
  }`)
}, "(expression: import(\"@swc/core\").Expression, spread?: boolean) => import(\"@swc/core\").Argument").proxy(createArgument)

export const $CallExpression = createExprMacro("$CallExpression", function ([callee, callArgs = $Void, typeArguments]) {
  return createAst("CallExpression", {
    callee,
    arguments: callArgs,
    typeArguments
  })
}, "(callee: import(\"@swc/core\").Expression | import(\"@swc/core\").Super | import(\"@swc/core\").Import, args?: import(\"@swc/core\").Argument[], typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation) => import(\"@swc/core\").CallExpression").proxy(createCallExpression)

export const $Param = createExprMacro("$Param", function ([pat, decorators]) {
  return createAst("Parameter", { pat, decorators })
}, "(pat: import(\"@swc/core\").Pattern, decorators?: import(\"@swc/core\").Decorator[]) => import(\"@swc/core\").Param")

export const $Invalid = createExprMacro("$Invalid", function () { return createAst("Invalid") }).proxy(createInvalid)

// TODO: complete more macros for creating ast
