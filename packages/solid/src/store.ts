import type { BaseNode } from "@macro-plugin/core"
import { createTrackPlugin } from "@macro-plugin/core";

function getSetter(name: string) {
  return 'set' + name[0].toUpperCase() + name.slice(1)
}

const plugin = createTrackPlugin((ast, handler, parent, prop, index) => {
  const stores: Record<string, { value: BaseNode, setter: string }> = {};
  // @ts-ignore
  if (ast.type == 'LabeledStatement' && ast.body.type == 'BlockStatement' && ast.label.name == 'store') {
    let name;
    // @ts-ignore
    for (const i of ast.body.body) {
      if (i.type == 'VariableDeclaration' && i.kind == 'var') {
        for (const d of i.declarations) {
          name = d.id.name;
          stores[name] = { value: d.init, setter: getSetter(name) };
        }
      } else {
        throw new Error('Expect a `var` kind VariableDeclaration node in store block')
      }
    }

    if (Object.keys(stores).length > 0) {
      handler.import([{ name: 'createStore' }], 'solid-js/store');
      return Object.entries(stores).map(([k, v]) => ({
        type: "VariableDeclaration",
        kind: "var",
        declarations: [
          {
            type: 'VariableDeclarator',
            id: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'Identifier',
                  name: k,
                  marker: 'store',
                },
                {
                  type: 'Identifier',
                  name: v.setter,
                  marker: 'storeSetter',
                }
              ]
            },
            init: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'createStore'
              },
              arguments: [
                v.value
              ]
            }
          }
        ]
      }))
    }
  } else if (ast.type == 'AssignmentExpression') {
    // @ts-ignore
    if (handler.track(ast.left.name)?.marker == 'store') {
      // @ts-ignore
      const name = ast.left.name;
      return {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: getSetter(name)
        },
        arguments: [
          // @ts-ignore
          ast.operator == '=' ? ast.right : {
            type: 'BinaryExpression',
            left: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name,
              },
              arguments: []
            },
            // @ts-ignore
            operator: ast.operator.replace('=', ''),
            // @ts-ignore
            right: ast.right
          }
        ]
      }
    }
  } else if (ast.type == 'UpdateExpression') {
    // @ts-ignore
    if (handler.track(ast.argument.name)?.marker == 'store') {
      // @ts-ignore
      const name = ast.argument.name;
      // @ts-ignore
      ast.argument = {
        type: 'CallExpression',
        // @ts-ignore
        callee: ast.argument,
        arguments: []
      }
      return {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: getSetter(name),
        },
        arguments: [
          ast
        ]
      }
    }
  }
})

export default plugin;
