import type {
  BaseNode,
  Config,
  ImportDeclaration,
  ImportSpecifier,
  LabeledStatement,
  Statement
} from "./types"

import { generate } from "./generate"
import { hashMap } from "./utils"
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
  const importHashes: Record<string, true> = {};

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
    let h;
    const sl = [];
    for (const s of specifiers) {
      h = hashMap({ s, kind, source });
      if (!(h in importHashes)) {
        sl.push(genSpecifier(s))
        importHashes[h] = true;
      }
    }

    if (sl.length > 0) {
      imports.push({
        type: 'ImportDeclaration',
        specifiers: sl,
        importKind: kind,
        source: {
          type: "StringLiteral",
          value: source
        },
        assertions: []
      } as unknown as ImportDeclaration);
    }
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
  let injected = false

  walk(ast as BaseNode, {
    enter(node, parent, prop, index) {
      // @ts-ignore
      const replace = (node: BaseNode | BaseNode[]) => Array.isArray(node) ? this.replace({ type: 'Program', body: node }) : this.replace(node);

      for (const plugin of Object.values(globalMacros)) {
        newNode = plugin(node, { ...this, replace, import: loadImport }, parent, prop, index)
        if (newNode) replace(newNode)
      }
      if (node.type === "LabeledStatement") {
        newNode = walkLabel(node as LabeledStatement)
        if (newNode) replace(newNode)
      }
    },
    leave(node, parent, key, index) {
      if (node.type == 'Program' && imports.length > 0 && !injected) {
        // @ts-ignore
        node.body = [...imports, ...node.body];
        injected = true;
      }
    },
  })

  return generate(ast, {}, code)
}
