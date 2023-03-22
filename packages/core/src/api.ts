import { ArrowFunctionExpression, Expression, FunctionDeclaration, FunctionExpression, Invalid, Param, TsFunctionType, TsType } from "@swc/core"
import type { BaseNode, ExprMacro, LabeledMacro, MacroPlugin, TmplMacro, TypeMacro, WalkContext } from "./types"
import { defaultGlobalExpr, defaultGlobalTmpl, defaultGlobalType } from "./defaults"
import { guessType, isRegExp } from "./utils"

import { parseExpr } from "./parse"
import { walk } from "./walk"

export function createMacro (macro: MacroPlugin) {
  return macro
}

function createLit (this: WalkContext, value: unknown): BaseNode {
  if (value === undefined) {
    return {
      type: "Identifier",
      span: {
        start: 0,
        end: 0,
        ctxt: 2
      },
      value: "undefined",
      optional: false
    }
  }
  if (value && typeof value === "object") {
    if (isRegExp(value)) return this.parseExpr(value.toString())
    if ("span" in value && "type" in value) return value as BaseNode
  }
  if (typeof value === "function") return this.parseExpr(value.toString())
  return this.parseExpr(JSON.stringify(value))
}

export function createLitMacro(map: Record<string, unknown>, typeAnnotations?: Record<string, string | TsType>): MacroPlugin;
export function createLitMacro<T>(key: string, value: T, typeAnnotation?: string | TsType): MacroPlugin;
export function createLitMacro (arg: string | Record<string, unknown>, value?: unknown, typeAnnotation?: string | TsType): MacroPlugin {
  return createMacro(typeof arg === "string"
    ? {
      Module () {
        this.declareGlobalConst(arg, typeAnnotation || guessType(value))
      },
      Identifier (ast) {
        if (ast.value === arg && !this.track(arg)) return createLit.apply(this, [value])
      }
    }
    : {
      Module () {
        let t: string | TsType
        for (const [k, v] of Object.entries(arg)) {
          if (value && Object.keys(value).includes(k)) {
            t = (value as Record<string, string | TsType>)[k]
            this.declareGlobalConst(k, t)
          } else {
            this.declareGlobalConst(k, guessType(v))
          }
        }
      },
      Identifier (ast) {
        if (ast.value in arg && !this.track(ast.value)) return createLit.apply(this, [arg[ast.value]])
      }
    })
}

function flatExpr (f: Function, args: Expression[], typeParams?: TsType[], optional = false): Expression {
  if (optional) throw new Error("optional is not supported.")
  const ast = parseExpr(f.toString()) as FunctionDeclaration | FunctionExpression | ArrowFunctionExpression
  const params: Record<string, { value?: Expression }> = {}

  ast.params.forEach((p, i) => {
    const pat = ast.type === "ArrowFunctionExpression" ? p : ((p as Param).pat)
    if (pat.type === "Identifier") {
      params[pat.value] = args[i] ? { value: args[i] } : {}
    } else if (pat.type === "AssignmentPattern") {
      if (pat.left.type === "Identifier") {
        params[pat.left.value] = { value: args[i] || pat.right }
      }
    }
  })

  let output: Invalid | Expression = {
    type: "Invalid",
    span: {
      start: 0,
      end: 0,
      ctxt: 0
    }
  }

  if (ast.body) {
    walk(ast.body, {
      // @ts-ignore
      enter (ast: BaseNode) {
        if (ast.type === "Identifier" && ast.value in params) {
          const v = params[ast.value].value
          if (v) this.replace(v)
        }
      },
      // @ts-ignore
      leave (ast: BaseNode) {
        if (ast.type === "ReturnStatement" && ast.argument) {
          output = ast.argument
        }
      }
    })

    if (ast.body.type !== "BlockStatement") output = ast.body
  }

  return output
}

export function createExprMacro (name: string, f: Function | ExprMacro | { enter?: ExprMacro, leave?: ExprMacro }, fnType: TsFunctionType | string = defaultGlobalExpr): MacroPlugin {
  if (typeof f === "object") {
    return createMacro({
      Module () {
        this.declareGlobalConst(name, fnType)
      },
      CallExpression: {
        enter (ast) {
          if (f.enter && ast.callee.type === "Identifier" && ast.callee.value === name && !this.track(ast.callee.value)) {
            return f.enter.apply(this, [ast.arguments.map(i => i.expression), ast.typeArguments?.params, ast.callee.optional])
          }
        },
        leave (ast) {
          if (f.leave && ast.callee.type === "Identifier" && ast.callee.value === name && !this.track(ast.callee.value)) {
            return f.leave.apply(this, [ast.arguments.map(i => i.expression), ast.typeArguments?.params, ast.callee.optional])
          }
        }
      }
    })
  }
  return createMacro({
    Module () {
      this.declareGlobalConst(name, fnType)
    },
    CallExpression (ast) {
      if (ast.callee.type === "Identifier" && ast.callee.value === name && !this.track(ast.callee.value)) {
        const args = ast.arguments.map(i => i.expression)
        const tys = ast.typeArguments?.params
        return f.toString().startsWith("function") ? (f as ExprMacro).apply(this, [args, tys, ast.callee.optional]) : flatExpr(f, args, tys, ast.callee.optional)
      }
    }
  })
}

export function createTypeMacro (name: string, f: TypeMacro | { enter?: TypeMacro, leave?: TypeMacro }, fnType: TsFunctionType | string = defaultGlobalType) {
  if (typeof f === "object") {
    return createMacro({
      Module () {
        this.declareGlobalConst(name, fnType)
      },
      CallExpression: {
        enter (ast) {
          if (f.enter && ast.callee.type === "Identifier" && ast.callee.value === name && !this.track(ast.callee.value)) {
            if (ast.arguments.length > 0) throw new Error("TypeMacro doesn't support call with args.")
            return f.enter.apply(this, [ast.typeArguments?.params, ast.callee.optional])
          }
        },
        leave (ast) {
          if (f.leave && ast.callee.type === "Identifier" && ast.callee.value === name && !this.track(ast.callee.value)) {
            if (ast.arguments.length > 0) throw new Error("TypeMacro doesn't support call with args.")
            return f.leave.apply(this, [ast.typeArguments?.params, ast.callee.optional])
          }
        }
      }
    })
  }

  return createMacro({
    Module () {
      this.declareGlobalConst(name, fnType)
    },
    CallExpression (ast) {
      if (ast.callee.type === "Identifier" && ast.callee.value === name && !this.track(ast.callee.value)) {
        if (ast.arguments.length > 0) throw new Error("TypeMacro doesn't support call with args.")
        const tys = ast.typeArguments?.params
        return f.apply(this, [tys, ast.callee.optional])
      }
    }
  })
}

export function createTmplMacro (tag: string, f: TmplMacro | {
  enter?: TmplMacro,
  leave?: TmplMacro
}, returnType: string | TsType = defaultGlobalTmpl) {
  return createMacro({
    Module () {
      this.declareGlobalConst(tag, {
        type: "TsFunctionType",
        span: {
          start: 174,
          end: 242,
          ctxt: 0
        },
        params: [
          {
            type: "Identifier",
            span: {
              start: 175,
              end: 204,
              ctxt: 2
            },
            value: "strings",
            optional: false,
            typeAnnotation: {
              type: "TsTypeAnnotation",
              span: {
                start: 182,
                end: 204,
                ctxt: 0
              },
              typeAnnotation: {
                type: "TsTypeReference",
                span: {
                  start: 184,
                  end: 204,
                  ctxt: 0
                },
                typeName: {
                  type: "Identifier",
                  span: {
                    start: 184,
                    end: 204,
                    ctxt: 2
                  },
                  value: "TemplateStringsArray",
                  optional: false
                },
              }
            }
          },
          {
            type: "RestElement",
            span: {
              start: 206,
              end: 231,
              ctxt: 0
            },
            rest: {
              start: 207,
              end: 210,
              ctxt: 0
            },
            argument: {
              type: "Identifier",
              span: {
                start: 209,
                end: 220,
                ctxt: 2
              },
              value: "expressions",
              optional: false,
            },
            typeAnnotation: {
              type: "TsTypeAnnotation",
              span: {
                start: 220,
                end: 231,
                ctxt: 0
              },
              typeAnnotation: {
                type: "TsArrayType",
                span: {
                  start: 222,
                  end: 231,
                  ctxt: 0
                },
                elemType: {
                  type: "TsKeywordType",
                  span: {
                    start: 222,
                    end: 229,
                    ctxt: 0
                  },
                  kind: "unknown"
                }
              }
            }
          }
        ],
        typeAnnotation: {
          type: "TsTypeAnnotation",
          span: {
            start: 233,
            end: 242,
            ctxt: 0
          },
          typeAnnotation: typeof returnType === "string" ? this.parseType(returnType) : returnType
        }
      })
    },
    TaggedTemplateExpression: {
      enter (ast) {
        if (ast.tag.type === "Identifier" && ast.tag.value === tag) return (typeof f === "object" ? f.enter : f)?.apply(this, [ast.template.quasis.map(i => i.raw), ...ast.template.expressions])
      },
      leave (ast) {
        if (typeof f === "object" && f.leave && ast.tag.type === "Identifier") return f.leave.apply(this, [ast.template.quasis.map(i => i.raw), ...ast.template.expressions])
      }
    }
  })
}

export function createLabeledMacro (label: string, f: LabeledMacro | {
  enter?: LabeledMacro,
  leave?: LabeledMacro,
}) {
  return createMacro({
    LabeledStatement: {
      enter (ast, parent, prop, index) {
        if (ast.label.value === label) return (typeof f === "object" ? f.enter : f)?.apply(this, [ast.body, parent, prop, index])
      },
      leave (ast, parent, prop, index) {
        if (ast.label.value === label && typeof f === "object") return f.leave?.apply(this, [ast.body, parent, prop, index])
      }
    }
  })
}
