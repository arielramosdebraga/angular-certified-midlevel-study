module.exports = {
  verbose: true,
  preset: 'ts-jest',
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/app/**/*.ts"],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90, 
      functions: 90,
      lines: 90
    }
  },
  modulePaths: [
    "<rootDir>"
  ],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1'
  }
};