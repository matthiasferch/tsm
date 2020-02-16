module.exports = {
  parser: '@typescript-eslint/parser',
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    browser: true,
    node: true,
        es6: true
  },
  rules:  {
    '@typescript-eslint/explicit-function-return-type': 0,
    'semi-spacing': 1,
    'semi': 1,
  }
}