import commonjs from "@rollup/plugin-commonjs"
import { defineConfig } from "rollup"
import dts from "rollup-plugin-dts"
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
        buildStart () {
          rmSync("./dist", { recursive: true, force: true })
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
      "@macro-plugin/core"
    ]
  },
  {
    input: "./dist/packages/jest/src/index.d.ts",
    output: [{
      file: "dist/index.d.ts",
      format: "es"
    }],
    plugins: [
      dts(),
      {
        name: "del",
        buildEnd () {
          rmSync("./dist/packages", { recursive: true, force: true })
        }
      }
    ]
  }
])
