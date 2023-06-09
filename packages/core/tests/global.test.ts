import { createMacro, dummySpan, transform } from "../src"

import type { VariableDeclaration } from "@swc/core"

const arrow = createMacro({
  FunctionDeclaration (ast) {
    const children = []
    let isArrow = false

    if (!ast.body) return

    for (const s of ast.body.stmts || []) {
      if (s.type === "LabeledStatement" && s.body.type === "ExpressionStatement") {
        const expr = s.body.expression
        if (s.label.value === "arrow") {
          if (expr.type === "BooleanLiteral" && expr.value) {
            isArrow = true
          }
          continue
        }
      }
      children.push(s)
    }

    ast.body.stmts = children

    if (isArrow) {
      return {
        type: "VariableDeclaration",
        kind: "const",
        declare: false,
        span: dummySpan,
        declarations: [
          {
            type: "VariableDeclarator",
            id: ast.identifier,
            init: {
              type: "ArrowFunctionExpression",
              generator: false,
              async: false,
              params: [],
              body: ast.body,
              span: dummySpan
            },
            definite: false,
            span: dummySpan
          }
        ]
      } as VariableDeclaration
    }
  }
})

const inject = createMacro(function () {
  this.import("test", "test", true)
  this.import("ref", "vue")
  this.import("style.css")
  this.export("ref", "vue")
  this.export("all", undefined, true)
})

test("transform function block", () => {
  const code = `
    function add(a, b) {
      arrow: true
      return a + b
    }
  `

  const code2 = `
    function add(a, b) {
      arrow: false
      return a + b
    }
  `
  expect(transform(code, { macros: [arrow] }).code).toMatchSnapshot()
  expect(transform(code2, { macros: [arrow] }).code).toMatchSnapshot()
})

test("inject imports and exports", () => {
  const code = `
  function myComponent() {
    const count = ref(0);
  }
  `

  expect(transform(code, {
    macros: [inject],
    jsc: {
      parser: {
        syntax: "typescript",
      },
    },
  }).code).toMatchSnapshot()
})
