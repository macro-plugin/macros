import { BaseNode, createMacro, markedNode } from "@macro-plugin/core"
import { BinaryExpression, CallExpression, Expression, VariableDeclaration } from "@swc/core"

function getSetter (name: string) {
  return "set" + name[0].toUpperCase() + name.slice(1)
}

const plugin = createMacro({
  LabeledStatement (ast) {
    const stores: Record<string, { value?: BaseNode | Expression, setter: string }> = {}
    if (ast.body.type == "BlockStatement" && ast.label.value == "store") {
      let name
      for (const i of ast.body.stmts) {
        if (i.type == "VariableDeclaration" && i.kind == "var") {
          for (const d of i.declarations) {
            if (d.id.type === "Identifier") {
              name = d.id.value
              stores[name] = { value: d.init, setter: getSetter(name) }
            } else {
              throw new Error("Expect a pure Identifier.")
            }
          }
        } else {
          throw new Error("Expect a `var` kind VariableDeclaration node in store block")
        }
      }

      if (Object.keys(stores).length > 0) {
        this.import([{ name: "createStore" }], "solid-js/store")
        return Object.entries(stores).map(([k, v]) => ({
          type: "VariableDeclaration",
          kind: "var",
          declare: false,
          span: {
            start: 0,
            end: 0,
            ctxt: 0
          },
          declarations: [
            {
              type: "VariableDeclarator",
              id: {
                type: "ArrayPattern",
                span: {
                  start: 0,
                  end: 0,
                  ctxt: 0
                },
                optional: false,
                elements: [
                  markedNode("store", {
                    type: "Identifier",
                    value: k,
                    optional: false,
                    span: {
                      start: 0,
                      end: 0,
                      ctxt: 1
                    }
                  }),
                  markedNode("storeSetter", {
                    type: "Identifier",
                    value: v.setter,
                    optional: false,
                    span: {
                      start: 0,
                      end: 0,
                      ctxt: 1
                    }
                  })
                ]
              },
              init: {
                type: "CallExpression",
                callee: {
                  type: "Identifier",
                  value: "createStore",
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
                    expression: v.value
                  }
                ]
              },
              span: {
                start: 0,
                end: 0,
                ctxt: 0
              }
            }
          ]
        } as VariableDeclaration))
      }
    }
  },
  AssignmentExpression (ast) {
    if (ast.left.type == "Identifier" && this.track(ast.left.value)?.marker == "store") {
      const name = ast.left.value
      return {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          value: getSetter(name),
          optional: false,
          span: {
            start: 0,
            end: 0,
            ctxt: 0
          }
        },
        arguments: [
          {
            expression: ast.operator == "="
              ? ast.right
              : {
                type: "BinaryExpression",
                left: {
                  type: "CallExpression",
                  callee: {
                    type: "Identifier",
                    value: name,
                    span: {
                      start: 0,
                      end: 0,
                      ctxt: 0
                    },
                    optional: false
                  },
                  arguments: [],
                  span: {
                    start: 0,
                    end: 0,
                    ctxt: 0
                  }
                },
                operator: ast.operator.replace("=", ""),
                right: ast.right,
                span: {
                  start: 0,
                  end: 0,
                  ctxt: 0
                }
              } as BinaryExpression
          }
        ],
        span: {
          start: 0,
          end: 0,
          ctxt: 0
        }
      } as CallExpression
    }
  },
  UpdateExpression (ast) {
    if (ast.argument.type == "Identifier" && this.track(ast.argument.value)?.marker == "store") {
      const name = ast.argument.value
      ast.argument = {
        type: "CallExpression",
        callee: ast.argument,
        arguments: [],
        span: {
          start: 0,
          end: 0,
          ctxt: 0
        }
      } as CallExpression
      return {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          value: getSetter(name),
          optional: false,
          span: {
            start: 0,
            end: 0,
            ctxt: 1
          }
        },
        arguments: [
          {
            expression: ast
          }
        ],
        span: {
          start: 0,
          end: 0,
          ctxt: 0
        }
      } as CallExpression
    }
  }
})

export default plugin
