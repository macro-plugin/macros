import type { CompilerOptions, ResolutionMode, ResolvedProjectReference } from "typescript"
import { Config, MacroPlugin, isMacroPlugin } from "@macro-plugin/core"
import { Filter, FormattingHost, TsLib } from "./types"
import type { JscTarget, Options } from "@swc/core"
import { constants, existsSync, promises, readFile, readFileSync, writeFile } from "fs"
import { dirname, isAbsolute, join, normalize, posix, resolve, win32 } from "path"
import { getTsconfig, parseTsconfig } from "get-tsconfig"

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
export const resolveTsOptions = (cwd: string, tsconfig?: string) => {
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

export function patchTsOptions (options: Options, tsOptions: CompilerOptions | undefined, isTypeScript: boolean, isTsx: boolean, isJsx: boolean) {
  if (!options.jsc) options.jsc = {}

  options.jsc.minify = undefined
  options.jsc.parser = isTypeScript
    ? {
      syntax: "typescript",
      tsx: isTsx,
      decorators: tsOptions?.experimentalDecorators
    }
    : {
      syntax: "ecmascript",
      jsx: isJsx,
      decorators: tsOptions?.experimentalDecorators
    }

  if (!tsOptions) return options

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

export function createTsLib (): TsLib {
  let source: string
  let version: string
  try {
    const require = createRequire(resolve(process.cwd(), "noop.js"))
    const tslibPackage = require("tslib/package.json")
    const tslibPath = require.resolve("tslib/" + tslibPackage.module)
    source = readFileSync(tslibPath, "utf8")
    version = tslibPackage.version
    return { lib: "tslib", virtual: "\0tslib.js", source, version }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn("macros: Error loading `tslib` helper library.")
    throw e
  }
}

export function normalizePath (filename: string) {
  return filename.split(win32.sep).join(posix.sep)
}

export function createModuleResolver (ts: typeof import("typescript"), host: FormattingHost) {
  const compilerOptions = host.getCompilationSettings()
  const cache = ts.createModuleResolutionCache(
    process.cwd(),
    host.getCanonicalFileName,
    compilerOptions
  )
  const moduleHost = { ...ts.sys, ...host }

  return (moduleName: string, containingFile: string, redirectedReference?: ResolvedProjectReference, mode?: ResolutionMode) => {
    const resolved = ts.resolveModuleName(
      moduleName,
      containingFile,
      compilerOptions,
      moduleHost,
      cache,
      redirectedReference,
      mode
    )
    return resolved.resolvedModule
  }
}

export function createFormattingHost (ts: typeof import("typescript"), compilerOptions: CompilerOptions): FormattingHost {
  return {
    /** Returns the compiler options for the project. */
    getCompilationSettings: () => compilerOptions,
    /** Returns the current working directory. */
    getCurrentDirectory: () => process.cwd(),
    /** Returns the string that corresponds with the selected `NewLineKind`. */
    getNewLine () {
      switch (compilerOptions.newLine) {
        case ts.NewLineKind.CarriageReturnLineFeed:
          return "\r\n"
        case ts.NewLineKind.LineFeed:
          return "\n"
        default:
          return ts.sys.newLine
      }
    },
    /** Returns a lower case name on case insensitive systems, otherwise the original name. */
    getCanonicalFileName: (fileName: string) =>
      ts.sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase(),
  }
}

/** create a rollup/vite typescript file resolver */
export function createTsResolver (tslib: TsLib, compilerOptions: CompilerOptions, filter: Filter) {
  const ts = importLib<typeof import("typescript")>("typescript")
  const formatHost = createFormattingHost(ts, {})
  const resolveModule = createModuleResolver(ts, formatHost)

  return (importee: string, importer: string | undefined) => {
    if (importee === tslib.lib) return tslib.virtual
    if (!importer) return null

    // Convert path from windows separators to posix separators
    const containingFile = normalizePath(importer)

    // when using node16 or nodenext module resolution, we need to tell ts if
    // we are resolving to a commonjs or esnext module
    const mode =
      typeof ts.getImpliedNodeFormatForFile === "function"
        ? ts.getImpliedNodeFormatForFile(
          // @ts-expect-error
          containingFile,
          undefined, // eslint-disable-line no-undefined
          { ...ts.sys, ...formatHost },
          compilerOptions
        )
        : undefined // eslint-disable-line no-undefined

    // eslint-disable-next-line no-undefined
    const resolved = resolveModule(importee, containingFile, undefined, mode)

    if (resolved) {
      if (/\.d\.[cm]?ts/.test(resolved.extension)) return null
      if (!filter(resolved.resolvedFileName)) return null
      return normalize(resolved.resolvedFileName)
    }

    return null
  }
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
