import { Config, MacroPlugin, isMacroPlugin } from "@macro-plugin/core"
import type { JscTarget, Options } from "@swc/core"
import { constants, existsSync, promises, readFile, writeFile } from "fs"
import { dirname, isAbsolute, join, resolve } from "path"
import { getTsconfig, parseTsconfig } from "get-tsconfig"

import type { CompilerOptions } from "typescript"
import { createRequire } from "module"

const nodeTargetDefaults = new Map([
  ["12", "es2018"],
  ["13", "es2019"],
  ["14", "es2020"],
  ["15", "es2021"],
  ["16", "es2021"],
  ["17", "es2022"],
])

const SWC_OPTION_KEYS: (keyof Options)[] = [
  // "test",
  // "exclude",
  "env",
  "jsc",
  "module",
  "minify",
  "sourceMaps",
  "inlineSourcesContent",
  "script",
  "cwd",
  "caller",
  // "filename",
  "root",
  "rootMode",
  "envName",
  // "configFile",
  // "swcrc",
  // "swcrcRoots",
  "inputSourceMap",
  "sourceFileName",
  "sourceRoot",
  // "plugin",
  "isModule",
  "outputPath"
]

const TS_CACHE = new Map<string, CompilerOptions>()

export const CWD = process.cwd()

export const SCRIPT_EXTENSIONS = [".js", ".ts", ".jsx", ".tsx", ".mjs", ".cjs"]

export const fileExists = (path: string) => {
  return promises.access(path, constants.F_OK)
    .then(() => true)
    .catch(() => false)
}

export const importLib = <T extends object>(moduleId: string, dir: string = CWD) => createRequire(resolve(dir, "noop.js"))(moduleId) as T

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

/**
 * resolve typescript compiler options, for support `paths`, `target`...
 */
export const resolveTsOptions = (
  cwd: string,
  tsconfig?: string | false
) => {
  if (tsconfig === false) return {}
  const cacheKey = `${cwd}:${tsconfig ?? "undefined"}`

  if (TS_CACHE.has(cacheKey)) {
    return TS_CACHE.get(cacheKey) ?? {}
  }

  if (tsconfig && isAbsolute(tsconfig)) {
    const compilerOptions = parseTsconfig(tsconfig).compilerOptions ?? {}
    TS_CACHE.set(cacheKey, compilerOptions as CompilerOptions)
    return compilerOptions as CompilerOptions
  }

  let result = getTsconfig(cwd, tsconfig || "tsconfig.json")
  // Only fallback to `jsconfig.json` when tsconfig can not be resolved AND custom tsconfig filename is not provided
  if (!result && !tsconfig) {
    result = getTsconfig(cwd, "jsconfig.json")
  }

  const compilerOptions = result?.config.compilerOptions ?? {}
  TS_CACHE.set(cacheKey, compilerOptions as CompilerOptions)
  return compilerOptions as CompilerOptions
}

export function resolveSwcOptions (config: Config) {
  const swcOptions = extractSwcOptions(config)

  swcOptions.swcrc = false
  swcOptions.configFile = false

  if (!swcOptions.jsc) swcOptions.jsc = {}

  if (!swcOptions.jsc.target) {
    swcOptions.jsc.target = nodeTargetDefaults.get(process.version.match(/v(\d+)/)![1]) as JscTarget || "es2018"
  }

  if (!swcOptions.sourceMaps) swcOptions.sourceMaps = "inline"

  return swcOptions
}

export function patchTsOptions (options: Options, tsOptions: CompilerOptions, isTypeScript: boolean, isTsx: boolean, isJsx: boolean) {
  if (!options.jsc) options.jsc = {}

  options.jsc.minify = undefined
  options.jsc.transform = {
    ...options.jsc.transform || {},
    decoratorMetadata: tsOptions.emitDecoratorMetadata,
    react: {
      ...options.jsc.transform?.react || {},
      runtime: "automatic",
      importSource: tsOptions.jsxImportSource,
      pragma: tsOptions.jsxFactory,
      pragmaFrag: tsOptions.jsxFragmentFactory,
      development: tsOptions.jsx as string | undefined === "react-jsxdev" ? true : undefined
    }
  }
  options.jsc.externalHelpers = tsOptions.importHelpers
  options.jsc.target = (tsOptions.target as string | undefined)?.toLowerCase() as JscTarget
  options.jsc.baseUrl = tsOptions.baseUrl
  options.jsc.paths = tsOptions.paths
  options.jsc.parser = isTypeScript
    ? {
      syntax: "typescript",
      tsx: isTsx,
      decorators: tsOptions.experimentalDecorators
    }
    : {
      syntax: "ecmascript",
      jsx: isJsx,
      decorators: tsOptions.experimentalDecorators
    }

  return options
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
    config.onEmitDts = (dts: string) => writeDts(resolve(config.dtsOutputPath || "./macros.d.ts"), dts)
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

/** create a rollup/vite file resolver */
export function createResolver (extensions: string[]) {
  const resolveFile = async (resolved: string, index = false) => {
    const fileWithoutExt = resolved.replace(/\.\w+$/, "")

    for (const ext of extensions) {
      const file = index ? join(resolved, `index${ext}`) : `${fileWithoutExt}${ext}`
      // We only check one file at a time, and we can return early
      // eslint-disable-next-line no-await-in-loop
      if (await fileExists(file)) return file
    }
    return null
  }

  return async (importee: string, importer: string | undefined) => {
    // ignore IDs with null character, these belong to other plugins
    if (importee.startsWith("\0")) {
      return null
    }

    if (importer && importee[0] === ".") {
      const resolved = resolve(
        importer ? dirname(importer) : process.cwd(),
        importee
      )

      let file = await resolveFile(resolved)
      if (file) return file
      if (!file && await fileExists(resolved) && (await promises.stat(resolved)).isDirectory()) {
        file = await resolveFile(resolved, true)
        if (file) return file
      }
    }
  }
}
