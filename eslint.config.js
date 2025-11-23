// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettier = require('eslint-config-prettier');

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.spec.json'],
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
      prettier,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@typescript-eslint/member-ordering': 'error',
      '@angular-eslint/no-empty-lifecycle-method': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
      prettier,
    ],
    rules: {},
  },
  {
    ignores: [
      'dist/',
      'node_modules/',
      '.cache/',
      '**/*.js.map',
      'src/environments/*.ts',
    ],
  },
]);
