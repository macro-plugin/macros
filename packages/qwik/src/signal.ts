import type { BaseNode } from "@macro-plugin/core"
import { createTrackPlugin } from "@macro-plugin/core";

const plugin = createTrackPlugin((ast, handler, parent, prop, index) => {
  const signals: Record<string, { value: BaseNode }> = {};

  // @ts-ignore
  if (ast.type == 'LabeledStatement' && ast.body.type == 'BlockStatement' && ast.label.name == 'signal') {
    let name;
    // @ts-ignore
    for (const i of ast.body.body) {
      if (i.type == 'VariableDeclaration' && i.kind == 'var') {
        for (const d of i.declarations) {
          name = d.id.name;
          signals[name] = { value: d.init };
        }
      } else {
        throw new Error('Expect a `var` kind VariableDeclaration node in signal block')
      }
    }

    if (Object.keys(signals).length > 0) {
      handler.import([{ name: 'useSignal' }], '@builder.io/qwik');
      return Object.entries(signals).map(([k, v]) => ({
        type: "VariableDeclaration",
        kind: "const",
        declarations: [
          {
            type: 'VariableDeclarator',
            id: {
              type: 'Identifier',
              name: k,
              marker: 'qwikSignal',
            },
            init: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'useSignal'
              },
              arguments: [
                v.value
              ]
            }
          }
        ]
      }))
    }
    // @ts-ignore
  } else if (ast.type == 'Identifier' && parent.type != 'VariableDeclarator' && handler.track(ast.name)?.marker == 'qwikSignal') {
    handler.replace({
      type: 'MemberExpression',
      // @ts-ignore
      object: ast,
      computed: false,
        property: {
          type: "Identifier",
          name: "value"
        }
    })
    handler.skip();
  }
})

export default plugin;
