import { existsSync, readdirSync, statSync } from "fs"
import { extname, resolve } from "path"

import type { Matcher } from "picomatch"
import picomatch from "picomatch"

export { picomatch }

export interface MatchOptions {
  cwd: string;
  ignore?: string[];
}

export const DEFAULT_INCLUDE = [/\.[cm]?[jt]sx?$/]

export const DEFAULT_EXCLUDE = [/node_modules/]

export const createFilter = (include: (string | RegExp)[] = DEFAULT_INCLUDE, exclude: (string | RegExp)[] = DEFAULT_EXCLUDE) => {
  const includes = include.map(i => typeof i === "string" ? picomatch.makeRe(i) : i)
  const excludes = exclude.map(i => typeof i === "string" ? picomatch.makeRe(i) : i)

  return (id: string) => {
    for (const ignore of excludes) {
      if (ignore.test(id)) return false
    }
    for (const isMatch of includes) {
      if (isMatch.test(id)) return true
    }
    return false
  }
}

export const matchPattern = (pattern: string[], options: MatchOptions = { cwd: process.cwd(), ignore: [] }) => {
  const entryDir = options.cwd

  function globDirectory (dirname: string, isMatch: Matcher, ignoreDirMatch: Matcher, options?: MatchOptions) {
    if (!existsSync(dirname)) return []

    const list = readdirSync(dirname)
    const result: string[] = []

    for (const file of list) {
      const resolvePath = resolve(dirname, file)
      const fileStat = statSync(resolvePath)
      if (fileStat.isDirectory() && ignoreDirMatch(resolvePath.replace(entryDir, ""))) {
        const childs = globDirectory(resolvePath, isMatch, ignoreDirMatch, options)
        result.push(...childs)
      } else if (fileStat.isFile() && isMatch(resolvePath.replace(entryDir, ""))) result.push(resolvePath)
    }

    return result
  }

  return globDirectory(
    entryDir,
    picomatch(pattern, {
      ignore: options.ignore || [],
    }),
    picomatch("**", {
      ignore: options.ignore || [],
    }),
    options
  )
}

/** split (file | pattern)[] to { files, patterns } */
export function extractInput (input: string[]) {
  const patts: string[] = []
  const files: string[] = []
  const defaultPatt = "**/*.{js,ts,jsx,tsx}"

  for (const f of input) {
    if (existsSync(f) && statSync(f).isFile()) files.push(resolve(f))
    else patts.push(f)
  }

  if (files.length === 0 && patts.length === 0) patts.push(defaultPatt)

  return { files, patts }
}

/** Extract files from (file | pattern)[] */
export function extractFiles (input: string[]) {
  const { files, patts } = extractInput(input)

  return [
    ...files,
    ...matchPattern(patts, {
      cwd: process.cwd(),
      ignore: ["**/node_modules/**"],
    }),
  ]
}

/**
 * Filter out undefined | null | false from input array
 * @param items any array
 * @returns array without undefined | null | false
 */
export function ensureArray<T> (
  items: (T | false | null | undefined)[] | T | false | null | undefined
): T[] {
  if (Array.isArray(items)) {
    return items.filter(Boolean) as T[]
  }
  if (items) {
    return [items]
  }
  return []
}

/**
 * Turn `config.external` into a function, for rollup and vite plugin usage.
 * @param external config.external from rollup config
 * @returns
 */
export const getIdMatcher = <T extends Array<any>>(
  external: undefined | boolean | string | RegExp | (string | RegExp)[] | ((id: string, ...parameters: T) => boolean | null | void)
): ((id: string, ...parameters: T) => boolean) => {
  if (external === true) {
    return () => true
  }
  if (typeof external === "function") {
    return (id, ...parameters) => (!id.startsWith("\0") && external(id, ...parameters)) || false
  }
  if (external) {
    const ids = new Set<string>()
    const matchers: RegExp[] = []
    for (const value of ensureArray(external)) {
      if (value instanceof RegExp) {
        matchers.push(value)
      } else {
        ids.add(value)
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (id: string, ..._arguments) => ids.has(id) || matchers.some(matcher => matcher.test(id))
  }
  return () => false
}

export type HasModuleSideEffects = (id: string, external: boolean) => boolean;

export const getHasModuleSideEffects = (
  moduleSideEffectsOption: boolean | "no-external" | string[] | HasModuleSideEffects | undefined
) => {
  if (typeof moduleSideEffectsOption === "boolean") {
    return () => moduleSideEffectsOption
  }
  if (moduleSideEffectsOption === "no-external") {
    return (_id: string, external: boolean) => !external
  }
  if (typeof moduleSideEffectsOption === "function") {
    return (id: string, external: boolean) =>
      id.startsWith("\0") ? true : moduleSideEffectsOption(id, external) !== false
  }
  if (Array.isArray(moduleSideEffectsOption)) {
    const ids = new Set(moduleSideEffectsOption)
    return (id: string) => ids.has(id)
  }
  return () => true
}

export const matchScriptType = (id: string, extensions: string[]) => {
  const ext = extname(id)
  if (!extensions.includes(ext)) return null
  return { isTypeScript: ext.includes("ts"), isTsx: ext === ".tsx", isJsx: ext === ".jsx" }
}
