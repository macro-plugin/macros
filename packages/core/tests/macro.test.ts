import { macro, transform } from "../src"

test("create lit macro in macro block", () => {
  const code = `
  macro: {
    var __DEBUG__ = true
  }

  if (__DEBUG__) {
    console.log("debug")
  }
  `

  const r = transform(code, { macros: [macro], emitDts: true })
  expect(r.dts).toMatchSnapshot()
  expect(r.code).toMatchSnapshot()
})

test("create lit macro with array pattern and object pattern", () => {
  const code = `
macro: {
  var [__first__, __second__, { __third__ }] = [1, 2, { __third__: 3 }]
  var { __key__, __prop__ } = { __prop__: 1, __key__: 2 }
}

const f1 = __first__
const f2 = __second__
const f3 = __third__
const k = __key__
const p = __prop__
`

  expect(transform(code, { macros: [macro] }).code).toMatchSnapshot()
})

test("create expr macro in macro block", () => {
  const code = `
macro: {
  var $add = (a: number, b: number) => a + b
}

let c = $add(1, 2)
  `

  expect(transform(code, { macros: [macro], jsc: { parser: { syntax: "typescript" } } }).code).toMatchSnapshot()
})

test("create complex macro with macros", () => {
  const code = `
macro: {
  var __num__ = $Lit<number>(4)

  var add = $Expr<(a: number, b: number) => number>(function(args) {
    const a = this.printExpr(args[0])
    const b = this.printExpr(args[1])

    if (+a < 0) return args[1]
    return this.parseExpr(\`\${a} + \${b}\`)
  })

  var typeAdd = $Type<(<a extends number, b extends number>() => number)>(function (typeParams) {
    return this.parseExpr((typeParams[0].literal.value + typeParams[1].literal.value).toString())
  })

  var real = $Tmpl(function (strings, personExpr, ageExpr) {
    return {
      type: "StringLiteral",
      span: {
        start: 0,
        end: 0,
        ctxt: 0,
      },
      value: strings[0] + "Bob" + strings[1] + "12" + strings[2]
    }
  })

  $Labeled("debug", function (stmt) {
    return {
      "type": "IfStatement",
      "span": {
        "start": 0,
        "end": 28,
        "ctxt": 0
      },
      "test": {
        "type": "Identifier",
        "span": {
          "start": 4,
          "end": 13,
          "ctxt": 1
        },
        "value": "__debug__",
        "optional": false
      },
      "consequent": {
        "type": "BlockStatement",
        "span": {
          "start": 15,
          "end": 28,
          "ctxt": 0
        },
        "stmts": [stmt]
      }
    }
  })

  $Macro({
    StringLiteral(ast) {
      if (ast.value === 'hello') ast.value = 'world'
    }
  })
}

let a = __num__
let b = add(1, 2)
let c = typeAdd<3, 5>()
let d = real\`That \${person} is \${age}\`
debug: console.log('debug')
let f = 'hello'
`

  expect(transform(code, { macros: [macro], jsc: { parser: { syntax: "typescript" } } }).code).toMatchSnapshot()
})
