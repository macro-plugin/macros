import { qwik, store } from "../src"

import { transform } from "@macro-plugin/core"

test("qwik store", () => {
  const code = `
  export default () => {
    qwik: true
    store: {
      var state = {
        count: 0
      }
    }

    return (
      <>
        <button onClick$={() => state.count++}>Increment</button>
        Count: {state.count}
      </>
    );
  };
  `
  expect(transform(code, { macros: [qwik, store], jsc: { parser: { syntax: "typescript", tsx: true } } }).code).toMatchSnapshot()
})
