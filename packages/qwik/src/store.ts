import { Node, VariableDeclaration } from "@swc/core"
import { createLabeledMacro, dummySpan, markedNode } from "@macro-plugin/core"

export const store = createLabeledMacro("store", function (stmt) {
  if (stmt.type !== "BlockStatement") return

  const signals: Record<string, { value?: Node }> = {}

  let name
  for (const i of stmt.stmts) {
    if (i.type === "VariableDeclaration" && i.kind === "var") {
      for (const d of i.declarations) {
        if (d.id.type === "Identifier") {
          name = d.id.value
          signals[name] = { value: d.init }
        } else {
          throw new Error("Expect Identifier in store")
        }
      }
    } else {
      throw new Error("Expect a `var` kind VariableDeclaration node in store block")
    }
  }

  if (Object.keys(signals).length > 0) {
    this.import("useStore", "@builder.io/qwik")
    return Object.entries(signals).map(([k, v]) => ({
      type: "VariableDeclaration",
      kind: "const",
      declare: false,
      declarations: [
        {
          type: "VariableDeclarator",
          id: markedNode("qwikStore", {
            type: "Identifier",
            value: k,
            optional: false,
            span: dummySpan
          }),
          init: {
            type: "CallExpression",
            callee: {
              type: "Identifier",
              value: "useStore",
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
})
