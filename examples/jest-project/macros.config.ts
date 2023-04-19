import { $Ast, $Eval, defineConfig } from "@macro-plugin/core"

export default defineConfig({
  macros: [$Eval, $Ast],
  emitDts: true,
  jsc: {
    parser: {
      syntax: "typescript"
    },
    target: "esnext",
  },
})
