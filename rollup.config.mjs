import { readFileSync, rmSync } from "fs"

import { defineConfig } from "rollup"
import dts from "rollup-plugin-dts"
import path from "path"
import typescript from "rollup-plugin-typescript2"

const name = path.basename(path.resolve("."))
const pkg = JSON.parse(readFileSync("./package.json").toString())
const external = [
  ...Object.keys(pkg.dependencies || {}),
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
        buildStart () {
          rmSync("./dist", { recursive: true, force: true })
        }
      },
      typescript({
        tsconfigOverride: {
          include: ["packages/**/src"]
        }
      }),
    ],
    external
  },
  {
    input: `./dist/packages/${name}/src/index.d.ts`,
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
    ],
    external
  }
])
