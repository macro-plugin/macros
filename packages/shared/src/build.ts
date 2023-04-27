import type { Config, MacroOptions } from "@macro-plugin/core"
import { autoRequire, resolveMacroOptions, resolveSwcOptions } from "./resolve"
import { existsSync, readFileSync, rm, writeFile } from "fs"

import type { Options } from "@swc/core"
import { addHook } from "pirates"
import path from "path"
import process from "process"
import { transformSync } from "@swc/core"

const h = Object.prototype.hasOwnProperty
export const hasProp = <T extends object>(target: T, prop: PropertyKey) => h.call(target, prop)

export { addHook }

export function isModule (): boolean {
  try {
    require("fs")
    return false
  } catch {}
  return true
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
    const config = await autoRequire<Config>(jsConfigFile, true)
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

export async function buildTransformOptions (inputOptions: (Config & { experimental?: unknown }) | undefined): Promise<[Options, MacroOptions, string | undefined]> {
  const [configPath, config] = await loadConfigFile()
  const combinedOptions = { ...(inputOptions || {}), ...config }

  return [resolveSwcOptions(combinedOptions), resolveMacroOptions(combinedOptions), configPath]
}

export function buildTransformOptionsSync (inputOptions: (Config & { experimental?: unknown }) | undefined): [Options, MacroOptions, string | undefined] {
  const [configPath, config] = loadConfigFileSync()
  const combinedOptions = { ...(inputOptions || {}), ...config }

  return [resolveSwcOptions(combinedOptions), resolveMacroOptions(combinedOptions), configPath]
}
