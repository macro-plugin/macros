import { macro, transform } from "../src"

test("create lit macro in macro block", () => {
  const code = `
  macro: {
    var __DEBUG__ = true
  }

  if (__DEBUG__) {
    console.log("debug")
  }
  `

  const r = transform(code, { plugins: [macro], emitDts: true })
  expect(r.dts).toMatchSnapshot()
  expect(r.code).toMatchSnapshot()
})

test("create lit macro with array pattern and object pattern", () => {
  const code = `
macro: {
  var [__first__, __second__, { __third__ }] = [1, 2, { __third__: 3 }]
  var { __key__, __prop__ } = { __prop__: 1, __key__: 2 }
}

const f1 = __first__
const f2 = __second__
const f3 = __third__
const k = __key__
const p = __prop__
`

  expect(transform(code, { plugins: [macro] }).code).toMatchSnapshot()
})

test("create expr macro in macro block", () => {
  const code = `
macro: {
  var $add = (a: number, b: number) => a + b
}

let c = $add(1, 2)
  `

  expect(transform(code, { plugins: [macro], jsc: { parser: { syntax: "typescript" } } }).code).toMatchSnapshot()
})
