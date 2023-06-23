'use strict';

var core$1 = require('@macro-plugin/core');
var core = require('@swc/core');
var shared = require('@macro-plugin/shared');
var require$$0 = require('crypto');
var require$$1 = require('fs');
var require$$2 = require('path');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

var build = {};

Object.defineProperty(build, '__esModule', {
  value: true
});
var _default = build.default = createCacheKey;

function _crypto() {
  const data = require$$0;

  _crypto = function () {
    return data;
  };

  return data;
}

function _fs() {
  const data = require$$1;

  _fs = function () {
    return data;
  };

  return data;
}

function _path() {
  const data = require$$2;

  _path = function () {
    return data;
  };

  return data;
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
// eslint-disable-next-line no-restricted-imports
function getGlobalCacheKey(files, values) {
  return [
    process.env.NODE_ENV,
    process.env.BABEL_ENV,
    ...values,
    ...files.map(file => (0, _fs().readFileSync)(file))
  ]
    .reduce(
      (hash, chunk) => hash.update('\0', 'utf8').update(chunk || ''),
      (0, _crypto().createHash)('md5')
    )
    .digest('hex');
}

function getCacheKeyFunction(globalCacheKey) {
  return (sourceText, sourcePath, configString, options) => {
    // Jest 27 passes a single options bag which contains `configString` rather than as a separate argument.
    // We can hide that API difference, though, so this module is usable for both jest@<27 and jest@>=27
    const inferredOptions = options || configString;
    const {config, instrument} = inferredOptions;
    return (0, _crypto().createHash)('md5')
      .update(globalCacheKey)
      .update('\0', 'utf8')
      .update(sourceText)
      .update('\0', 'utf8')
      .update(
        config.rootDir ? (0, _path().relative)(config.rootDir, sourcePath) : ''
      )
      .update('\0', 'utf8')
      .update(instrument ? 'instrument' : '')
      .digest('hex');
  };
}

function createCacheKey(files = [], values = []) {
  return getCacheKeyFunction(getGlobalCacheKey(files, values));
}

var version = "1.1.2";

function insertInstrumentOptions(jestOptions, canInstrument, inputOptions, instrumentOptions) {
    var _a, _b, _c, _d;
    const shouldInstrument = jestOptions.instrument && canInstrument;
    if (!shouldInstrument) {
        return inputOptions;
    }
    if ((_c = (_b = (_a = inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.jsc) === null || _a === void 0 ? void 0 : _a.experimental) === null || _b === void 0 ? void 0 : _b.plugins) === null || _c === void 0 ? void 0 : _c.some((x) => x[0] === "swc-plugin-coverage-instrument")) {
        return;
    }
    if (!inputOptions.jsc) {
        inputOptions.jsc = {};
    }
    if (!inputOptions.jsc.experimental) {
        inputOptions.jsc.experimental = {};
    }
    if (!Array.isArray(inputOptions.jsc.experimental.plugins)) {
        inputOptions.jsc.experimental.plugins = [];
    }
    (_d = inputOptions.jsc.experimental.plugins) === null || _d === void 0 ? void 0 : _d.push(["swc-plugin-coverage-instrument", instrumentOptions !== null && instrumentOptions !== void 0 ? instrumentOptions : {}]);
}
async function createTransformer(inputOptions) {
    var _a, _b;
    const [computedSwcOptions, macroOptions, configPath] = await shared.buildTransformOptions(inputOptions);
    const cacheKeyFunction = _default([], [core.version, version, JSON.stringify(inputOptions), configPath ? require$$1.readFileSync(configPath).toString() : ""]);
    const _c = (_b = (_a = inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.experimental) === null || _a === void 0 ? void 0 : _a.customCoverageInstrumentation) !== null && _b !== void 0 ? _b : {}, { enabled: canInstrument } = _c, instrumentOptions = __rest(_c, ["enabled"]);
    return {
        canInstrument: !!canInstrument,
        process(src, filename, jestOptions) {
            var _a;
            // Determine if we actually instrument codes if jest runs with --coverage
            insertInstrumentOptions(jestOptions, !!canInstrument, computedSwcOptions, instrumentOptions);
            const offset = core$1.getSpanOffset();
            const plugin = core$1.createSwcPlugin(macroOptions, src, offset);
            const program = core.parseSync(src, ((_a = computedSwcOptions.jsc) === null || _a === void 0 ? void 0 : _a.parser) || { syntax: "typescript", tsx: true });
            return core.transformSync(plugin(program), Object.assign(Object.assign({}, computedSwcOptions), { module: Object.assign(Object.assign({}, computedSwcOptions.module), { type: (jestOptions.supportsStaticESM ? "es6" : "commonjs") }), filename }));
        },
        async processAsync(src, filename, jestOptions) {
            var _a;
            insertInstrumentOptions(jestOptions, !!canInstrument, computedSwcOptions, instrumentOptions);
            const offset = core$1.getSpanOffset();
            const plugin = core$1.createSwcPlugin(macroOptions, src, offset);
            const program = await core.parse(src, ((_a = computedSwcOptions.jsc) === null || _a === void 0 ? void 0 : _a.parser) || { syntax: "typescript", tsx: true });
            return await core.transform(plugin(program), Object.assign(Object.assign({}, computedSwcOptions), { module: Object.assign(Object.assign({}, computedSwcOptions.module), { 
                    // async transform is always ESM
                    type: "es6" }), filename }));
        },
        getCacheKey(src, filename, ...rest) {
            // @ts-expect-error - type overload is confused
            const baseCacheKey = cacheKeyFunction(src, filename, ...rest);
            // @ts-expect-error - signature mismatch between Jest <27 og >=27
            const options = typeof rest[0] === "string" ? rest[1] : rest[0];
            return require$$0.createHash("md5")
                .update(baseCacheKey)
                .update("\0", "utf8")
                .update(JSON.stringify({ supportsStaticESM: options.supportsStaticESM }))
                .digest("hex");
        }
    };
}
var index = { createTransformer };

module.exports = index;
