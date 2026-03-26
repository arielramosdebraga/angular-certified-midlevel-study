import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',

  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],

  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],

  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.json',
        stringifyContentPathRegex: '\\.html$',
      },
    ],
  },

  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
};

export default config;
