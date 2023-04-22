import { createIdentifier, createStringLiteral, createNumericLiteral, createBigIntLiteral, createBooleanLiteral, createRegExpLiteral, createArgument, createCallExpression, createInvalid } from './runtime';
import { span, createExprMacro, parseExpr, printExpr } from '@macro-plugin/core';

const spanStr = JSON.stringify(span);
const createAst = (type, props = {}) => {
    return parseExpr(`{
    "type": "${type}",
    ${Object.entries(props).map(([k, v]) => '"' + k + '": ' + (v ? printExpr(v).code : undefined)) + ","}
    "span": ${spanStr},
  }`);
};
const $True = {
    type: "BooleanLiteral",
    span,
    value: true
};
const $False = {
    type: "BooleanLiteral",
    span,
    value: false
};
const $Null = {
    type: "NullLiteral",
    span
};
const $Void = {
    type: "ArrayExpression",
    span,
    elements: []
};
const $Identifier = createExprMacro("$Identifier", function (args) {
    return createAst("Identifier", { value: args[0], optional: args[1] || $False });
}, "(value: string, optional?: boolean) => Identifier").proxy(createIdentifier);
const $StringLiteral = createExprMacro("$StringLiteral", function (args) {
    return createAst("StringLiteral", { value: args[0], raw: args[1] });
}, "(value: string, raw?: string) => StringLiteral").proxy(createStringLiteral);
const $NumericLiteral = createExprMacro("$NumericLiteral", function (args) {
    return createAst("NumericLiteral", { value: args[0], raw: args[1] });
}, "(value: number, raw?: string) => NumericLiteral").proxy(createNumericLiteral);
const $BigIntLiteral = createExprMacro("$BigIntLiteral", function (args) {
    return createAst("BigIntLiteral", { value: args[0], raw: args[1] });
}, "(value: bigint, raw?: string) => BigIntLiteral").proxy(createBigIntLiteral);
const $BooleanLiteral = createExprMacro("$BooleanLiteral", function (args) {
    return createAst("BooleanLiteral", { value: args[0] });
}, "(value: boolean) => BooleanLiteral").proxy(createBooleanLiteral);
const $RegExpLiteral = createExprMacro("$RegExpLiteral", function (args) {
    return createAst("RegExpLiteral", { pattern: args[0], flags: args[1] });
}, "(pattern: string, flags: string) => RegExpLiteral").proxy(createRegExpLiteral);
const $Argument = createExprMacro("$Argument", function (args) {
    return this.parseExpr(`{
    ${args[1] ? ('"spread": ' + JSON.stringify(span) + ",") : ""}
    "expression": ${this.printExpr(args[0])}
  }`);
}, "(expression: Expression, spread?: boolean) => Argument").proxy(createArgument);
const $CallExpression = createExprMacro("$CallExpression", function (args) {
    return createAst("CallExpression", {
        callee: args[0],
        arguments: args[1] || $Void,
        typeArguments: args[2]
    });
}, "(callee: Expression | Super | Import, args?: Argument[], typeArguments?: TsTypeParameterInstantiation) => CallExpression").proxy(createCallExpression);
const $Param = createExprMacro("$Param", function (args) {
    return createAst("Parameter", { pat: args[0], decorators: args[1] });
}, "(pat: Pattern, decorators?: Decorator[]) => Param");
const $Invalid = createExprMacro("$Invalid", function () { return createAst("Invalid"); }).proxy(createInvalid);
// TODO: complete more macros for creating ast

export { $Argument, $BigIntLiteral, $BooleanLiteral, $CallExpression, $False, $Identifier, $Invalid, $Null, $NumericLiteral, $Param, $RegExpLiteral, $StringLiteral, $True, $Void, createAst };
