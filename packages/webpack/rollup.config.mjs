import commonjs from "@rollup/plugin-commonjs"
import { defineConfig } from "rollup"
import dts from "rollup-plugin-dts"
import nodeResolve from "@rollup/plugin-node-resolve"
import { rmSync } from "fs"
import typescript from "rollup-plugin-typescript2"

export default defineConfig([
  {
    input: "./src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
      },
      {
        file: "dist/index.mjs",
        format: "es",
      },
    ],
    plugins: [
      {
        name: "del",
        buildStart () {
          rmSync("./dist", { recursive: true, force: true })
        }
      },
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfigOverride: {
          include: ["packages/**/src"]
        }
      }),
    ],
    external: [
      "webpack",
      "@swc/core",
      "@macro-plugin/core"
    ]
  },
  {
    input: "./dist/packages/webpack/src/index.d.ts",
    output: [{
      file: "dist/index.d.ts",
      format: "es"
    }],
    external: [
      "webpack",
      "@swc/core",
      "@macro-plugin/core",
    ],
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
