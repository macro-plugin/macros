import { signal } from "@macro-plugin/solid"
import { transform } from "@macro-plugin/core"

test("solid signal macro", () => {
  const code = `
    signal: {
      var count = 0
    }

    count += 2
    count = 5
    count *= 10
    count **= 2
    count++
    count--
    ++count
    --count
  `

  expect(transform(code, { plugins: [signal] }).code).toMatchSnapshot()
})

test("overwrite signal inside function", () => {
  const code = `
    signal: {
      var count = 0
      var b = 2
    }

    count = 3

    function add(count = 0) {
      count += 1
    }

    count = 4

    const plus = (b) => {
      b = 5
      count += 3

      var count = 4
      count += 5
    }

    try {
      console.log(123)
    } catch (b) {
      b += 2
    }

    b += 2
    count += 2

    var b = 4
    b += 3

    function component() {
      signal: {
        var c = 3
      }

      c += 2
    }
  `

  expect(transform(code, { plugins: [signal] }).code).toMatchSnapshot()
})
