import { createFilter } from "../src/match"

test("createFilter", () => {
  const files = [
    "/Users/admin/macros/examples/rollup-project/src/index.ts",
    "/Users/admin/macros/examples/rollup-project/src/second.ts",
    "/Users/admin/macros/examples/node_modules/abc.js"
  ]

  const filter = createFilter()

  expect(filter(files[0])).toBe(true)
  expect(filter(files[1])).toBe(true)
  expect(filter(files[2])).toBe(false)
})

test("createFilter with glob pattern", () => {
  const files = [
    "/Users/admin/macros/examples/rollup-project/src/index.ts",
    "/Users/admin/macros/examples/rollup-project/src/second.ts",
    "/Users/admin/macros/examples/node_modules/abc.js"
  ]

  const filter = createFilter(["**/*.ts"], ["**/second.ts"])
  expect(filter(files[0])).toBe(true)
  expect(filter(files[1])).toBe(false)
  expect(filter(files[2])).toBe(false)

  const filter2 = createFilter(["**/node_modules/**", "**/second.ts"], [])
  expect(filter2(files[0])).toBe(false)
  expect(filter2(files[1])).toBe(true)
  expect(filter2(files[2])).toBe(true)
})

test("createFilter with RegExp pattern", () => {
  const files = [
    "/Users/admin/macros/examples/rollup-project/src/index.ts",
    "/Users/admin/macros/examples/rollup-project/src/second.ts",
    "/Users/admin/macros/examples/node_modules/abc.js"
  ]

  const filter = createFilter([/rollup-project/], [/second\.ts/])
  expect(filter(files[0])).toBe(true)
  expect(filter(files[1])).toBe(false)
  expect(filter(files[2])).toBe(false)

  const filter2 = createFilter([/node_modules/], [])
  expect(filter2(files[0])).toBe(false)
  expect(filter2(files[1])).toBe(false)
  expect(filter2(files[2])).toBe(true)
})
