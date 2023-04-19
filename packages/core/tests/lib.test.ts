import { $Ast, $Column, $Concat, $Env, $Eval, $Expr, $ID, $Include, $IncludeJSON, $Line, $Quote, $Span, $Stringify, transform } from "../src"

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
  const e = $Stringify<number | string>()
  `, { macros: [$Stringify], jsc: { parser: { syntax: "typescript" } } }).code).toMatchSnapshot()
})

test("$Env macro", () => {
  expect(transform(`
  const e = $Env("NODE_ENV")
  const s = $Env<string>("NODE_ENV")
  const b = $Env<boolean>("DEV")
  const n = $Env<number>("DEV")
  `, { macros: [$Env], jsc: { parser: { syntax: "typescript" } } }).code).toMatchSnapshot()
})

test("$Span macro", () => {
  const code = "$Span()"
  expect(code.slice(0, 7)).toBe("$Span()")
  expect(/^\s*\[\s*0,\s*7/.test(transform(code, { macros: [$Span] }).code)).toBe(true)

  const multiline = `
    const a = $Span()
  `
  expect(multiline.slice(15, 22)).toBe("$Span()")
  expect(/\s*\[\s*15,\s*22/.test(transform(multiline, { macros: [$Span] }).code)).toBe(true)
})

test("$Line macro", () => {
  expect(transform(`const ln = $Line()
  const ln2 = $Line()
  const ln3 = $Line()
  `, { macros: [$Line] }).code).toEqual("const ln = 1;\nconst ln2 = 2;\nconst ln3 = 3;\n")
})

test("$Column macro", () => {
  expect(transform(`$Column()
  $Column()
  const col = $Column()
  $Column()`, { macros: [$Column] }).code).toEqual("1;\n3;\nconst col = 15;\n3;\n")
})

test("$ID macro", () => {
  expect(transform("const id = $ID()\nconst id2 = $ID()", { macros: [$ID] }).code).toEqual("const id = \"lb6ods\";\nconst id2 = \"vzqptz\";\n")
})

test("$Include macro", () => {
  expect(transform("$Include('packages/factory/src/index.ts')", { macros: [$Include] }).code).toMatchSnapshot()
})

test("$IncludeJSON macro", () => {
  expect(transform("$IncludeJSON('packages/core/package.json')", { macros: [$IncludeJSON] }).code.includes("@macro-plugin/core")).toBe(true)
  expect(transform("$IncludeJSON('packages/core/package.json', 'name')", { macros: [$IncludeJSON] }).code).toBe("\"@macro-plugin/core\";\n")
  expect(transform("$IncludeJSON('package.json', 'private')", { macros: [$IncludeJSON] }).code).toBe("true;\n")
})

test("$Concat macro", () => {
  expect(transform("$Concat('hello', 'world', 1, 2, true, undefined, null, 3.14)", { macros: [$Concat] }).code).toEqual("\"helloworld12trueundefinednull3.14\";\n")
  expect(() => transform("$Concat('hello', abc)", { macros: [$Concat] }).code).toThrow()
})
