import antfu from '@antfu/eslint-config'

export default antfu(
  {
    rules: {
      'n/prefer-global/buffer': 0,
      'n/prefer-global/process': 0,
      'no-redeclare': 0,
      '@typescript-eslint/no-redeclare': 0,
      '@typescript-eslint/no-non-null-asserted-optional-chain': 0,
      'dot-notation': 0,
      'eslint-comments/no-unlimited-disable': 0,
      'unicorn/prefer-number-properties': 0,
    },
    ignores: [
      '**/icons/**/*',
      'apps/fe/src/icons/**/*',
      'apps/mini/src/aliyun/**/*',
    ],
  },
)
