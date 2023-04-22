'use strict';

var runtime = require('./runtime');
var core = require('@macro-plugin/core');

const spanStr = JSON.stringify(core.span);
const createAst = (type, props = {}) => {
    return core.parseExpr(`{
    "type": "${type}",
    ${Object.entries(props).map(([k, v]) => '"' + k + '": ' + (v ? core.printExpr(v).code : undefined)) + ","}
    "span": ${spanStr},
  }`);
};
const $True = {
    type: "BooleanLiteral",
    span: core.span,
    value: true
};
const $False = {
    type: "BooleanLiteral",
    span: core.span,
    value: false
};
const $Null = {
    type: "NullLiteral",
    span: core.span
};
const $Void = {
    type: "ArrayExpression",
    span: core.span,
    elements: []
};
const $Identifier = core.createExprMacro("$Identifier", function (args) {
    return createAst("Identifier", { value: args[0], optional: args[1] || $False });
}, "(value: string, optional?: boolean) => Identifier").proxy(runtime.createIdentifier);
const $StringLiteral = core.createExprMacro("$StringLiteral", function (args) {
    return createAst("StringLiteral", { value: args[0], raw: args[1] });
}, "(value: string, raw?: string) => StringLiteral").proxy(runtime.createStringLiteral);
const $NumericLiteral = core.createExprMacro("$NumericLiteral", function (args) {
    return createAst("NumericLiteral", { value: args[0], raw: args[1] });
}, "(value: number, raw?: string) => NumericLiteral").proxy(runtime.createNumericLiteral);
const $BigIntLiteral = core.createExprMacro("$BigIntLiteral", function (args) {
    return createAst("BigIntLiteral", { value: args[0], raw: args[1] });
}, "(value: bigint, raw?: string) => BigIntLiteral").proxy(runtime.createBigIntLiteral);
const $BooleanLiteral = core.createExprMacro("$BooleanLiteral", function (args) {
    return createAst("BooleanLiteral", { value: args[0] });
}, "(value: boolean) => BooleanLiteral").proxy(runtime.createBooleanLiteral);
const $RegExpLiteral = core.createExprMacro("$RegExpLiteral", function (args) {
    return createAst("RegExpLiteral", { pattern: args[0], flags: args[1] });
}, "(pattern: string, flags: string) => RegExpLiteral").proxy(runtime.createRegExpLiteral);
const $Argument = core.createExprMacro("$Argument", function (args) {
    return this.parseExpr(`{
    ${args[1] ? ('"spread": ' + JSON.stringify(core.span) + ",") : ""}
    "expression": ${this.printExpr(args[0])}
  }`);
}, "(expression: Expression, spread?: boolean) => Argument").proxy(runtime.createArgument);
const $CallExpression = core.createExprMacro("$CallExpression", function (args) {
    return createAst("CallExpression", {
        callee: args[0],
        arguments: args[1] || $Void,
        typeArguments: args[2]
    });
}, "(callee: Expression | Super | Import, args?: Argument[], typeArguments?: TsTypeParameterInstantiation) => CallExpression").proxy(runtime.createCallExpression);
const $Param = core.createExprMacro("$Param", function (args) {
    return createAst("Parameter", { pat: args[0], decorators: args[1] });
}, "(pat: Pattern, decorators?: Decorator[]) => Param");
const $Invalid = core.createExprMacro("$Invalid", function () { return createAst("Invalid"); }).proxy(runtime.createInvalid);
// TODO: complete more macros for creating ast

exports.$Argument = $Argument;
exports.$BigIntLiteral = $BigIntLiteral;
exports.$BooleanLiteral = $BooleanLiteral;
exports.$CallExpression = $CallExpression;
exports.$False = $False;
exports.$Identifier = $Identifier;
exports.$Invalid = $Invalid;
exports.$Null = $Null;
exports.$NumericLiteral = $NumericLiteral;
exports.$Param = $Param;
exports.$RegExpLiteral = $RegExpLiteral;
exports.$StringLiteral = $StringLiteral;
exports.$True = $True;
exports.$Void = $Void;
exports.createAst = createAst;
