import type { CatchClause, ClassDeclaration, ClassMethod, Declaration, Expression, ImportDeclaration, ModuleItem, Node, Options, Param, ParseOptions, PrivateMethod, Statement, TsType, VariableDeclarator } from "@swc/core"

import type { Visitor } from "@swc/core/Visitor"

export type { Node } from "@swc/core"

export type ScopeVar = { name: string, private?: boolean, value?: Node, marker?: unknown };

export type BaseNode = Declaration | Expression | CatchClause | ClassDeclaration | ImportDeclaration | Param | ClassMethod | PrivateMethod | Statement | VariableDeclarator | ModuleItem;

export type WalkContext = {
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

type SliceVisit<T> = T extends `visit${infer R}` ? R : never;

export type GlobalMacroPlugin = {
  enter?: GlobalMacro,
  leave?: GlobalMacro,
}

export type MacroPlugin = GlobalMacro | (GlobalMacroPlugin & {
  [k in keyof Visitor & string as SliceVisit<k>]?: GlobalMacro<Parameters<Visitor[k]>[0]> | {
    enter?: GlobalMacro<Parameters<Visitor[k]>[0]>,
    leave?: GlobalMacro<Parameters<Visitor[k]>[0]>,
  }
})

export type Config = Omit<Options, "plugin"> & {
  plugins?: MacroPlugin[];
  emitDts?: boolean;
}
