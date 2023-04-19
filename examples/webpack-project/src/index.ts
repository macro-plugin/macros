/* eslint-disable no-console */
export function main () {
  const a = $Eval(1 + 2)

  const someAst = $Ast(a * 2)
  console.log(a)
  console.log(someAst)
}

main()
