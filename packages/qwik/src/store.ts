import { Node, VariableDeclaration } from "@swc/core";
import { createMacro, markedNode } from "@macro-plugin/core";

export const store = createMacro({
  LabeledStatement(ast) {
    if (ast.body.type != 'BlockStatement' || ast.label.value != 'store') return;

    const signals: Record<string, { value?: Node }> = {};

    let name;
    for (const i of ast.body.stmts) {
      if (i.type == 'VariableDeclaration' && i.kind == 'var') {
        for (const d of i.declarations) {
          if (d.id.type == 'Identifier') {
            name = d.id.value;
            signals[name] = { value: d.init };
          } else {
            throw new Error("Expect Identifier in store")
          }
        }
      } else {
        throw new Error('Expect a `var` kind VariableDeclaration node in store block')
      }
    }

    if (Object.keys(signals).length > 0) {
      this.import([{ name: 'useStore' }], '@builder.io/qwik');
      return Object.entries(signals).map(([k, v]) => ({
        type: "VariableDeclaration",
        kind: "const",
        declare: false,
        declarations: [
          {
            type: 'VariableDeclarator',
            id: markedNode('qwikStore', {
              type: 'Identifier',
              value: k,
              optional: false,
              span: {
                start: 0,
                end: 0,
                ctxt: 1
              }
            }),
            init: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                value: 'useStore',
                optional: false,
                span: {
                  start: 0,
                  end: 0,
                  ctxt: 0
                }
              },
              arguments: [
                {
                  expression: v.value
                }
              ],
              span: {
                start: 0,
                end: 0,
                ctxt: 0
              }
            },
            definite: false,
            span: {
              start: 0,
              end: 0,
              ctxt: 0
            }
          }
        ],
        span: {
          start: 0,
          end: 0,
          ctxt: 0
        }
      } as VariableDeclaration))
    }
  },
})
