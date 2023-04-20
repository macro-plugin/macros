import commonjs from "@rollup/plugin-commonjs"
import { defineConfig } from "rollup"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import { rmSync } from "fs"
import terser from "@rollup/plugin-terser"
import typescript from "rollup-plugin-typescript2"

const plugins = [
  {
    name: "del",
    buildStart () {
      rmSync("./dist", { recursive: true, force: true })
    },
    closeBundle () {
      rmSync("./dist/packages", { recursive: true, force: true })
    }
  },
  commonjs(),
  nodeResolve(),
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
      file: "./dist/register.js",
      format: "cjs",
    },
    plugins,
    external,
  },
])
