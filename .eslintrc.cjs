module.exports = {
  root: true,
  parserOptions: {
    project: './tsconfig.base.json'
  },
  extends: ['airbnb-typescript/base'],
  ignorePatterns: ['dist', 'node_modules'],
  rules: {
    'import/prefer-default-export': 'off'
  }
};
