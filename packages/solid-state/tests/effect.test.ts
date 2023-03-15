import { effect } from "@macro-plugin/solid-state"
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

  expect(transform(code, { labeled: { effect } }).code).toMatchSnapshot();
})
