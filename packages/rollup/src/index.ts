import { Config, createSwcPlugin, getSpanOffset, transformAsync } from "@macro-plugin/core"
import { SCRIPT_EXTENSIONS, buildTransformOptions, createFilter, createResolver, createTsLib, createTsResolver, getHasModuleSideEffects, getIdMatcher, matchScriptType, patchTsOptions, resolveTsOptions } from "@macro-plugin/shared"
import { dirname, resolve } from "path"
import { minify as swcMinify, parse as swcParse, transform as swcTransform } from "@swc/core"

import type { Plugin } from "rollup"
import { TreeshakingOptions } from "rollup"

const isMacroExternal = (id: string) => /(@macro-plugin)|@swc/.test(id)

async function rollupMacroPlugin (config?: Config): Promise<Plugin> {
  const [basicSwcOptions, macroOptions] = await buildTransformOptions(config)
  const filter = createFilter(macroOptions.include, macroOptions.exclude)
  const extensions = macroOptions.extensions || SCRIPT_EXTENSIONS

  const plugin: Plugin = {
    name: "rollupMacroPlugin",
    async transform (code, id) {
      if (!filter(id)) return null

      const target = matchScriptType(id, extensions)
      if (!target) return null

      if (macroOptions.swcTransform == null || macroOptions.swcTransform === true) {
        const { isTypeScript, isJsx, isTsx } = target

        // use swc transform typescript and jsx
        if (isTypeScript || isJsx) {
          const macroPlugin = createSwcPlugin(macroOptions, code, getSpanOffset())
          const swcOptions = patchTsOptions({
            ...basicSwcOptions,
            filename: id,
            minify: false
          }, macroOptions.tsconfig === false ? undefined : resolveTsOptions(dirname(id), macroOptions.tsconfig), isTypeScript, isTsx, isJsx)
          const program = await swcParse(code, swcOptions.jsc?.parser || { syntax: "typescript" })
          return await swcTransform(macroPlugin(program), swcOptions)
        }
      }

      // native macro transform without swc
      return await transformAsync(code, macroOptions)
    },
    options (options) {
      // ignore warning on @macro-plugin
      const oldWarn = options.onwarn
      options.onwarn = (warning, warn) => {
        if (warning.exporter && isMacroExternal(warning.exporter) && ["UNRESOLVED_IMPORT", "UNUSED_EXTERNAL_IMPORT"].includes(warning.code || "")) return
        oldWarn ? oldWarn(warning, warn) : warn(warning)
      }

      // add @macro-plugin to external
      const matchExternal = getIdMatcher(options.external)
      options.external = (source, importer, isResolved) => isMacroExternal(source) || matchExternal(source, importer, isResolved)

      // add no-side-effects support for @macro-plugin
      const oldTreeshake = options.treeshake
      const getSideEffects = getHasModuleSideEffects(typeof oldTreeshake === "object" ? oldTreeshake.moduleSideEffects : undefined)
      options.treeshake = {
        ...(typeof oldTreeshake === "object" ? oldTreeshake : {}),
        moduleSideEffects: (id, external) => isMacroExternal(id) ? false : getSideEffects(id, external),
        preset: typeof oldTreeshake === "string" ? oldTreeshake : (oldTreeshake as TreeshakingOptions | undefined)?.preset
      }
    },
    renderChunk (code) {
      if (basicSwcOptions.minify || basicSwcOptions.jsc?.minify?.mangle || basicSwcOptions.jsc?.minify?.compress) {
        return swcMinify(code, basicSwcOptions.jsc?.minify)
      }

      return null
    }
  }

  if (macroOptions.resolveTs) {
    const tslib = createTsLib()
    const tsOptions = macroOptions.tsconfig === false ? {} : resolveTsOptions(resolve("."), macroOptions.tsconfig)
    plugin.resolveId = createTsResolver(tslib, tsOptions, filter)
    plugin.load = (id) => {
      if (id === tslib.virtual) return tslib.source
    }
  } else {
    plugin.resolveId = createResolver(extensions)
  }

  return plugin
}

export default rollupMacroPlugin
