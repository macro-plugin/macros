import { resource, signal } from "../src"

import { transform } from "@macro-plugin/core"

test("qwik resource", () => {
  const code =  `
  signal: {
    var bar = 'foo'
  }

  resource: async (ctx) => {
    ctx.track(() => bar);
    ctx.track(() => props.url);
    ctx.cleanup(() => console.log('cleanup'));

    var someResource = await expensiveCompute(bar, props.url);
  }
  `
  expect(transform(code, { global: { signal }, labeled: { resource }}).code).toMatchSnapshot()
})
