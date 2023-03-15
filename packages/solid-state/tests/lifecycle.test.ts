import { onCleanup, onError, onMount } from "@macro-plugin/solid-state"

import { transform } from "@macro-plugin/core"

test("solid onMount macro", () => {
  const code = `
    onMount: {
      console.log('mounted')
    }
  `

  expect(transform(code, { labeled: { onMount } }).code).toMatchSnapshot();
})

test("solid onCleanup macro", () => {
  const code = `
    onCleanup: {
      console.log('on clean')
    }
  `

  expect(transform(code, { labeled: { onCleanup } }).code).toMatchSnapshot();
})


test("solid onError macro", () => {
  const code = `
    onError: {
      console.log('woops!')
    }

    onError: (err) => {
      console.log(err)
    }
  `

  expect(transform(code, { labeled: { onError } }).code).toMatchSnapshot();
})
