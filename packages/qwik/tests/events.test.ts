import { events, qwik, signal } from "../src"

import { transform } from "@macro-plugin/core"

test("useOn events", () => {
  const code = `
  export function ClickableComponent() {
    qwik: true
    onclick: {
      alert('Alert from Clickable Component.');
    }

    return <div>click from other component 1</div>;
  }

  export function HoverComponent() {
    qwik: true
    signal: {
      var isHover = false
    }
    onmouseover: () => {
      isHover = true
    }
    return <div>{isHover ? 'Now Hovering' : 'Not Hovering'}</div>;
  }
  `
  expect(transform(code, { plugins: [ qwik, signal, events ], jsc: { parser: { syntax: 'typescript', tsx: true } }}).code).toMatchSnapshot();
})
