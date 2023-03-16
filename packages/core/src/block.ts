import { ArrowFunctionExpression, ExpressionStatement } from "@swc/core";
import { Handler, LabeledMacro } from "./types";

/**
 * Create a macro plugin that converts `labeled: {}` or `labeled: (...args) => {}` to `$specifier((...args) => {})`,
 * and also `import { $specifier } from $source`
 * @param specifier - the function name
 * @param source - the module path
 * @param allowParams - allow convert the input array to params, default is false.
 * @returns - A labeled macro plugin
 */
export const createLabeledBlock: ((specifier: string, source: string, allowParams?: boolean) => LabeledMacro) = (specifier, source, allowParams = false) => {
  return (ast, code: string, handler: Handler) => {
    handler.import([{ name: specifier }], source);
    if (ast.type == "BlockStatement") {
      return {
        type: "ExpressionStatement",
        expression: {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            value: specifier,
            span: {
              start: 0,
              end: 0,
              ctxt: 0
            }
          },
          arguments: [
            {
              "expression": {
                type: 'ArrowFunctionExpression',
                generator: false,
                async: false,
                params: [],
                body: ast,
                span: {
                  start: 0,
                  end: 0,
                  ctxt: 0
                }
              } as ArrowFunctionExpression
            }
          ],
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
      } as ExpressionStatement
    } else if (ast.type == "ExpressionStatement" && ast.expression.type == 'ArrowFunctionExpression') {
      return {
        type: "ExpressionStatement",
        expression: {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            value: specifier,
            span: {
              start: 0,
              end: 0,
              ctxt: 0
            }
          },
          arguments: [
            {
              expression: ast.expression
            }
          ],
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
      } as ExpressionStatement
    } else if (allowParams && ast.type == "ExpressionStatement" && ast.expression.type == 'ArrayExpression') {
      return {
        type: "ExpressionStatement",
        expression: {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            value: specifier,
            span: {
              start: 0,
              end: 0,
              ctxt: 0
            }
          },
          arguments: ast.expression.elements,
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
      } as ExpressionStatement
    } else {
      throw new Error('this macro only accept a ArrowFunction or BlockStatement' + (allowParams ? ' or an ArrayExpression' : ''))
    }
  }
}
