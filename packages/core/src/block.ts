import { Handler, Statement } from "./types";

/**
 * Create a macro plugin that converts `labeled: {}` or `labeled: (...args) => {}` to `$specifier((...args) => {})`,
 * and also `import { $specifier } from $source`
 * @param specifier - the function name
 * @param source - the module path
 * @returns - A labeled macro plugin
 */
export const createLabeledBlock = (specifier: string, source: string) => {
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
      }
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
      }

    } else {
      throw new Error('this macro only accept a ArrowFunction or BlockStatement')
    }
  }
}
