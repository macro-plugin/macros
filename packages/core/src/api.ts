import type { Config, ExprMacro, LabeledMacro, MacroPlugin, MacroPluginWithProxy, TmplMacro, TypeMacro } from "./types"
import { TsFunctionType, TsType } from "@swc/core"
import { createLit, flatExpr, guessType } from "./utils"
import { defaultGlobalExpr, defaultGlobalTmpl, defaultGlobalType, dummySpan } from "./defaults"

export function defineConfig (config: Config) {
  return config
}

export function createMacro (macro: MacroPlugin) {
  Reflect.set(macro, "__macro_plugin__", true)
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
            return p === "__macro_proxy__" || p === "__macro_plugin__" || Reflect.get(macro, p) || Reflect.get(target, p)
          },
        })
      }
      return p === "__macro_plugin__" || Reflect.get(macro, p)
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
          if (f.enter && ast.callee.type === "Identifier" && ast.callee.value === name) { // && !this.track(ast.callee.value)) {
            return f.enter.apply(this, [ast.arguments.map(i => i.expression), ast.typeArguments?.params, ast.callee.optional])
          }
        },
        leave (ast) {
          if (f.leave && ast.callee.type === "Identifier" && ast.callee.value === name) { // && !this.track(ast.callee.value)) {
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
      if (ast.callee.type === "Identifier" && ast.callee.value === name) { // && !this.track(ast.callee.value)) {
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
  return createProxyMacro({
    Module () {
      this.declareGlobalConst(tag, {
        type: "TsFunctionType",
        span: dummySpan,
        params: [
          {
            type: "Identifier",
            span: dummySpan,
            value: "strings",
            optional: false,
            typeAnnotation: {
              type: "TsTypeAnnotation",
              span: dummySpan,
              typeAnnotation: {
                type: "TsTypeReference",
                span: dummySpan,
                typeName: {
                  type: "Identifier",
                  span: dummySpan,
                  value: "TemplateStringsArray",
                  optional: false
                },
              }
            }
          },
          {
            type: "RestElement",
            span: dummySpan,
            rest: dummySpan,
            argument: {
              type: "Identifier",
              span: dummySpan,
              value: "expressions",
              optional: false,
            },
            typeAnnotation: {
              type: "TsTypeAnnotation",
              span: dummySpan,
              typeAnnotation: {
                type: "TsArrayType",
                span: dummySpan,
                elemType: {
                  type: "TsKeywordType",
                  span: dummySpan,
                  kind: "unknown"
                }
              }
            }
          }
        ],
        typeAnnotation: {
          type: "TsTypeAnnotation",
          span: dummySpan,
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
