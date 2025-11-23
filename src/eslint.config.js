// eslint.config.js
const { FlatCompat } = require('@eslint/eslintrc');
const compat = new FlatCompat();

module.exports = [
  ...compat.extends([
    'plugin:@angular-eslint/recommended',
    'plugin:@angular-eslint/ng-cli-compat',
    'plugin:@angular-eslint/ng-cli-compat--formatting-add-on',
    'plugin:prettier/recommended'
  ]),
  {
    files: ['*.html'],
    plugins: ['@angular-eslint/template'],
    languageOptions: {
      parser: '@angular-eslint/template-parser'
    },
    rules: {}
  }
];