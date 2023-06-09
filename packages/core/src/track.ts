import type { ArrayPattern, AssignmentPattern, Declaration, Expression, Identifier, ObjectPattern, Pattern } from "@swc/core"
import type { GlobalMacroPlugin, ScopeVar } from "./types"

import { createMacro } from "./api"

export default createMacro({
  enter (ast) {
    const scopeVars = this.get("scopeVars", [[]]) as ScopeVar[][]

    function pushIdentifier (node: Pattern, value: Expression | Declaration | undefined = undefined) {
      if (node.type === "Identifier") {
        // @ts-ignore
        scopeVars[scopeVars.length - 1]?.push({ name: node.value, value, marker: node.marker })
      } else if (node.type === "PrivateName") {
        // @ts-ignore
        scopeVars[scopeVars.length - 1]?.push({ name: node.id.value, value, marker: node.marker, private: true })
      } else {
        throw new Error(`Unhandled type ${node.type}!`)
      }
    }

    function pushObjectPattern (obj: ObjectPattern) {
      for (const el of obj.properties) {
        if (el.type === "AssignmentPatternProperty") {
          pushIdentifier(el.key)
        } else if (el.type === "RestElement") {
          pushIdentifier(el.argument)
        }
      }
    }

    function pushArrayPattern (array: ArrayPattern) {
      for (const el of array.elements) {
        if (!el) continue
        if (el.type === "Identifier") {
          pushIdentifier(el)
        } else if (el.type === "RestElement") {
          pushIdentifier(el.argument)
        } else if (el.type === "ObjectPattern") {
          pushObjectPattern(el)
        } else if (el.type === "ArrayPattern") {
          pushArrayPattern(el)
        }
      }
    }

    function pushAssignPattern (i: AssignmentPattern) {
      if (i.left.type === "Identifier") {
        pushIdentifier(i.left, i.right)
      } else if (i.left.type === "ArrayPattern") {
        pushArrayPattern(i.left)
      } else if (i.left.type === "ObjectPattern") {
        pushObjectPattern(i.left)
      }
    }

    function pushParams (params: Pattern[]) {
      scopeVars.push([])
      for (const p of params) {
        switch (p.type) {
          case "Identifier":
            pushIdentifier(p)
            break
          case "RestElement":
            pushIdentifier(p.argument)
            break
          case "AssignmentPattern":
            pushAssignPattern(p)
            break
        }
      }
    }

    if (ast.type === "FunctionDeclaration") {
      pushIdentifier(ast.identifier, ast)
      pushParams(ast.params.map(i => i.pat))
    } else if (ast.type === "FunctionExpression") {
      pushParams(ast.params.map(i => i.pat))
    } else if (ast.type === "ArrowFunctionExpression") {
      pushParams(ast.params)
    } else if (ast.type === "ClassDeclaration") {
      pushIdentifier(ast.identifier, ast)
    } else if (ast.type === "ClassMethod") {
      pushIdentifier(ast.key as Identifier)
      pushParams(ast.function.params.map(i => i.pat))
    } else if (ast.type === "PrivateMethod") {
      pushIdentifier(ast.key.id)
      pushParams(ast.function.params.map(i => i.pat))
    } else if (ast.type === "VariableDeclaration") {
      for (const d of ast.declarations) {
        if (d.id.type === "Identifier") {
          // var a = v;
          pushIdentifier(d.id, d.init)
        } else if (d.id.type === "ArrayPattern") {
          // var [a, b, ...c] = v;
          pushArrayPattern(d.id)
        } else if (d.id.type === "ObjectPattern") {
          // var {a, b, ...c} = v;
          pushObjectPattern(d.id)
        }
      }
    } else if (ast.type === "CatchClause") {
      scopeVars.push([])
      const param = ast.param
      if (param) {
        if (param.type === "Identifier") {
          pushIdentifier(param)
        } else if (param.type === "ArrayPattern") {
          pushArrayPattern(param)
        } else if (param.type === "ObjectPattern") {
          pushObjectPattern(param)
        }
      }
    } else if (ast.type === "ImportDeclaration") {
      for (const s of ast.specifiers) {
        pushIdentifier(s.local)
      }
    }
  },
  leave (ast) {
    if (["FunctionDeclaration", "FunctionExpression", "ArrowFunctionExpression", "ClassDeclaration", "ClassMethod", "ClassPrivateMethod"].includes(ast.type) || ast.type === "CatchClause") {
      (this.get("scopeVars", [[]]) as ScopeVar[][]).pop()
    }
  }
}) as Required<GlobalMacroPlugin>
