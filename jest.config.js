const fs = require("fs")

/** @type {import("@jest/types").Config.InitialOptions} */
module.exports = {
  transform: { "^.+\\.(t|j)s$": ["@swc/jest"] },
  moduleNameMapper: Object.fromEntries(fs.readdirSync("./packages").map(i => [[`^@macro-plugin/${i}`], [`<rootDir>/packages/${i}/src`]])),
  collectCoverageFrom: ["packages/**/tests/**/*.test.ts"],
  testPathIgnorePatterns: ["examples"]
}
