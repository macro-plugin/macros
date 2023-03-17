import { qwik } from "../src";
import { transform } from "@macro-plugin/core";

test("qwik labeled macro", () => {
  const code = `
  function Cmp() {
    qwik: true
  }
  `
  expect(transform(code, { plugins: [qwik] }).code).toMatchSnapshot();
});

test("qwik labeled macro with value false", () => {
  const code = `
  function Cmp() {
    qwik: false
  }
  `
  expect(transform(code, { plugins: [qwik] }).code).toMatchSnapshot();
});

test("qwik labeled macro with wrong value", () => {
  const code = `
  function Cmp() {
    qwik: {}
  }
  `
  expect(() => transform(code, { plugins: [qwik] }).code).toThrow()
});

test("qwik labeled macro in function expression", () => {
  const code = `
  const ABC = function() {
    qwik: true
  }

  export const Cmp = () => {
    qwik: true
  }
  `
  expect(transform(code, { plugins: [qwik] }).code).toMatchSnapshot()
});
