import { Handler, LabeledMacro, Statement } from "./types";

/**
 * Create a macro plugin that converts `labeled: {}` or `labeled: (...args) => {}` to `$specifier((...args) => {})`,
 * and also `import { $specifier } from $source`
 * @param specifier - the function name
 * @param source - the module path
 * @param allowParams - allow convert the input array to params, default is false.
 * @returns - A labeled macro plugin
 */
export const createLabeledBlock: ((specifier: string, source: string, allowParams?: boolean) => LabeledMacro) = (specifier, source, allowParams = false) => {
  return (ast: Statement, code: string, handler: Handler) => {
    handler.import([{ name: specifier }], source);
    if (ast.type == "BlockStatement") {
      return {
        type: "ExpressionStatement",
        expression: {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: specifier
          },
          arguments: [
            // @ts-ignore
            {
              type: 'ArrowFunctionExpression',
              generator: false,
              async: false,
              params: [],
              body: ast
            }
          ]
        }
      } as unknown as Statement
    } else if (ast.type == "ExpressionStatement" && ast.expression.type == 'ArrowFunctionExpression') {
      return {
        type: "ExpressionStatement",
        expression: {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: specifier
          },
          arguments: [
            ast.expression
          ]
        }
      } as Statement
    } else if (allowParams && ast.type == "ExpressionStatement" && ast.expression.type == 'ArrayExpression') {
      return {
        type: "ExpressionStatement",
        expression: {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: specifier
          },
          // @ts-ignore
          arguments: ast.expression.elements
        }
      } as Statement
    } else {
      throw new Error('this macro only accept a ArrowFunction or BlockStatement' + (allowParams ? ' or an ArrayExpression' : ''))
    }
  }
}
