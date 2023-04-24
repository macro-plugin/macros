import { createLabeledMacro, decorator, transform } from "../src"

let DEBUG = false

const debug = createLabeledMacro("debug", function (stmt) {
  if (DEBUG) return stmt
  this.remove()
})

const hello = createLabeledMacro("hello", function () {
  return this.parse("world")
})

const codeblock = createLabeledMacro("codeblock", function (stmt) {
  if (stmt.type !== "BlockStatement") return
  return this.parse(this.print(stmt).replace(/^\s*\{\s*/, "").replace(/\s*\}\s*$/, "").trim())
})

const codecall = createLabeledMacro("codecall", function (stmt) {
  if (stmt.type !== "BlockStatement") return
  return this.parse(`(() => ${this.print(stmt)})()`)
})

const stringify = createLabeledMacro("stringify", function (stmt) {
  return this.parse("`" + this.print(stmt) + "`")
})

const empty = createLabeledMacro("empty", function () {
  this.remove()
})

test("transform debug", () => {
  DEBUG = false
  const code = `
    debug: console.log("Hello World");
  `
  expect(transform(code, { macros: [debug] }).code.trim()).toBe("")
  DEBUG = true
  expect(transform(code, { macros: [debug] }).code).toMatchSnapshot()
})

test("transform simple plugin string", () => {
  const code = `
    hello: 'kity'
  `
  expect(transform(code, { macros: [hello] }).code).toEqual("world;\n")
})

test("transform complex", () => {
  const code = `
    codeblock: {
      let a = 3;
      a += 2;
      console.log(a);
    }
  `
  expect(transform(code, { macros: [codeblock] }).code).toMatchSnapshot()
})

test("transform codeblock to call", () => {
  const code = `
    codecall: {
      let a = 3;
      a += 2;
      console.log(a);
    }
  `
  expect(transform(code, { macros: [codecall] }).code).toMatchSnapshot()
})

test("return empty", () => {
  const code = `
    empty: console.log(123)
  `
  expect(transform(code, { macros: [empty] }).code).toEqual("")
})

test("transform in typescript", () => {
  DEBUG = false
  const code = `
    let a: string = "Hello";
    debug: console.log(a);
  `
  expect(transform(code, {
    macros: [debug],
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
    macros: [stringify],
    jsc: {
      parser: {
        syntax: "typescript",
        tsx: true
      }
    }
  }).code).toMatchSnapshot()
})

test("decorator macro with simple decorator", () => {
  const code = `
  function make_pretty(func) {
    function inner() {
      console.log("I got decorated")
      func()
    }
    return inner
  }

  function ordinary() {
    decorator: make_pretty
    console.log("I am ordinary")
  }

  ordinary()
`
  expect(transform(code, { macros: [decorator] }).code).toMatchSnapshot()
})

test("decorator macro with empty array", () => {
  const code = `
  function ordinary() {
    decorator: []
    console.log("I am ordinary")
  }

  ordinary()
`
  expect(transform(code, { macros: [decorator] }).code).toMatchSnapshot()
})

test("decorator macro with single decorator in array", () => {
  const code = `
  function make_pretty(func) {
    function inner() {
      console.log("I got decorated")
      func()
    }
    return inner
  }

  function ordinary() {
    decorator: [make_pretty]
    console.log("I am ordinary")
  }

  ordinary()
`
  expect(transform(code, { macros: [decorator] }).code).toMatchSnapshot()
})

test("decorator macro with multiple decorator in array", () => {
  const code = `
  function ordinary(a, b, c) {
    decorator: [d, e, f]
    console.log("I am ordinary")
  }

  ordinary(1, 2, 3)
`
  expect(transform(code, { macros: [decorator] }).code).toMatchSnapshot()
})

test("decorator with function expression", () => {
  const code = `
  function ordinary() {
    decorator: (func) => {
        return () => {
            console.log("I got decorated")

            // call original function
            func()
        }
    }

    console.log("I am ordinary")
  }
`
  expect(transform(code, { macros: [decorator] }).code).toMatchSnapshot()
})

test("decorating functions with parameters", () => {
  const code = `
  function smart_divide(func) {
    return function(a, b) {
      console.log("I am going to divide", a, "and", b)
      if (b === 0) {
        throw new Error("Whoops! cannot divide")
      }
      return func(a, b)
    }
  }


  function divide(a, b) {
    decorator: smart_divide

    return a / b
  }

  divide(2, 5) // number
  divide(2, 0) // error
`
  expect(transform(code, { macros: [decorator] }).code).toMatchSnapshot()
})

test("chaining decorators", () => {
  const code = `
  function star(func) {
    return (...args) => {
      console.log("*".repeat(15))
      func.apply(undefined, args)
      console.log("*".repeat(15))
    }
  }

  function percent(func) {
    return (...args) => {
      console.log("%".repeat(15))
      func.apply(undefined, args)
      console.log("%".repeat(15))
    }
  }

  function printer(msg) {
    decorator: [star, percent]

    console.log(msg)
  }

  printer("Hello")
`
  expect(transform(code, { macros: [decorator] }).code).toMatchSnapshot()
})
