import { $Ast, $Eval, transform } from "../src"

test("$Eval macro", () => {
  expect(transform("$Eval(1 + 2 / 10)", { plugins: [$Eval] }).code).toEqual("1.2;\n")
  expect(transform("$Eval('1 + 3')", { plugins: [$Eval] }).code).toEqual("4;\n")
  // eslint-disable-next-line no-template-curly-in-string
  expect(transform("let a = 3; let b = 4; $Eval(`${a} + ${b}`)", { plugins: [$Eval] }).code).toEqual("let a = 3;\nlet b = 4;\n7;\n")
  expect(transform("$Eval((a, b) => { return a + b }, 1, 2)", { plugins: [$Eval] }).code).toEqual("3;\n")
})

test("$Ast macro", () => {
  expect(transform("$Ast('hello')", { plugins: [$Ast] }).code).toMatchSnapshot()
})
