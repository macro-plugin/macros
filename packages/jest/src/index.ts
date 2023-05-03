import { Config, createSwcPlugin, getSpanOffset } from "@macro-plugin/core"
import { Options, parse, parseSync, version as swcVersion, transform, transformSync } from "@swc/core"
import type { TransformOptions, Transformer } from "@jest/transform"

import { buildTransformOptions } from "@macro-plugin/shared"
import { createHash } from "crypto"
import getCacheKeyFunction from "@jest/create-cache-key-function"
import { readFileSync } from "fs"
import { version } from "../package.json"

function insertInstrumentOptions (jestOptions: TransformOptions<unknown>, canInstrument: boolean, inputOptions: Options, instrumentOptions?: any) {
  const shouldInstrument = jestOptions.instrument && canInstrument

  if (!shouldInstrument) {
    return inputOptions
  }

  if (inputOptions?.jsc?.experimental?.plugins?.some((x) => x[0] === "swc-plugin-coverage-instrument")) {
    return
  }

  if (!inputOptions.jsc) {
    inputOptions.jsc = {}
  }

  if (!inputOptions.jsc.experimental) {
    inputOptions.jsc.experimental = {}
  }

  if (!Array.isArray(inputOptions.jsc.experimental.plugins)) {
    inputOptions.jsc.experimental.plugins = []
  }

  inputOptions.jsc.experimental.plugins?.push(["swc-plugin-coverage-instrument", instrumentOptions ?? {}])
}

async function createTransformer (inputOptions: Config & {
  experimental?: {
    customCoverageInstrumentation?: {
      enabled: boolean
      coverageVariable?: string,
      compact?: boolean,
      reportLogic?: boolean,
      ignoreClassMethods?: Array<string>,
      instrumentLog?: { level: string, enableTrace: boolean }
    }
  }
}): Promise<Transformer> {
  const [computedSwcOptions, macroOptions, configPath] = await buildTransformOptions(inputOptions)
  const cacheKeyFunction = getCacheKeyFunction([], [swcVersion, version, JSON.stringify(inputOptions), configPath ? readFileSync(configPath).toString() : ""])
  const { enabled: canInstrument, ...instrumentOptions } = inputOptions?.experimental?.customCoverageInstrumentation ?? {}

  return {
    canInstrument: !!canInstrument, // Tell jest we'll instrument by our own
    process (src, filename, jestOptions) {
      // Determine if we actually instrument codes if jest runs with --coverage
      insertInstrumentOptions(jestOptions, !!canInstrument, computedSwcOptions, instrumentOptions)
      const offset = getSpanOffset()
      const plugin = createSwcPlugin(macroOptions, src, offset)
      const program = parseSync(src, computedSwcOptions.jsc?.parser || { syntax: "typescript", tsx: true })

      return transformSync(plugin(program), {
        ...computedSwcOptions,
        module: {
          ...computedSwcOptions.module,
          type: (jestOptions.supportsStaticESM ? "es6" : "commonjs" as any)
        },
        filename
      })
    },
    async processAsync (src, filename, jestOptions) {
      insertInstrumentOptions(jestOptions, !!canInstrument, computedSwcOptions, instrumentOptions)
      const offset = getSpanOffset()
      const plugin = createSwcPlugin(macroOptions, src, offset)
      const program = await parse(src, computedSwcOptions.jsc?.parser || { syntax: "typescript", tsx: true })

      return await transform(plugin(program), {
        ...computedSwcOptions,
        module: {
          ...computedSwcOptions.module,
          // async transform is always ESM
          type: ("es6" as any)
        },
        filename
      })
    },

    getCacheKey (src, filename, ...rest) {
      // @ts-expect-error - type overload is confused
      const baseCacheKey = cacheKeyFunction(src, filename, ...rest)

      // @ts-expect-error - signature mismatch between Jest <27 og >=27
      const options: TransformOptions = typeof rest[0] === "string" ? rest[1] : rest[0]

      return createHash("md5")
        .update(baseCacheKey)
        .update("\0", "utf8")
        .update(JSON.stringify({ supportsStaticESM: options.supportsStaticESM }))
        .digest("hex")
    }
  }
}

export default { createTransformer }
