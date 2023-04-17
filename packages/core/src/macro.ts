/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArrowFunctionExpression, EmptyStatement, Expression, FunctionDeclaration, FunctionExpression, MemberExpression, Pattern, Statement, StringLiteral, TsLiteralType } from "@swc/core"
import { ExprMacro, LabeledMacro, MacroPlugin, TmplMacro, TypeMacro } from "./types"
import { createExprMacro, createLabeledMacro, createLitMacro, createMacro, createTmplMacro, createTypeMacro } from "./api"
import { evalAst, flatExpr, genTypeImport, noop } from "./utils"

export var $Macro: (f: MacroPlugin) => void = noop

export var $LitMacro = <LitType>(i: LitType) => i

export var $ExprMacro = <FnType = ((...args: unknown[]) => unknown)>(f: ExprMacro | { enter?: ExprMacro; leave?: ExprMacro }) => f as unknown as FnType

export var $TypeMacro = <FnType = ((...args: unknown[]) => unknown)>(f: TypeMacro | { enter?: TypeMacro; leave?: TypeMacro }) => f as unknown as FnType

export var $TmplMacro = <ReturnType = string>(f: TmplMacro | { enter?: TmplMacro; leave?: TmplMacro }) => f as unknown as (strings: TemplateStringsArray, ...exprs: unknown[]) => ReturnType

export var $LabeledMacro: (<label extends string>(f: LabeledMacro | { enter?: LabeledMacro; leave?: LabeledMacro }, label?: label) => void) & ((label: string, f: LabeledMacro | { enter?: LabeledMacro; leave?: LabeledMacro }) => void) = noop

export const macro = createMacro({
  Module () {
    this.declareGlobal(["$Macro", "$LitMacro", "$ExprMacro", "$TypeMacro", "$TmplMacro", "$LabeledMacro"].map(i => genTypeImport("@macro-plugin/core", i, "var")))
  },
  LabeledStatement: {
    enter (ast) {
      if (ast.label.value !== "macro") return

      this.stopTracking()

      const exprMacros = this.get("ExprMacros", {} as Record<string, FunctionDeclaration | FunctionExpression | ArrowFunctionExpression>)
      const litMacros = this.get("LitMacros", {} as Record<string, Expression>)
      const plugins: MacroPlugin[] = []
      const stmts: Statement[] = ast.body.type === "BlockStatement" ? ast.body.stmts : [ast.body]
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
            if (d.id.type === "Identifier" && d.init) {
              if (["FunctionExpression", "ArrowFunctionExpression", "FunctionDeclaration"].includes(d.init.type)) {
                exprMacros[d.id.value] = d.init as FunctionExpression | ArrowFunctionExpression | FunctionDeclaration
              } else if (d.init.type === "CallExpression" && d.init.callee.type === "Identifier") {
                switch (d.init.callee.value) {
                  case "$LitMacro":
                    litMacros[d.id.value] = d.init.arguments[0].expression
                    break
                  case "$ExprMacro":
                    plugins.push(createExprMacro(d.id.value, evalAst(d.init.arguments[0].expression)))
                    break
                  case "$TmplMacro":
                    plugins.push(createTmplMacro(d.id.value, evalAst(d.init.arguments[0].expression)))
                    break
                  case "$TypeMacro":
                    plugins.push(createTypeMacro(d.id.value, evalAst(d.init.arguments[0].expression)))
                    break
                  case "$LabeledMacro":
                  case "$Macro":
                    throw new Error("VariableDeclaration is not expected for $Labeled and $Macro.")
                  default:
                    handleDecl(d.id, d.init)
                }
              } else {
                handleDecl(d.id, d.init)
              }
            } else {
              handleDecl(d.id, d.init)
            }
          }
        } else if (s.type === "ExpressionStatement" && s.expression.type === "CallExpression" && s.expression.callee.type === "Identifier") {
          switch (s.expression.callee.value) {
            case "$LabeledMacro":
              if (s.expression.arguments[0].expression.type === "StringLiteral") {
                plugins.push(createLabeledMacro(s.expression.arguments[0].expression.value, evalAst(s.expression.arguments[1].expression)))
              } else {
                plugins.push(createLabeledMacro(((s.expression.typeArguments?.params[0] as TsLiteralType).literal as StringLiteral).value, evalAst(s.expression.arguments[1].expression)))
              }
              break
            case "$Macro":
              plugins.push(createMacro(evalAst(s.expression.arguments[0].expression)))
              break
            case "$LitMacro":
            case "$ExprMacro":
            case "$TmplMacro":
            case "$TypeMacro":
              throw new Error("Expect VariableDeclaration for $Lit, $Expr, $Tmpl, $Type.")
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
    leave (ast) {
      if (ast.label.value !== "macro") return

      this.startTracking()
    }
  },
  Identifier (ast) {
    const litMacros = this.get("LitMacros", {} as Record<string, Expression>)

    if (ast.value in litMacros) {
      this.replace(litMacros[ast.value])
      this.skip()
    }
  },
  CallExpression (ast) {
    if (ast.callee.type === "Identifier") {
      const exprMacros = this.get("ExprMacros", {} as Record<string, FunctionDeclaration | FunctionExpression | ArrowFunctionExpression>)
      if (ast.callee.value in exprMacros) {
        return flatExpr(exprMacros[ast.callee.value], ast.arguments.map(i => i.expression), ast.typeArguments?.params, ast.callee.optional)
      }
    }
  }
})
