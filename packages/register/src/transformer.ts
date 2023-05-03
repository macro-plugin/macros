import { MacroOptions, createSwcPlugin, getSpanOffset, transform } from "@macro-plugin/core"
import { ParserConfig, parseSync as swcParse, transformSync as swcTransform } from "@swc/core"

import type { Options } from "@swc/core"
import { buildTransformOptionsSync } from "@macro-plugin/shared"

var CURRENT_CONFIG: [Options, MacroOptions, string | undefined]

function getConfig () {
  if (!CURRENT_CONFIG) CURRENT_CONFIG = buildTransformOptionsSync({})
  return CURRENT_CONFIG
}

export function transformJS (src: string) {
  const macroOptions = getConfig()[1]
  return transform(src, macroOptions).code
}

export function transformTS (src: string, filename: string) {
  const [swcOptions, macroOptions] = getConfig()
  const macroPlugin = createSwcPlugin(macroOptions, src, getSpanOffset())

  const isJsx = /\.(js|ts)x$/.test(filename)
  const parser: ParserConfig = /\.tsx?$/.test(filename)
    ? {
      syntax: "typescript",
      tsx: isJsx,
    }
    : {
      syntax: "ecmascript",
      jsx: isJsx
    }

  swcOptions.filename = filename
  if (swcOptions.jsc) {
    swcOptions.jsc.parser = parser
  } else {
    swcOptions.jsc = {
      parser
    }
  }

  const program = swcParse(src, parser)
  return swcTransform(macroPlugin(program), swcOptions).code
}
