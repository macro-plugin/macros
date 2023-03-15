import { Handler } from "@macro-plugin/core";
import { Statement } from "estree";

const varToReturn = (body: Statement[]) => {
  let ident;
  body = body.map(i => {
    if (i.type == "VariableDeclaration" && i.kind == 'var') {
      ident = i.declarations[0].id;
      return {
        type: 'ReturnStatement',
        argument: i.declarations[0].init
      }
    }
    return i
  })

  return [ident, body]
}

export const resource = (ast: Statement, code: string, handler: Handler) => {
  handler.import([{ name: 'useResource$' }], '@builder.io/qwik');
  if (ast.type == "BlockStatement") {
    const [id, body] = varToReturn(ast.body);

    return {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id,
          init: {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: 'useResource$'
            },
            arguments: [
              // @ts-ignore
              {
                type: 'ArrowFunctionExpression',
                generator: false,
                async: false,
                params: [],
                body: {
                  type: 'BlockStatement',
                  body
                }
              }
            ]
          }
        }
      ],
      kind: "const"
    } as unknown as Statement
  } else if (ast.type == "ExpressionStatement" && ast.expression.type == 'ArrowFunctionExpression') {
    let id, body;

    if (ast.expression.body.type == 'BlockStatement') {
      [id, body] = varToReturn(ast.expression.body.body);
      ast.expression.body.body = body!;
    } else {
      throw new Error('expect an arrow block inside resource.')
    }

    return {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id,
          init: {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: 'useResource$'
            },
            arguments: [
              ast.expression
            ]
          }
        }
      ],
      kind: "const"
    } as unknown as Statement
  } else {
    throw new Error('this macro only accept a ArrowFunction or BlockStatement')
  }
}
