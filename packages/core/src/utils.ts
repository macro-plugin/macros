import { ArrowFunctionExpression, ExportNamespaceSpecifier, ExportSpecifier, Expression, FunctionDeclaration, FunctionExpression, Identifier, ImportDefaultSpecifier, ImportSpecifier, Invalid, Param, TsKeywordTypeKind, TsType, TsTypeReference, VariableDeclaration } from "@swc/core"
import { BaseNode, GlobalMacroPlugin, MacroPlugin, WalkContext, WalkPlugin } from "./types"
import { parse, parseExpr } from "./parse"

import { defaultGlobalExpr } from "./defaults"
import { printExpr } from "./print"
import { walk } from "./walk"

export function isMacroPlugin (v: unknown): boolean {
  return !!(v && (v as { __macro_plugin__?: boolean }).__macro_plugin__)
}

export function isMacroProxy (v: unknown): boolean {
  return !!(v && (v as { __macro_proxy__?: boolean }).__macro_proxy__)
}

export function hash (str: string): string {
  str = str.replace(/\r/g, "")
  let hash = 5381
  let i = str.length

  while (i--) hash = ((hash << 5) - hash) ^ str.charCodeAt(i)
  return (hash >>> 0).toString(36)
}

export function getSpanOffset (): number {
  return parse("").span.end
}

export function hashMap (map: object): string {
  return hash(JSON.stringify(map))
}

export function isRegExp<T extends object> (input: T): boolean {
  return Object.prototype.toString.call(input) === "[object RegExp]"
}

export function isNode<T> (value: T): boolean {
  return value && typeof value === "object" && "type" in value
}

export const noop = () => {}

export const span = {
  start: 0,
  end: 0,
  ctxt: 0,
}

export function markedNode<T extends object> (marker: string, node: T): T {
  // @ts-ignore
  node.marker = marker
  return node
}

export function unMarkNode<T extends object> (node: T): T {
  // @ts-ignore
  delete node.marker
  return node
}

export function evalExpr<T = unknown> (expr: string): T {
  // eslint-disable-next-line no-new-func
  return (new Function(`return (${expr})`))()
}

export function evalAst<F = Function> (expr: Expression): F {
  return evalExpr(printExpr(expr).code)
}

export function createLit (this: WalkContext, value: unknown): BaseNode {
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

export function flatExpr (f: Function | FunctionDeclaration | FunctionExpression | ArrowFunctionExpression, args: Expression[], typeParams?: TsType[], optional = false): Expression {
  if (optional) throw new Error("optional is not supported.")
  const ast = typeof f === "object" ? f : parseExpr(f.toString()) as FunctionDeclaration | FunctionExpression | ArrowFunctionExpression
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

export function createWalkPlugin (plugins: MacroPlugin | MacroPlugin[]): WalkPlugin {
  if (!Array.isArray(plugins)) plugins = [plugins]
  return {
    enter (node, parent, prop, index) {
      let r, e

      const run = (fn: Function) => {
        r = fn.apply(this, [node, parent, prop, index])
        if (r) this.replace(r)
      }

      for (const p of plugins as MacroPlugin[]) {
        if (typeof p === "function" && !isMacroProxy(p)) {
          run(p)
          continue
        }
        if ((p as GlobalMacroPlugin).enter) run((p as Required<GlobalMacroPlugin>).enter)
        if (node.type in p) {
          e = p[node.type as keyof typeof p]
          if (typeof e === "function") {
            run(e)
          } else if (typeof e === "object" && (e as GlobalMacroPlugin).enter) {
            run((e as Required<GlobalMacroPlugin>).enter)
          }
        }
      }
    },
    leave (node, parent, prop, index) {
      let r, e

      const run = (fn: Function) => {
        r = fn.apply(this, [node, parent, prop, index])
        if (r) this.replace(r)
      }

      for (const p of plugins as MacroPlugin[]) {
        if (typeof p !== "object") continue
        if (p.leave) run(p.leave)
        if (node.type in p) {
          e = p[node.type as keyof typeof p]
          if (typeof e === "object" && e.leave) run(e.leave)
        }
      }
    }
  }
}

export function genConstType (name: string, typeAnnotation: TsType) {
  return {
    type: "VariableDeclaration",
    span: {
      start: 163,
      end: 242,
      ctxt: 0
    },
    kind: "const",
    declare: false,
    declarations: [
      {
        type: "VariableDeclarator",
        span: {
          start: 169,
          end: 242,
          ctxt: 0
        },
        id: {
          type: "Identifier",
          span: {
            start: 169,
            end: 172,
            ctxt: 3
          },
          value: name,
          optional: false,
          typeAnnotation: {
            type: "TsTypeAnnotation",
            span: {
              start: 172,
              end: 242,
              ctxt: 0
            },
            typeAnnotation
          }
        },
        definite: false
      }
    ]
  } as VariableDeclaration
}

export function genTypeImport (lib: string, mod: string, kind = "const") {
  return {
    type: "VariableDeclaration",
    span: {
      start: 19,
      end: 73,
      ctxt: 0
    },
    kind,
    declare: false,
    declarations: [
      {
        type: "VariableDeclarator",
        span: {
          start: 23,
          end: 73,
          ctxt: 0
        },
        id: {
          type: "Identifier",
          span: {
            start: 23,
            end: 29,
            ctxt: 2
          },
          value: mod,
          optional: false,
          typeAnnotation: {
            type: "TsTypeAnnotation",
            span: {
              start: 29,
              end: 73,
              ctxt: 0
            },
            typeAnnotation: {
              type: "TsTypeQuery",
              span: {
                start: 31,
                end: 73,
                ctxt: 0
              },
              exprName: {
                type: "TsImportType",
                span: {
                  start: 38,
                  end: 73,
                  ctxt: 0
                },
                argument: {
                  type: "StringLiteral",
                  span: {
                    start: 45,
                    end: 65,
                    ctxt: 0
                  },
                  value: lib,
                },
                qualifier: {
                  type: "Identifier",
                  span: {
                    start: 67,
                    end: 73,
                    ctxt: 2
                  },
                  value: mod,
                  optional: false
                },
              },
            }
          }
        },
        definite: false
      }
    ]
  } as VariableDeclaration
}

export function genTsRef (name: string): TsTypeReference {
  return {
    type: "TsTypeReference",
    span: {
      start: 199,
      end: 205,
      ctxt: 0
    },
    typeName: {
      type: "Identifier",
      span: {
        start: 199,
        end: 205,
        ctxt: 2
      },
      value: name,
      optional: false
    }
  }
}

export function guessType (value: unknown): TsType {
  let t: typeof value = typeof value
  if (t === "function") return defaultGlobalExpr
  if (t === "symbol") return genTsRef("Symbol")
  if (t === "object" && isRegExp(value as object)) return genTsRef("RegExp")
  if (value === null) t = "null"

  return {
    type: "TsKeywordType",
    span: {
      start: 199,
      end: 205,
      ctxt: 0
    },
    kind: t as TsKeywordTypeKind
  }
}

export function genImportSpecifier (name: string, isDefault = false): ImportSpecifier | ImportDefaultSpecifier {
  const local = {
    type: "Identifier",
    value: name,
    span: {
      start: 0,
      end: 0,
      ctxt: 1
    },
    optional: false
  } as Identifier

  if (isDefault) {
    return {
      type: "ImportDefaultSpecifier",
      local,
      span: {
        start: 0,
        end: 0,
        ctxt: 0,
      }
    }
  }
  return {
    type: "ImportSpecifier",
    local,
    span: {
      start: 0,
      end: 0,
      ctxt: 0,
    },
    isTypeOnly: false
  }
}

export function genExportSpecifier (name: string, isNamespace = false): ExportSpecifier | ExportNamespaceSpecifier {
  const orig = {
    type: "Identifier",
    value: name,
    span: {
      start: 0,
      end: 0,
      ctxt: 1
    },
    optional: false
  } as Identifier

  if (isNamespace) {
    return {
      type: "ExportNamespaceSpecifier",
      name: orig,
      span: {
        start: 0,
        end: 0,
        ctxt: 0,
      }
    }
  }
  return {
    type: "ExportSpecifier",
    orig,
    span: {
      start: 0,
      end: 0,
      ctxt: 0,
    },
    isTypeOnly: false
  }
}
