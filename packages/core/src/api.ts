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

export function createLabeledMacro(label: string, f: LabeledMacro) {
  return createMacro({
    LabeledStatement(ast, parent, prop, index) {
      if (ast.label.value == label) return f.apply(this, [ast.body, parent, prop, index])
    }
  })
}
