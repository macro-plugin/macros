import state from "@macro-plugin/solid-state"
import { transform } from "@macro-plugin/core"

test("solid state macro", () => {
  const code = `
    state: {
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

  expect(transform(code, { global: { state } }).code).toMatchSnapshot();
})

test("overwrite state inside function", () => {
  const code = `
    state: {
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
      state: {
        var c = 3
      }

      c += 2
    }
  `

  expect(transform(code, { global: { state } }).code).toMatchSnapshot()
});