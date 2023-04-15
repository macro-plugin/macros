import type { Config, MacroOptions } from "@macro-plugin/core"
import { existsSync, readFile, writeFile } from "fs"

import type { Options } from "@swc/core"
import type { TransformOptions } from "@jest/transform"
import { addHook } from "pirates"
import path from "path"
import process from "process"
import { transformSync } from "@swc/core"

const nodeTargetDefaults = new Map([
  ["12", "es2018"],
  ["13", "es2019"],
  ["14", "es2020"],
  ["15", "es2021"],
  ["16", "es2021"],
  ["17", "es2022"],
])

function set (obj: any, path: string, value: any) {
  let o = obj
  const parents = path.split(".")
  const key = parents.pop() as string

  for (const prop of parents) {
    if (o[prop] == null) o[prop] = {}
    o = o[prop]
  }

  o[key] = value
}

function hookRequire<T> (id: string): T {
  const revert = addHook(
    code => transformSync(code, { module: { type: "commonjs" }, jsc: { parser: { syntax: "typescript" }, target: "esnext" }, swcrc: false, configFile: false }).code,
    { exts: [".js", ".ts"] }
  )

  const r = require(id)
  revert()

  return r
}

function loadConfigFile (): [string | undefined, Config] {
  const cwd = process.cwd()

  const jsConfig = path.join(cwd, "macros.config.js")
  if (existsSync(jsConfig)) return [jsConfig, require(jsConfig) as Config]

  const tsConfig = path.join(cwd, "macros.config.ts")
  if (existsSync(tsConfig)) return [tsConfig, hookRequire<{ default: Config }>(tsConfig)?.default || {}]

  return [undefined, {}]
}

function writeDts (p: string, dts: string) {
  const emit = () => writeFile(p, dts, () => {})

  if (existsSync(p)) {
    readFile(p, (err, data) => {
      if ((err == null && dts !== data.toString()) || err) emit()
    })
  } else {
    emit()
  }
}

export function buildTransformOpts (swcOptions: (Config & { experimental?: unknown }) | undefined): [Options, MacroOptions, string | undefined] {
  const [configPath, config] = loadConfigFile()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let { experimental, macros, emitDts, dtsOutputPath, onEmitDts, ...options } = { ...(swcOptions || {}), ...config }

  if (!options.jsc?.target) {
    set(
      options,
      "jsc.target",
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      nodeTargetDefaults.get(process.version.match(/v(\d+)/)![1]) || "es2018"
    )
  }

  set(options, "jsc.transform.hidden.jest", true)

  if (!options.sourceMaps) {
    set(options, "sourceMaps", "inline")
  }

  if (emitDts && !onEmitDts) {
    onEmitDts = (dts: string) => writeDts(path.resolve(dtsOutputPath || "./macros.d.ts"), dts)
  }

  return [options, { macros, emitDts, dtsOutputPath, onEmitDts }, configPath]
}

export function insertInstrumentationOpts (jestOptions: TransformOptions<unknown>, canInstrument: boolean, swcTransformOpts: Options, instrumentOptions?: any) {
  const shouldInstrument = jestOptions.instrument && canInstrument

  if (!shouldInstrument) {
    return swcTransformOpts
  }

  if (swcTransformOpts?.jsc?.experimental?.plugins?.some((x) => x[0] === "swc-plugin-coverage-instrument")) {
    return
  }

  if (!swcTransformOpts.jsc) {
    swcTransformOpts.jsc = {}
  }

  if (!swcTransformOpts.jsc.experimental) {
    swcTransformOpts.jsc.experimental = {}
  }

  if (!Array.isArray(swcTransformOpts.jsc.experimental.plugins)) {
    swcTransformOpts.jsc.experimental.plugins = []
  }

  swcTransformOpts.jsc.experimental.plugins?.push(["swc-plugin-coverage-instrument", instrumentOptions ?? {}])
}
