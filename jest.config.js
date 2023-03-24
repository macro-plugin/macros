/** @type {import("@jest/types").Config.InitialOptions} */
module.exports = {
  transform: { "^.+\\.(t|j)sx?$": "@swc/jest" },
  moduleNameMapper: Object.fromEntries(require("fs").readdirSync("./packages").map(i => [[`^@macro-plugin/${i}`], [`<rootDir>/packages/${i}/src`]])),
  collectCoverageFrom: ["packages/**/tests/**/*.test.ts"],
}
