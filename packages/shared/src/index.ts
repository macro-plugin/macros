import type { Config, MacroOptions } from "@macro-plugin/core"
import { existsSync, readFile, readFileSync, rm, writeFile } from "fs"

import type { Options } from "@swc/core"
import { addHook } from "pirates"
import path from "path"
import process from "process"
import { transformSync } from "@swc/core"

export { addHook }

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

const h = Object.prototype.hasOwnProperty
export const hasProp = <T extends object>(target: T, prop: PropertyKey) => h.call(target, prop)

export function isModule (): boolean {
  try {
    require("fs")
    return false
  } catch {}
  return true
}

export async function autoRequire<T> (id: string): Promise<Awaited<T>> {
  try {
    return require(id)
  } catch {
  }
  return (await import(id) || {}).default
}

export function transformConfig (code: string, isModule: boolean = false) {
  return transformSync(code, { module: { type: isModule ? "es6" : "commonjs" }, jsc: { parser: { syntax: "typescript" }, target: "esnext" }, swcrc: false, configFile: false }).code
}

export function hookRequire<T> (id: string): T {
  const revert = addHook(
    (code) => transformConfig(code, isModule()),
    { extensions: [".js", ".ts"] }
  )

  const r = require(id)
  revert()

  return r
}

export async function loadConfigFile (): Promise<[string | undefined, Config]> {
  const cwd = process.cwd()

  const jsConfigFile = path.join(cwd, "macros.config.js")
  if (existsSync(jsConfigFile)) {
    // {type: "module" | "commonjs"} & "macros.config.js"
    const config = await autoRequire<Config>(jsConfigFile)
    return [jsConfigFile, config]
  }

  const tsConfigFile = path.join(cwd, "macros.config.ts")
  if (existsSync(tsConfigFile)) {
    // {type: "module"} & "macros.config.ts"
    if (isModule()) {
      const jsConfigFile = path.join(cwd, ".macros.config.js")
      const code = readFileSync(tsConfigFile).toString()
      const transformed = transformConfig(code, true)
      await writeFile(jsConfigFile, transformed, (err) => {
        if (err != null) throw new Error(err.message)
      })
      const config = (await import(jsConfigFile) || {}).default
      rm(jsConfigFile, (err) => {
        if (err != null) throw new Error(err.message)
      })
      return [tsConfigFile, config]
    }
    // {type: "commonjs"} & "macros.config.ts"
    const config = hookRequire<{ default: Config }>(tsConfigFile)
    return [tsConfigFile, config?.default || {}]
  }

  return [undefined, {}]
}

/**
 * sync version of load config, not handing { type: "module" }
 */
export function loadConfigFileSync (): [string | undefined, Config] {
  const cwd = process.cwd()

  const jsConfigFile = path.join(cwd, "macros.config.js")
  if (existsSync(jsConfigFile)) {
    const config = require(jsConfigFile) as Config
    return [jsConfigFile, config]
  }

  const tsConfigFile = path.join(cwd, "macros.config.ts")
  if (existsSync(tsConfigFile)) {
    const config = hookRequire<{ default: Config }>(tsConfigFile)
    return [tsConfigFile, config?.default || {}]
  }
  return [undefined, {}]
}

export function writeDts (p: string, dts: string) {
  const emit = () => writeFile(p, dts, () => {})

  if (existsSync(p)) {
    readFile(p, (err, data) => {
      if ((err == null && dts !== data.toString()) || err) emit()
    })
  } else {
    emit()
  }
}

const SWC_OPTION_KEYS: (keyof Options)[] = ["test",
  "exclude",
  "env",
  "jsc",
  "module",
  "minify",
  "sourceMaps",
  "inlineSourcesContent",
  "script",
  "cwd",
  "caller",
  "filename",
  "root",
  "rootMode",
  "envName",
  "configFile",
  "swcrc",
  "swcrcRoots",
  "inputSourceMap",
  "sourceFileName",
  "sourceRoot",
  "plugin",
  "isModule",
  "outputPath"
]

export function extractSwcOptions<O extends object> (o: O): Options {
  const output: Options = {}
  for (const [k, v] of Object.entries(o)) {
    if (SWC_OPTION_KEYS.includes(k as keyof Options)) output[k as keyof Options] = v
  }
  return output
}

export function applySwcOptions (config: Config) {
  const swcOptions = extractSwcOptions(config)

  if (!swcOptions.jsc?.target) {
    set(
      swcOptions,
      "jsc.target",
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      nodeTargetDefaults.get(process.version.match(/v(\d+)/)![1]) || "es2018"
    )
  }

  set(swcOptions, "jsc.transform.hidden.jest", true)

  if (!swcOptions.sourceMaps) {
    set(swcOptions, "sourceMaps", "inline")
  }

  return swcOptions
}

export function applyMacroOptions (config: Config) {
  if (config.emitDts && !config.onEmitDts) {
    config.onEmitDts = (dts: string) => writeDts(path.resolve(config.dtsOutputPath || "./macros.d.ts"), dts)
  }
  return config
}

export async function buildTransformOptions (inputOptions: (Config & { experimental?: unknown }) | undefined): Promise<[Options, MacroOptions, string | undefined]> {
  const [configPath, config] = await loadConfigFile()
  const combinedOptions = { ...(inputOptions || {}), ...config }

  return [applySwcOptions(combinedOptions), applyMacroOptions(combinedOptions), configPath]
}

export function buildTransformOptionsSync (inputOptions: (Config & { experimental?: unknown }) | undefined): [Options, MacroOptions, string | undefined] {
  const [configPath, config] = loadConfigFileSync()
  const combinedOptions = { ...(inputOptions || {}), ...config }

  return [applySwcOptions(combinedOptions), applyMacroOptions(combinedOptions), configPath]
}
