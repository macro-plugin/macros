import { GlobalMacro, markedNode } from "@macro-plugin/core";
import { MemberExpression, Node, VariableDeclaration } from "@swc/core";

const plugin: GlobalMacro = (ast, handler, parent, prop, index) => {
  const signals: Record<string, { value?: Node }> = {};

  if (ast.type == 'LabeledStatement' && ast.body.type == 'BlockStatement' && ast.label.value == 'signal') {
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
      handler.import([{ name: 'useSignal' }], '@builder.io/qwik');
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
  } else if (ast.type == 'Identifier' && parent?.type != 'VariableDeclarator' && handler.track(ast.value)?.marker == 'qwikSignal') {
    handler.replace({
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
    handler.skip();
  }
}

export default plugin;
