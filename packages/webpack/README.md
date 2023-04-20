# @macro-plugin/webpack

[Macro Plugin](https://github.com/macro-plugin) integration for vite. It supports transform macros and typescript and also jsx.

## Installation

```sh
# if you use npm
npm i -D @macro-plugin/webpack
# if you use pnpm
pnpm i -D @macro-plugin/webpack
# if you use yarn
yarn add -D @macro-plugin/webpack
```

## Usage

`webpack.config.js`:

```js
import { resolve } from "path"

/** @type { import("webpack").Configuration } */
export default {
  mode: "production",
  entry: resolve("./src/index.ts"),
  output: {
    path: resolve("./dist"),
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "@macro-plugin/webpack"
          }
        ]
      }
    ]
  }
}
```

It will load the configuration from `macros.config.js` or `macros.config.ts` by default. You can also customize it:

```js
import { resolve } from "path"

/** @type { import("webpack").Configuration } */
export default {
  mode: "production",
  entry: resolve("./src/index.ts"),
  output: {
    path: resolve("./dist"),
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "@macro-plugin/webpack",
            /** @type { import("@macro-plugin/core").Config } */
            options: {
              emitDts: true
            }
          }
        ]
      }
    ]
  }
}
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
