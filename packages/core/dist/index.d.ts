import { Node, Declaration, Expression, CatchClause, ClassDeclaration, ImportDeclaration, Param, ClassMethod, PrivateMethod, Statement, VariableDeclarator, ModuleItem, TsType, ParseOptions, Options, Program, ExportNamedDeclaration, TsModuleDeclaration, TsFunctionType, FunctionDeclaration, FunctionExpression, ArrowFunctionExpression, VariableDeclaration, TsTypeReference, ImportSpecifier, ImportDefaultSpecifier, ExportSpecifier, ExportNamespaceSpecifier } from '@swc/core';
export { Node, parseSync as parse, parse as parseAsync } from '@swc/core';
import { Visitor } from '@swc/core/Visitor';

type ScopeVar = {
    name: string;
    private?: boolean;
    value?: Node;
    marker?: unknown;
};
type BaseNode = Declaration | Expression | CatchClause | ClassDeclaration | ImportDeclaration | Param | ClassMethod | PrivateMethod | Statement | VariableDeclarator | ModuleItem;
type WalkContext = {
    /** Get current script source code */
    src: string | undefined;
    /** Get current walking node's span */
    span(): [number, number];
    /** Save data to current plugin cache */
    set<T>(key: string, data: T): void;
    /** Get data from current plugin cache */
    get<T>(key: string, defaultValue: T): T;
    get<T>(key: string, defaultValue?: T): T | undefined;
    /** Skip this node, not handling */
    skip(): void;
    /** Remove this node */
    remove(): void;
    /** Replace matched node with new node, equals to `return node` */
    replace(newNode: Node | Node[]): void;
    /** Track last variable with name */
    track(name: string): ScopeVar | undefined;
    /** Import some package */
    import(source: string): void;
    import(pkg: string | string[], source: string, isDefault?: boolean): void;
    /** Export some package */
    export(pkg: string | string[], source?: string | null, isNamespace?: boolean): void;
    /** Prepend some statement after imports */
    prepend(stmts: ModuleItem[]): void;
    /** Append some statement before exports */
    append(stmts: ModuleItem[]): void;
    /** decalre module in `macros.global.dts` */
    declareModule(id: string, body: ModuleItem | ModuleItem[]): void;
    /** declare global types in `macros.global.dts` */
    declareGlobal(body: ModuleItem | ModuleItem[]): void;
    /** decalre global const types in `macros.global.dts`, shorthand for `declareGlobal(genConstType(...))` */
    declareGlobalConst(name: string, ty: string | TsType): void;
    /** declare <reference /> in `macros.global.dts` */
    declareReference({ types, path }: {
        types?: string;
        path?: string;
    }): void;
    /** prepend declarations after references in `macros.global.dts` */
    declarePrepend(stmts: ModuleItem[]): void;
    /** append declarations after all declarations in `macros.global.dts` */
    declareAppend(stmts: ModuleItem[]): void;
    /** Convert source code to node list */
    parse(src: string, options?: ParseOptions): ModuleItem[];
    /** Convert expression to ast */
    parseExpr(src: string, options?: ParseOptions): Expression;
    /** Convert type expression to ast */
    parseType(ty: string, options?: ParseOptions): TsType;
    /** Convert current ast node to source code */
    print(ast?: Node | Node[]): string;
    /** Convert an expression node to source code */
    printExpr(expr?: Node): string;
    /** Convert a type node to source code */
    printType(ty?: TsType): string;
    /** Add new macro plugins to the ast walker */
    addPlugin(macro: MacroPlugin | MacroPlugin[]): void;
    /** Start tracking variables */
    startTracking: () => boolean;
    /** Stop tracking variables */
    stopTracking: () => boolean;
};
type TrackFunc = (this: WalkContext, name: string) => ScopeVar | undefined;
type WalkFunc = (this: WalkContext, node: Node, parent?: Node, prop?: string, index?: number) => Node | Node[] | undefined | void;
type WalkPlugin = {
    enter?: WalkFunc;
    leave?: WalkFunc;
    track?: TrackFunc;
};
type ExprMacro = (this: WalkContext, args: Expression[], typeParams?: TsType[], optional?: boolean) => BaseNode | BaseNode[] | void | undefined;
type TypeMacro = (this: WalkContext, typeParams?: TsType[], optional?: boolean) => BaseNode | BaseNode[] | void | undefined;
type TmplMacro = (this: WalkContext, strings: string[], ...expressions: Expression[]) => BaseNode | BaseNode[] | void | undefined;
type LabeledMacro = (this: WalkContext, stmt: Statement, parent?: BaseNode, prop?: string, index?: number) => BaseNode | BaseNode[] | void | undefined;
type GlobalMacro<T = BaseNode> = (this: WalkContext, ast: T, parent?: BaseNode, prop?: string, index?: number) => void | undefined | BaseNode | BaseNode[];
type SliceVisit<T> = T extends `visit${infer R}` ? R : never;
type GlobalMacroPlugin = {
    enter?: GlobalMacro;
    leave?: GlobalMacro;
};
type MacroPlugin = (GlobalMacro | (GlobalMacroPlugin & {
    [k in keyof Visitor & string as SliceVisit<k>]?: GlobalMacro<Parameters<Visitor[k]>[0]> | {
        enter?: GlobalMacro<Parameters<Visitor[k]>[0]>;
        leave?: GlobalMacro<Parameters<Visitor[k]>[0]>;
    };
}));
type MacroPluginWithProxy = MacroPlugin & {
    proxy<Runtime extends Function>(runtime: Runtime): MacroPlugin & Runtime;
};
type MacroOptions = {
    /** global macros to be used */
    macros?: MacroPlugin[];
    /**
     * Packages that includes macros.
     *
     * **Note**: All macros from these packages would been registed as **global macros**.
     *
     * The `macros` options also can implement similar behavior:
     * ```js
     * import { defineConfig, isMacroPlugin } from "@macro-plugin/core"
     * import * as macroPackage from "package-name"
     *
     * export default defineConfig({
     *   macros: [...Object.values(macroPackage).filter(isMacroPlugin)]
     * })
     * ```
     */
    depends?: string[];
    /**
     * External packages that includes macros.
     *
     * **Note**: All macros from these packages are lazy loading, they are only enabled when you imported them.
     * If you want include all macros globally from some package, please put them in `depends` options.
     */
    externals?: string[];
    /** emit dts file, default is false */
    emitDts?: boolean;
    /** the dts output path, default is `./macros.d.ts` */
    dtsOutputPath?: string;
    /** hook when emit dts, we use this hook for emitting dts file */
    onEmitDts?: (dts: string) => void;
};
type Config = Omit<Options, "plugin"> & MacroOptions;

/**
 * Create a macro plugin that converts `labeled: {}` or `labeled: (...args) => {}` to `$specifier((...args) => {})`,
 * and also `import { $specifier } from $source`
 * @param specifier - the function name
 * @param source - the module path
 * @param allowParams - allow convert the input array to params, default is false.
 * @returns - A labeled macro plugin
 */
declare const createLabeledBlock: ((label: string, specifier: string, source: string, allowParams?: boolean) => MacroPlugin);

declare const createLabeledExpr: ((label: string, specifier: string, source: string) => MacroPlugin);

declare function createSwcPlugin(config: Config, src?: string, spanOffset?: number): (program: Program) => Program;
declare function transformAst(ast: Program, config: Config, src?: string, spanOffset?: number): Program & {
    dts?: string;
};
/**
 * Transform code with your labeled macro plugins.
 * @param code - input source code.
 * @param config - an object containing your macro config.
 * @returns - an object containing the output code and source map.
 */
declare function transform(code: string, config: Config): {
    ast: Program;
    dts: string | undefined;
    code: string;
    map?: string | undefined;
};
/**
 * Transform code with your labeled macro plugins.
 * @param code - input source code.
 * @param config - an object containing your macro config.
 * @returns - an object containing the output code and source map.
 */
declare function transformAsync(code: string, config: Config): Promise<{
    ast: Program;
    dts: string | undefined;
    code: string;
    map?: string | undefined;
}>;

declare function parseExpr(expr: string, options?: ParseOptions): Expression;
declare function parseType(ty: string, options?: ParseOptions): TsType;

declare class Walker {
    src: string | undefined;
    node: Node;
    data: Record<string, unknown>;
    imports: ImportDeclaration[];
    exports: ExportNamedDeclaration[];
    prepends: ModuleItem[];
    appends: ModuleItem[];
    globalDts: ModuleItem[];
    moduleDts: TsModuleDeclaration[];
    references: {
        types?: string;
        path?: string;
    }[];
    prependDts: ModuleItem[];
    appendDts: ModuleItem[];
    importHashes: Record<string, true>;
    exportHashes: Record<string, true>;
    enters: WalkFunc[];
    leaves: WalkFunc[];
    enableTracker: boolean;
    spanOffset: number;
    set: <T>(key: string, value: T) => void;
    get: <T>(key: string, defaultValue?: T | undefined) => T;
    import: (pkg: string | string[], source?: string, isDefault?: boolean) => void;
    export: (pkg: string | string[], source?: string | null, isNamespace?: boolean) => void;
    prepend: (stmts: ModuleItem[]) => number;
    append: (stmts: ModuleItem[]) => number;
    addPlugin: (macro: MacroPlugin | MacroPlugin[]) => void;
    declareModule: (id: string, body: ModuleItem | ModuleItem[]) => number;
    declareGlobal: (body: ModuleItem | ModuleItem[]) => number;
    declareGlobalConst: (name: string, ty: string | TsType) => number;
    declareReference: ({ types, path }: {
        types?: string | undefined;
        path?: string | undefined;
    }) => number;
    declarePrepend: (stmts: ModuleItem[]) => number;
    declareAppend: (stmts: ModuleItem[]) => number;
    defaultContext: {
        span: () => [number, number];
        set: <T>(key: string, value: T) => void;
        get: <T_1>(key: string, defaultValue?: T_1 | undefined) => T_1;
        track: (name: string) => ScopeVar | undefined;
        import: (pkg: string | string[], source?: string, isDefault?: boolean) => void;
        export: (pkg: string | string[], source?: string | null, isNamespace?: boolean) => void;
        prepend: (stmts: ModuleItem[]) => number;
        append: (stmts: ModuleItem[]) => number;
        parseExpr: typeof parseExpr;
        parseType: typeof parseType;
        parse: (src: string, options: ParseOptions) => ModuleItem[];
        printExpr: (expr: Node) => string;
        printType: (ty: TsType) => string;
        addPlugin: (macro: MacroPlugin | MacroPlugin[]) => void;
        startTracking: () => boolean;
        stopTracking: () => boolean;
        declareAppend: (stmts: ModuleItem[]) => number;
        declareGlobal: (body: ModuleItem | ModuleItem[]) => number;
        declareModule: (id: string, body: ModuleItem | ModuleItem[]) => number;
        declarePrepend: (stmts: ModuleItem[]) => number;
        declareReference: ({ types, path }: {
            types?: string | undefined;
            path?: string | undefined;
        }) => number;
        declareGlobalConst: (name: string, ty: string | TsType) => number;
    };
    constructor({ enter, leave }: WalkPlugin, src?: string, enableTracker?: boolean);
    walkSingle(n: Node, parent?: Node, prop?: string, index?: number): number;
    walkMany(nodes: Node[], parent?: Node, prop?: string): void;
    walk(n: Node | Node[], spanOffset?: number): Node | Node[];
    emit(): string;
    track(name: string): ScopeVar | undefined;
}
declare function walk(n: Node | Node[], plugin: WalkPlugin): Node | Node[];

declare var $Macro: (f: MacroPlugin) => void;
declare var $LitMacro: <LitType>(i: LitType) => LitType;
declare var $ExprMacro: <FnType = (...args: unknown[]) => unknown>(f: ExprMacro | {
    enter?: ExprMacro;
    leave?: ExprMacro;
}) => FnType;
declare var $TypeMacro: <FnType = (...args: unknown[]) => unknown>(f: TypeMacro | {
    enter?: TypeMacro;
    leave?: TypeMacro;
}) => FnType;
declare var $TmplMacro: <ReturnType_1 = string>(f: TmplMacro | {
    enter?: TmplMacro;
    leave?: TmplMacro;
}) => (strings: TemplateStringsArray, ...exprs: unknown[]) => ReturnType_1;
declare var $LabeledMacro: (<label extends string>(f: LabeledMacro | {
    enter?: LabeledMacro;
    leave?: LabeledMacro;
}, label?: label) => void) & ((label: string, f: LabeledMacro | {
    enter?: LabeledMacro;
    leave?: LabeledMacro;
}) => void);
declare const macro: MacroPlugin;

/**
 * Turns an AST into code, maintaining sourcemaps, user preferences, and valid output.
 * @param ast - the abstract syntax tree from which to generate output code.
 * @param options - used for specifying options for code generation.
 * @returns - an object containing the output code and source map.
 */
declare function print(ast: BaseNode | BaseNode[], options?: Options): {
    code: string;
    map: string | undefined;
};
declare function printAsync(ast: BaseNode | BaseNode[], options?: Options): Promise<{
    code: string;
    map: string | undefined;
}>;
declare function printExpr(expr: BaseNode, options?: Options): {
    code: string;
    map: string | undefined;
};
declare function printExprAsync(expr: BaseNode, options?: Options): Promise<{
    code: string;
    map: string | undefined;
}>;
declare function printType(ty: TsType, options?: Options): {
    code: string;
    map: string | undefined;
};
declare function printTypeAsync(ty: TsType, options?: Options): Promise<{
    code: string;
    map: string | undefined;
}>;

declare function defineConfig(config: Config): Config;
declare function createMacro(macro: MacroPlugin): MacroPlugin;
declare function createProxyMacro(macro: MacroPlugin): MacroPluginWithProxy;
declare function createLitMacro(map: Record<string, unknown>, typeAnnotations?: Record<string, string | TsType>): MacroPlugin;
declare function createLitMacro<T>(key: string, value: T, typeAnnotation?: string | TsType): MacroPlugin;
declare function createExprMacro(name: string, f: Function | ExprMacro | {
    enter?: ExprMacro;
    leave?: ExprMacro;
}, fnType?: TsFunctionType | string): MacroPluginWithProxy;
declare function createTypeMacro(name: string, f: TypeMacro | {
    enter?: TypeMacro;
    leave?: TypeMacro;
}, fnType?: TsFunctionType | string): MacroPlugin;
declare function createTmplMacro(tag: string, f: TmplMacro | {
    enter?: TmplMacro;
    leave?: TmplMacro;
}, returnType?: string | TsType): MacroPlugin;
declare function createLabeledMacro(label: string, f: LabeledMacro | {
    enter?: LabeledMacro;
    leave?: LabeledMacro;
}): MacroPlugin;

declare var $Eval: MacroPluginWithProxy;
declare const printAst: (ast: object) => string;
declare var $Ast: MacroPluginWithProxy;
declare var $Env: MacroPluginWithProxy;
declare var $Stringify: MacroPluginWithProxy;
declare var $Span: MacroPluginWithProxy;
declare var $Line: MacroPluginWithProxy;
declare var $Column: MacroPluginWithProxy;
declare var $ID: MacroPluginWithProxy;
declare var $UnImplemented: MacroPluginWithProxy;
declare var $Todo: MacroPluginWithProxy;
declare var $UnReachable: MacroPluginWithProxy;
declare var $Include: MacroPluginWithProxy;
declare var $IncludeStr: MacroPluginWithProxy;
declare var $IncludeJSON: MacroPluginWithProxy;
declare var $WriteFile: MacroPluginWithProxy;
declare var $Concat: MacroPluginWithProxy;
declare const printTmpl: (strings: string[], exprs: Expression[]) => string;
declare const printRawTmpl: (strings: string[], exprs: unknown[]) => string;
declare var $Expr: MacroPlugin;
declare var $Quote: MacroPlugin;

declare function isMacroPlugin(v: unknown): boolean;
declare function isMacroProxy(v: unknown): boolean;
declare function hash(str: string): string;
declare function getSpanOffset(): number;
declare function hashMap(map: object): string;
declare function isRegExp<T extends object>(input: T): boolean;
declare function isNode<T>(value: T): boolean;
declare const noop: () => void;
declare const span: {
    start: number;
    end: number;
    ctxt: number;
};
declare function markedNode<T extends object>(marker: string, node: T): T;
declare function unMarkNode<T extends object>(node: T): T;
declare function evalExpr<T = unknown>(expr: string): T;
declare function evalAst<F = Function>(expr: Expression): F;
declare function createLit(this: WalkContext, value: unknown): BaseNode;
declare function flatExpr(f: Function | FunctionDeclaration | FunctionExpression | ArrowFunctionExpression, args: Expression[], typeParams?: TsType[], optional?: boolean): Expression;
declare function createWalkPlugin(plugins: MacroPlugin | MacroPlugin[]): WalkPlugin;
declare function genConstType(name: string, typeAnnotation: TsType): VariableDeclaration;
declare function genTypeImport(lib: string, mod: string, kind?: string): VariableDeclaration;
declare function genTsRef(name: string): TsTypeReference;
declare function guessType(value: unknown): TsType;
declare function genImportSpecifier(name: string, isDefault?: boolean): ImportSpecifier | ImportDefaultSpecifier;
declare function genExportSpecifier(name: string, isNamespace?: boolean): ExportSpecifier | ExportNamespaceSpecifier;

export { $Ast, $Column, $Concat, $Env, $Eval, $Expr, $ExprMacro, $ID, $Include, $IncludeJSON, $IncludeStr, $LabeledMacro, $Line, $LitMacro, $Macro, $Quote, $Span, $Stringify, $TmplMacro, $Todo, $TypeMacro, $UnImplemented, $UnReachable, $WriteFile, BaseNode, Config, ExprMacro, GlobalMacro, GlobalMacroPlugin, LabeledMacro, MacroOptions, MacroPlugin, MacroPluginWithProxy, ScopeVar, TmplMacro, TrackFunc, TypeMacro, WalkContext, WalkFunc, WalkPlugin, Walker, createExprMacro, createLabeledBlock, createLabeledExpr, createLabeledMacro, createLit, createLitMacro, createMacro, createProxyMacro, createSwcPlugin, createTmplMacro, createTypeMacro, createWalkPlugin, defineConfig, evalAst, evalExpr, flatExpr, genConstType, genExportSpecifier, genImportSpecifier, genTsRef, genTypeImport, getSpanOffset, guessType, hash, hashMap, isMacroPlugin, isMacroProxy, isNode, isRegExp, macro, markedNode, noop, parseExpr, parseType, print, printAst, printAsync, printExpr, printExprAsync, printRawTmpl, printTmpl, printType, printTypeAsync, span, transform, transformAst, transformAsync, unMarkNode, walk };
