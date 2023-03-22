import { signal, task, vtask } from "../src"

import { transform } from "@macro-plugin/core"

test("qwik task", () => {
  const code = `
  signal: {
    var count = 1
    var doubleCount = 0
  }

  task: {
    console.log('component mounted');
  }

  task: ({track}) => {
    const newCount = track(() => count);
    doubleCount = 2 * newCount;
  }`

  expect(transform(code, { plugins: [signal, task] }).code).toMatchSnapshot()
})

test("qwik vtask", () => {
  const code = `
  vtask: {
    cosole.log('runs in the browser')
  }

  vtask: [
    () => console.log('runs in the browser'),
    {
      strategy: 'document-ready',
    }
  ]
  `
  expect(transform(code, { plugins: [signal, vtask] }).code).toMatchSnapshot()
})
