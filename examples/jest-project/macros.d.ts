declare global {
    const $Eval: (<T>(expr: string) => T) & (<T>(expr: T) => T) & (<F extends (...args: any) => any>(expr: F, ...args: Parameters<F>) => ReturnType<F>);
    const $Ast: <T>(expr: T) => import("@swc/core").Expression;
}
export {}
