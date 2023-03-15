import { computed, signal, task, vtask } from "../src";

import { transform } from "@macro-plugin/core";

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
  }`;

  expect(transform(code, { labeled: { task }, global: { signal } }).code).toMatchSnapshot()
})

test("qwik vtask", () => {
  const code = `
  vtask: {
    cosole.log('runs in the browser')
  }

  vtask: [
    () => cosole.log('runs in the browser'),
    {
      strategy: 'document-ready', // 'load' | 'visible' | 'idle'
    }
  ]
  `
  expect(transform(code, { labeled: { vtask }, global: { signal } }).code).toMatchSnapshot()
})
