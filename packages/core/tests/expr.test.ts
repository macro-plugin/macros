import { createExprMacro } from "../src"
import { transform } from "../src"

test("create expr macro", () => {
  const code = `
  $add(1, 2)
  `

  const macro = createExprMacro('$add', function($a: number, $b: number) {
    return $a + $b
  })

  expect(transform(code, { plugins: [macro] }).code).toBe('1 + 2;\n')
})

test("create expr macro with arrow function", () => {
  const code = `
  $add(1, 2)
  `

  const macro = createExprMacro('$add', ($a: number, $b: number) => {
    return $a + $b
  })

  expect(transform(code, { plugins: [macro] }).code).toBe('1 + 2;\n')
});

test("create expr macro with arrow expr", () => {
  const code = `
  $add(1, 2)
  `

  const macro = createExprMacro('$add', ($a: number, $b: number) => $a + $b)

  expect(transform(code, { plugins: [macro] }).code).toBe('1 + 2;\n')
});

test("expr macro with condition", () => {
  const code = `
  $add(-1, 2)
  `

  const macro = createExprMacro('$add', ($a: number, $b: number) => {
    if ($a < 0) return $b;
    return $a + $b;
  })

  expect(transform(code, { plugins: [macro] }).code).toBe('2;\n')
})
