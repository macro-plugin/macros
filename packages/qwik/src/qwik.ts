import { LabeledStatement } from "@swc/core";
import { createPlugin } from "@macro-plugin/core";

export const qwik = createPlugin({
  FunctionDeclaration(ast) {
    if (!ast.body) return;
    let label;
    for (let i = 0; i < ast.body.stmts.length; i ++) {
      if (ast.body.stmts[i].type == 'LabeledStatement') {
        label = ast.body.stmts[i] as LabeledStatement;
        if (label.label.value == 'qwik') {
          this.import([{ name: 'component$' }], '@builder.io/qwik');
          if (label.body.type == 'ExpressionStatement' && label.body.expression.type == 'BooleanLiteral') {
            ast.body.stmts = ast.body.stmts.filter((_, index) => index != i);

            if (label.body.expression.value) {
              return {
                "type": "VariableDeclaration",
                "span": {
                  "start": 43,
                  "end": 80,
                  "ctxt": 0
                },
                "kind": "const",
                "declare": false,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "span": {
                      "start": 49,
                      "end": 79,
                      "ctxt": 0
                    },
                    "id": ast.identifier,
                    "init": {
                      "type": "CallExpression",
                      "span": {
                        "start": 55,
                        "end": 79,
                        "ctxt": 0
                      },
                      "callee": {
                        "type": "Identifier",
                        "span": {
                          "start": 55,
                          "end": 65,
                          "ctxt": 2
                        },
                        "value": "component$",
                        "optional": false
                      },
                      "arguments": [
                        {
                          "expression": {
                            "type": "ArrowFunctionExpression",
                            "span": {
                              "start": 66,
                              "end": 78,
                              "ctxt": 0
                            },
                            "params": ast.params.map(i => i.pat),
                            "body": ast.body,
                            "async": false,
                            "generator": false,
                          }
                        }
                      ],
                    },
                    "definite": false
                  }
                ]
              }
            }
          } else {
            throw new Error("Expect an boolean in qwik macro.")
          }
        }
      }
    }
  }
})
