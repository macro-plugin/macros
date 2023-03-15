import { BaseNode, createTrackPlugin, walk } from "@macro-plugin/core";

const plugin = createTrackPlugin((ast, handler, parent, prop, index) => {
  const computeds: Record<string, { value: BaseNode, computed: BaseNode }> = {};
  const signals: string[] = [];

  // @ts-ignore
  if (ast.type == 'LabeledStatement' && ast.body.type == 'BlockStatement' && ast.label.name == 'computed') {
    let name;
    // @ts-ignore
    for (const i of ast.body.body) {
      if (i.type == 'VariableDeclaration' && i.kind == 'var') {
        for (const d of i.declarations) {
          name = d.id.name;

          computeds[name] = { value: JSON.parse(JSON.stringify(d.init)), computed: d.init};

          walk(d.init, {
            enter(node) {
              // @ts-ignore
              const name = node.name;
              if (node.type === "Identifier" && handler.track(name)?.marker == 'qwikSignal') {
                // @ts-ignore
                node.marker = ''
                // @ts-ignore
                node.name = '__' + name
                if (!signals.includes(name)) signals.push(name);
              }
            },
          })
        }
      } else {
        throw new Error('Expect a `var` kind VariableDeclaration node in signal block')
      }
    }

    if (Object.keys(computeds).length > 0) {
      handler.import([{ name: 'useSignal' }, { name: 'useTask$' }], '@builder.io/qwik');
      return [...Object.entries(computeds).map(([k, v]) => ({
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
      })), {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: "useTask$"
          },
          arguments: [
            {
              type: "ArrowFunctionExpression",
              params: [
                {
                  type: "ObjectPattern",
                  properties: [
                    {
                      type: "ObjectProperty",
                      key: {
                        type: "Identifier",
                        name: "track"
                      },
                      computed: false,
                      shorthand: true,
                      value: {
                        type: "Identifier",
                        extra: undefined,
                        name: "track"
                      },
                      extra: {
                        shorthand: true
                      }
                    }
                  ]
                }
              ],
              body: {
                type: "BlockStatement",
                body: [
                  ...signals.map(name => ({
                    type: "VariableDeclaration",
                    kind: "const",
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        id: {
                          type: 'Identifier',
                          name: '__' + name,
                        },
                        init: {
                          type: 'CallExpression',
                          callee: {
                            type: 'Identifier',
                            name: 'track'
                          },
                          arguments: [
                            {
                              type: "ArrowFunctionExpression",
                              params: [],
                              body: {
                                type: "Identifier",
                                name
                              }
                            }
                          ]
                        }
                      }
                    ]
                  })),
                  ...Object.entries(computeds).map(([k, v]) => ({
                    type: "ExpressionStatement",
                    expression: {
                      type: "AssignmentExpression",
                      operator: "=",
                      left: {
                        type: 'Identifier',
                        name: k,
                        marker: 'qwikSignal',
                      },
                      right: v.computed
                    }
                  }))
                ]
              },
            }
          ]
        }
      }]
    }
  }
})

export default plugin;
