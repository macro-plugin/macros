import type { BaseNode } from "@macro-plugin/core"
import { createTrackPlugin } from "@macro-plugin/core";

function getSetter(name: string) {
  return 'set' + name[0].toUpperCase() + name.slice(1)
}

const plugin = createTrackPlugin((ast, handler, parent, prop, index) => {
  const states: Record<string, { value: BaseNode, setter: string }> = {};

  // @ts-ignore
  if (ast.type == 'LabeledStatement' && ast.body.type == 'BlockStatement' && ast.label.name == 'state') {
    let name;
    // @ts-ignore
    for (const i of ast.body.body) {
      if (i.type == 'VariableDeclaration' && i.kind == 'var') {
        for (const d of i.declarations) {
          name = d.id.name;
          states[name] = { value: d.init, setter: getSetter(name) };
        }
      } else {
        throw new Error('Expect a `var` kind VariableDeclaration node in state block')
      }
    }

    if (Object.keys(states).length > 0) {
      handler.import([{ name: 'createSignal' }], 'solid-js');
      return Object.entries(states).map(([k, v]) => ({
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
                  marker: 'signal',
                },
                {
                  type: 'Identifier',
                  name: v.setter,
                  marker: 'signalSetter',
                }
              ]
            },
            init: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'createSignal'
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
    if (handler.track(ast.left.name)?.marker == 'signal') {
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
    if (handler.track(ast.argument.name)?.marker == 'signal') {
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
