import { onCleanup, onError, onMount } from "@macro-plugin/solid"

import { transform } from "@macro-plugin/core"

test("solid onMount macro", () => {
  const code = `
    onMount: {
      console.log('mounted')
    }
  `

  expect(transform(code, { plugins: [onMount] }).code).toMatchSnapshot()
})

test("solid onCleanup macro", () => {
  const code = `
    onCleanup: {
      console.log('on clean')
    }
  `

  expect(transform(code, { plugins: [onCleanup] }).code).toMatchSnapshot()
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

  expect(transform(code, { plugins: [onError] }).code).toMatchSnapshot()
})
