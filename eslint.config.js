// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettier = require('eslint-config-prettier');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    ignores: ['**/*.test.ts', 'setup-vitest.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      prettier,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-wrapper-object-types': 'error',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',

      'prefer-const': 'error',
      'no-var': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',

      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],

      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],

      '@angular-eslint/no-output-on-prefix': 'off',
      '@angular-eslint/component-class-suffix': 'off',
      '@angular-eslint/no-empty-lifecycle-method': 'off',
      '@angular-eslint/use-lifecycle-interface': 'off',
      '@angular-eslint/no-inputs-metadata-property': 'off',
      '@angular-eslint/no-outputs-metadata-property': 'off',
      '@angular-eslint/no-input-rename': 'off',
      '@angular-eslint/no-output-rename': 'off',
      '@angular-eslint/no-output-native': 'off',
      '@angular-eslint/prefer-inject': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended],
    rules: {
      '@angular-eslint/template/alt-text': 'off',
    },
  }
);
