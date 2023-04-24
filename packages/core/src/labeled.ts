import { ArrowFunctionExpression, ExpressionStatement, CallExpression } from "@swc/core"
import { createLabeledMacro, createMacro } from "./api"

import { MacroPlugin } from "./types"

export const createLabeledExpr: ((label: string, specifier: string, source: string) => MacroPlugin) = (label, specifier, source) => {
  return createMacro({
    LabeledStatement (ast) {
      if (ast.label.value !== label) return
      if (ast.body.type === "ExpressionStatement") {
        this.import(specifier, source)

        ast.body.expression = {
          type: "CallExpression",
          span: {
            start: 109,
            end: 119,
            ctxt: 0
          },
          callee: {
            type: "Identifier",
            span: {
              start: 109,
              end: 112,
              ctxt: 1
            },
            value: specifier,
            optional: false
          },
          arguments: [
            {
              expression: ast.body.expression
            }
          ],
        } as CallExpression

        return ast.body
      } else {
        throw new Error("this macro only accept an Expression")
      }
    }
  })
}

/**
 * Create a macro plugin that converts `labeled: {}` or `labeled: (...args) => {}` to `$specifier((...args) => {})`,
 * and also `import { $specifier } from $source`
 * @param specifier - the function name
 * @param source - the module path
 * @param allowParams - allow convert the input array to params, default is false.
 * @returns - A labeled macro plugin
 */
export const createLabeledBlock: ((label: string, specifier: string, source: string, allowParams?: boolean) => MacroPlugin) = (label, specifier, source, allowParams = false) => createLabeledMacro(label, function (ast) {
  this.import(specifier, source)
  if (ast.type === "BlockStatement") {
    return ({
      type: "ExpressionStatement",
      expression: {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          value: specifier,
          span: {
            start: 0,
            end: 0,
            ctxt: 0
          }
        },
        arguments: [
          {
            expression: {
              type: "ArrowFunctionExpression",
              generator: false,
              async: false,
              params: [],
              body: ast,
              span: {
                start: 0,
                end: 0,
                ctxt: 0
              }
            } as ArrowFunctionExpression
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
    }) as ExpressionStatement
  } else if (ast.type === "ExpressionStatement" && ast.expression.type === "ArrowFunctionExpression") {
    return ({
      type: "ExpressionStatement",
      expression: {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          value: specifier,
          span: {
            start: 0,
            end: 0,
            ctxt: 0
          }
        },
        arguments: [
          {
            expression: ast.expression
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
    }) as ExpressionStatement
  } else if (allowParams && ast.type === "ExpressionStatement" && ast.expression.type === "ArrayExpression") {
    return ({
      type: "ExpressionStatement",
      expression: {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          value: specifier,
          span: {
            start: 0,
            end: 0,
            ctxt: 0
          }
        },
        arguments: ast.expression.elements,
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
    }) as ExpressionStatement
  } else {
    throw new Error("this macro only accept a ArrowFunction or BlockStatement" + (allowParams ? " or an ArrayExpression" : ""))
  }
})
