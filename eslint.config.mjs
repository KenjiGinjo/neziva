import babelParser from '@babel/eslint-parser'
import js from '@eslint/js'
import globals from 'globals'

export default [
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'off',
    },
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/icons/**/*',
      'apps/fe/src/icons/**/*',
      'apps/mini/src/aliyun/**/*',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: [
            ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
            ['@babel/preset-react', { runtime: 'automatic' }],
          ],
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        Bun: 'readonly',
      },
    },
    rules: {
      'no-redeclare': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  },
]
