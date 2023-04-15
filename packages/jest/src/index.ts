import { Config, createSwcPlugin } from "@macro-plugin/core"
import type { TransformOptions, Transformer } from "@jest/transform"
import { buildTransformOpts, insertInstrumentationOptions } from "./utils"
import { version as swcVersion, transform, transformSync } from "@swc/core"

import { createHash } from "crypto"
import getCacheKeyFunction from "@jest/create-cache-key-function"
import { version } from "../package.json"

function createTransformer (swcTransformOpts: Config & {
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
} = { jsc: { parser: { syntax: "typescript" } } }): Transformer {
  const computedSwcOptions = buildTransformOpts(swcTransformOpts)
  const macroPlugin = createSwcPlugin({ ...computedSwcOptions })
  const cacheKeyFunction = getCacheKeyFunction([], [swcVersion, version, JSON.stringify(computedSwcOptions)])
  const { enabled: canInstrument, ...instrumentOptions } = swcTransformOpts?.experimental?.customCoverageInstrumentation ?? {}

  return {
    canInstrument: !!canInstrument, // Tell jest we'll instrument by our own
    process (src, filename, jestOptions) {
      // Determine if we actually instrument codes if jest runs with --coverage
      insertInstrumentationOptions(jestOptions, !!canInstrument, computedSwcOptions, instrumentOptions)

      return transformSync(src, {
        ...computedSwcOptions,
        module: {
          ...computedSwcOptions.module,
          type: (jestOptions.supportsStaticESM ? "es6" : "commonjs" as any)
        },
        plugin: macroPlugin,
        filename
      })
    },
    async processAsync (src, filename, jestOptions) {
      insertInstrumentationOptions(jestOptions, !!canInstrument, computedSwcOptions, instrumentOptions)

      return await transform(src, {
        ...computedSwcOptions,
        module: {
          ...computedSwcOptions.module,
          // async transform is always ESM
          type: ("es6" as any)
        },
        plugin: macroPlugin,
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
