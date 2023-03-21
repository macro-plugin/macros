import { GlobalMacro, ScopeVar, createMacro, transform } from "../src";

var a: ScopeVar | undefined, b: ScopeVar | undefined, c: ScopeVar | undefined;

const trackValue = createMacro({
  FunctionDeclaration() {
    a = this.track('a');
    b = this.track('b');
    c = this.track('c');
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
    plugins: [ trackValue ]
  });

  // `a` been overwrited
  expect(a?.value).toBeUndefined();
  // `b` is shadowed
  expect(b?.value).toBeDefined();
  // `c` is undefined
  expect(c).toBeUndefined();
});
