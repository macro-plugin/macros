import type { BaseNode, LabeledMacro, MacroPlugin } from "./types";

export function createMacro(macro: MacroPlugin) {
  return macro;
}

export function createLitMacro<T>(key: string, value: T) {

}

export function createExprMacro() {
}

export function createTypeMacro() {

}

export function createLabeledMacro(label: string, f: LabeledMacro | {
  enter?: LabeledMacro,
  leave?: LabeledMacro,
}) {
  return createMacro({
    LabeledStatement: {
      enter(ast, parent, prop, index) {
        if (ast.label.value == label) return (typeof f == 'object' ? f.enter : f)?.apply(this, [ast.body, parent, prop, index])
      },
      leave(ast, parent, prop, index) {
        if (ast.label.value == label && typeof f == 'object') return f.leave?.apply(this, [ast.body, parent, prop, index])
      }
    }
  })
}
