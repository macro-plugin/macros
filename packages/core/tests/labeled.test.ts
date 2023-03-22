import { ExpressionStatement, Statement } from "@swc/core"
import { LabeledMacro, createLabeledMacro, createMacro, generate, transform } from "../src"

let DEBUG = false

const debug = createLabeledMacro("debug", function (stmt) {
  if (DEBUG) return stmt
  this.remove()
})

const hello = createLabeledMacro("hello", function (stmt) {
  return this.parse("world")
})

const codeblock = createLabeledMacro("codeblock", function (stmt) {
  if (stmt.type != "BlockStatement") return
  return this.parse(this.print(stmt).replace(/^\s*\{\s*/, "").replace(/\s*\}\s*$/, "").trim())
})

const codecall = createLabeledMacro("codecall", function (stmt) {
  if (stmt.type != "BlockStatement") return
  return this.parse(`(() => ${this.print(stmt)})()`)
})

const stringify = createLabeledMacro("stringify", function (stmt) {
  return this.parse("`" + this.print(stmt) + "`")
})

const empty = createLabeledMacro("empty", function (stmt) {
  this.remove()
})

test("transform debug", () => {
  DEBUG = false
  const code = `
    debug: console.log("Hello World");
  `
  expect(transform(code, { plugins: [debug] }).code.trim()).toBe("")
  DEBUG = true
  expect(transform(code, { plugins: [debug] }).code).toMatchSnapshot()
})

test("transform simple plugin string", () => {
  const code = `
    hello: 'kity'
  `
  expect(transform(code, { plugins: [hello] }).code).toEqual("world;\n")
})

test("transform complex", () => {
  const code = `
    codeblock: {
      let a = 3;
      a += 2;
      console.log(a);
    }
  `
  expect(transform(code, { plugins: [codeblock] }).code).toMatchSnapshot()
})

test("transform codeblock to call", () => {
  const code = `
    codecall: {
      let a = 3;
      a += 2;
      console.log(a);
    }
  `
  expect(transform(code, { plugins: [codecall] }).code).toMatchSnapshot()
})

test("return empty", () => {
  const code = `
    empty: console.log(123)
  `
  expect(transform(code, { plugins: [empty] }).code).toEqual("")
})

test("transform in typescript", () => {
  DEBUG = false
  const code = `
    let a: string = "Hello";
    debug: console.log(a);
  `
  expect(transform(code, {
    plugins: [debug],
    jsc: {
      parser: {
        syntax: "typescript"
      }
    }
  }).code).toMatchSnapshot()
})

test("transform in jsx", () => {
  const code = `
    stringify: <h1>hello World</h1>
  `

  expect(transform(code, {
    plugins: [stringify],
    jsc: {
      parser: {
        syntax: "typescript",
        tsx: true
      }
    }
  }).code).toMatchSnapshot()
})
