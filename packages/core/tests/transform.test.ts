import type { Statement } from "estree"
import { transform } from "../src"

var DEBUG = false;

function debug(ast: Statement, code: string): Statement {
  if (DEBUG) return ast

  const { start, end } = ast.loc as unknown as {
    start: { index: number }
    end: { index: number }
  }
  const lines = code.slice(start.index, end.index).split("\n")

  return {
    type: "EmptyStatement",
    leadingComments: lines.map(value => ({
      type: "Line",
      value,
    })),
  }
}

test("transform debug", () => {
  const code = `
    debug: console.log("Hello World");
  `;
  expect(transform(code, { debug }).code).toMatchSnapshot();
  DEBUG = true;
  expect(transform(code, { debug }).code).toMatchSnapshot();
})
