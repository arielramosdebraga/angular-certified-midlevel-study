import type { Config } from "jest";

const config: Config = {
  preset: "jest-preset-angular",
  testEnvironment: "jsdom",

  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],

  moduleFileExtensions: ["ts", "html", "js", "json", "mjs"],

  transform: {
    "^.+\\.(ts|mjs|js|html)$": [
      "jest-preset-angular",
      {
        tsconfig: "<rootDir>/tsconfig.json",
        stringifyContentPathRegex: "\\.html$",
      },
    ],
  },

  testMatch: ["**/+(*.)+(spec).+(ts)"],

  collectCoverage: true,
  coverageDirectory: "coverage",

  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/main.ts",
    "!src/**/*.module.ts",
    "!src/**/*.config.ts",
    "!src/**/*.routes.ts",
    "!src/environments/**",
    "!src/**/*.spec.ts",
  ],

  coverageReporters: ["html", "text", "lcov"],

  coverageThreshold: {
    global: {
      statements: 100,
      branches: 75,
      functions: 100,
      lines: 100,
    },
  },
};

export default config;
