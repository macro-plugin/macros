/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    transform: { "\\.(js|jsx|ts|tsx)$": "@sucrase/jest-plugin" },
    collectCoverageFrom: ["tests/{!(tsconfig.json),}.ts", "tests/**/*.ts"],
  };
  