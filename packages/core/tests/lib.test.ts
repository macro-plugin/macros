import { $Ast, $Eval, $Expr, $Quote, $Stringify, transform } from "../src"

test("$Eval macro", () => {
  expect(transform("$Eval(1 + 2 / 10)", { macros: [$Eval] }).code).toEqual("1.2;\n")
  expect(transform("$Eval('1 + 3')", { macros: [$Eval] }).code).toEqual("4;\n")
  // eslint-disable-next-line no-template-curly-in-string
  expect(transform("let a = 3; let b = 4; $Eval(`${a} + ${b}`)", { macros: [$Eval] }).code).toEqual("let a = 3;\nlet b = 4;\n7;\n")
  expect(transform("$Eval((a, b) => { return a + b }, 1, 2)", { macros: [$Eval] }).code).toEqual("3;\n")
})

test("$Ast macro", () => {
  expect(transform(`
  const i = $Ast(abc)
  const d = $Ast('abc')
  const a = $Ast("'hello'")
  const b = $Ast(1 + 2)
  const c = $Ast('a * 3')
  `, { macros: [$Ast] }).code).toMatchSnapshot()
})

test("$Quote macro", () => {
  const r = transform(`
  const someNumber = $Ast(5)
  const someIdent = $Ast('hello')
  const someExpr = $Expr\`3 + \${someNumber}\`
  const tokens = $Quote\`
    let \${someIdent} = \${someExpr}
  \`
  `, { macros: [$Ast, $Expr, $Quote], emitDts: true, jsc: { parser: { syntax: "typescript", tsx: true } } })
  expect(r.dts).toMatchSnapshot()
  expect(r.code).toMatchSnapshot()
})

test("$Stringify macro", () => {
  expect(transform(`
  const a = $Stringify(abc)
  const b = $Stringify('abc')
  const c = $Stringify(1 + 2)
  const d = $Stringify(hello(1, 2))
  `, { macros: [$Stringify] }).code).toMatchSnapshot()
})
