import type { BaseNode, GlobalMacro } from "@macro-plugin/core"

const states: Record<string, { value: BaseNode, setter: string }> = {};
let scopeVars: string[][] = [[]];

const allowMacro = (name: string) => {
  if (scopeVars.length == 0) return name in states
  return name in states && !scopeVars[scopeVars.length - 1].includes(name)
}

const enter: GlobalMacro = (ast, handler, parent, prop, index) => {
  // @ts-ignore
  if (ast.type == 'LabeledStatement' && ast.body.type == 'BlockStatement' && ast.label.name == 'state') {
    let name;
    // @ts-ignore
    for (const i of ast.body.body) {
      if (i.type == 'VariableDeclaration' && i.kind == 'var') {
        for (const d of i.declarations) {
          name = d.id.name;
          states[name] = { value: d.init, setter: 'set' + name[0].toUpperCase() + name.slice(1) };
        }
      } else {
        throw new Error('Expect a `var` kind VariableDeclaration node in state block')
      }
    }

    if (Object.keys(states).length > 0) {
      handler.import([{ name: 'createSignal' }], 'solid-js');
      return Object.entries(states).map(([k, v]) => ({
        type: "VariableDeclaration",
        kind: "var",
        declarations: [
          {
            type: 'VariableDeclarator',
            id: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'Identifier',
                  name: k
                },
                {
                  type: 'Identifier',
                  name: v.setter
                }
              ]
            },
            init: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'createSignal'
              },
              arguments: [
                v.value
              ]
            }
          }
        ]
      }))
    }
  } else if (ast.type == 'AssignmentExpression') {
    // @ts-ignore
    if (allowMacro(ast.left.name)) {
      // @ts-ignore
      const name = ast.left.name;
      return {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: states[name].setter
        },
        arguments: [
          // @ts-ignore
          ast.operator == '=' ? ast.right : {
            type: 'BinaryExpression',
            left: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name
              },
              arguments: []
            },
            // @ts-ignore
            operator: ast.operator.replace('=', ''),
            // @ts-ignore
            right: ast.right
          }
        ]
      }
    }
  } else if (ast.type == 'UpdateExpression') {
    // @ts-ignore
    if (allowMacro(ast.argument.name)) {
      // @ts-ignore
      const name = ast.argument.name;
      // @ts-ignore
      ast.argument = {
        type: 'CallExpression',
        // @ts-ignore
        callee: ast.argument,
        arguments: []
      }
      return {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          // @ts-ignore
          name: states[name].setter,
        },
        arguments: [
          ast
        ]
      }
    }
  } else if (ast.type == 'FunctionDeclaration' || ast.type == 'ArrowFunctionExpression') {
    // @ts-ignore
    scopeVars.push(ast.params.map(i => i.type === 'Identifier' ? i.name : i.left.name));
  } else if (ast.type == 'VariableDeclaration') {
    // @ts-ignore
    for (const d of ast.declarations) {
      scopeVars[scopeVars.length - 1].push(d.id.name);
    }
  } else if (ast.type == 'CatchClause') {
    // @ts-ignore
    scopeVars.push(ast.param.name);
  }
}

const leave: GlobalMacro = (ast, handler, parent, key, index) => {
  if (ast.type == 'FunctionDeclaration' || ast.type == 'ArrowFunctionExpression' || ast.type == 'CatchClause') {
    scopeVars.pop();
  }
}

export default { enter, leave }
