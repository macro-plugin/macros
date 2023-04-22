import type { ArrayExpression, BooleanLiteral, Expression, NullLiteral } from "@swc/core";
export declare const createAst: (type: string, props?: Record<string, Expression>) => Expression;
export declare const $True: BooleanLiteral;
export declare const $False: BooleanLiteral;
export declare const $Null: NullLiteral;
export declare const $Void: ArrayExpression;
export declare const $Identifier: import("@macro-plugin/core").MacroPlugin & ((value: string, optional?: boolean) => {
    type: "Identifier";
    value: string;
    optional: boolean;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $StringLiteral: import("@macro-plugin/core").MacroPlugin & ((value: string, raw?: string | undefined) => {
    type: "StringLiteral";
    value: string;
    raw: string | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $NumericLiteral: import("@macro-plugin/core").MacroPlugin & ((value: number, raw?: string | undefined) => {
    type: "NumericLiteral";
    value: number;
    raw: string | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $BigIntLiteral: import("@macro-plugin/core").MacroPlugin & ((value: bigint, raw?: string | undefined) => {
    type: "BigIntLiteral";
    value: bigint;
    raw: string | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $BooleanLiteral: import("@macro-plugin/core").MacroPlugin & ((value: boolean) => {
    type: "BooleanLiteral";
    value: boolean;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $RegExpLiteral: import("@macro-plugin/core").MacroPlugin & ((pattern: string, flags: string) => {
    type: "RegExpLiteral";
    pattern: string;
    flags: string;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $Argument: import("@macro-plugin/core").MacroPlugin & ((expression: Expression, spread?: boolean | undefined) => import("@swc/core").Argument);
export declare const $CallExpression: import("@macro-plugin/core").MacroPlugin & ((callee: Expression | import("@swc/core").Super | import("@swc/core").Import, args?: import("@swc/core").Argument[] | undefined, typeArguments?: import("@swc/core").TsTypeParameterInstantiation | undefined) => import("@swc/core").CallExpression);
export declare const $Param: import("@macro-plugin/core").MacroPluginWithProxy;
export declare const $Invalid: import("@macro-plugin/core").MacroPlugin & (() => {
    type: "Invalid";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
