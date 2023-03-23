import { ArrowFunctionExpression, EmptyStatement, Expression, MemberExpression, Pattern, Statement } from "@swc/core"
import { createLabeledMacro, createLitMacro } from "./api"

import { MacroPlugin } from "./types"

export const macro = createLabeledMacro("macro", {
  enter (stmt) {
    this.stopTracking()

    const plugins: MacroPlugin[] = []
    const stmts: Statement[] = stmt.type === "BlockStatement" ? stmt.stmts : [stmt]
    const handleDecl = (pat: Pattern, init?: Expression) => {
      if (pat.type === "Identifier") {
        plugins.push(createLitMacro(pat.value, init))
      } else if (pat.type === "ArrayPattern") {
        pat.elements.forEach((item, index) => {
          item && handleDecl(item, init
            ? {
              type: "MemberExpression",
              span: {
                start: 342,
                end: 348,
                ctxt: 0
              },
              object: init,
              property: {
                type: "Computed",
                span: {
                  start: 345,
                  end: 348,
                  ctxt: 0
                },
                expression: {
                  type: "NumericLiteral",
                  span: {
                    start: 346,
                    end: 347,
                    ctxt: 0
                  },
                  value: index,
                }
              }
            } as MemberExpression
            : undefined)
        })
      } else if (pat.type === "ObjectPattern") {
        pat.properties.forEach(item => {
          if (item.type === "AssignmentPatternProperty" && item.value == null) {
            handleDecl(item.key, init
              ? {
                type: "MemberExpression",
                span: {
                  start: 342,
                  end: 353,
                  ctxt: 0
                },
                object: {
                  type: "ParenthesisExpression",
                  span: {
                    start: 342,
                    end: 353,
                    ctxt: 0
                  },
                  expression: init
                },
                property: {
                  type: "Computed",
                  span: {
                    start: 345,
                    end: 353,
                    ctxt: 0
                  },
                  expression: {
                    type: "StringLiteral",
                    span: {
                      start: 346,
                      end: 352,
                      ctxt: 0
                    },
                    value: item.key.value,
                  }
                }
              } as MemberExpression
              : undefined)
          } else if (item.type === "RestElement") {
            handleDecl(item.argument, init
              ? {
                type: "ArrowFunctionExpression",
                span: {
                  start: 368,
                  end: 427,
                  ctxt: 0
                },
                params: [],
                body: {
                  type: "BlockStatement",
                  span: {
                    start: 374,
                    end: 427,
                    ctxt: 0
                  },
                  stmts: [
                    {
                      type: "VariableDeclaration",
                      span: {
                        start: 380,
                        end: 409,
                        ctxt: 0
                      },
                      kind: "const",
                      declare: false,
                      declarations: [
                        {
                          type: "VariableDeclarator",
                          span: {
                            start: 386,
                            end: 409,
                            ctxt: 0
                          },
                          id: pat,
                          init,
                          definite: false
                        }
                      ]
                    },
                    {
                      type: "ReturnStatement",
                      span: {
                        start: 414,
                        end: 423,
                        ctxt: 0
                      },
                      argument: item.argument
                    }
                  ]
                },
                async: false,
                generator: false,
              } as ArrowFunctionExpression
              : undefined)
          } else {
            throw new Error("Unexpected Object Pattrn type.")
          }
        })
      } else {
        throw new Error("Unexpected macro type.")
      }
    }

    for (const s of stmts) {
      if (s.type === "VariableDeclaration" && s.kind === "var") {
        for (const d of s.declarations) {
          handleDecl(d.id, d.init)
        }
      }
    }

    this.replace({
      type: "EmptyStatement",
      span: {
        start: 0,
        end: 0,
        ctxt: 0
      }
    } as EmptyStatement)

    this.addPlugin(plugins)
  },
  leave () {
    this.startTracking()
  }
})
