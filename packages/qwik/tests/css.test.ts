import { css, link, qwik, scoped } from "../src"

import { transform } from "@macro-plugin/core"

test("qwik css link", () => {
  const code = `
    export const CmpStyles = () => {
      qwik: true
      link: './code-block.css?inline'

      return <span class="my-text">Some text</span>
    }
  `
  expect(transform(code, { macros: [qwik, link], jsc: { parser: { syntax: "typescript", tsx: true } } }).code).toMatchSnapshot()
})

test("qwik css links", () => {
  const code = `
    export const CmpStyles = () => {
      qwik: true
      link: [
        './code-block.css?inline',
        './font-style.css?inline',
      ]

      return <span class="my-text">Some text</span>
    }
  `
  expect(transform(code, { macros: [qwik, link], jsc: { parser: { syntax: "typescript", tsx: true } } }).code).toMatchSnapshot()
})

test("qwik css string", () => {
  const code = `
    export const CmpStyles = () => {
      qwik: true
      css: \`
        .my-text {
          color: red;
        }
      \`

      return <span class="my-text">Some text</span>
    }
  `
  expect(transform(code, { macros: [qwik, css], jsc: { parser: { syntax: "typescript", tsx: true } } }).code).toMatchSnapshot()
})

test("qwik scoped css", () => {
  const code = `
  export const CmpStyles = () => {
    qwik: true
    scoped: {
      link: './code-block.css?inline'

      css: \`
        .my-text {
          color: red;
        }
      \`
    }

    return <span class="my-text">Some text</span>
  }
`
  expect(transform(code, { macros: [qwik, scoped, css, link], jsc: { parser: { syntax: "typescript", tsx: true } } }).code).toMatchSnapshot()
})
