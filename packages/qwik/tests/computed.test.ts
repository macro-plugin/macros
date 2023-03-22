import { computed, signal } from "../src"

import { transform } from "@macro-plugin/core"

test("qwik computed", () => {
  const code = `
  signal: {
    var a = 3
    var b = 4
    var count = 1
  }
  computed: {
    var doubleCount = 2 * count + count - a
  }
  `

  expect(transform(code, { plugins: [signal, computed] }).code).toMatchSnapshot()
})
