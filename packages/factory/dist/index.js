'use strict';

var runtime = require('./runtime');
var macros = require('./macros');



Object.keys(runtime).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return runtime[k]; }
	});
});
Object.keys(macros).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return macros[k]; }
	});
});
