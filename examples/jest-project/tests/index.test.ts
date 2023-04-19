import { add, binaryAst } from "../src"

test("add", () => {
  expect(add(1, 4)).toBe(5)
})

test("eval macro", () => {
  expect($Eval(3 * 12 - 2)).toBe(34)
  expect($Eval("1 + 2")).toBe(3)
})

test("ast macro", () => {
  expect(binaryAst()).toMatchSnapshot()
  expect($Ast([])).toMatchSnapshot()
  expect($Ast((3).toFixed())).toMatchSnapshot()
})
