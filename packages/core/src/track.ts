import type { ArrayPattern, ObjectPattern } from "estree";
import type { BaseNode, GlobalMacro, GlobalTrackMacro } from "./types"

const blocks = ['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression', 'ClassDeclaration', 'ClassMethod', 'ClassPrivateMethod'];

const scopeVars: { name: string, private?: boolean, value?: Node }[][] = [[]];

function track (name: string) {
  for (const scope of scopeVars.reverse()) {
    for (const v of scope) {
      if (v.name == name) return v.value;
    }
  }
  return -1;
}

function pushIdentifier(node: BaseNode, value = undefined) {
  if (node.type == 'Identifier') {
    // @ts-ignore
    scopeVars[scopeVars.length - 1].push({ name: node.name, value })
  } else if (node.type == 'PrivateName') {
    // @ts-ignore
    scopeVars[scopeVars.length - 1].push({ name: node.id.name, private: true, value })
  } else {
    throw new Error(`Unhandled type ${node.type}!`)
  }
}

function pushObjectPattern(obj: ObjectPattern) {
  for (const el of obj.properties) {
    // @ts-ignore
    if (el.type == 'ObjectProperty') {
      // @ts-ignore
      pushIdentifier(el.key);
    } else if (el.type == 'RestElement') {
      // @ts-ignore
      pushIdentifier(el.argument);
    }
  }
}

function pushArrayPattern(array: ArrayPattern) {
  for (const el of array.elements) {
    if (!el) continue;
    if (el.type == 'Identifier') {
      pushIdentifier(el);
    } else if (el.type == 'RestElement') {
      // @ts-ignore
      pushIdentifier(el.argument);
    } else if (el.type == 'ObjectPattern') {
      pushObjectPattern(el);
    } else if (el.type == 'ArrayPattern') {
      pushArrayPattern(el);
    }
  }
}

const enter: GlobalMacro = (ast, handler, parent, prop, index) => {
  if (blocks.includes(ast.type)) {
    // @ts-ignore
    if (ast.id) pushIdentifier(ast.id, ast)
    // @ts-ignore
    if (ast.key && ['set', 'get'].includes(ast.kind)) pushIdentifier(ast.key, ast)
    // @ts-ignore
    if (ast.params) {
      // @ts-ignore
      scopeVars.push(ast.params.map(i => i.type === 'Identifier' ? { name: i.name } : { name: i.left.name, value: i.right }));
    }
  } else if (ast.type == 'VariableDeclaration') {
    // @ts-ignore
    for (const d of ast.declarations) {
      if (d.id.type == 'Identifier') {
        // var a = v;
        pushIdentifier(d.id, d.init)
      } else if (d.id.type == 'ArrayPattern') {
        // var [a, b, ...c] = v;
        pushArrayPattern(d.id);
      } else if (d.id.type == 'ObjectPattern') {
        // var {a, b, ...c} = v;
        pushObjectPattern(d.id);
      }
    }
  } else if (ast.type == 'CatchClause') {
    // @ts-ignore
    scopeVars.push([{ name: ast.param.name }]);
  } else if (ast.type == 'ImportDeclaration') {
    // @ts-ignore
    for (const s of ast.specifiers) {
      if (s.imported) {
        pushIdentifier(s.imported)
      } else if (s.local) {
        pushIdentifier(s.local);
      }
    }
  }
}

const leave: GlobalMacro = (ast, handler, parent, key, index) => {
  if (blocks.includes(ast.type) || ast.type == 'CatchClause') {
    scopeVars.pop();
  }
}

export function createTrackPlugin(p: GlobalTrackMacro | { enter: GlobalTrackMacro, leave: GlobalTrackMacro }): { enter: GlobalMacro, leave: GlobalMacro } {
  if (typeof p === 'function') {
    return {
      enter(ast, handler, parent, prop, index) {
        enter(ast, handler, parent, prop, index);
        p(ast, { ...handler, track }, parent, prop, index);
      },
      leave(ast, handler, parent, prop, index) {
        leave(ast, handler, parent, prop, index);
      }
    }
  }

  return {
    enter(ast, handler, parent, prop, index) {
      enter(ast, handler, parent, prop, index);
      p.enter(ast, { ...handler, track }, parent, prop, index);
    },
    leave(ast, handler, parent, prop, index) {
      leave(ast, handler, parent, prop, index);
      p.leave(ast, { ...handler, track }, parent, prop, index);
    }
  }
}

export default createTrackPlugin;
