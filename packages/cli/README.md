# @macro-plugin/cli

Macro Plugin Command Line Interface. It can be used to execute TypeScript, develop AST macros, generate macro declaration files, generate transformed files. It also includes a great REPL.

> **Note:** This package not been released as a separate npm package, but been bundled in `@macro-plugin/core` for easier intergration.

## Install

```sh
# npm
npm i -g @macro-plugin/core

# yarn
yarn add -g @macro-plugin/core

# pnpm
pnpm i -g @macro-plugin/core
```

## Config

By default, it will use your `macros.config.js` or `macros.config.ts` as configuration.

```js
import { defineConfig } from "@macro-plugin/core"

export default defineConfig({
  // emit declarations
  emitDts: true,
  macros: [
    // your macros...
  ],
  jsc: {
    parser: {
      syntax: "typescript" // support typescript ...
    }
  }
})
```

## Commands

### Show help messages

```sh
macros --help
```

### Transform with macro-plugin then run with node

```sh
macros run ./src/index.ts
```

### Only transform with macro-plugin

```sh
macros build ./src/index.ts
```

By default, it writes to `./src/index.output.js`. You can also add an `output` option to specify path.

```sh
macros build ./src/index.ts -o ./dist/index.js
```

### Start watch progress

```sh
macros dev ./src/index.ts
```

### Emit declarations for macros

```sh
macros emit
```

### Start an interactive shell

```sh
macros shell
```

### Start an ast development shell

```sh
macros shell --ast
```

### Start an transform interactive shell

```sh
macros shell --transform
```

Enable swc transform with `--swc` option.

```sh
macros shell --transform --swc
```
