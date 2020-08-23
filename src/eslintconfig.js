module.exports = {
  env: {
    browser: true,
    es2020: true,
    jquery: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
  },
  rules: {
    radix: 'off',
    'no-underscore-dangle': 'off',
  },
};
