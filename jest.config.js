/** @type {import("@jest/types").Config.InitialOptions} */
module.exports = {
  transform: { "\\.(js|jsx|ts|tsx)$": "@sucrase/jest-plugin" },
  collectCoverageFrom: ["packages/{!(tsconfig.json),}.test.ts", "packages/**/*.test.ts"],
};
