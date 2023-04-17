import { parseType, printType } from "../src"

test("print type", () => {
  expect(printType(parseType("[]")).code).toEqual("[]")
  expect(printType(parseType("string|number")).code).toEqual("string | number")
})
