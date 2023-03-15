import { Handler, LabeledMacro, Statement } from "./types";

/**
 * Create a macro plugin that converts `labeled: {}` or `labeled: (...args) => {}` to `$specifier((...args) => {})`,
 * and also `import { $specifier } from $source`
 * @param specifier - the function name
 * @param source - the module path
 * @param allowParams - allow convert the input array to params, default is false.
 * @returns - A labeled macro plugin
 */
export const createLabeledBool: ((id: string) => LabeledMacro) = (id) => {
  return (ast: Statement, code: string, handler: Handler) => {
    // @ts-ignore
    if (ast.type === 'ExpressionStatement' && ast.expression.type == 'BooleanLiteral') {
      // @ts-ignore
      handler.set(id, ast.expression.value);
      return { type: "EmptyStatement" }
    } else {
      throw new Error('this macro only accept a Boolean Literal')
    }
  }
}
