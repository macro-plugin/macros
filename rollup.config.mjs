import { readFileSync, rmSync, writeFileSync } from "fs"

import commonjs from "@rollup/plugin-commonjs"
import { defineConfig } from "rollup"
import dts from "rollup-plugin-dts"
import nodeResolve from "@rollup/plugin-node-resolve"
import path from "path"
import typescript from "rollup-plugin-typescript2"

const name = path.basename(path.resolve("."))
const pkg = JSON.parse(readFileSync("./package.json").toString())
const external = [
  ...Object.keys(pkg.dependencies || {}),
  "fs",
  "path",
  "vite",
  "rollup",
  "webpack",
  "typescript",
  "@swc/core",
  "@macro-plugin/core"
]

/**
 * @returns {import("rollup").OutputOptions[]}
 */
function createOutput () {
  return [
    {
      file: "dist/index.js",
      format: "cjs",
    },
    {
      file: "dist/index.mjs",
      format: "es",
    }
  ]
}

export default defineConfig([
  {
    input: "./src/index.ts",
    output: createOutput(),
    plugins: [
      {
        name: "del",
        transform (code, id) {
          if (id.endsWith(".cts") || id.endsWith(".mts")) return ""
        },
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
      })
    ],
    onwarn (warning, warn) {
      if (warning.code === "CIRCULAR_DEPENDENCY") return
      warn(warning)
    },
    external
  },
  {
    input: `./dist/packages/${name}/src/index.d.ts`,
    output: [{
      file: "dist/index.d.ts",
      format: "es"
    }],
    plugins: [
      dts({ respectExternal: true }),
      {
        name: "del",
        buildEnd () {
          rmSync("./dist/packages", { recursive: true, force: true })
        },
        closeBundle () {
          if (name === "shared") {
            writeFileSync("./dist/index.d.ts", readFileSync("./dist/index.d.ts").toString().replace("const scan: typeof scan;", "").replace("const constants: typeof constants;", ""))
          }
        }
      }
    ],
    external
  }
])
