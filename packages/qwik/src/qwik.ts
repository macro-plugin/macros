import { ArrowFunctionExpression, CallExpression, FunctionDeclaration, FunctionExpression, LabeledStatement, VariableDeclaration } from "@swc/core"
import { WalkContext, createMacro } from "@macro-plugin/core"

function handleFunc (this: WalkContext, ast: FunctionDeclaration | FunctionExpression | ArrowFunctionExpression) {
  let label
  if (!ast.body || ast.body.type !== "BlockStatement") return
  for (let i = 0; i < ast.body.stmts.length; i++) {
    if (ast.body.stmts[i].type === "LabeledStatement") {
      label = ast.body.stmts[i] as LabeledStatement
      if (label.label.value === "qwik") {
        if (label.body.type === "ExpressionStatement" && label.body.expression.type === "BooleanLiteral") {
          ast.body.stmts = ast.body.stmts.filter((_, index) => index !== i)
          const isDecl = "identifier" in ast && ast.identifier != null

          if (label.body.expression.value) {
            this.import([{ name: "component$" }], "@builder.io/qwik")

            const init = {
              type: "CallExpression",
              span: {
                start: 55,
                end: 79,
                ctxt: 0
              },
              callee: {
                type: "Identifier",
                span: {
                  start: 55,
                  end: 65,
                  ctxt: 2
                },
                value: "component$",
                optional: false
              },
              arguments: [
                {
                  expression: isDecl
                    ? {
                      type: "ArrowFunctionExpression",
                      span: {
                        start: 66,
                        end: 78,
                        ctxt: 0
                      },
                      params: ast.params.map(i => i.pat),
                      body: ast.body,
                      async: false,
                      generator: false,
                    }
                    : ast
                }
              ],
            } as CallExpression

            if (!isDecl) return init

            return {
              type: "VariableDeclaration",
              span: {
                start: 43,
                end: 80,
                ctxt: 0
              },
              kind: "const",
              declare: false,
              declarations: [
                {
                  type: "VariableDeclarator",
                  span: {
                    start: 49,
                    end: 79,
                    ctxt: 0
                  },
                  id: ast.identifier,
                  init,
                  definite: false
                }
              ]
            } as VariableDeclaration
          }
        } else {
          throw new Error("Expect an boolean in qwik macro.")
        }
      }
    }
  }
}

export const qwik = createMacro({
  FunctionDeclaration (ast) {
    return handleFunc.apply(this, [ast])
  },
  FunctionExpression (ast) {
    return handleFunc.apply(this, [ast])
  },
  ArrowFunctionExpression (ast) {
    return handleFunc.apply(this, [ast])
  }
})
