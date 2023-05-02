import commonjs from "@rollup/plugin-commonjs"
import { defineConfig } from "rollup"
import json from "@rollup/plugin-json"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import { rmSync } from "fs"
import typescript from "rollup-plugin-typescript2"

export default defineConfig([
  {
    input: "./src/index.ts",
    output: {
      file: "dist/index.js",
      format: "cjs",
    },
    plugins: [
      {
        name: "del",
        transform (code, id) {
          if (id.endsWith(".cts") || id.endsWith(".mts")) return ""
        },
        buildStart () {
          rmSync("./dist", { recursive: true, force: true })
        },
        closeBundle () {
          rmSync("./dist/packages", { recursive: true, force: true })
        }
      },
      json(),
      commonjs(),
      nodeResolve(),
      typescript({
        tsconfigOverride: {
          include: ["packages/**/src"]
        }
      }),
    ],
    external: [
      "@swc/core",
      "@macro-plugin/core",
      "@macro-plugin/shared"
    ]
  }
])
