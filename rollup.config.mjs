import { readFileSync, rmSync } from "fs"

import { defineConfig } from "rollup"
import dts from "rollup-plugin-dts"
import path from "path"
import terser from "@rollup/plugin-terser"
import typescript from "rollup-plugin-typescript2"

const name = path.basename(path.resolve("."))
const pkg = JSON.parse(readFileSync("./package.json").toString())

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
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      plugins: [
        terser({
          module: true,
          compress: {
            ecma: 2015,
            pure_getters: true,
          },
          safari10: true,
        })
      ]
    },
    {
      file: "dist/index.iife.js",
      format: "iife",
      name: "Macro" + name[0].toUpperCase() + name.slice(1),
      plugins: [
        terser({
          module: true,
          compress: {
            ecma: 2015,
            pure_getters: true,
          },
          safari10: true,
        })
      ],
      globals: {
        "@swc/core": "SwcCore",
        "@macro-plugin/core": "MacroCore"
      }
    },
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
    external: Object.keys(pkg.dependencies)
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
    ]
  }
])
