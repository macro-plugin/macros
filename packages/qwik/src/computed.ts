import { ArrowFunctionExpression, Expression, ExpressionStatement, Identifier, VariableDeclaration } from "@swc/core";
import { BaseNode, createLabeledMacro, markedNode, unMarkNode, walk } from "@macro-plugin/core";

export const computed = createLabeledMacro('computed', function (stmt) {
  if (stmt.type != 'BlockStatement') return;

  const computeds: Record<string, { value: BaseNode, computed?: BaseNode | Expression }> = {};
  const signals: string[] = [];

  let name;
  for (const i of stmt.stmts) {
    if (i.type == 'VariableDeclaration' && i.kind == 'var') {
      for (const d of i.declarations) {
        if (d.id.type == 'Identifier') {
          name = d.id.value;

          if (d.init) {
            computeds[name] = { value: JSON.parse(JSON.stringify(d.init)), computed: d.init };
            const isSignal = (name: string) => this.track(name)?.marker == 'qwikSignal';

            walk(d.init, {
              enter(node) {
                if (node.type == "Identifier") {
                  const name = (node as Identifier).value;
                  if (isSignal(name)) {
                    unMarkNode(node);
                    (node as Identifier).value = '__' + name;
                    if (!signals.includes(name)) signals.push(name);
                  }
                }
              },
            })
          }

        } else {
          throw new Error("Expect an Identifier")
        }
      }
    } else {
      throw new Error('Expect a `var` kind VariableDeclaration node in signal block')
    }
  }

  if (Object.keys(computeds).length > 0) {
    this.import([{ name: 'useSignal' }, { name: 'useTask$' }], '@builder.io/qwik');
    return [...Object.entries(computeds).map(([k, v]) => ({
      type: "VariableDeclaration",
      kind: "const",
      declarations: [
        {
          type: 'VariableDeclarator',
          id: markedNode('qwikSignal', {
            type: 'Identifier',
            value: k,
            span: {
              start: 0,
              end: 0,
              ctxt: 0
            },
            optional: false
          }),
          init: {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              value: 'useSignal',
              span: {
                start: 0,
                end: 0,
                ctxt: 0
              },
              optional: false
            },
            arguments: [
              {
                expression: v.value
              }
            ],
            span: {
              start: 0,
              end: 0,
              ctxt: 0
            }
          },
          span: {
            start: 0,
            end: 0,
            ctxt: 0
          }
        }
      ],
      declare: false,
      span: {
        start: 0,
        end: 0,
        ctxt: 0
      }
    } as VariableDeclaration)), {
      type: "ExpressionStatement",
      span: {
        start: 0,
        end: 0,
        ctxt: 0
      },
      expression: {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          value: "useTask$",
          optional: false,
          span: {
            start: 0,
            end: 0,
            ctxt: 0
          }
        },
        span: {
          start: 0,
          end: 0,
          ctxt: 0
        },
        arguments: [
          {
            expression: {
              type: "ArrowFunctionExpression",
              async: false,
              generator: false,
              params: [
                {
                  type: "ObjectPattern",
                  optional: false,
                  span: {
                    start: 0,
                    end: 0,
                    ctxt: 0
                  },
                  properties: [
                    {
                      type: "AssignmentPatternProperty",
                      span: {
                        start: 0,
                        end: 0,
                        ctxt: 0
                      },
                      key: {
                        type: "Identifier",
                        value: "track",
                        optional: false,
                        span: {
                          start: 0,
                          end: 0,
                          ctxt: 1
                        },
                      },
                    }
                  ]
                }
              ],
              body: {
                type: "BlockStatement",
                span: {
                  start: 0,
                  end: 0,
                  ctxt: 0
                },
                stmts: [
                  ...signals.map(name => ({
                    type: "VariableDeclaration",
                    kind: "const",
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        definite: false,
                        span: {
                          start: 0,
                          end: 0,
                          ctxt: 0
                        },
                        id: {
                          type: 'Identifier',
                          value: '__' + name,
                          span: {
                            start: 0,
                            end: 0,
                            ctxt: 0
                          },
                          optional: false
                        },
                        init: {
                          type: 'CallExpression',
                          callee: {
                            type: 'Identifier',
                            value: 'track',
                            span: {
                              start: 0,
                              end: 0,
                              ctxt: 0
                            },
                            optional: false
                          },
                          span: {
                            start: 0,
                            end: 0,
                            ctxt: 0
                          },
                          arguments: [
                            {
                              expression: {
                                type: "ArrowFunctionExpression",
                                async: false,
                                generator: false,
                                params: [],
                                body: {
                                  type: "Identifier",
                                  value: name,
                                  optional: false,
                                  span: {
                                    start: 0,
                                    end: 0,
                                    ctxt: 0
                                  }
                                },
                                span: {
                                  start: 0,
                                  end: 0,
                                  ctxt: 0
                                }
                              }
                            }
                          ]
                        }
                      }
                    ],
                    declare: false,
                    span: {
                      start: 0,
                      end: 0,
                      ctxt: 0
                    }
                  } as VariableDeclaration)),
                  ...Object.entries(computeds).map(([k, v]) => ({
                    type: "ExpressionStatement",
                    expression: {
                      type: "AssignmentExpression",
                      operator: "=",
                      left: markedNode('qwikSignal', {
                        type: 'Identifier',
                        value: k,
                        optional: false,
                        span: {
                          start: 0,
                          end: 0,
                          ctxt: 0
                        }
                      }),
                      right: v.computed,
                      span: {
                        start: 0,
                        end: 0,
                        ctxt: 0
                      }
                    },
                    span: {
                      start: 0,
                      end: 0,
                      ctxt: 0
                    }
                  } as ExpressionStatement))
                ]
              },
              span: {
                start: 0,
                end: 0,
                ctxt: 0
              }
            } as ArrowFunctionExpression
          }
        ]
      }
    }]
  }
})
