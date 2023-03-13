import type { Statement } from "../src"
import { transform } from "../src"

var DEBUG = false;

function debug(ast: Statement, code: string): Statement {
  if (DEBUG) return ast

  return {
    type: "EmptyStatement",
    leadingComments: code.split("\n").map(value => ({
      type: "Line",
      value,
    })),
  }
}

function hello(ast: Statement): string {
  return 'world'
}

function codeblock(ast: Statement, code: string): string {
  return code.trim().replace(/^\s*\{\s*/, '').replace(/\s*\}\s*$/, '').trim();
}

function codecall(ast: Statement, code: string): string {
  return `(() => ${code})()`;
}

test("transform debug", () => {
  const code = `
    debug: console.log("Hello World");
  `;
  expect(transform(code, { debug }).code).toMatchSnapshot();
  DEBUG = true;
  expect(transform(code, { debug }).code).toMatchSnapshot();
})

test("transform simple plugin string", () => {
  const code = `
    hello: 'kity'
  `
  expect(transform(code, { hello }).code).toEqual('world;');
});

test("transform complex", () => {
  const code = `
    codeblock: {
      let a = 3;
      a += 2;
      console.log(a);
    }
  `
  expect(transform(code, { codeblock }).code).toMatchSnapshot();
});

test("transform codeblock to call", () => {
  const code = `
    codecall: {
      let a = 3;
      a += 2;
      console.log(a);
    }
  `
  expect(transform(code, { codecall }).code).toMatchSnapshot();
});

test("return empty", () => {
  const code = `
    empty: console.log(123)
  `
  expect(transform(code, { empty: () => '' }).code).toEqual('');
})
