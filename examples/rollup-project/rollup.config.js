import { defineConfig } from "rollup"
import macroPlugin from "@macro-plugin/rollup"

export default defineConfig({
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "es"
  },
  plugins: [
    macroPlugin()
  ]
})
