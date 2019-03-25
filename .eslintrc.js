module.exports = {
  root: true,
  parser: 'typescript-eslint-parser',
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "modules": true
    }
  },
  plugins: [
    'typescript'
  ],
  rules: {
    'object-curly-spacing': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 1 }],
    'no-undef': 'off',
    'no-unused-vars': 'off'
  }
}