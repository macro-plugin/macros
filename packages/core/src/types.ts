import type { ParserOptions } from "@babel/parser";
import type { Statement } from "estree";

export type {
  LabeledStatement,
  Statement,
} from "estree"

export type { ParserOptions } from "@babel/parser"

export type { BaseNode } from "estree-walker"

export type MacroPlugin = (ast: Statement, code: string) => Statement | string

export type Config = {
  global?: Record<string, MacroPlugin>,
  labeled?: Record<string, MacroPlugin>,
  parserOptions?: ParserOptions
}
