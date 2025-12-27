module.exports = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['node_modules/**', 'build/**'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: { ecmaVersion: 2020, sourceType: 'module', ecmaFeatures: { jsx: true } }
    },
    plugins: { '@typescript-eslint': require('@typescript-eslint/eslint-plugin'), react: require('eslint-plugin-react'), 'react-hooks': require('eslint-plugin-react-hooks'), 'jsx-a11y': require('eslint-plugin-jsx-a11y') },
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off'
    },
    settings: { react: { version: 'detect' } }
  }
];
