import { Identifier, Statement, VariableDeclaration } from "@swc/core";

import { createPlugin } from "@macro-plugin/core";

const varToReturn = (body: Statement[]) => {
  let ident: Identifier | undefined;
  body = body.map(i => {
    if (i.type == "VariableDeclaration" && i.kind == 'var') {
      if (i.declarations[0].id.type == 'Identifier') {
        ident = i.declarations[0].id;
      } else {
        throw new Error('Expect an Identifier')
      }
      return {
        type: 'ReturnStatement',
        argument: i.declarations[0].init,
        span: {
          start: 0,
          end: 0,
          ctxt: 0
        }
      }
    }
    return i
  })

  return [ident, body] as [Identifier, Statement[]]
}

export const resource = createPlugin(function (ast) {
  if (ast.type != 'LabeledStatement' || ast.label.value != 'resource') return;

  this.import([{ name: 'useResource$' }], '@builder.io/qwik');
  if (ast.body.type == "BlockStatement") {
    const [id, stmts] = varToReturn(ast.body.stmts);

    return {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          definite: false,
          span: {
            start: 0,
            end: 0,
            ctxt: 0
          },
          id,
          init: {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              optional: false,
              value: 'useResource$',
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
            },
            arguments: [
              {
                expression: {
                  type: 'ArrowFunctionExpression',
                  generator: false,
                  async: false,
                  params: [],
                  span: {
                    start: 0,
                    end: 0,
                    ctxt: 0
                  },
                  body: {
                    type: 'BlockStatement',
                    stmts,
                    span: {
                      start: 0,
                      end: 0,
                      ctxt: 0
                    },
                  }
                }
              }
            ]
          }
        }
      ],
      span: {
        start: 0,
        end: 0,
        ctxt: 0
      },
      declare: false,
      kind: "const"
    } as VariableDeclaration
  } else if (ast.body.type == "ExpressionStatement" && ast.body.expression.type == 'ArrowFunctionExpression') {
    let id, stmts;

    if (ast.body.expression.body.type == 'BlockStatement') {
      [id, stmts] = varToReturn(ast.body.expression.body.stmts);
      ast.body.expression.body.stmts = stmts;
    } else {
      throw new Error('expect an arrow block inside resource.')
    }

    return {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          definite: false,
          span: {
            start: 0,
            end: 0,
            ctxt: 0
          },
          id,
          init: {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              value: 'useResource$',
              span: {
                start: 0,
                end: 0,
                ctxt: 0
              },
              optional: false
            },
            arguments: [
              {
                expression: ast.body.expression
              }
            ],
            span: {
              start: 0,
              end: 0,
              ctxt: 0
            },
          }
        }
      ],
      kind: "const",
      span: {
        start: 0,
        end: 0,
        ctxt: 0
      },
      declare: false,
    } as VariableDeclaration
  } else {
    throw new Error('this macro only accept a ArrowFunction or BlockStatement')
  }
})
