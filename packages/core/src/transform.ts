import type {
  BaseNode,
  Config,
  Handler,
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
  const data: Record<string, unknown> = {};

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

  function walkLabel(ast: LabeledStatement, handler: Handler): BaseNode | BaseNode[] | undefined {
    const { start, end } = ast.body.loc as unknown as {
      start: { index: number }
      end: { index: number }
    }

    if (ast.label.name in labeledMacros) {
      const r = labeledMacros[ast.label.name](ast.body, code.slice(start.index, end.index), handler)
      if (typeof r == 'string') {
        const p = parse(r, parserOptions);
        return p.program as unknown as Statement;
      }
      return r;
    }
  }

  function set(key: string, value: unknown) {
    data[key] = value;
  }

  function get(key: string, defaultValue?: unknown) {
    if (!(key in data)) data[key] = defaultValue;
    return data[key] || defaultValue;
  }

  let newNode

  walk(ast as BaseNode, {
    enter(node, parent, prop, index) {
      // @ts-ignore
      const replace = (node: BaseNode | BaseNode[]) => Array.isArray(node) ? this.replace({ type: 'Program', body: node }) : this.replace(node);
      const handler = { ...this, replace, import: loadImport, set, get };

      for (const plugin of Object.values(globalMacros)) {
        if ('enter' in plugin) {
          newNode = plugin.enter(node, handler, parent, prop, index)
        } else {
          newNode = plugin(node, handler, parent, prop, index)
        }

        if (newNode) replace(newNode)
      }
      if (node.type === "LabeledStatement") {
        newNode = walkLabel(node as LabeledStatement, handler)
        if (newNode) replace(newNode)
      }
    },
    leave(node, parent, prop, index) {
      // @ts-ignore
      const replace = (node: BaseNode | BaseNode[]) => Array.isArray(node) ? this.replace({ type: 'Program', body: node }) : this.replace(node);

      for (const plugin of Object.values(globalMacros)) {
        if ('leave' in plugin) {
          newNode = plugin.leave(node, { ...this, replace, import: loadImport, set, get }, parent, prop, index)
        }
      }

      if (node.type == 'File' && imports.length > 0) {
        // @ts-ignore
        node.program.body = [...imports, ...node.program.body];
      }
    },
  })

  return generate(ast, {}, code)
}
