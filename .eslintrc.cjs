module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'vue/no-unused-vars': 'warn',
    'vue/require-v-for-key': 'warn',
    'vue/return-in-computed-property': 'warn',
    'vue/no-lifecycle-after-await': 'error',
    'array-callback-return': 'error',
    'curly': 'warn',
    'eqeqeq': 'warn',
    'no-alert': 'error',
    'no-multi-spaces': 'warn',
    'no-multi-str': 'warn',
    'no-throw-literal': 'error',
    'array-bracket-newline': 'warn',
    'array-bracket-spacing': 'warn',
    'block-spacing': 'warn',
    'camelcase': 'warn',
  },
};