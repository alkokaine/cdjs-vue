module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: [
    'eslint-plugin-es-x'
  ],
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-constant-condition': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'off',
    'no-prototype-builtins': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-extra-boolean-cast': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-extra-semi': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unexpected-multiline': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-fallthrough': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-useless-escape': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-redeclare': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-empty': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-undef': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unreachable': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
