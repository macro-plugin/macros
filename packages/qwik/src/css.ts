import { CallExpression, ExpressionStatement } from "@swc/core";

import { createMacro } from "@macro-plugin/core";

export const css = createMacro({
  LabeledStatement(ast) {
    if (ast.label.value != 'css') return;
    if (ast.body.type == "ExpressionStatement") {
      const specifier = this.get('QwikScoped', false) ? 'useStyleScoped$' : 'useStyle$';

      this.import([{ name: specifier }], '@builder.io/qwik');

      ast.body.expression = {
        "type": "CallExpression",
        "span": {
          "start": 109,
          "end": 119,
          "ctxt": 0
        },
        "callee": {
          "type": "Identifier",
          "span": {
            "start": 109,
            "end": 112,
            "ctxt": 1
          },
          "value": specifier,
          "optional": false
        },
        "arguments": [
          {
            "expression": ast.body.expression
          }
        ],
      } as CallExpression

      return ast.body
    } else {
      throw new Error('this macro only accept an Expression')
    }
  }
})

export const link = createMacro({
  LabeledStatement(ast) {
    if (ast.label.value != 'link') return;
    if (ast.body.type != 'ExpressionStatement') return;
    let name: string;
    let linkCount = this.get('QwikLinkCount', 0);
    const scoped = this.get('QwikScoped', false);
    const specifier = scoped ? "useStyleScoped$" : "useStyles$";
    const links: string[] = [];
    if (ast.body.expression.type == 'StringLiteral') {
      name = '__link' + linkCount;
      links.push(name);
      this.import([{ name, kind: 'default' }], ast.body.expression.value);
      linkCount += 1;
    } else if (ast.body.expression.type == 'ArrayExpression') {
      for (const i of ast.body.expression.elements) {
        if (i?.expression.type == 'StringLiteral') {
          name = '__link' + linkCount
          links.push(name);
          this.import([{ name, kind: 'default' }], i.expression.value);
          linkCount += 1;
        } else {
          throw new Error("Expect a StringLiteral")
        }
      }
    } else {
      throw new Error("Only support StringLiteral or ArrayExpression")
    }
    this.set('QwikLinkCount', linkCount);
    this.import([{ name: specifier }], "@builder.io/qwik")
    return links.map(i => ({
      "type": "ExpressionStatement",
      "span": {
        "start": 109,
        "end": 119,
        "ctxt": 0
      },
      "expression": {
        "type": "CallExpression",
        "span": {
          "start": 109,
          "end": 119,
          "ctxt": 0
        },
        "callee": {
          "type": "Identifier",
          "span": {
            "start": 109,
            "end": 112,
            "ctxt": 1
          },
          "value": specifier,
          "optional": false
        },
        "arguments": [
          {
            "expression": {
              "type": "Identifier",
              "span": {
                "start": 113,
                "end": 118,
                "ctxt": 1
              },
              "value": i,
              "optional": false
            }
          }
        ],
      }
    } as ExpressionStatement))
  }
})

export const scoped = createMacro({
  LabeledStatement: {
    enter(ast) {
      if (ast.label.value != 'scoped') return;
      if (ast.body.type == 'BlockStatement') {
        this.set('QwikScoped', true);
      } else {
        throw new Error("Only accept BlockStatement in scoped macro.")
      }
    },
    leave(ast) {
      if (ast.label.value != 'scoped') return;
      if (ast.body.type == 'BlockStatement') {
        this.replace(ast.body.stmts);
        this.set('QwikScoped', false);
      }
    }
  }
})
