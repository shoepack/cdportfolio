module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'src/components/react-bits'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  overrides: [{ files: ['scripts/**', 'vite.config.js'], env: { node: true } }],
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    // Props are documented in place; this project does not use PropTypes.
    'react/prop-types': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
