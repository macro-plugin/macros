import { Config, createSwcPlugin, getSpanOffset, transformAsync } from "@macro-plugin/core"
import { Options, ParserConfig, transform } from "@swc/core"

import type { Plugin } from "rollup"
import { buildTransformOptions } from "@macro-plugin/shared"

const isExternal = (id: string) => /(@macro-plugin)|@swc/.test(id)

async function rollupMacroPlugin (config?: Config): Promise<Plugin> {
  const [computedSwcOptions, macroOptions] = await buildTransformOptions(config)

  const plugin: Plugin = {
    name: "rollupMacroPlugin",
    async transform (code, id) {
      // native macro transform without swc
      if (id.endsWith(".js")) {
        const result = await transformAsync(code, macroOptions)
        return {
          code: result.code,
          map: result.map
        }
      }

      const isTs = /\.tsx?$/.test(id)
      const isJsx = /\.(js|ts)x$/.test(id)

      // use macro as swc plugin when using typescript or jsx
      if (isTs || isJsx) {
        const plugin = createSwcPlugin(macroOptions, code, getSpanOffset())
        const options: Options = {
          ...computedSwcOptions,
          module: {
            ...computedSwcOptions.module,
            // async transform is always ESM
            type: ("es6" as any)
          },
          plugin,
          filename: id
        }
        const parser: ParserConfig = isTs
          ? {
            syntax: "typescript",
            tsx: isJsx,
          }
          : {
            syntax: "ecmascript",
            jsx: isJsx
          }

        if (options.jsc) {
          options.jsc.parser = parser
        } else {
          options.jsc = {
            parser
          }
        }
        const result = await transform(code, options)
        return {
          code: result.code,
          map: result.map
        }
      }
    },
    options (options) {
      // ignore warning on @macro-plugin
      const oldWarn = options.onwarn
      options.onwarn = (warning, warn) => {
        if (warning.exporter && isExternal(warning.exporter) && ["UNRESOLVED_IMPORT", "UNUSED_EXTERNAL_IMPORT"].includes(warning.code || "")) return
        oldWarn ? oldWarn(warning, warn) : warn(warning)
      }

      // add @macro-plugin to external
      const oldExternal = options.external
      options.external = (source, importer, isResolved) => {
        if (isExternal(source)) return true
        switch (typeof oldExternal) {
          case "string": return source === oldExternal
          case "function": return oldExternal(source, importer, isResolved)
          case "object":
            if (Array.isArray(oldExternal)) {
              for (const p of oldExternal) {
                if (new RegExp(p).test(source)) return true
              }
              return false
            }
            return oldExternal.test(source)
        }
        return false
      }

      // add no-side-effects support for @macro-plugin
      const oldTreeshake = options.treeshake
      if (typeof oldTreeshake === "object") {
        options.treeshake = {
          ...oldTreeshake,
          moduleSideEffects (id, external) {
            if (isExternal(id)) return false
            switch (typeof oldTreeshake.moduleSideEffects) {
              case "function": return oldTreeshake.moduleSideEffects ? oldTreeshake.moduleSideEffects(id, external) : true
              case "boolean": return oldTreeshake.moduleSideEffects
              case "object": return oldTreeshake.moduleSideEffects.includes(id)
              case "string": return !external
            }

            return true
          }
        }
      } else {
        options.treeshake = {
          moduleSideEffects (id) {
            if (isExternal(id)) return false
            if (typeof oldTreeshake === "boolean") return oldTreeshake
            return true
          },
          preset: typeof oldTreeshake === "string" ? oldTreeshake : undefined
        }
      }
    },
  }
  return plugin
}

export default rollupMacroPlugin
