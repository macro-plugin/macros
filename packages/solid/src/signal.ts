import { BaseNode, createMacro, dummySpan, markedNode } from "@macro-plugin/core"
import { BinaryExpression, CallExpression, Expression, VariableDeclaration } from "@swc/core"

function getSetter (name: string) {
  return "set" + name[0].toUpperCase() + name.slice(1)
}

export default createMacro({
  LabeledStatement (ast) {
    if (ast.body.type !== "BlockStatement" || ast.label.value !== "signal") return

    const signals: Record<string, { value?: BaseNode | Expression, setter: string }> = {}

    let name
    for (const i of ast.body.stmts) {
      if (i.type === "VariableDeclaration" && i.kind === "var") {
        for (const d of i.declarations) {
          if (d.id.type === "Identifier") {
            name = d.id.value
            signals[name] = { value: d.init, setter: getSetter(name) }
          } else {
            throw new Error("Expect pure identifier")
          }
        }
      } else {
        throw new Error("Expect a `var` kind VariableDeclaration node in signal block")
      }
    }

    if (Object.keys(signals).length > 0) {
      this.import("createSignal", "solid-js")
      return Object.entries(signals).map(([k, v]) => ({
        type: "VariableDeclaration",
        kind: "var",
        declare: false,
        span: dummySpan,
        declarations: [
          {
            type: "VariableDeclarator",
            definite: false,
            span: dummySpan,
            id: {
              type: "ArrayPattern",
              optional: false,
              span: dummySpan,
              elements: [
                markedNode("signal", {
                  type: "Identifier",
                  value: k,
                  optional: false,
                  span: dummySpan
                }),
                markedNode("signalSetter", {
                  type: "Identifier",
                  value: v.setter,
                  optional: false,
                  span: dummySpan
                }),
              ]
            },
            init: {
              type: "CallExpression",
              callee: {
                type: "Identifier",
                value: "createSignal",
                optional: false,
                span: dummySpan
              },
              span: dummySpan,
              arguments: [
                {
                  expression: v.value
                }
              ]
            }
          }
        ]
      } as VariableDeclaration))
    }
  },
  AssignmentExpression (ast) {
    if (ast.left.type === "Identifier" && this.track(ast.left.value)?.marker === "signal") {
      const name = ast.left.value
      return {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          value: getSetter(name),
          optional: false,
          span: dummySpan
        },
        arguments: [
          {
            expression: ast.operator === "="
              ? ast.right
              : {
                type: "BinaryExpression",
                left: {
                  type: "CallExpression",
                  callee: {
                    type: "Identifier",
                    value: name,
                    optional: false,
                    span: dummySpan
                  },
                  arguments: [],
                  span: dummySpan
                } as CallExpression,
                operator: ast.operator.replace("=", ""),
                span: dummySpan,
                right: ast.right,
              } as BinaryExpression
          }
        ],
        span: dummySpan
      } as CallExpression
    }
  },
  UpdateExpression (ast) {
    if (ast.argument.type === "Identifier" && this.track(ast.argument.value)?.marker === "signal") {
      const name = ast.argument.value
      ast.argument = {
        type: "CallExpression",
        callee: ast.argument,
        arguments: [],
        span: dummySpan
      } as CallExpression
      return {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          value: getSetter(name),
          optional: false,
          span: dummySpan
        },
        arguments: [
          {
            expression: ast,
          }
        ],
        span: dummySpan
      } as CallExpression
    }
  }
})
