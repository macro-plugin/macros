# @macro-plugin/shared

Shared utils for internel and plugin usage.

## API

### `addHook`

add a require hook

### `picomatch`

picomatch file matcher

### `autoRequire`

require or import a package

### `loadConfigFile`

async loading `macros.config.js` or `macros.config.ts`.

### `loadConfigFileSync`

sync loading `macros.config.js` or `macros.config.ts`.

### `writeDts`

write dts to path, check if content is same first.

### `extractSwcOptions`

extract swc options from all your defined options.

### `buildTransformOptions`

load config file, then return `[swcOptions, macroOptions, configPath]`

### `extractInput`

split `(file | pattern)[]` to `{ files, patterns }`

### `extractFiles`

extract files from `(file | pattern)[]`