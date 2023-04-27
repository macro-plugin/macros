import { $Ast, $Column, $Eval, $Quote, isMacroPlugin, isMacroProxy } from "../src"

test("isMacroPlugin", () => {
  expect(isMacroPlugin($Ast)).toBeTruthy()
  expect(isMacroPlugin($Column)).toBeTruthy()
  expect(isMacroPlugin($Eval)).toBeTruthy()
  expect(isMacroPlugin($Quote)).toBeTruthy()
})

test("isMacroProxy", () => {
  expect(isMacroProxy($Ast)).toBeFalsy()
  expect(isMacroProxy($Column)).toBeFalsy()
  expect(isMacroProxy($Eval)).toBeFalsy()
  expect(isMacroProxy($Quote)).toBeTruthy()

  expect($Ast.proxy(() => {})).toBeTruthy()
})
