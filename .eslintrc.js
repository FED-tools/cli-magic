module.exports = {
  env: {
    es6: true,
    browser: true,
    'jest/globals': true,
  },
  extends: ['airbnb'],
  plugins: ['babel', 'import', 'jsx-a11y', 'prettier', 'jest'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    requireConfigFile: false,
  },
  rules: {
    // Incompatible with prettier start
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'react/jsx-wrap-multilines': 'off',
    'arrow-parens': 'off',
    'implicit-arrow-linebreak': 'off',
    // Incompatible with prettier ends
    'prettier/prettier': ['error'],
  },
};
