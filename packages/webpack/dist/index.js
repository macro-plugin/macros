'use strict';

var core = require('@macro-plugin/core');
var core$1 = require('@swc/core');
var shared = require('@macro-plugin/shared');
var path = require('path');

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
        if (shared.hasProp(loaderOptions, "sourceMap") && !shared.hasProp(loaderOptions, "sourceMaps")) {
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
            !shared.hasProp(inputOptions.jsc.transform.react, "development")) {
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
            const extensions = macroOptions.extensions || shared.SCRIPT_EXTENSIONS;
            const filter = shared.createFilter(macroOptions.include, macroOptions.exclude);
            if (!filter(filename))
                return;
            const target = shared.matchScriptType(filename, extensions);
            if (!target)
                return;
            if (macroOptions.swcTransform == null || macroOptions.swcTransform === true) {
                const { isTypeScript, isJsx, isTsx } = target;
                if (isTypeScript || isJsx) {
                    const plugin = core.createSwcPlugin(macroOptions, source, core.getSpanOffset());
                    // using swc transform ts/js/tsx
                    const swcOptions = shared.patchTsOptions(Object.assign(Object.assign({}, basicSwcOptions), { filename, minify: false }), macroOptions.tsconfig === false ? undefined : shared.resolveTsOptions(path.dirname(filename), macroOptions.tsconfig), isTypeScript, isTsx, isJsx);
                    return core$1.parse(source, ((_a = swcOptions.jsc) === null || _a === void 0 ? void 0 : _a.parser) || { syntax: "typescript", tsx: true }).then(program => {
                        core$1.transform(plugin(program), swcOptions).then(output => {
                            callback(null, output.code, output.map);
                        }, callback);
                    }, callback);
                }
            }
            core.transformAsync(source, macroOptions).then(output => {
                callback(null, output.code, output.map);
            }, callback);
        };
        try {
            if (CURRENT_OPTIONS) {
                compile();
            }
            else {
                shared.buildTransformOptions(inputOptions).then(options => {
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

module.exports = index;
