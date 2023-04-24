import { Argument, ArrayExpression, ArrowFunctionExpression, AssignmentProperty, CallExpression, Expression, ExpressionStatement, FunctionDeclaration, FunctionExpression, Identifier, KeyValueProperty, ObjectExpression, ObjectPatternProperty, Param, ParenthesisExpression, Pattern, Property, SpreadElement, Statement } from "@swc/core"
import { createLabeledMacro, createMacro } from "./api"

import { MacroPlugin } from "./types"
import { span } from "./utils"

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

const $Undefined = {
  type: "Identifier",
  span,
  value: "undefined",
  optional: false
} as Identifier

const patternProperty: (prop: ObjectPatternProperty) => SpreadElement | Property = (prop) => {
  switch (prop.type) {
    case "AssignmentPatternProperty":
      return {
        type: "AssignmentProperty",
        key: prop.key,
        value: prop.value || $Undefined
      } satisfies AssignmentProperty
    case "KeyValuePatternProperty":
      return {
        type: "KeyValueProperty",
        key: prop.key,
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        value: patternToExpr(prop.value).expression
      } satisfies KeyValueProperty
    case "RestElement":
      return {
        type: "SpreadElement",
        spread: span,
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        arguments: patternToExpr(prop.argument).expression
      } satisfies SpreadElement
    default:
      throw new Error("Unhandled pattern.")
  }
}

export const patternToExpr: (pat: Pattern) => Argument = (pat) => {
  switch (pat.type) {
    case "Identifier": return { expression: pat }
    case "AssignmentPattern": return { expression: pat.right }
    case "ArrayPattern": return {
      expression: {
        type: "ArrayExpression",
        elements: pat.elements.map(i => i ? patternToExpr(i) : i),
        span
      } satisfies ArrayExpression
    }
    case "ObjectPattern": return {
      expression: {
        type: "ObjectExpression",
        properties: pat.properties.map(i => patternProperty(i)),
        span
      } satisfies ObjectExpression
    }
    case "RestElement": return {
      spread: pat.rest,
      expression: patternToExpr(pat.argument).expression
    }
    default:
      throw new Error("Unhandled pattern.")
  }
}

export const paramsToArgs = (params: Param[]) => params.map(i => patternToExpr(i.pat))

const filterNotDecorator = (stmts: Statement[]) => stmts.filter(i => i.type !== "LabeledStatement" || (i.type === "LabeledStatement" && i.label.value !== "decorator"))

const fixCallee = (callee: Expression | undefined) => {
  if (!callee) return $Undefined
  if (["ArrayExpression", "CallExpression"].includes(callee.type)) return callee
  if (callee.type !== "Identifier") return { type: "ParenthesisExpression", span, expression: callee } as ParenthesisExpression
  return callee
}

const handleDecoratorLabel = (parent: FunctionDeclaration | FunctionExpression, stmts: Statement[] = []) => {
  for (const stmt of stmts) {
    if (stmt.type === "LabeledStatement" && stmt.label.value === "decorator") {
      if (stmt.body.type === "ExpressionStatement" && parent.body) {
        let callee: Expression = fixCallee(stmt.body.expression)
        let finalCallee: CallExpression | undefined

        const expression: FunctionExpression = {
          type: "FunctionExpression",
          identifier: parent.identifier,
          params: parent.params,
          decorators: parent.decorators,
          span,
          body: {
            type: "BlockStatement",
            span,
            stmts: filterNotDecorator(parent.body.stmts)
          },
          generator: parent.generator,
          async: parent.async,
        }

        if (callee.type === "ArrayExpression") {
          let lastCallee = {} as CallExpression
          let cacheCallee: CallExpression

          const els = callee.elements

          if (callee.elements[0]) {
            callee = callee.elements[0].expression
          } else {
            parent.body.stmts = filterNotDecorator(parent.body.stmts)
            return
          }

          const last = els.length - 1

          els.length > 1 && els.forEach((el, index) => {
            if (lastCallee.type === "CallExpression") {
              cacheCallee = lastCallee
              lastCallee = { type: "CallExpression", span, callee: fixCallee(el?.expression), arguments: index === last ? [{ expression }] : [] }
              if (index === last) finalCallee = callee as CallExpression
              cacheCallee.arguments[0] = { expression: lastCallee }
            } else {
              callee = { type: "CallExpression", span, callee, arguments: [{ expression: fixCallee(el?.expression), spread: el?.spread }] }
              lastCallee = callee
            }
          })
        }

        parent.body.stmts = [
          {
            type: "ReturnStatement",
            span,
            argument: {
              type: "CallExpression",
              span,
              callee: finalCallee || {
                type: "CallExpression",
                span,
                callee,
                arguments: [
                  {
                    expression
                  }
                ],
              },
              arguments: paramsToArgs(parent.params),
            }
          }
        ]
      } else {
        throw new Error("this macro only accept an Expression")
      }
    }
  }
}

export const decorator = createMacro({
  enter (ast) {
    if (ast.type === "FunctionDeclaration" || ast.type === "FunctionExpression") {
      handleDecoratorLabel(ast, ast.body?.stmts)
    } else if (ast.type === "ArrowFunctionExpression" && ast.body.type === "BlockStatement") {
      handleDecoratorLabel(ast as unknown as FunctionExpression, ast.body.stmts)
    } else if (ast.type === "PrivateMethod" || ast.type === "ClassMethod") {
      if (ast.key.type !== "Identifier") return
      handleDecoratorLabel({ ...ast.function, type: "FunctionExpression", identifier: ast.key }, ast.function.body?.stmts)
    }
  },
})
