module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  collectCoverage: true,
    collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/*.spec.{ts,js}', // Exclui arquivos de teste da contagem de cobertura
    '!src/main.ts', // Exclui arquivos que não são tipicamente testados
    '!src/polyfills.ts',
    '!src/test.ts',
    '!src/environments/**',
  ],
  coverageThreshold: {
    global: {
      statements: 80, // Exige 80% de cobertura de statements (declarações)
      branches: 75,   // Exige 75% de cobertura de branches (ramificações, ex: if/else)
      functions: 80,  // Exige 80% de cobertura de functions
      lines: 80,      // Exige 80% de cobertura de lines
    },
  },
};
