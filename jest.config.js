/** @type {import("@jest/types").Config.InitialOptions} */
module.exports = {
  transform: { "\\.(js|jsx|ts|tsx)$": "@sucrase/jest-plugin" },
  moduleNameMapper: Object.fromEntries(require("fs").readdirSync("./packages").map(i => [[`^@macro-plugin/${i}`], [`<rootDir>/packages/${i}/src`]])),
  collectCoverageFrom: ["packages/{!(tsconfig.json),}.test.ts", "packages/**/*.test.ts"],
};
