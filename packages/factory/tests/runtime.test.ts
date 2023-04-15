import { $Argument, $CallExpression, $Identifier, $StringLiteral } from "../src"

test("$Identifier macro call", () => {
  const id = $Identifier("value")

  expect(id.optional).toBe(false)
  expect(id.type).toBe("Identifier")
})

test("$StringLiteral macro call", () => {
  const str = $StringLiteral("hello")
  expect(str.value).toBe("hello")
  expect(str.raw).toBeUndefined()
})

test("$Argument macro call", () => {
  const a = $Argument($Identifier("ref"))

  expect(a).toMatchSnapshot()
})

test("$CallExpression macro call", () => {
  const a = $CallExpression($Identifier("ref"))
  const b = $CallExpression($Identifier("ref"), [
    $Argument($StringLiteral("hello")),
  ])

  expect(a).toMatchSnapshot()
  expect(b).toMatchSnapshot()
})
