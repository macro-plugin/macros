import { ArrowFunctionExpression, ExpressionStatement } from "@swc/core";

import { createPlugin } from "@macro-plugin/core";

export const events = createPlugin({
  LabeledStatement(ast) {
    if (!ast.label.value.startsWith('on') || !['BlockStatement', 'ExpressionStatement'].includes(ast.body.type)) return;
    this.import([{ name: 'useOn' }, { name: '$' }], '@builder.io/qwik');

    const expression = ast.body.type == 'BlockStatement' ? {
      "type": "ArrowFunctionExpression",
      "span": {
        "start": 26,
        "end": 87,
        "ctxt": 0
      },
      "params": [],
      body: ast.body,
      "async": false,
      "generator": false,
    } as ArrowFunctionExpression : ast.body.type == 'ExpressionStatement' ? ast.body.expression : null;

    return {
      "type": "ExpressionStatement",
      "span": {
        "start": 0,
        "end": 93,
        "ctxt": 0
      },
      "expression": {
        "type": "CallExpression",
        "span": {
          "start": 0,
          "end": 92,
          "ctxt": 0
        },
        "callee": {
          "type": "Identifier",
          "span": {
            "start": 0,
            "end": 5,
            "ctxt": 1
          },
          "value": "useOn",
          "optional": false
        },
        "arguments": [
          {
            "expression": {
              "type": "StringLiteral",
              "span": {
                "start": 11,
                "end": 18,
                "ctxt": 0
              },
              "value": ast.label.value.slice(2),
              "raw": `'${ast.label.value.slice(2)}'`
            }
          },
          {
            "expression": {
              "type": "CallExpression",
              "span": {
                "start": 24,
                "end": 88,
                "ctxt": 0
              },
              "callee": {
                "type": "Identifier",
                "span": {
                  "start": 24,
                  "end": 25,
                  "ctxt": 1
                },
                "value": "$",
                "optional": false
              },
              "arguments": [
                {
                  expression
                }
              ],
            }
          }
        ],
      }
    } as ExpressionStatement
  }
})
