import { createLitMacro, createSwcPlugin, parseExpr, transform } from "../src"
import { parseSync, transformSync as swcTransform } from "@swc/core"

test("create literal macro", () => {
  const code = `
  if (__DEV__) {
    console.log('development')
  }
  `

  expect(transform(code, { macros: [createLitMacro("__DEV__", true)] }).code).toMatchSnapshot()
})

test("use as swc plugin", () => {
  const plugin = createSwcPlugin({ macros: [createLitMacro("__DEV__", true)] })

  const code = `
  if (__DEV__) {
    console.log('development')
  }
  `

  expect(swcTransform(code, { plugin, jsc: { parser: { syntax: "typescript" } } }).code).toMatchSnapshot()
})

test("use with swc transform ast", () => {
  const plugin = createSwcPlugin({ macros: [createLitMacro("__DEV__", true)] })

  const code = `
  let a: string = "Hello"

  if (__DEV__) {
    console.log('development')
  }
  `

  const program = plugin(parseSync(code, { syntax: "typescript" }))

  expect(swcTransform(program, { jsc: { parser: { syntax: "typescript" } } }).code).toMatchSnapshot()
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
  expect(transform(code, { macros: [createLitMacro("__DEV__", true)] }).code).toMatchSnapshot()
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
  const r = transform(code, {
    macros: [
      createLitMacro("__num__", 123),
      createLitMacro("__str__", "Hello World"),
      createLitMacro("__bool__", false),
      createLitMacro("__null__", null),
      createLitMacro("__undefined__", undefined),
      createLitMacro("__function__", () => true, "() => true"),
      createLitMacro("__array__", [1, 2, 3], "number[]"),
      createLitMacro("__object__", { a: 1, b: 2 }, "Record<string, number>"),
      createLitMacro("__regex__", /.*/g),
    ],
    emitDts: true
  })

  expect(r.code).toMatchSnapshot()
  expect(r.dts).toMatchSnapshot()
})

test("should allow ast for more complex value", () => {
  const code = `
    const expr = __expr__
  `
  expect(transform(code, {
    macros: [
      createLitMacro("__expr__", parseExpr('call("hello", "world")'))
    ]
  }).code).toMatchSnapshot()
})

test("should support pass an object", () => {
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
    const i = __expr__
  `
  const r = transform(code, {
    macros: [
      createLitMacro({
        __num__: 123,
        __str__: "Hello World",
        __bool__: false,
        __null__: null,
        __undefined__: undefined,
        __function__: () => true,
        __array__: [1, 2, 3],
        __object__: { a: 1, b: 2 },
        __regex__: /.*/g,
        __expr__: parseExpr('call("hello", "world")')
      }, {
        __function__: "() => true",
        __array__: "number[]",
        __object__: "Record<string, number>",
        __expr__: "string"
      })
    ],
    emitDts: true
  })
  expect(r.code).toMatchSnapshot()
  expect(r.dts).toMatchSnapshot()
})
