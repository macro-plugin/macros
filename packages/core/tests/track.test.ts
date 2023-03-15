import { ScopeVar } from "../src/types";
import createTrackPlugin from "../src/track";
import { transform } from "../src/transform";

var a: ScopeVar | undefined, b: ScopeVar | undefined, c: ScopeVar | undefined;

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
  expect(a?.value).toBeUndefined();
  // `b` is shadowed
  expect(b?.value).toBeDefined();
  // `c` is undefined
  expect(c).toBeUndefined();
});
