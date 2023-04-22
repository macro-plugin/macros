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

export const $Identifier = createExprMacro("$Identifier", function (args) {
  return createAst("Identifier", { value: args[0], optional: args[1] || $False })
}, "(value: string, optional?: boolean) => import(\"@swc/core\").Identifier").proxy(createIdentifier)

export const $StringLiteral = createExprMacro("$StringLiteral", function (args) {
  return createAst("StringLiteral", { value: args[0], raw: args[1] })
}, "(value: string, raw?: string) => import(\"@swc/core\").StringLiteral").proxy(createStringLiteral)

export const $NumericLiteral = createExprMacro("$NumericLiteral", function (args) {
  return createAst("NumericLiteral", { value: args[0], raw: args[1] })
}, "(value: number, raw?: string) => import(\"@swc/core\").NumericLiteral").proxy(createNumericLiteral)

export const $BigIntLiteral = createExprMacro("$BigIntLiteral", function (args) {
  return createAst("BigIntLiteral", { value: args[0], raw: args[1] })
}, "(value: bigint, raw?: string) => import(\"@swc/core\").BigIntLiteral").proxy(createBigIntLiteral)

export const $BooleanLiteral = createExprMacro("$BooleanLiteral", function (args) {
  return createAst("BooleanLiteral", { value: args[0] })
}, "(value: boolean) => import(\"@swc/core\").BooleanLiteral").proxy(createBooleanLiteral)

export const $RegExpLiteral = createExprMacro("$RegExpLiteral", function (args) {
  return createAst("RegExpLiteral", { pattern: args[0], flags: args[1] })
}, "(pattern: string, flags: string) => import(\"@swc/core\").RegExpLiteral").proxy(createRegExpLiteral)

export const $Argument = createExprMacro("$Argument", function (args) {
  return this.parseExpr(`{
    ${args[1] ? ('"spread": ' + JSON.stringify(span) + ",") : ""}
    "expression": ${this.printExpr(args[0])}
  }`)
}, "(expression: import(\"@swc/core\").Expression, spread?: boolean) => import(\"@swc/core\").Argument").proxy(createArgument)

export const $CallExpression = createExprMacro("$CallExpression", function (args) {
  return createAst("CallExpression", {
    callee: args[0],
    arguments: args[1] || $Void,
    typeArguments: args[2]
  })
}, "(callee: import(\"@swc/core\").Expression | import(\"@swc/core\").Super | import(\"@swc/core\").Import, args?: import(\"@swc/core\").Argument[], typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation) => import(\"@swc/core\").CallExpression").proxy(createCallExpression)

export const $Param = createExprMacro("$Param", function (args) {
  return createAst("Parameter", { pat: args[0], decorators: args[1] })
}, "(pat: import(\"@swc/core\").Pattern, decorators?: import(\"@swc/core\").Decorator[]) => import(\"@swc/core\").Param")

export const $Invalid = createExprMacro("$Invalid", function () { return createAst("Invalid") }).proxy(createInvalid)

// TODO: complete more macros for creating ast
