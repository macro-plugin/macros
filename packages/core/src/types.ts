import type { CatchClause, ClassDeclaration, ClassMethod, Declaration, Expression, ImportDeclaration, Node, Options, PrivateMethod, Statement, VariableDeclarator } from "@swc/core";

export type PluginImportSpecifier = {
  name: string,
  kind?: null | "default"
}

export type { Node } from "@swc/core"

export type ScopeVar = { name: string, private?: boolean, value?: Node, marker?: unknown };

export type BaseNode = Declaration | Expression | CatchClause | ClassDeclaration | ImportDeclaration | ClassMethod | PrivateMethod | Statement | VariableDeclarator;

export type WalkContext = {
  set: <T>(key: string, data: T) => void;
  get: <T>(key: string, defaultValue?: T) => T | undefined;
  skip: () => void;
  remove: () => void;
  replace: (newNode: Node | Node[]) => void;
  import: (specifiers: PluginImportSpecifier[], source: string) => void;
}

export type WalkFunc = (this: WalkContext, node: Node, parent?: Node, prop?: string, index?: number) => Node | Node[] | undefined | void
export type WalkPlugin = {
  enter?: WalkFunc;
  leave?: WalkFunc;
}

export type Handler = {
  /** Save data to current plugin cache */
  set: (key: string, data: unknown) => void;
  /** Get data from current plugin cache */
  get: (key: string, defaultValue?: unknown) => unknown;
  /** Skip this node, not handling */
  skip: () => void;
  /** Remove this node */
  remove: () => void;
  /** Replace matched node with new node, equals to `return node` */
  replace: (node: BaseNode | BaseNode[]) => void;
  /** Import some package */
  import: (specifiers: PluginImportSpecifier[], source: string) => void
};

export type TrackHandler = Handler & {
  track(name: string): ScopeVar | undefined
}

export type LabeledMacro = (ast: BaseNode, code: string, handler: Handler) => BaseNode | BaseNode[] | string
export type GlobalMacro = (ast: BaseNode, handler: Handler, parent?: BaseNode, prop?: string, index?: number) => void | BaseNode | BaseNode[]
export type GlobalTrackMacro = (ast: BaseNode, handler: TrackHandler, parent?: BaseNode, prop?: string, index?: number) => void | BaseNode | BaseNode[]

export type Config = Omit<Options, "plugin"> & {
  global?: Record<string, GlobalMacro | { enter: GlobalMacro, leave: GlobalMacro }>,
  labeled?: Record<string, LabeledMacro>,
}
