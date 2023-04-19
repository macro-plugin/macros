/** @type {import("@jest/types").Config.InitialOptions} */
module.exports = {
  transform: { "^.+\\.(t|j)s$": "@macro-plugin/jest" },
  collectCoverageFrom: ["./tests/**/*.test.ts"],
}
