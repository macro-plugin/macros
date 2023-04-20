import { existsSync, readdirSync, statSync } from "fs"

import type { Matcher } from "picomatch"
import picomatch from "picomatch"
import { resolve } from "path"

export { picomatch }

export interface MatchOptions {
  cwd: string;
  ignore?: string[];
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
