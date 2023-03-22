import { CallExpression } from "@swc/core"
import { MacroPlugin } from "./types"
import { createMacro } from "./api"

export const createLabeledExpr: ((label: string, specifier: string, source: string) => MacroPlugin) = (label, specifier, source) => {
  return createMacro({
    LabeledStatement (ast) {
      if (ast.label.value != label) return
      if (ast.body.type == "ExpressionStatement") {
        this.import([{ name: specifier }], source)

        ast.body.expression = {
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
              expression: ast.body.expression
            }
          ],
        } as CallExpression

        return ast.body
      } else {
        throw new Error("this macro only accept an Expression")
      }
    }
  })
}
