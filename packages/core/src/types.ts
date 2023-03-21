import type { CatchClause, ClassDeclaration, ClassMethod, Declaration, Expression, ImportDeclaration, ModuleItem, Node, Options, Param, ParseOptions, PrivateMethod, Statement, VariableDeclarator } from "@swc/core";

import type { Visitor } from "@swc/core/Visitor";

export type PluginImportSpecifier = {
  name: string,
  kind?: null | "default"
}

export type { Node } from "@swc/core"

export type ScopeVar = { name: string, private?: boolean, value?: Node, marker?: unknown };

export type BaseNode = Declaration | Expression | CatchClause | ClassDeclaration | ImportDeclaration | Param | ClassMethod | PrivateMethod | Statement | VariableDeclarator | ModuleItem;

export type WalkContext = {
  /** Save data to current plugin cache */
  set: <T>(key: string, data: T) => void;
  /** Get data from current plugin cache */
  get: (<T>(key: string, defaultValue: T) => T) & (<T>(key: string, defaultValue?: T) => T | undefined);
  /** Skip this node, not handling */
  skip: () => void;
  /** Remove this node */
  remove: () => void;
  /** Replace matched node with new node, equals to `return node` */
  replace: (newNode: Node | Node[]) => void;
  /** Track last variable with name */
  track: (name: string) => ScopeVar | undefined;
  /** Import some package */
  import: (specifiers: PluginImportSpecifier[], source: string) => void;
  /** Convert source code to node list */
  parse: (src: string, options?: ParseOptions) => ModuleItem[];
  /** Convert expression to ast */
  parseExpr: (src: string, options?: ParseOptions) => Expression;
  /** Convert current ast node to source code */
  print: (ast?: Node | Node[]) => string;
}

export type TrackFunc = (this: WalkContext, name: string) => ScopeVar | undefined;
export type WalkFunc = (this: WalkContext, node: Node, parent?: Node, prop?: string, index?: number) => Node | Node[] | undefined | void
export type WalkPlugin = {
  enter?: WalkFunc;
  leave?: WalkFunc;
  track?: TrackFunc;
}

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
}
