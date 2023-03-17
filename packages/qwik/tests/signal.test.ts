import { signal } from "@macro-plugin/qwik"
import { transform } from "@macro-plugin/core"

test("qwik signal", () => {
  const code = `
    signal: {
      var count = 0
    }

    count += 1
  `
  expect(transform(code, { plugins: [signal] }).code).toMatchSnapshot()
})

test("qwik signal in function name", () => {
  const code = `
  signal: {
    var count = 0
  }
  function abc(count) {
    count = 3
  }
  count += 2
  `

  expect(transform(code, { plugins: [ signal ] }).code).toMatchSnapshot();
});

