import commonjs from "@rollup/plugin-commonjs"
import { defineConfig } from "rollup"
import json from "@rollup/plugin-json"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import { rmSync } from "fs"
import terser from "@rollup/plugin-terser"
import typescript from "rollup-plugin-typescript2"

/** @type { import("rollup").Plugin[] } */
const plugins = [
  {
    name: "del",
    buildStart () {
      rmSync("./dist", { recursive: true, force: true })
    },
    transform (code, id) {
      if (id.endsWith(".cts") || id.endsWith(".mts")) return ""
    },
  },
  json(),
  commonjs(),
  nodeResolve({
    preferBuiltins: true
  }),
  typescript({
    tsconfigOverride: {
      include: ["packages/**/src"]
    }
  }),
  terser({
    module: true,
    compress: {
      ecma: 2015,
      pure_getters: true,
    }
  })
]

const external = [
  "@swc/core",
  "@macro-plugin/core"
]

// compile to core dist folder
export default defineConfig([
  {
    input: "./src/index.ts",
    output: {
      file: "../core/dist/cli.js",
      format: "cjs",
    },
    plugins,
    external,
    onwarn (warning, warn) {
      if (warning.code === "EVAL" || warning.code === "SOURCEMAP_ERROR") return
      warn(warning)
    }
  },
  {
    input: "../register/src/index.ts",
    output: {
      file: "../core/dist/register.js",
      format: "cjs",
    },
    plugins: [
      ...plugins,
      {
        name: "del",
        writeBundle () {
          rmSync("../core/dist/packages", { recursive: true, force: true })
        }
      }
    ],
    external,
  },
])
