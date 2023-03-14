import createTrackPlugin from "../src/track";
import { transform } from "../src/transform";

var a: unknown, b: unknown, c: unknown;

const trackValue = createTrackPlugin((ast, handler) => {
  if (ast.type == 'FunctionDeclaration') {
    a = handler.track('a');
    b = handler.track('b');
    c = handler.track('c');
  }
})

test("track variables", () => {
  const code = `
    import { count } from './test'

    const a = 1
    const b = 2

    function log(a) {
      console.log(a)
    }
  `;

  transform(code, {
    global: trackValue
  });

  // `a` been overwrited
  expect(a).toBeUndefined();
  // `b` is shadowed
  expect(b).toBeDefined();
  // `c` is undefined
  expect(c).toEqual(-1);
});
