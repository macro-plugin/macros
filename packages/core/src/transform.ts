import { BaseNode, walk } from "estree-walker"
import type {
  LabeledStatement,
  Statement,
} from "estree"

import type { ParserOptions } from "@babel/parser"
import generate from "@babel/generator"
import { parse } from "@babel/parser"

export function transform(code: string, plugins: Record<string, (ast: Statement) => Statement> = {}, parserOptions: ParserOptions = {
  sourceType: "module",
}) {
  const ast = parse(code, parserOptions)

  function walkLabel(ast: LabeledStatement): BaseNode | undefined {
    if (ast.label.name in plugins) {
      return plugins[ast.label.name](ast.body)
    }
  }

  let newNode

  walk(ast as BaseNode, {
    enter(node, parent, prop, index) {
      if (node.type === "LabeledStatement") {
        newNode = walkLabel(node as LabeledStatement)
        if (newNode) this.replace(newNode)
      }
    },
  })

  return generate(ast, {}, code)
}
