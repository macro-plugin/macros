import { createSwcPlugin, getSpanOffset, transformAsync } from '@macro-plugin/core';
import { buildTransformOptions, createFilter, SCRIPT_EXTENSIONS, createResolver, matchScriptType, patchTsOptions, resolveTsOptions, getIdMatcher, getHasModuleSideEffects, createTsLib, createTsResolver } from '@macro-plugin/shared';
import { dirname, resolve } from 'path';
import { parse, transform, minify } from '@swc/core';

const isMacroExternal = (id) => /(@macro-plugin)|@swc/.test(id);
async function viteMacroPlugin(config) {
    const [basicSwcOptions, macroOptions] = await buildTransformOptions(config);
    const filter = createFilter(macroOptions.include, macroOptions.exclude);
    const extensions = macroOptions.extensions || SCRIPT_EXTENSIONS;
    const plugin = {
        name: "viteMacroPlugin",
        resolveId: createResolver(extensions),
        async transform(code, id) {
            var _a;
            if (!filter(id))
                return null;
            const target = matchScriptType(id, extensions);
            if (!target)
                return null;
            if (macroOptions.swcTransform == null || macroOptions.swcTransform === true) {
                const { isTypeScript, isJsx, isTsx } = target;
                // use swc transform typescript and jsx
                if (isTypeScript || isJsx) {
                    const macroPlugin = createSwcPlugin(macroOptions, code, getSpanOffset());
                    const swcOptions = patchTsOptions(Object.assign(Object.assign({}, basicSwcOptions), { filename: id, minify: false }), macroOptions.tsconfig === false ? undefined : resolveTsOptions(dirname(id), macroOptions.tsconfig), isTypeScript, isTsx, isJsx);
                    const program = await parse(code, ((_a = swcOptions.jsc) === null || _a === void 0 ? void 0 : _a.parser) || { syntax: "typescript" });
                    return await transform(macroPlugin(program), swcOptions);
                }
            }
            // native macro transform without swc
            return await transformAsync(code, macroOptions);
        },
        options(options) {
            // ignore warning on @macro-plugin
            const oldWarn = options.onwarn;
            options.onwarn = (warning, warn) => {
                if (warning.exporter && isMacroExternal(warning.exporter) && ["UNRESOLVED_IMPORT", "UNUSED_EXTERNAL_IMPORT"].includes(warning.code || ""))
                    return;
                oldWarn ? oldWarn(warning, warn) : warn(warning);
            };
            // add @macro-plugin to external
            const matchExternal = getIdMatcher(options.external);
            options.external = (source, importer, isResolved) => isMacroExternal(source) || matchExternal(source, importer, isResolved);
            // add no-side-effects support for @macro-plugin
            const oldTreeshake = options.treeshake;
            const getSideEffects = getHasModuleSideEffects(typeof oldTreeshake === "object" ? oldTreeshake.moduleSideEffects : undefined);
            options.treeshake = Object.assign(Object.assign({}, (typeof oldTreeshake === "object" ? oldTreeshake : {})), { moduleSideEffects: (id, external) => isMacroExternal(id) ? false : getSideEffects(id, external), preset: typeof oldTreeshake === "string" ? oldTreeshake : oldTreeshake === null || oldTreeshake === void 0 ? void 0 : oldTreeshake.preset });
        },
        renderChunk(code) {
            var _a, _b, _c, _d, _e;
            if (basicSwcOptions.minify || ((_b = (_a = basicSwcOptions.jsc) === null || _a === void 0 ? void 0 : _a.minify) === null || _b === void 0 ? void 0 : _b.mangle) || ((_d = (_c = basicSwcOptions.jsc) === null || _c === void 0 ? void 0 : _c.minify) === null || _d === void 0 ? void 0 : _d.compress)) {
                return minify(code, (_e = basicSwcOptions.jsc) === null || _e === void 0 ? void 0 : _e.minify);
            }
            return null;
        }
    };
    if (macroOptions.resolveTs) {
        const tslib = createTsLib();
        const tsOptions = macroOptions.tsconfig === false ? {} : resolveTsOptions(resolve("."), macroOptions.tsconfig);
        plugin.resolveId = createTsResolver(tslib, tsOptions, filter);
        plugin.load = (id) => {
            if (id === tslib.virtual)
                return tslib.source;
        };
    }
    else {
        plugin.resolveId = createResolver(extensions);
    }
    return plugin;
}

export { viteMacroPlugin as default };
