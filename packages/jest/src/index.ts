import { Config, createSwcPlugin } from "@macro-plugin/core"
import { Options, version as swcVersion, transform, transformSync } from "@swc/core"
import type { TransformOptions, Transformer } from "@jest/transform"

import { createHash } from "crypto"
import { existsSync } from "fs"
import getCacheKeyFunction from "@jest/create-cache-key-function"
import path from "path"
import process from "process"
import { version } from "../package.json"

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

function loadConfigFile (): Options {
  const configFile = path.join(process.cwd(), "macros.config.js")
  if (existsSync(configFile)) {
    const options = require(configFile)
    return options as Options
  }
  return {}
}

function buildTransformOpts (swcOptions: (Config & { experimental?: unknown }) | undefined): Options {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { experimental, ...computedSwcOptions } = swcOptions || (loadConfigFile() as Options & { experimental?: unknown })

  if (!computedSwcOptions.jsc?.target) {
    set(
      computedSwcOptions,
      "jsc.target",
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      nodeTargetDefaults.get(process.version.match(/v(\d+)/)![1]) || "es2018"
    )
  }

  set(computedSwcOptions, "jsc.transform.hidden.jest", true)

  if (!computedSwcOptions.sourceMaps) {
    set(computedSwcOptions, "sourceMaps", "inline")
  }

  return computedSwcOptions
}

function insertInstrumentationOptions (jestOptions: TransformOptions<unknown>, canInstrument: boolean, swcTransformOpts: Options, instrumentOptions?: any) {
  const shouldInstrument = jestOptions.instrument && canInstrument

  if (!shouldInstrument) {
    return swcTransformOpts
  }

  if (swcTransformOpts?.jsc?.experimental?.plugins?.some((x) => x[0] === "swc-plugin-coverage-instrument")) {
    return
  }

  if (!swcTransformOpts.jsc) {
    swcTransformOpts.jsc = {}
  }

  if (!swcTransformOpts.jsc.experimental) {
    swcTransformOpts.jsc.experimental = {}
  }

  if (!Array.isArray(swcTransformOpts.jsc.experimental.plugins)) {
    swcTransformOpts.jsc.experimental.plugins = []
  }

  swcTransformOpts.jsc.experimental.plugins?.push(["swc-plugin-coverage-instrument", instrumentOptions ?? {}])
}

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
