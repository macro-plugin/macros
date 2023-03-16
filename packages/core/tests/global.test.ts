import type { FunctionDeclaration, VariableDeclaration } from "@swc/core";
import { GlobalMacro, Handler, transform } from "../src"

const arrow: GlobalMacro = (ast, handler) => {
  if (ast.type == 'FunctionDeclaration') {
    const f = ast as FunctionDeclaration;
    const children = [];
    let isArrow = false;

    if (!f.body) return

    for (const s of f.body.stmts || []) {
      if (s.type == 'LabeledStatement' && s.body.type == 'ExpressionStatement') {
        const expr = s.body.expression;
        if (s.label.value == 'arrow') {
          if (expr.type == 'BooleanLiteral' && expr.value) {
            isArrow = true;
          }
          continue;
        }
      }
      children.push(s);
    }

    f.body.stmts = children;

    if (isArrow) return {
      type: 'VariableDeclaration',
      kind: 'const',
      declare: false,
      span: {
        start: 0,
        end: 0,
        ctxt: 0
      },
      declarations: [
        {
          type: 'VariableDeclarator',
          id: f.identifier,
          init: {
            type: 'ArrowFunctionExpression',
            generator: false,
            async: false,
            params: [],
            body: f.body,
            span: {
              start: 0,
              end: 0,
              ctxt: 0
            }
          },
          definite: false,
          span: {
            start: 0,
            end: 0,
            ctxt: 0
          }
        }
      ]
    } as VariableDeclaration
  }
}

const inject: GlobalMacro = (ast, handler) => {
  handler.import([ { name: 'test', kind: 'default' } ], 'test')
  handler.import([ { name: 'ref' } ], 'vue')
}

test("transform function block", () => {
  const code = `
    function add(a, b) {
      arrow: true
      return a + b
    }
  `;

  const code2 = `
    function add(a, b) {
      arrow: false
      return a + b
    }
  `
  expect(transform(code, { global: { arrow } }).code).toMatchSnapshot();
  expect(transform(code2, { global: { arrow } }).code).toMatchSnapshot();
})

test("inject imports", () => {
  const code = `
  function myComponent() {
    const count = ref(0);
  }
  `

  expect(transform(code, {
    global: { inject },
    jsc: {
      parser: {
        syntax: "typescript",
      },
    },
  }).code).toMatchSnapshot();
});
