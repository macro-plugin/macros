import { MemberExpression, Node, VariableDeclaration } from "@swc/core";
import { createPlugin, markedNode } from "@macro-plugin/core";

const plugin = createPlugin({
  LabeledStatement(ast) {
    if (ast.body.type != 'BlockStatement' || ast.label.value != 'signal') return;

    const signals: Record<string, { value?: Node }> = {};

    let name;
    for (const i of ast.body.stmts) {
      if (i.type == 'VariableDeclaration' && i.kind == 'var') {
        for (const d of i.declarations) {
          if (d.id.type == 'Identifier') {
            name = d.id.value;
            signals[name] = { value: d.init };
          } else {
            throw new Error("Expect Identifier in signal")
          }
        }
      } else {
        throw new Error('Expect a `var` kind VariableDeclaration node in signal block')
      }
    }

    if (Object.keys(signals).length > 0) {
      this.import([{ name: 'useSignal' }], '@builder.io/qwik');
      return Object.entries(signals).map(([k, v]) => ({
        type: "VariableDeclaration",
        kind: "const",
        declare: false,
        declarations: [
          {
            type: 'VariableDeclarator',
            id: markedNode('qwikSignal', {
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
                value: 'useSignal',
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
  Identifier(ast, parent) {
    if (parent?.type != 'VariableDeclarator' && this.track(ast.value)?.marker == 'qwikSignal') {
      this.replace({
        type: 'MemberExpression',
        object: ast,
        property: {
          type: "Identifier",
          value: "value",
          optional: false,
          span: {
            start: 0,
            end: 0,
            ctxt: 0
          }
        },
        span: {
          start: 0,
          end: 0,
          ctxt: 0
        }
      } as MemberExpression);
      this.skip();
    }
  }
})

export default plugin;
