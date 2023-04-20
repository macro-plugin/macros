import { defineConfig } from "vite"
import macroPlugin from "@macro-plugin/vite"

export default defineConfig({
  plugins: [
    macroPlugin()
  ]
})
