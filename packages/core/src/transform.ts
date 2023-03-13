import type {
  BaseNode,
  Config,
  LabeledStatement,
  MacroPlugin,
  ParserOptions,
  Statement
} from "./types"

import { generate } from "./generate"
import { parse } from "./parse"
import { walk } from "./walk"

/**
 * Transform code with your labeled macro plugins.
 * @param code - input source code.
 * @param plugins - an object containing your macro plugins.
 * @param parserOptions - babel parser options.
 * @returns - an object containing the output code and source map.
 */
export function transform(code: string, config: Config) {
  const parserOptions = config.parserOptions || {
    sourceType: "module",
  }
  const labeledMacros = config.labeled || {};
  const ast = parse(code, parserOptions)

  function walkLabel(ast: LabeledStatement): BaseNode | undefined {
    const { start, end } = ast.body.loc as unknown as {
      start: { index: number }
      end: { index: number }
    }

    if (ast.label.name in labeledMacros) {
      const r = labeledMacros[ast.label.name](ast.body, code.slice(start.index, end.index))
      if (typeof r == 'string') {
        const p = parse(r, parserOptions);
        return p.program as unknown as Statement;
      }
      return r;
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
