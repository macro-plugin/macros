import type { BaseNode, Statement } from "estree";

import type { ParserOptions } from "@babel/parser";

export type {
  LabeledStatement,
  Statement,
  ImportDeclaration
} from "estree"

export type { ParserOptions } from "@babel/parser"

export type { BaseNode } from "estree-walker"

export type ImportSpecifier = {
  name: string,
  kind?: null | "type" | "default"
}

export type Handler = {
  /** Skip this node, not handling */
  skip: () => void;
  /** Remove this node */
  remove: () => void;
  /** Replace matched node with new node, equals to `return node` */
  replace: (node: BaseNode | BaseNode[]) => void;
  /** Import some package */
  import: (specifiers: ImportSpecifier[], source: string, kind?: 'type' | 'value' | undefined | null) => void
};

export type TrackHandler = Handler & {
  track(name: string): Node | -1 | undefined
}

export type LabeledMacro = (ast: Statement, code: string) => Statement | Statement[] | string
export type GlobalMacro = (ast: BaseNode, handler: Handler, parent: BaseNode, prop: string, index: number) => void | BaseNode | BaseNode[]
export type GlobalTrackMacro = (ast: BaseNode, handler: TrackHandler, parent: BaseNode, prop: string, index: number) => void | BaseNode | BaseNode[]

export type Config = {
  global?: Record<string, GlobalMacro | { enter: GlobalMacro, leave: GlobalMacro }>,
  labeled?: Record<string, LabeledMacro>,
  parserOptions?: ParserOptions
}
