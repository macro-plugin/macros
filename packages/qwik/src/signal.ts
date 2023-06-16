import { MemberExpression, Node, VariableDeclaration } from "@swc/core"
import { createMacro, dummySpan, markedNode } from "@macro-plugin/core"

export const signal = createMacro({
  LabeledStatement (ast) {
    if (ast.body.type !== "BlockStatement" || ast.label.value !== "signal") return

    const signals: Record<string, { value?: Node }> = {}

    let name
    for (const i of ast.body.stmts) {
      if (i.type === "VariableDeclaration" && i.kind === "var") {
        for (const d of i.declarations) {
          if (d.id.type === "Identifier") {
            name = d.id.value
            signals[name] = { value: d.init }
          } else {
            throw new Error("Expect Identifier in signal")
          }
        }
      } else {
        throw new Error("Expect a `var` kind VariableDeclaration node in signal block")
      }
    }

    if (Object.keys(signals).length > 0) {
      this.import("useSignal", "@builder.io/qwik")
      return Object.entries(signals).map(([k, v]) => ({
        type: "VariableDeclaration",
        kind: "const",
        declare: false,
        declarations: [
          {
            type: "VariableDeclarator",
            id: markedNode("qwikSignal", {
              type: "Identifier",
              value: k,
              optional: false,
              span: dummySpan
            }),
            init: {
              type: "CallExpression",
              callee: {
                type: "Identifier",
                value: "useSignal",
                optional: false,
                span: dummySpan
              },
              arguments: [
                {
                  expression: v.value
                }
              ],
              span: dummySpan
            },
            definite: false,
            span: dummySpan
          }
        ],
        span: dummySpan
      } as VariableDeclaration))
    }
  },
  Identifier (ast, parent) {
    if (parent?.type !== "VariableDeclarator" && this.track(ast.value)?.marker === "qwikSignal") {
      this.replace({
        type: "MemberExpression",
        object: ast,
        property: {
          type: "Identifier",
          value: "value",
          optional: false,
          span: dummySpan
        },
        span: dummySpan
      } as MemberExpression)
      this.skip()
    }
  }
})
