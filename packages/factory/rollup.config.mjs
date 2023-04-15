import { copyFileSync, rmSync } from "fs"

import { defineConfig } from "rollup"
import dts from "rollup-plugin-dts"
import path from "path"
import terser from "@rollup/plugin-terser"
import typescript from "rollup-plugin-typescript2"

const external = [
  "@macro-plugin/core",
  "@swc/core",
  "./runtime",
  "./macros"
]

const ts = typescript({
  tsconfigOverride: {
    include: ["packages/**/src"]
  }
})

/**
 * @returns {import("rollup").OutputOptions[]}
 */
function createOutput (index = "index") {
  return [
    {
      file: `dist/${index}.js`,
      format: "cjs",
    },
    {
      file: `dist/${index}.mjs`,
      format: "es",
    },
    {
      file: `dist/${index}.min.js`,
      format: "iife",
      name: "MacroFactory",
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
        "@macro-plugin/core": "MacroCore",
        [path.resolve("./src/runtime")]: "FactoryRuntime",
        [path.resolve("./src/macros")]: "FactoryMacros"
      },
    },
  ]
}

export default defineConfig([
  {
    input: "./src/runtime.ts",
    output: createOutput("runtime"),
    plugins: [
      {
        name: "rmDist",
        buildStart () {
          rmSync("./dist", { recursive: true, force: true })
        }
      },
      ts,
    ],
    external
  },
  {
    input: "./src/macros.ts",
    output: createOutput("macros"),
    plugins: [
      ts,
    ],
    external
  },
  {
    input: "./src/index.ts",
    output: createOutput(),
    plugins: [
      ts,
    ],
    external
  },
  {
    input: "./dist/packages/factory/src/index.d.ts",
    output: [{
      file: "dist/index.d.ts",
      format: "es"
    }],
    plugins: [
      dts({ respectExternal: true }),
      {
        name: "buildTypes",
        buildStart () {
          ["runtime", "macros"].map(i => copyFileSync(`./dist/packages/factory/src/${i}.d.ts`, `./dist/${i}.d.ts`))
        },
        buildEnd () {
          rmSync("./dist/packages", { recursive: true, force: true })
        }
      }
    ],
    external
  }
])
