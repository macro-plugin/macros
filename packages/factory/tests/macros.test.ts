import { $Argument, $CallExpression, $Identifier, $StringLiteral } from "../src"
import { createSwcPlugin, transform } from "@macro-plugin/core"
import { parseSync, transformSync as swcTransform } from "@swc/core"

const spanRegex = /(?<="(start|end)":)\s*\d+/g

test("$Identifier macro transform", () => {
  const code = `
    function id() {
      const a = $Identifier("value")
      const b = $Identifier("value", false)
      const c = $Identifier("value", true)
      const d = "value"
      const e = $Identifier(d, true)
    }
  `

  expect(transform(code, { macros: [$Identifier] }).code).toMatchSnapshot()
})

test("$StringLiteral macro transform", () => {
  const code = `
  const a = $StringLiteral("hello")
  const v = "world"
  const b = $StringLiteral(v)
  `

  expect(transform(code, { macros: [$StringLiteral] }).code).toMatchSnapshot()
})

test("$Argument macro transform", () => {
  const code = `
  const a = $Argument($Identifier("ref"))
  const b = $Argument($Identifier("list"), true)
`

  expect(transform(code, { macros: [$Identifier, $Argument] }).code).toMatchSnapshot()
})

test("$CallExpression macro transform", () => {
  const code = `
  const a = $CallExpression($Identifier("ref"))
  const b = $CallExpression($Identifier("ref"), [
    $Argument($StringLiteral("hello")),
  ])
`

  expect(transform(code, { macros: [$Identifier, $CallExpression, $Argument, $StringLiteral] }).code).toMatchSnapshot()
})

test("ctxt shouldn't rename variable name", () => {
  const code = `
   createMacro({
     MemberExpression(ast) {
      if (ast.object.type === "Identifier") {
        ast.object = $CallExpression($Identifier("$$ptagWrap"), [
          $Argument(ast.object),
        ])
      }
    }
  })
  `
  const plugin = createSwcPlugin({ macros: [$Identifier, $CallExpression, $Argument] })
  const program = plugin(parseSync(code, { syntax: "typescript", tsx: true }))

  expect(swcTransform(program, { jsc: { parser: { syntax: "typescript", tsx: true } } }).code.replace(spanRegex, "0")).toMatchSnapshot()
})

test("ctxt shouldn't rename variable name in multiple block", () => {
  const code = `
    createMacro({
      MemberExpression(ast) {
      if (ast.object.type === "Identifier") {
        ast.object = $CallExpression($Identifier("$$ptagWrap"), [
          $Argument(ast.object),
        ])
      }
    },
    CallExpression(ast) {
      if (ast.callee.type === "Identifier") {
        ast.object = $CallExpression($Identifier("$$ptagWrap"), [
          $Argument(ast.callee),
        ])
      }
    }
  })
  `
  const plugin = createSwcPlugin({ macros: [$Identifier, $CallExpression, $Argument] })
  const program = plugin(parseSync(code, { syntax: "typescript", tsx: true }))

  expect(swcTransform(program, { jsc: { parser: { syntax: "typescript", tsx: true } } }).code.replace(spanRegex, "0")).toMatchSnapshot()
})
