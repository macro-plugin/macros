import { createExprMacro } from "@macro-plugin/core"

export const $Add = createExprMacro("$Add", ($a: number, $b: number) => $a + $b)

export const $Multi = createExprMacro("$Multi", ($a: number, $b: number) => $a * $b)
