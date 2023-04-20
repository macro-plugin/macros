# @macro-plugin/jest

[Macro Plugin](https://github.com/macro-plugin) integration for jest. It supports transform macros and typescript and also jsx.

## Installation

```sh
# if you use npm
npm i -D @macro-plugin/jest
# if you use pnpm
pnpm i -D @macro-plugin/jest
# if you use yarn
yarn add -D @macro-plugin/jest
```

## Usage

`jest.config.js`:

```js
module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': '@macro-plugin/jest',
  },
}
```

It will load the configuration from `macros.config.js` or `macros.config.ts` by default. You can also customize it:

```js
const fs = require('fs')
const config = require('./macros.config.js')

module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': ['@macro-plugin/jest', { ...config, /* custom configuration in Jest */ }],
  },
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
