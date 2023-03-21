import type { BaseNode, LabeledMacro, MacroPlugin, WalkContext } from "./types";

import { isRegExp } from "./utils";

export function createMacro(macro: MacroPlugin) {
  return macro;
}

function createLit(this: WalkContext, value: unknown): BaseNode {
  if (value === undefined) return {
    "type": "Identifier",
    "span": {
      "start": 0,
      "end": 0,
      "ctxt": 2
    },
    "value": "undefined",
    "optional": false
  }
  if (value && typeof value == 'object') {
    if (isRegExp(value)) return this.parseExpr(value.toString())
    if ('span' in value && 'type' in value) return value as BaseNode;
  }
  if (typeof value == 'function') return this.parseExpr(value.toString())
  return this.parseExpr(JSON.stringify(value))
}

export function createLitMacro(map: Record<string, unknown>): MacroPlugin;
export function createLitMacro<T>(key: string, value: T): MacroPlugin;
export function createLitMacro(arg: string | Record<string, unknown>, value?: unknown): MacroPlugin {
  return createMacro(typeof arg === 'string' ? {
    Identifier(ast) {
      if (ast.value == arg && !this.track(arg)) return createLit.apply(this, [value])
    }
  }: {
    Identifier(ast) {
      if (ast.value in arg && !this.track(ast.value)) return createLit.apply(this, [arg[ast.value]])
    }
  })
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
