# @macro-plugin/register

Node register for macro plugins.

## Installation

```sh
# if you use npm
npm i -D @macro-plugin/register
# if you use pnpm
pnpm i -D @macro-plugin/register
# if you use yarn
yarn add -D @macro-plugin/register
```

## Usage

```sh
node -r "@macro-plugin/register" ./src/index.js
```

also support typescript

```sh
node -r "@macro-plugin/register" ./src/index.ts
```

equals to

```sh
macros run ./src/index.ts
```