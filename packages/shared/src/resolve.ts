import { Config, MacroPlugin, isMacroPlugin } from "@macro-plugin/core"
import { existsSync, readFile, writeFile } from "fs"

import type { Options } from "@swc/core"
import { createRequire } from "module"
import path from "path"

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

const SWC_OPTION_KEYS: (keyof Options)[] = [
  "test",
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

const CWD = process.cwd()
export const importLib = <T extends object>(moduleId: string, dir: string = CWD) => createRequire(path.resolve(dir, "noop.js"))(moduleId) as T

export async function autoRequire<T> (id: string, defaultExport = false): Promise<Awaited<T>> {
  try {
    return require(id)
  } catch {
  }
  const exports = (await import(id) || {})
  return defaultExport ? exports.default : exports
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

/** extract only swc options from an object */
export function extractSwcOptions<O extends object> (o: O): Options {
  const output: Options = {}
  for (const [k, v] of Object.entries(o)) {
    if (SWC_OPTION_KEYS.includes(k as keyof Options)) output[k as keyof Options] = v
  }
  return output
}

export function resolveSwcOptions (config: Config) {
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

export function resolveDepends (depends: string[]): MacroPlugin[] {
  const output: MacroPlugin[] = []
  for (const pkg of depends) {
    for (const v of Object.values(importLib<Record<string, MacroPlugin>>(pkg))) {
      if (isMacroPlugin(v)) output.push(v)
    }
  }
  return output
}

export function resolveExternals (externals: string[]): Record<string, Record<string, MacroPlugin>> {
  const output: Record<string, Record<string, MacroPlugin>> = {}
  for (const pkg of externals) {
    output[pkg] = {}
    for (const [k, v] of Object.entries(importLib<Record<string, MacroPlugin>>(pkg))) {
      if (isMacroPlugin(v)) output[pkg][k] = v
    }
  }
  return output
}

export function resolveMacroOptions (config: Config) {
  if (config.emitDts && !config.onEmitDts) {
    config.onEmitDts = (dts: string) => writeDts(path.resolve(config.dtsOutputPath || "./macros.d.ts"), dts)
  }

  if (config.depends) {
    if (!config.macros) config.macros = []
    config.macros.push(...(resolveDepends(config.depends)))
  }

  if (Array.isArray(config.externals)) {
    config.externals = resolveExternals(config.externals)
  }

  return config
}
