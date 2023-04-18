import { CallExpression, Expression, Identifier, transformFileSync } from "@swc/core"
import { createExprMacro, createTmplMacro } from "./api"
import { evalAst, evalExpr, hash, span } from "./utils"

import { createSwcPlugin } from "./transform"
import { parse } from "./parse"
import { printExpr } from "./print"
import { readFileSync } from "fs"
import { walk } from "./walk"

export var $Eval = createExprMacro("$Eval", function (args) {
  const t = args[0].type

  if (t === "StringLiteral") return this.parseExpr(evalExpr(args[0].value))
  if (t === "TemplateLiteral") {
    const track = (name: string) => this.track(name)
    walk(args[0], {
      enter (node) {
        if (node.type === "Identifier") {
          const v = track((node as Identifier).value)
          if (v && v.value) this.replace(v.value)
        }
      }
    })

    return this.parseExpr(evalExpr(evalExpr(this.printExpr(args[0]))))
  }

  if (t === "FunctionExpression" || t === "ArrowFunctionExpression") return this.parseExpr(evalExpr(`(${this.printExpr(args[0])})(${args.slice(1).map(i => this.printExpr(i)).join(",")})`))
  return this.parseExpr(evalAst(args[0]).toString())
}, "(<T>(expr: string) => T) & (<T>(expr: T) => T) & (<F extends (...args: any) => any>(expr: F, ...args: Parameters<F>) => ReturnType<F>)")

export const printAst = (ast: object) => JSON.stringify(ast).replace(/("(start|end|ctxt)":\s*)(\d+)/g, "$10")

export var $Ast = createExprMacro("$Ast", function (args) {
  return this.parseExpr(printAst(args[0].type === "StringLiteral" ? this.parseExpr(args[0].value) : args[0]))
}, '<T>(expr: T) => import("@swc/core").Expression')

export var $Env = createExprMacro("$Env", function (args, typeArgs) {
  if (args[0].type !== "StringLiteral") throw new Error("$Env macro only support StringLiteral as input.")
  const value: string = process.env[args[0].value] ?? ""

  if (typeArgs && typeArgs?.[0].type === "TsKeywordType") {
    switch (typeArgs[0].kind) {
      case "boolean":
        return {
          type: "BooleanLiteral",
          value: !!value,
          span
        }
      case "number":
        return {
          type: "NumericLiteral",
          value: +value,
          span
        }
    }
  }

  return {
    type: "StringLiteral",
    span,
    value
  }
}, "<R = string>(key: string) => R")

export var $Stringify = createExprMacro("$Stringify", function (args, typeArgs) {
  return {
    type: "StringLiteral",
    span,
    value: typeArgs && typeArgs.length > 0 ? this.printType(typeArgs[0]) : this.printExpr(args[0])
  }
}, "((expr: any) => string) & (<T>() => string)")

export var $Span = createExprMacro("$Span", function () {
  const currentSpan: [number, number] = this.span()
  return {
    type: "ArrayExpression",
    span,
    elements: [
      {
        expression: {
          type: "NumericLiteral",
          span,
          value: currentSpan[0],
        }
      },
      {
        expression: {
          type: "NumericLiteral",
          span,
          value: currentSpan[1]
        }
      }
    ]
  }
}, "() => [number, number]")

export var $Line = createExprMacro("$Line", function () {
  return {
    type: "NumericLiteral",
    span,
    value: this.src?.slice(0, this.span()[0]).split(/\r\n|\r|\n/).length || 1
  }
}, "() => number")

export var $Column = createExprMacro("$Column", function () {
  return {
    type: "NumericLiteral",
    span,
    value: (this.src?.slice(0, this.span()[0]))?.match(/\n[^\n]*$/)?.[0].length || 1
  }
}, "() => number")

export var $ID = createExprMacro("$ID", function () {
  return {
    type: "StringLiteral",
    span,
    value: hash(`${this.src}${this.span()}`)
  }
}, "() => string")

function throwError (msg: string): CallExpression {
  return {
    type: "CallExpression",
    span,
    callee: {
      type: "ParenthesisExpression",
      span,
      expression: {
        type: "ArrowFunctionExpression",
        span,
        params: [],
        body: {
          type: "BlockStatement",
          span,
          stmts: [
            {
              type: "ThrowStatement",
              span,
              argument: {
                type: "NewExpression",
                span,
                callee: {
                  type: "Identifier",
                  span,
                  value: "Error",
                  optional: false
                },
                arguments: [
                  {
                    expression: {
                      type: "StringLiteral",
                      span,
                      value: msg,
                    }
                  }
                ],
              }
            }
          ]
        },
        async: false,
        generator: false,
      }
    },
    arguments: [],
  }
}

// TODO: add filename and span to log message
export var $UnImplemented = createExprMacro("$UnImplemented", function () {
  // eslint-disable-next-line no-console
  console.error("not implemented")

  return throwError("not implemented")
}, "() => never")

// TODO: add filename and span to log message
export var $Todo = createExprMacro("$Todo", function () {
  // eslint-disable-next-line no-console
  console.warn("not yet implemented")

  this.replace(throwError("not yet implemented"))
}, "() => never")

// TODO: add filename and span to log message
export var $UnReachable = createExprMacro("$UnReachable", function () {
  return throwError("internal error: entered unreachable code")
}, "() => never")

export var $Include = createExprMacro("$Include", function (args) {
  if (args[0]?.type !== "StringLiteral") throw new Error("$Include only accept StringLiteral as input.")

  let moduleType: "es6" | "commonjs" | "umd" | "nodenext" = "commonjs"
  if (args[1]?.type === "StringLiteral" && ["es6", "commonjs", "umd", "nodenext"].includes(args[1].value)) {
    moduleType = args[1].value as "es6" | "commonjs" | "umd" | "nodenext"
  }

  const jsc = { parser: { syntax: "typescript" } } as const
  // TODO: allow plugin access current config
  const plugin = createSwcPlugin({ macros: [], jsc })

  return {
    type: "CallExpression",
    span,
    callee: {
      type: "ParenthesisExpression",
      span,
      expression: {
        type: "ArrowFunctionExpression",
        span,
        params: [],
        body: {
          type: "BlockStatement",
          span,
          stmts: parse(transformFileSync(args[0].value, { jsc, plugin, module: { type: moduleType } }).code).body
        },
        async: false,
        generator: false,
      }
    },
    arguments: [],
  }
}, "(path: string, target?: 'es6' | 'commonjs' | 'umd' | 'nodenext') => void")

export var $IncludeStr = createExprMacro("$IncludeStr", function (args) {
  if (args[0]?.type !== "StringLiteral") throw new Error("$Include only accept StringLiteral as input.")

  return {
    type: "StringLiteral",
    value: readFileSync(args[0].value).toString(),
    span
  }
}, "(path: string) => string")

export const printTmpl = (strings: string[], exprs: Expression[]) => strings.reduce((query, queryPart, i) => {
  const valueExists = i < exprs.length
  const text: string = query + queryPart

  return valueExists ? text + printExpr(exprs[i]).code : text
}, "")

export const printRawTmpl = (strings: string[], exprs: unknown[]) => strings.reduce((query, queryPart, i) => {
  const valueExists = i < exprs.length
  const text = query + queryPart

  return valueExists ? text + exprs[i] : text
}, "")

function walkObject (obj: object | null, onEnter: (k: string, v: unknown, parent: Record<string, any>) => unknown, grand?: Record<string, any>, grandKey?: string) {
  if (obj && typeof obj === "object") {
    const allKeys = Object.keys(obj)
    for (let i = 0; i < allKeys.length; i++) {
      const k = allKeys[i]
      const v = obj[k as keyof typeof obj]

      const r = onEnter(k, v, obj)
      if (r != null && grand) {
        grand[grandKey!] = r
        break
      }

      if (typeof v === "object") {
        walkObject(v, onEnter, obj, k)
      }
    }
  }
  return obj
}

export var $Expr = createTmplMacro("$Expr", function (strings, ...exprs) {
  const exprMarkers: string[] = exprs.map((_, i) => "_macro_marker_" + i + "_")
  const options = { syntax: "typescript", tsx: true } as const
  const ast = this.parseExpr(printRawTmpl(strings, exprMarkers), options)

  walkObject(ast, (k, v, parent) => {
    if (k === "span") {
      parent[k] = span
      return
    }

    if (typeof v === "string") {
      const i = exprMarkers.findIndex((m) => m === v)
      if (i !== -1) return "__macro$$Start__" + this.printExpr(exprs[i]) + "__macro$$End__"
    }
  })

  const expr = JSON.stringify(ast, undefined, 2).replace(/("__macro\$\$Start__)|(__macro\$\$End__")/g, "").replace(/\\"/g, '"')

  return this.parseExpr(expr)
}, "import(\"@swc/core\").Expression")

export var $Quote = createTmplMacro("$Quote", function (strings, ...exprs) {
  const exprMarkers: string[] = exprs.map((_, i) => "_macro_marker_" + i + "_")
  const options = { syntax: "typescript", tsx: true } as const
  const ast = this.parse(printRawTmpl(strings, exprMarkers), options)

  walkObject(ast, (k, v, parent) => {
    if (k === "span") {
      parent[k] = span
      return
    }

    if (typeof v === "string") {
      const i = exprMarkers.findIndex((m) => m === v)
      if (i !== -1) return "__macro$$Start__" + this.printExpr(exprs[i]) + "__macro$$End__"
    }
  })

  const expr = JSON.stringify(ast, undefined, 2).replace(/("__macro\$\$Start__)|(__macro\$\$End__")/g, "").replace(/\\"/g, '"')

  return this.parseExpr(expr)
}, "(import(\"@swc/core\").Expression)[]")
