import { createLitMacro, defineConfig } from "@macro-plugin/core"

export default defineConfig({
  emitDts: true,
  tsconfig: false,
  macros: [
    createLitMacro({
      __DEV__: false
    })
  ],
  depends: [
    "@macro-plugin/core",
    "macro-plugin-project"
  ],
  externals: [
    "@macro-plugin/factory",
  ]
})
