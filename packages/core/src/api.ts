import type { ExprMacro, LabeledMacro, MacroPlugin, MacroPluginWithProxy, TmplMacro, TypeMacro } from "./types"
import { TsFunctionType, TsType } from "@swc/core"
import { createLit, flatExpr, guessType, macroProxySymbol } from "./utils"
import { defaultGlobalExpr, defaultGlobalTmpl, defaultGlobalType } from "./defaults"

export function createMacro (macro: MacroPlugin) {
  return macro
}

export function createProxyMacro (macro: MacroPlugin) {
  return new Proxy(macro, {
    get (macro, p) {
      if (p === "proxy") {
        return (runtime: Function) => new Proxy(runtime, {
          ownKeys (target) {
            return [...Reflect.ownKeys(macro), ...Reflect.ownKeys(target)]
          },
          has (target, p) {
            return Reflect.has(macro, p) || Reflect.has(target, p)
          },
          get (target, p) {
            return p === macroProxySymbol || Reflect.get(macro, p) || Reflect.get(target, p)
          },
        })
      }
      return Reflect.get(macro, p)
    },
  }) as MacroPluginWithProxy
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
        if (ast.value === arg && !this.track(arg)) {
          this.replace(createLit.apply(this, [value]))
          this.skip()
        }
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
        if (ast.value in arg && !this.track(ast.value)) {
          this.replace(createLit.apply(this, [arg[ast.value]]))
          this.skip()
        }
      }
    })
}

export function createExprMacro (name: string, f: Function | ExprMacro | { enter?: ExprMacro, leave?: ExprMacro }, fnType: TsFunctionType | string = defaultGlobalExpr): MacroPluginWithProxy {
  if (typeof f === "object") {
    return createProxyMacro({
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
  return createProxyMacro({
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
