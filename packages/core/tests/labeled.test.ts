import { ExpressionStatement, Statement } from "@swc/core";
import { LabeledMacro, createMacro, generate } from "../src"

import { transform } from "../src"

var DEBUG = false;

const debug = createMacro({
  LabeledStatement(ast) {
    if (ast.label.value === 'debug') {
      if (DEBUG) return ast.body;

      return {
        type: "EmptyStatement",
        span: { start: 0, end: 0, ctxt: 0 },
      }
    }
  }
})

const hello = createMacro({
  LabeledStatement(ast) {
    if (ast.label.value != 'hello') return;
    return this.parse('world');
  }
})

const codeblock = createMacro({
  LabeledStatement(ast) {
    if (ast.label.value != 'codeblock' || ast.body.type != 'BlockStatement') return;
    return this.parse(this.print(ast.body).replace(/^\s*\{\s*/, '').replace(/\s*\}\s*$/, '').trim())
  }
})

const codecall = createMacro({
  LabeledStatement(ast) {
    if (ast.label.value != 'codecall' || ast.body.type != 'BlockStatement') return;
    return this.parse(`(() => ${this.print(ast.body)})()`)
  }
})

const stringify = createMacro({
  LabeledStatement(ast) {
    if (ast.label.value != 'stringify') return;
    return this.parse("`" + this.print(ast.body) + "`");
  }
})

const empty = createMacro({
  LabeledStatement(ast) {
    if (ast.label.value != 'empty') return;
    this.remove();
  }
})

test("transform debug", () => {
  DEBUG = false;
  const code = `
    debug: console.log("Hello World");
  `;
  expect(transform(code, { plugins: [debug] }).code.trim()).toEqual(";");
  DEBUG = true;
  expect(transform(code, { plugins: [debug] }).code).toMatchSnapshot();
})

test("transform simple plugin string", () => {
  const code = `
    hello: 'kity'
  `
  expect(transform(code, { plugins: [hello] }).code).toEqual('world;\n');
});

test("transform complex", () => {
  const code = `
    codeblock: {
      let a = 3;
      a += 2;
      console.log(a);
    }
  `
  expect(transform(code, { plugins: [codeblock] }).code).toMatchSnapshot();
});

test("transform codeblock to call", () => {
  const code = `
    codecall: {
      let a = 3;
      a += 2;
      console.log(a);
    }
  `
  expect(transform(code, { plugins: [codecall] }).code).toMatchSnapshot();
});

test("return empty", () => {
  const code = `
    empty: console.log(123)
  `
  expect(transform(code, { plugins: [empty] }).code).toEqual('');
})

test("transform in typescript", () => {
  DEBUG = false;
  const code = `
    let a: string = "Hello";
    debug: console.log(a);
  `;
  expect(transform(code, {
    plugins: [debug],
    jsc: {
      parser: {
        syntax: "typescript"
      }
    }
  }).code).toMatchSnapshot();
});

test("transform in jsx", () => {
  const code = `
    stringify: <h1>hello World</h1>
  `

  expect(transform(code, {
    plugins: [ stringify ],
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: true
      }
    }
  }).code).toMatchSnapshot();
});
