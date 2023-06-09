import { effect } from "@macro-plugin/solid"
import { transform } from "@macro-plugin/core"

test("solid effect macro", () => {
  const code = `
    effect: {
      console.log("count =", count())
    }

    effect: (prev) => {
      return prev;
    }

    effect: [
      (prev) => prev,
      0
    ]
  `

  expect(transform(code, { macros: [effect] }).code).toMatchSnapshot()
})
