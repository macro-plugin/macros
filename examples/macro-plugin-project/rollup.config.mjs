import { defineConfig } from "rollup"
import macroPlugin from "@macro-plugin/rollup"

export default defineConfig({
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs"
    },
    {
      file: "dist/index.mjs",
      format: "es"
    }
  ],
  plugins: [
    macroPlugin({
      tsconfig: false
    })
  ]
})
