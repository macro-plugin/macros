import { createLit, evalAst, evalExpr } from "./utils"

import { Identifier } from "@swc/core"
import { createExprMacro } from "./api"
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

export var $Ast = createExprMacro("$Ast", function (args) {
  return {
    type: "ObjectExpression",
    span: {
      start: 0,
      end: 0,
      ctxt: 0
    },
    properties: Object.entries(args[0]).map(([k, v]) => ({
      type: "KeyValueProperty",
      key: {
        type: "Identifier",
        span: {
          start: 0,
          end: 0,
          ctxt: 0
        },
        value: k,
        optional: false
      },
      value: createLit.apply(this, [k === "span" ? { start: 0, end: 0, ctxt: 0 } : v])
    }))
  }
}, '(expr: string) => import("@swc/core").Expression')
