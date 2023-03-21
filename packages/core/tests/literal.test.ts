import { createLitMacro, hashMap, parse, parseExpr, transform } from "../src";

test("create literal macro", () => {
  const code = `
  if (__DEV__) {
    console.log('development')
  }
  `
  expect(transform(code, { plugins: [createLitMacro('__DEV__', true)] }).code).toMatchSnapshot()
})

test("should pass overwrited variable", () => {
  const code = `
  const before = __DEV__

  function testDev(__DEV__) {
    if (__DEV__) {
      console.log('development')
    }
  }

  const after = __DEV__
  `
  expect(transform(code, { plugins: [createLitMacro('__DEV__', true)] }).code).toMatchSnapshot()
})

test("should support all jsonable values", () => {
  const code = `
    const a = __num__
    const b = __str__
    const c = __bool__
    const d = __null__
    const e = __undefined__
    const f = __function__
    const e = __array__
    const g = __object__
    const h = __regex__
  `
  expect(transform(code, { plugins: [
    createLitMacro('__num__', 123),
    createLitMacro('__str__', 'Hello World'),
    createLitMacro('__bool__', false),
    createLitMacro('__null__', null),
    createLitMacro('__undefined__', undefined),
    createLitMacro('__function__', () => true),
    createLitMacro('__array__', [1, 2, 3]),
    createLitMacro('__object__', { a: 1, b: 2 }),
    createLitMacro('__regex__', /.*/g),
  ]}).code).toMatchSnapshot()
});

test("should allow ast for more complex value", () => {
  const code = `
    const expr = __expr__
  `
  expect(transform(code, { plugins: [
    createLitMacro('__expr__', parseExpr('call("hello", "world")'))
  ]}).code).toMatchSnapshot()
});
