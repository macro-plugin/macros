import { ArrowFunctionExpression, ExpressionStatement } from "@swc/core"

import { createMacro } from "@macro-plugin/core"

export const events = createMacro({
  LabeledStatement: {
    enter (ast) {
      if (ast.label.value === "document" && ast.body.type === "BlockStatement") {
        this.set("QwikInDocument", true)
        return
      }

      if (ast.label.value === "window" && ast.body.type === "BlockStatement") {
        this.set("QwikInWindow", true)
        return
      }

      const inDoc = this.get("QwikInDocument", false)
      const inWin = this.get("QwikInWindow", false)

      if (!ast.label.value.startsWith("on") || !["BlockStatement", "ExpressionStatement"].includes(ast.body.type)) return

      let expression
      let name = inDoc ? "useOnDocument" : inWin ? "useOnWindow" : "useOn"
      this.import([{ name: "$" }], "@builder.io/qwik")

      if (ast.body.type === "BlockStatement") {
        const firstLabel = ast.body.stmts[0]
        if (firstLabel && firstLabel.type === "LabeledStatement") {
          if (firstLabel.label.value === "document") {
            ast.body.stmts = ast.body.stmts.slice(1)
            name = "useOnDocument"
          } else if (firstLabel.label.value === "window") {
            ast.body.stmts = ast.body.stmts.slice(1)
            name = "useOnWindow"
          }
        }

        expression = {
          type: "ArrowFunctionExpression",
          span: {
            start: 26,
            end: 87,
            ctxt: 0
          },
          params: [],
          body: ast.body,
          async: false,
          generator: false,
        } as ArrowFunctionExpression
      } else if (ast.body.type === "ExpressionStatement") {
        expression = ast.body.expression

        if (ast.body.expression.type === "FunctionExpression" || ast.body.expression.type === "ArrowFunctionExpression") {
          if (ast.body.expression.body?.type === "BlockStatement") {
            const firstLabel = ast.body.expression.body.stmts[0]
            if (firstLabel && firstLabel.type === "LabeledStatement") {
              if (firstLabel.label.value === "document") {
                ast.body.expression.body.stmts = ast.body.expression.body.stmts.slice(1)
                name = "useOnDocument"
              } else if (firstLabel.label.value === "window") {
                ast.body.expression.body.stmts = ast.body.expression.body.stmts.slice(1)
                name = "useOnWindow"
              }
            }
          }
        }
      }

      this.import([{ name }], "@builder.io/qwik")

      return {
        type: "ExpressionStatement",
        span: {
          start: 0,
          end: 93,
          ctxt: 0
        },
        expression: {
          type: "CallExpression",
          span: {
            start: 0,
            end: 92,
            ctxt: 0
          },
          callee: {
            type: "Identifier",
            span: {
              start: 0,
              end: 5,
              ctxt: 1
            },
            value: name,
            optional: false
          },
          arguments: [
            {
              expression: {
                type: "StringLiteral",
                span: {
                  start: 11,
                  end: 18,
                  ctxt: 0
                },
                value: ast.label.value.slice(2),
                raw: `'${ast.label.value.slice(2)}'`
              }
            },
            {
              expression: {
                type: "CallExpression",
                span: {
                  start: 24,
                  end: 88,
                  ctxt: 0
                },
                callee: {
                  type: "Identifier",
                  span: {
                    start: 24,
                    end: 25,
                    ctxt: 1
                  },
                  value: "$",
                  optional: false
                },
                arguments: [
                  {
                    expression
                  }
                ],
              }
            }
          ],
        }
      } as ExpressionStatement
    },
    leave (ast) {
      if (ast.label.value === "document" && ast.body.type === "BlockStatement") {
        this.replace(ast.body.stmts)
        this.set("QwikInDocument", false)
      }

      if (ast.label.value === "window" && ast.body.type === "BlockStatement") {
        this.replace(ast.body.stmts)
        this.set("QwikInWindow", false)
      }
    }
  }
})
