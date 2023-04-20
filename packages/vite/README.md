# @macro-plugin/vite

[Macro Plugin](https://github.com/macro-plugin) integration for vite. It supports transform macros and typescript and also jsx.

## Installation

```sh
# if you use npm
npm i -D @macro-plugin/vite
# if you use pnpm
pnpm i -D @macro-plugin/vite
# if you use yarn
yarn add -D @macro-plugin/vite
```

## Usage

`vite.config.js`:

```js
import { defineConfig } from "vite"
import macroPlugin from "@macro-plugin/vite"

export default defineConfig({
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    format: "es"
  },
  plugins: [
    macroPlugin()
  ]
})
```

It will load the configuration from `macros.config.js` or `macros.config.ts` by default. You can also customize it:

```js
import { defineConfig } from "vite"
import macroPlugin from "@macro-plugin/vite"

export default defineConfig({
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "es"
  },
  plugins: [
    macroPlugin({ emitDts: true })
  ]
})
```

`macros.config.ts`:

```js
import { defineConfig } from "@macro-plugin/core"

export default defineConfig({
  macros: [],
  emitDts: true,
  jsc: {
    parser: {
      syntax: "typescript"
    },
    target: "esnext",
  },
})
```

Or with commonjs

`macros.config.js`

```js
/** @type {import("@macro-plugin/core").Config} */
module.exports = {
  macros: [],
  emitDts: true,
  jsc: {
    parser: {
      syntax: "typescript"
    },
    target: "esnext",
  },
}
```

## License

MIT

[MacroPlugin]: https://github.com/macro-plugin
