# @macro-plugin/core

Macro system for JavaScript and TypeScript.

## Install

```sh
# if you use npm
npm i -D @macro-plugin/core
# if you use pnpm
pnpm i -D @macro-plugin/core
# if you use yarn
yarn add -D @macro-plugin/core
```

## Why

Have you ever used Rust? Rust has an impressive macro system. I'm wondering why the JavaScript world can't have one. Now you got it.

## How it works

It uses [swc](https://swc.rs/)'s parser and printer, and does not make any conversions other than macors to your project by default. Of course, it can also be used as a swc plugin, so we can transform typescript and jsx.

## Features

- A new walker for macros, inspired by [estree-walker](https://github.com/Rich-Harris/estree-walker)
- Built-in variable tracker plugin, which makes it easier to convert variables.
- Very simple yet powerful APIs for creating various types of macros.
- Factory runtime and macros for simplify creating swc AST.
- Support automatic generation of macro declarations file. (macros.d.ts)
- Many common built-in macros.
- Support all web framework intergrations.

## Built-in macros

The project is still in the beta stage, and there are more macros under development.

### Expression Macros

Expression macros may be a very familiar macro type. It converts a `CallExpression` into any other Expression.

#### `$Eval`

compile time eval.

#### `$Ast`

convert anything into an ast.

#### `$Env`

read env and replace with result.

#### `$Stringify`

convert any expression or type into string

#### `$Span`

get a span like `[line, column]`

#### `$Line`

get current line number

#### `$Column`

get current column number

#### `$ID`

generate unique id based on `[line, column, filename]`

#### `$Include`

include another `js, ts` file into current script.

#### `$IncludeStr`

include a string from any path

#### `$IncludeJSON`

include a json, also support include a json value with key.

#### `$WriteFile`

compile time write to file

#### `$Concat`

compile time concat string

#### `$Expr`

turn code into an expression

#### `$Quote`

a template macro for create macro

#### `$UnImplemented`

mark code as unImplemented, log error when compile, throw error in client side.

#### `$Todo`

mark code as todo, log warning when compile, throw error in client side.

#### `$UnReachable`

mark code as unreachable, throw error in client side.

...

### Labeled Macros

LabeledMacros are very interesting feature. It even allows you to invent your own grammar.
For example:

```js
debug: {
  console.log("something")
}
```

or creating states:

```js
state: {
  var count = 0
  var name = "macro"
}
```

or using function decorator:

```js
function myFunc() {
  decorator: [yourFunctionDecorator]

  doSomething()
}
```

you can even create macro with it.

```ts
macro: {
  var __DEV__ = true
  
  var add = $ExprMacro<(a: number, b: number) => number>(function(args) {
    const a = this.printExpr(args[0])
    const b = this.printExpr(args[1])

    if (+a < 0) return args[1]
    return this.parseExpr(`${a} + ${b}`)
  })
}

if (__DEV__) {
  const a = add(1, 2)
}
```

transform to

```js
if (true) {
  const a = 1 + 2
}
```


To use Labeled Macros, you may need some extra config for typescript and eslint.

#### Typescript

```json
{
  "compilerOptions": {
    // ...
    "allowUnusedLabels": true,
  },
}
```

#### Eslint

```js
module.exports = {
  rules: {
    // ...
    "no-labels": 0,
  }
}
```

## API

### `transform/transformAst/transformAsync`

transform code with macro plugins.

### `createSwcPlugin`

use as swc plugin.

### `walk`

walk an ast node or node list

### `print/printAsync/printExpr/printType`

print ast to code

### `parse/parseAsync/parseExpr/parseType`

parse code to ast

### `defineConfig`

define config with types

### `createMacro`

create a macro

### `createLitMacro`

create a literal macro

### `createExprMacro`

create an expression macro

### `createTypeMacro`

create a type macro

### `createTmplMacro`

create a template macro

### `createLabeledMacro`

create a labeled macro

### `isMacroPlugin`

check if input is a macro plugin

## FAQ

### LabeldMacros confusing with JavaScript

Some people may argue about labeldMacros, confusing the original semantics of JavaScript. But in fact, `labeledStatement` and `var` are both forgotten or discarded syntax of JavaScript. So we bring something new to it. Personally, I don't think this is a bad thing.

### Compare with babel

In fact, the beginning of this project based on babel's parser and generator. When I switched to swc, I did a simple test and found that the speed was at least tripled, so it must be faster.

This project is based on the AST type of swc and is not compatible with Babel's AST. And the project focuses on transforming macros. If you need the support of something like browserlist, you need to use it with swc.

### Compare with swc

You can regard it as an enhanced version of swc with macro support, as well as better aapi. However, we do not use the `.swcrc` configuration file. The json configuration is not friendly for macros, and you should define all your swc configuration in `macros.config.js` or `macros.config.ts`.

## License

[MIT](https://github.com/macro-plugin/macros/blob/main/LICENSE)

Copyright (c) 2023, Raven Satir