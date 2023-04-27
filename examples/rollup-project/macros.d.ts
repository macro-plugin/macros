declare global {
    const __DEV__: boolean;
    const $Ast: <T>(expr: T) => import("@swc/core").Expression;
    const $Column: () => number;
    const $Concat: (...args: (string | null | undefined | boolean | number | bigint)[]) => string;
    const $Env: <R = string>(key: string) => R;
    const $Eval: (<T>(expr: string) => T) & (<T>(expr: T) => T) & (<F extends (...args: any) => any>(expr: F, ...args: Parameters<F>) => ReturnType<F>);
    const $Expr: (strings: TemplateStringsArray, ...expressions: unknown[]) => import("@swc/core").Expression;
    const $ID: () => string;
    const $Include: (path: string, target?: "es6" | "commonjs" | "umd" | "nodenext") => void;
    const $IncludeJSON: (<T extends Record<string, any>>(path: string) => T) & (<R = string>(path: string, key: string) => R);
    const $IncludeStr: (path: string) => string;
    const $Line: () => number;
    const $Quote: (strings: TemplateStringsArray, ...expressions: unknown[]) => (import("@swc/core").Expression)[];
    const $Span: () => [number, number];
    const $Stringify: ((expr: any) => string) & (<T>() => string);
    const $Todo: () => never;
    const $UnImplemented: () => never;
    const $UnReachable: () => never;
    const $WriteFile: (file: string, data: string) => void;
    var $Macro: typeof import("@macro-plugin/core").$Macro;
    var $LitMacro: typeof import("@macro-plugin/core").$LitMacro;
    var $ExprMacro: typeof import("@macro-plugin/core").$ExprMacro;
    var $TypeMacro: typeof import("@macro-plugin/core").$TypeMacro;
    var $TmplMacro: typeof import("@macro-plugin/core").$TmplMacro;
    var $LabeledMacro: typeof import("@macro-plugin/core").$LabeledMacro;
    const $Add: <T>(...args: T[]) => T;
    const $Multi: <T>(...args: T[]) => T;
}
export {}
