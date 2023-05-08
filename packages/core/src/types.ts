import type { CatchClause, ClassDeclaration, ClassMethod, Declaration, Expression, ImportDeclaration, ModuleItem, Node, Options, Param, ParseOptions, PrivateMethod, Statement, TsType, VariableDeclarator } from "@swc/core"

import type { AST } from "./ast"

export type { Node } from "@swc/core"

export type ScopeVar = { name: string, private?: boolean, value?: Node, marker?: unknown };

export type BaseNode = Declaration | Expression | CatchClause | ClassDeclaration | ImportDeclaration | Param | ClassMethod | PrivateMethod | Statement | VariableDeclarator | ModuleItem;

export type WalkContext = {
  /** Get current script source code */
  src: string | undefined,
  /** Get global config */
  config: Config,
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
  declareReference({ types, path }: { types?: string, path?: string }): void;
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
  startTracking: () => boolean
  /** Stop tracking variables */
  stopTracking: () => boolean
}

export type TrackFunc = (this: WalkContext, name: string) => ScopeVar | undefined;
export type WalkFunc = (this: WalkContext, node: Node, parent?: Node, prop?: string, index?: number) => Node | Node[] | undefined | void
export type WalkPlugin = {
  enter?: WalkFunc;
  leave?: WalkFunc;
  track?: TrackFunc;
}

export type ExprMacro = (this: WalkContext, args: Expression[], typeParams?: TsType[], optional?: boolean) => BaseNode | BaseNode[] | void | undefined
export type TypeMacro = (this: WalkContext, typeParams?: TsType[], optional?: boolean) => BaseNode | BaseNode[] | void | undefined
export type TmplMacro = (this: WalkContext, strings: string[], ...expressions: Expression[]) => BaseNode | BaseNode[] | void | undefined
export type LabeledMacro = (this: WalkContext, stmt: Statement, parent?: BaseNode, prop?: string, index?: number) => BaseNode | BaseNode[] | void | undefined
export type GlobalMacro<T = BaseNode> = (this: WalkContext, ast: T, parent?: BaseNode, prop?: string, index?: number) => void | undefined | BaseNode | BaseNode[]

export type GlobalMacroPlugin = {
  enter?: GlobalMacro,
  leave?: GlobalMacro,
}

export type MacroPlugin = (GlobalMacro | (GlobalMacroPlugin & {
  [k in keyof AST]?: GlobalMacro<AST[k]> | {
    enter?: GlobalMacro<AST[k]>,
    leave?: GlobalMacro<AST[k]>,
  }
}))

export type MacroPluginWithProxy = MacroPlugin & {
  proxy<Runtime extends Function>(runtime: Runtime): MacroPlugin & Runtime
}

export type MacroOptions = {
  /** Global macros to be used */
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
  externals?: string[] | Record<string, Record<string, MacroPlugin>>;
  /**
   * FileNames or Glob Patterns to include, Glob pattern is supported by [picomatch](https://www.npmjs.com/package/picomatch#basic-globbing).
   *
   * **Note**: When array item is a string, the plugin will treat it as glob pattern, and use `picomatch.makeRe` turn the string into a RegExp, or you can use RegExp directly.
   *
   * Default value is `[/\.[mc]?[jt]sx?$/]`
   */
  include?: (string | RegExp)[];
  /**
   * Filenames or Glob Patterns to exclude, Glob pattern is supported by [picomatch](https://www.npmjs.com/package/picomatch#basic-globbing).
   *
   * **Note**: When array item is a string, the plugin will treat it as glob pattern, and use `picomatch.makeRe` turn the string into a RegExp, or you can use RegExp directly.
   *
   * Default value is `[/node_modules/]`
   */
  exclude?: (string | RegExp)[];
  /** File extensions to be matched. This option is only avaliable for vite/rollup/webpack plugin. Default is ['.js', '.ts', '.jsx', '.tsx', '.mjs', '.cjs'] */
  extensions?: string[];
  /** Emit macro's dts file, default is false */
  emitDts?: boolean;
  /** The macro's dts output path, default is `./macros.d.ts` */
  dtsOutputPath?: string;
  /** Hook when emit macro's dts, we use this hook for emitting dts file */
  onEmitDts?: (dts: string) => void;
  /** Use given tsconfig file instead. This option is only avaliable for vite/rollup/webpack plugin. By default it will find `tsconfig.json` automictly. Disable it by setting to `false`. */
  tsconfig?: string | false | undefined
  /** Use Typescript File Resolver, default is `false`. This option is only avaliable for vite/rollup plugin. When using vite/rollup in monorepo typescript project, this option may useful. */
  resolveTs?: boolean;
  /** Transform Typescript syntax with swc, default is `true`. This option is only avaliable for vite/rollup/webpack plugin. By disabling this option, you can use macro plugin with other typescript plugin together. */
  swcTransform?: boolean;
}

export type Config = Omit<Options, "plugin" | "test" | "exclude" | "configFile" | "swcrc" | "swcrcRoots" | "filename"> & MacroOptions
