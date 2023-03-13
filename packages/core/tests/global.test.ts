import { BaseNode, Handler, transform } from "../src"
import type { FunctionDeclaration, VariableDeclaration } from "estree";

function arrow(ast: BaseNode, handler: Handler, parent: BaseNode, prop: string, index: number) {
  if (ast.type == 'FunctionDeclaration') {
    const f = ast as FunctionDeclaration;
    const children = [];
    let isArrow = false;

    for (const s of f.body.body) {
      if (s.type == 'LabeledStatement' && s.body.type == 'ExpressionStatement') {
        const expr = s.body.expression;
        if (s.label.name == 'arrow') {
          // @ts-ignore
          if (expr.type == 'BooleanLiteral' && expr.value) {
            isArrow = true;
          }
          continue;
        }
      }
      children.push(s);
    }

    f.body.body = children;

    if (isArrow) return {
      type: 'VariableDeclaration',
      kind: 'const',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: f.id,
          init: {
            type: 'ArrowFunctionExpression',
            // @ts-ignore
            id: undefined,
            generator: false,
            async: false,
            params: [],
            body: f.body,
          }
        }
      ]
    } as VariableDeclaration
  }
}

function inject(ast: BaseNode, handler: Handler) {
  handler.import([ { name: 'test', kind: 'default' } ], 'test')
  handler.import([ { name: 'ref' } ], 'vue')
  handler.import([ { name: 'VariableDeclaration' } ], 'estree', 'type')
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

  expect(transform(code, { global: { inject } }).code).toMatchSnapshot();
});
