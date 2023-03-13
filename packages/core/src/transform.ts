import type {
  BaseNode,
  Config,
  ImportDeclaration,
  ImportSpecifier,
  LabeledStatement,
  Statement
} from "./types"

import { generate } from "./generate"
import { parse } from "./parse"
import { walk } from "./walk"

/**
 * Transform code with your labeled macro plugins.
 * @param code - input source code.
 * @param config - an object containing your macro config.
 * @returns - an object containing the output code and source map.
 */
export function transform(code: string, config: Config) {
  const parserOptions = config.parserOptions || {
    sourceType: "module",
  }
  const globalMacros = config.global || {};
  const labeledMacros = config.labeled || {};
  const ast = parse(code, parserOptions)
  const imports: ImportDeclaration[] = [];

  function genSpecifier(specifier: ImportSpecifier) {
    const local = {
      type: 'Identifier',
      name: specifier.name
    };

    if (specifier.kind == 'default') {
      return {
        type: 'ImportDefaultSpecifier',
        local
      }
    }
    return {
      type: 'ImportSpecifier',
      imported: local,
      importKind: specifier.kind,
      local
    }
  }

  function loadImport(specifiers: ImportSpecifier[], source: string, kind: 'type' | 'value' | null = 'value') {
    imports.push({
      type: 'ImportDeclaration',
      specifiers: specifiers.map(i => genSpecifier(i)),
      importKind: kind,
      source: {
        type: "StringLiteral",
        value: source
      },
      assertions: []
    } as unknown as ImportDeclaration);
  }

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
      for (const plugin of Object.values(globalMacros)) {
        newNode = plugin(node, { ...this, import: loadImport }, parent, prop, index)
        if (newNode) this.replace(newNode)
      }
      if (node.type === "LabeledStatement") {
        newNode = walkLabel(node as LabeledStatement)
        if (newNode) this.replace(newNode)
      }
    },
    leave(node, parent, key, index) {
      if (node.type == 'Program' && imports.length > 0) {
        // @ts-ignore
        node.body = [...imports, ...node.body]
      }
    },
  })

  return generate(ast, {}, code)
}
