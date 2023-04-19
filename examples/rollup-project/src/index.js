import { $ExprMacro, $Quote } from "@macro-plugin/core"

macro: {
  var __ABC__ = "abc"

  var add = $ExprMacro(function ([a0, a1]) {
    const a = this.printExpr(a0)
    const b = this.printExpr(a1)

    // console.log($Quote)
    if (+a < 0) return a1
    return this.parseExpr(`(() => {return ${a} + ${b}})()`)
  })
}

export function hello () {
  const a = $Eval(1 + 2)
  const result = []

  result.push($Quote`1 + ${a}`)

  if (__DEV__) {
    result.push(a)
  }

  result.push(add(1, 2))

  // $Eval(() => {
  //   import("fs").then(fs => fs.writeFileSync("abc.txt", "123"))
  // })
  const someAst = $Ast(a * 2)

  result.push(a, someAst)

  return result
}
