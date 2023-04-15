import { $Argument, $CallExpression, $Identifier, $StringLiteral } from "../src"

import { transform } from "@macro-plugin/core"

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
