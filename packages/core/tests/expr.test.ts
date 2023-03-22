import { Expression, StringLiteral } from "@swc/core"
import { createExprMacro, createTmplMacro, createTypeMacro, transform } from "../src"

test("create expr macro with arrow function", () => {
  const macro = createExprMacro("$add", ($a: number, $b: number) => {
    return $a + $b
  })

  expect(transform("$add(1, 2)", { plugins: [macro] }).code).toBe("1 + 2;\n")
})

test("create expr macro with arrow expr", () => {
  const macro = createExprMacro("$add", ($a: number, $b: number) => $a + $b)

  expect(transform("$add(1, 2)", { plugins: [macro] }).code).toBe("1 + 2;\n")
})

test("expr macro with condition", () => {
  const macro = createExprMacro("$add", ($a: number, $b: number) => $a < 0 ? $b : $a + $b)
  expect(transform("$add(-1, 2)", { plugins: [macro] }).code).toBe("-1 < 0 ? 2 : -1 + 2;\n")
})

test("create complex expr macro", () => {
  const macro = createExprMacro("$add", function (args) {
    const a = this.printExpr(args[0])
    const b = this.printExpr(args[1])

    if (+a < 0) return args[1]
    return this.parseExpr(`${a} + ${b}`)
  })

  expect(transform("$add(-1, 2)", { plugins: [macro] }).code).toBe("2;\n")
  expect(transform("$add(1, 2)", { plugins: [macro] }).code).toBe("1 + 2;\n")
})

test("create a type macro with createExprMacro", () => {
  const macro = createExprMacro("defineEmits", function (args, typeParams) {
    const emits: StringLiteral[] = []
    for (const t of typeParams ?? []) {
      if (t.type === "TsTypeLiteral") {
        for (const m of t.members) {
          if (m.type === "TsCallSignatureDeclaration") {
            for (const p of m.params) {
              if (p.type === "Identifier" && p.value === "e" && p.typeAnnotation?.type === "TsTypeAnnotation" && p.typeAnnotation.typeAnnotation.type === "TsLiteralType" && p.typeAnnotation.typeAnnotation.literal.type === "StringLiteral") {
                emits.push(p.typeAnnotation.typeAnnotation.literal)
              }
            }
          }
        }
      }
    }

    return {
      type: "CallExpression",
      span: {
        start: 0,
        end: 23,
        ctxt: 0
      },
      callee: {
        type: "Identifier",
        span: {
          start: 0,
          end: 11,
          ctxt: 1
        },
        value: "defineEmits",
        optional: false
      },
      arguments: [
        {
          expression: {
            type: "ArrayExpression",
            span: {
              start: 12,
              end: 22,
              ctxt: 0
            },
            elements: emits.map(i => ({ expression: i }))
          }
        }
      ],
    }
  })

  expect(transform(`const emit = defineEmits<{
    (e: 'change', id: number): void
    (e: 'update', value: string): void
  }>()`, { plugins: [macro], jsc: { parser: { syntax: "typescript" } } }).code).toMatchSnapshot()
})

test("create a type macro with createTypeMacro", () => {
  const macro = createTypeMacro("defineEmits", function (typeParams) {
    const emits: StringLiteral[] = []
    for (const t of typeParams ?? []) {
      if (t.type === "TsTypeLiteral") {
        for (const m of t.members) {
          if (m.type === "TsCallSignatureDeclaration") {
            for (const p of m.params) {
              if (p.type === "Identifier" && p.value === "e" && p.typeAnnotation?.type === "TsTypeAnnotation" && p.typeAnnotation.typeAnnotation.type === "TsLiteralType" && p.typeAnnotation.typeAnnotation.literal.type === "StringLiteral") {
                emits.push(p.typeAnnotation.typeAnnotation.literal)
              }
            }
          }
        }
      }
    }

    return {
      type: "CallExpression",
      span: {
        start: 0,
        end: 23,
        ctxt: 0
      },
      callee: {
        type: "Identifier",
        span: {
          start: 0,
          end: 11,
          ctxt: 1
        },
        value: "defineEmits",
        optional: false
      },
      arguments: [
        {
          expression: {
            type: "ArrayExpression",
            span: {
              start: 12,
              end: 22,
              ctxt: 0
            },
            elements: emits.map(i => ({ expression: i }))
          }
        }
      ],
    }
  })

  expect(transform(`const emit = defineEmits<{
    (e: 'change', id: number): void
    (e: 'update', value: string): void
  }>()`, { plugins: [macro], jsc: { parser: { syntax: "typescript" } } }).code).toMatchSnapshot()
})

test("create a template macro", () => {
  const macro = createTmplMacro("real", function (strings, personExpr, ageExpr) {
    let person: string = "Kali"
    let age: number = 10
    if (personExpr.type === "Identifier") {
      personExpr = this.track(personExpr.value)?.value as Expression
      if (personExpr.type === "StringLiteral") {
        person = personExpr.value
      }
    }

    if (ageExpr.type === "Identifier") {
      ageExpr = this.track(ageExpr.value)?.value as Expression
      if (ageExpr.type === "NumericLiteral") {
        age = ageExpr.value
      }
    }

    return {
      type: "StringLiteral",
      value: `${strings[0]}${person}${strings[1]}${age}${strings[2]}`,
      span: {
        start: 0,
        end: 0,
        ctxt: 0
      }
    }
  })

  const r = transform(`
  let person = 'Bob'
  let age = 12
  const des = real\`That \${person} is \${age}\`
  `, { plugins: [macro], emitDts: true })

  expect(r.code).toMatchSnapshot()
  expect(r.dts).toMatchSnapshot()
})
