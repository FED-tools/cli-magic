module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
    "jest": true
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'object-curly-newline': 'off',
    'import/prefer-default-export': 'off',
  },
};
