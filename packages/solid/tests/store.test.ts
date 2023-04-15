import { store } from "@macro-plugin/solid"
import { transform } from "@macro-plugin/core"

test("solid store macro", () => {
  const code = `
    store: {
      var todos = [
        { id: 1, title: "Thing I have to do", done: false },
        { id: 2, title: "Learn a New Framework", done: false },
      ]
    }

    console.log(todos)

    todos = [
      { id: 2, title: "Thing I have to do", done: false },
      { id: 3, title: "Learn a New Framework", done: false },
    ]
  `

  // todos[0] = { id: 1, title: "Thing I have to do", done: false }
  // todos[1].id = 3;

  expect(transform(code, { macros: [store] }).code).toMatchSnapshot()
})
