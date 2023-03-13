import type { BaseNode, Statement } from "estree";

import type { ParserOptions } from "@babel/parser";

export type {
  LabeledStatement,
  Statement,
} from "estree"

export type { ParserOptions } from "@babel/parser"

export type { BaseNode } from "estree-walker"

export type Handler = {
  skip: () => void;
  remove: () => void;
  replace: (node: BaseNode) => void;
};

export type LabeledMacro = (ast: Statement, code: string) => Statement | string
export type GlobalMacro = (ast: BaseNode, handler: Handler, parent: BaseNode, prop: string, index: number) => void | BaseNode

export type Config = {
  global?: Record<string, GlobalMacro>,
  labeled?: Record<string, LabeledMacro>,
  parserOptions?: ParserOptions
}
