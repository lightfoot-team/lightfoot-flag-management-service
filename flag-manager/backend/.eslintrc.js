module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  env: {
    node: true,
    es6: true,
  },
  rules: {
    'no-console': 'warn',
    'no-warning-comments': ['warn', { terms: ['todo', 'fixme'], location: 'anywhere' }],
  },
};