import { createSwcPlugin, getSpanOffset, transformAsync } from '@macro-plugin/core';
import { parse, transform } from '@swc/core';
import { hasProp, buildTransformOptions, SCRIPT_EXTENSIONS, createFilter, matchScriptType, patchTsOptions, resolveTsOptions } from '@macro-plugin/shared';
import { dirname } from 'path';

var CURRENT_OPTIONS;
function createLoader() {
    const loader = function (source, inputSourceMap) {
        var _a;
        // Make the loader async
        const callback = this.async();
        const filename = this.resourcePath;
        let loaderOptions = this.getOptions();
        // Standardize on 'sourceMaps' as the key passed through to Webpack, so that
        // users may safely use either one alongside our default use of
        // 'this.sourceMap' below without getting error about conflicting aliases.
        if (hasProp(loaderOptions, "sourceMap") && !hasProp(loaderOptions, "sourceMaps")) {
            loaderOptions = Object.assign({}, loaderOptions, {
                sourceMaps: loaderOptions.sourceMap,
            });
            delete loaderOptions.sourceMap;
        }
        if (inputSourceMap && typeof inputSourceMap === "object") {
            inputSourceMap = JSON.stringify(inputSourceMap);
        }
        const inputOptions = Object.assign({}, loaderOptions, {
            filename,
            inputSourceMap,
            sourceMaps: (_a = loaderOptions.sourceMaps) !== null && _a !== void 0 ? _a : this.sourceMap,
            sourceFileName: filename,
        });
        // auto detect development mode
        if (this.mode && inputOptions.jsc && inputOptions.jsc.transform &&
            inputOptions.jsc.transform.react &&
            !hasProp(inputOptions.jsc.transform.react, "development")) {
            inputOptions.jsc.transform.react.development = this.mode === "development";
        }
        if (inputOptions.sourceMaps === "inline") {
            // Babel has this weird behavior where if you set "inline", we
            // inline the sourcemap, and set 'result.map = null'. This results
            // in bad behavior from Babel since the maps get put into the code,
            // which Webpack does not expect, and because the map we return to
            // Webpack is null, which is also bad. To avoid that, we override the
            // behavior here so "inline" just behaves like 'true'.
            inputOptions.sourceMaps = true;
        }
        const compile = () => {
            var _a;
            const [basicSwcOptions, macroOptions] = CURRENT_OPTIONS;
            const extensions = macroOptions.extensions || SCRIPT_EXTENSIONS;
            const filter = createFilter(macroOptions.include, macroOptions.exclude);
            if (!filter(filename))
                return;
            const target = matchScriptType(filename, extensions);
            if (!target)
                return;
            if (macroOptions.swcTransform == null || macroOptions.swcTransform === true) {
                const { isTypeScript, isJsx, isTsx } = target;
                if (isTypeScript || isJsx) {
                    const plugin = createSwcPlugin(macroOptions, source, getSpanOffset());
                    // using swc transform ts/js/tsx
                    const swcOptions = patchTsOptions(Object.assign(Object.assign({}, basicSwcOptions), { filename, minify: false }), macroOptions.tsconfig === false ? undefined : resolveTsOptions(dirname(filename), macroOptions.tsconfig), isTypeScript, isTsx, isJsx);
                    return parse(source, ((_a = swcOptions.jsc) === null || _a === void 0 ? void 0 : _a.parser) || { syntax: "typescript", tsx: true }).then(program => {
                        transform(plugin(program), swcOptions).then(output => {
                            callback(null, output.code, output.map);
                        }, callback);
                    }, callback);
                }
            }
            transformAsync(source, macroOptions).then(output => {
                callback(null, output.code, output.map);
            }, callback);
        };
        try {
            if (CURRENT_OPTIONS) {
                compile();
            }
            else {
                buildTransformOptions(inputOptions).then(options => {
                    CURRENT_OPTIONS = options;
                    compile();
                });
            }
        }
        catch (e) {
            callback(e);
        }
    };
    return loader;
}
var index = createLoader();

export { index as default };
