import type { CatchClause, ClassDeclaration, ClassMethod, Declaration, Expression, ImportDeclaration, Node, Options, PrivateMethod, Statement, VariableDeclarator } from "@swc/core";

export type PluginImportSpecifier = {
  name: string,
  kind?: null | "default"
}

export type { Node } from "@swc/core"

export type ScopeVar = { name: string, private?: boolean, value?: Node, marker?: unknown };

export type BaseNode = Declaration | Expression | CatchClause | ClassDeclaration | ImportDeclaration | ClassMethod | PrivateMethod | Statement | VariableDeclarator;

export type WalkContext = {
  /** Save data to current plugin cache */
  set: <T>(key: string, data: T) => void;
  /** Get data from current plugin cache */
  get: <T>(key: string, defaultValue?: T) => T | undefined;
  /** Skip this node, not handling */
  skip: () => void;
  /** Remove this node */
  remove: () => void;
  /** Replace matched node with new node, equals to `return node` */
  replace: (newNode: Node | Node[]) => void;
  /** Track last variable with name */
  track(name: string): ScopeVar | undefined;
  /** Import some package */
  import: (specifiers: PluginImportSpecifier[], source: string) => void;
}

export type WalkFunc = (this: WalkContext, node: Node, parent?: Node, prop?: string, index?: number) => Node | Node[] | undefined | void
export type WalkPlugin = {
  enter?: WalkFunc;
  leave?: WalkFunc;
}

export type LabeledMacro = (ast: BaseNode, code: string, handler: WalkContext) => BaseNode | BaseNode[] | string
export type GlobalMacro = (ast: BaseNode, handler: WalkContext, parent?: BaseNode, prop?: string, index?: number) => void | BaseNode | BaseNode[]

export type Config = Omit<Options, "plugin"> & {
  global?: Record<string, GlobalMacro | { enter: GlobalMacro, leave: GlobalMacro }>,
  labeled?: Record<string, LabeledMacro>,
}
