declare global {
    var $Macro: typeof import("@macro-plugin/core").$Macro;
    var $LitMacro: typeof import("@macro-plugin/core").$LitMacro;
    var $ExprMacro: typeof import("@macro-plugin/core").$ExprMacro;
    var $TypeMacro: typeof import("@macro-plugin/core").$TypeMacro;
    var $TmplMacro: typeof import("@macro-plugin/core").$TmplMacro;
    var $LabeledMacro: typeof import("@macro-plugin/core").$LabeledMacro;
    const $Eval: (<T>(expr: string) => T) & (<T>(expr: T) => T) & (<F extends (...args: any) => any>(expr: F, ...args: Parameters<F>) => ReturnType<F>);
    const $Ast: <T>(expr: T) => import("@swc/core").Expression;
    const $Quote: (strings: TemplateStringsArray, ...expressions: unknown[]) => (import("@swc/core").Expression)[];
    const __DEV__: boolean;
}
export {}
