import { ArrowFunctionExpression, ExpressionStatement } from "@swc/core";

import { MacroPlugin } from "./types";
import { createMacro } from "./api";

/**
 * Create a macro plugin that converts `labeled: {}` or `labeled: (...args) => {}` to `$specifier((...args) => {})`,
 * and also `import { $specifier } from $source`
 * @param specifier - the function name
 * @param source - the module path
 * @param allowParams - allow convert the input array to params, default is false.
 * @returns - A labeled macro plugin
 */
export const createLabeledBlock: ((label: string, specifier: string, source: string, allowParams?: boolean) => MacroPlugin) = (label, specifier, source, allowParams = false) => {
  return createMacro({
    LabeledStatement(ast) {
      if (ast.label.value != label) return;
      this.import([{ name: specifier }], source);
      if (ast.body.type == "BlockStatement") {
        return ({
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
                  body: ast.body,
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
        }) as ExpressionStatement
      } else if (ast.body.type == "ExpressionStatement" && ast.body.expression.type == 'ArrowFunctionExpression') {
        return ({
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
                expression: ast.body.expression
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
        }) as ExpressionStatement
      } else if (allowParams && ast.body.type == "ExpressionStatement" && ast.body.expression.type == 'ArrayExpression') {
        return ({
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
            arguments: ast.body.expression.elements,
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
        }) as ExpressionStatement
      } else {
        throw new Error('this macro only accept a ArrowFunction or BlockStatement' + (allowParams ? ' or an ArrayExpression' : ''))
      }
    }
  })
}
