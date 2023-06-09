import { BaseNode, createMacro, dummySpan, markedNode } from "@macro-plugin/core"
import { BinaryExpression, CallExpression, Expression, VariableDeclaration } from "@swc/core"

function getSetter (name: string) {
  return "set" + name[0].toUpperCase() + name.slice(1)
}

const plugin = createMacro({
  LabeledStatement (ast) {
    const stores: Record<string, { value?: BaseNode | Expression, setter: string }> = {}
    if (ast.body.type === "BlockStatement" && ast.label.value === "store") {
      let name
      for (const i of ast.body.stmts) {
        if (i.type === "VariableDeclaration" && i.kind === "var") {
          for (const d of i.declarations) {
            if (d.id.type === "Identifier") {
              name = d.id.value
              stores[name] = { value: d.init, setter: getSetter(name) }
            } else {
              throw new Error("Expect a pure Identifier.")
            }
          }
        } else {
          throw new Error("Expect a `var` kind VariableDeclaration node in store block")
        }
      }

      if (Object.keys(stores).length > 0) {
        this.import("createStore", "solid-js/store")
        return Object.entries(stores).map(([k, v]) => ({
          type: "VariableDeclaration",
          kind: "var",
          declare: false,
          span: dummySpan,
          declarations: [
            {
              type: "VariableDeclarator",
              id: {
                type: "ArrayPattern",
                span: dummySpan,
                optional: false,
                elements: [
                  markedNode("store", {
                    type: "Identifier",
                    value: k,
                    optional: false,
                    span: dummySpan
                  }),
                  markedNode("storeSetter", {
                    type: "Identifier",
                    value: v.setter,
                    optional: false,
                    span: dummySpan
                  })
                ]
              },
              init: {
                type: "CallExpression",
                callee: {
                  type: "Identifier",
                  value: "createStore",
                  optional: false,
                  span: dummySpan
                },
                span: dummySpan,
                arguments: [
                  {
                    expression: v.value
                  }
                ]
              },
              span: dummySpan
            }
          ]
        } as VariableDeclaration))
      }
    }
  },
  AssignmentExpression (ast) {
    if (ast.left.type === "Identifier" && this.track(ast.left.value)?.marker === "store") {
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
                    span: dummySpan,
                    optional: false
                  },
                  arguments: [],
                  span: dummySpan
                },
                operator: ast.operator.replace("=", ""),
                right: ast.right,
                span: dummySpan
              } as BinaryExpression
          }
        ],
        span: dummySpan
      } as CallExpression
    }
  },
  UpdateExpression (ast) {
    if (ast.argument.type === "Identifier" && this.track(ast.argument.value)?.marker === "store") {
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
            expression: ast
          }
        ],
        span: dummySpan
      } as CallExpression
    }
  }
})

export default plugin
