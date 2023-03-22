import { CallExpression, ExpressionStatement } from "@swc/core"

import { createLabeledMacro } from "@macro-plugin/core"

export const css = createLabeledMacro("css", function (stmt) {
  if (stmt.type === "ExpressionStatement") {
    const specifier = this.get("QwikScoped", false) ? "useStyleScoped$" : "useStyle$"

    this.import(specifier, "@builder.io/qwik")

    stmt.expression = {
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
          expression: stmt.expression
        }
      ],
    } as CallExpression

    return stmt
  } else {
    throw new Error("this macro only accept an Expression")
  }
})

export const link = createLabeledMacro("link", function (stmt) {
  if (stmt.type !== "ExpressionStatement") return
  let name: string
  let linkCount = this.get("QwikLinkCount", 0)
  const scoped = this.get("QwikScoped", false)
  const specifier = scoped ? "useStyleScoped$" : "useStyles$"
  const links: string[] = []
  if (stmt.expression.type === "StringLiteral") {
    name = "__link" + linkCount
    links.push(name)
    this.import(name, stmt.expression.value, true)
    linkCount += 1
  } else if (stmt.expression.type === "ArrayExpression") {
    for (const i of stmt.expression.elements) {
      if (i?.expression.type === "StringLiteral") {
        name = "__link" + linkCount
        links.push(name)
        this.import(name, i.expression.value, true)
        linkCount += 1
      } else {
        throw new Error("Expect a StringLiteral")
      }
    }
  } else {
    throw new Error("Only support StringLiteral or ArrayExpression")
  }
  this.set("QwikLinkCount", linkCount)
  this.import(specifier, "@builder.io/qwik")
  return links.map(i => ({
    type: "ExpressionStatement",
    span: {
      start: 109,
      end: 119,
      ctxt: 0
    },
    expression: {
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
          expression: {
            type: "Identifier",
            span: {
              start: 113,
              end: 118,
              ctxt: 1
            },
            value: i,
            optional: false
          }
        }
      ],
    }
  } as ExpressionStatement))
})

export const scoped = createLabeledMacro("scoped", {
  enter (stmt) {
    if (stmt.type === "BlockStatement") {
      this.set("QwikScoped", true)
    } else {
      throw new Error("Only accept BlockStatement in scoped macro.")
    }
  },
  leave (stmt) {
    if (stmt.type === "BlockStatement") {
      this.replace(stmt.stmts)
      this.set("QwikScoped", false)
    }
  }
})
