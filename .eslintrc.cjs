// const { env } = require("process");
// const { plugin } = require("typescript-eslint");

// module.exports = {
//   overrides: [
//     {
//       files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
//       parserOptions: {
//         ecmaFeatures: {
//           jsx: true,
//         },
//       },
//       globals: globals.browser,
//       plugins: ["@eslint/js", "typescript-eslint", "eslint-plugin-react"],
//       extends: [
//         "@eslint/js",
//         ...tseslint.configs.recommended,
//         "eslint-plugin-react/recommended",
//         "airbnb",
//         "airbnb/hooks",
//         "airbnb-typescript",
//       ],
//     },
//   ],
//   parser: "@typescript-eslint/parser",
//   parserOptions: {
//     project: "./tsconfig.json",
//     ecmaVersion: "latest",
//     sourceType: "module",
//   },
// };

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  ignorePatterns: [
    'dist',
    '*.config.ts',
    '*.d.ts',
    '*.json',
    'pnpm-lock.yaml',
    'unimport.d.ts',
  ],
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    'react-in-jsx-scope': 0,
    'react-refresh/only-export-components': [
      'off',
      { allowConstantExport: true },
    ],

    // Don't like
    'no-undef': 'off', // disable coz typescript check it already
    'prettier/prettier': 'off',
    'canonical/filename-match-exported': 'off',
    'func-style': 'off',
    'canonical/filename-match-regex': 'off',
    'react/function-component-definition': 'off',
    'canonical/id-match': 'off',
    'react/jsx-no-undef': 'off',
    'import/no-unassigned-import': 'off',
    'import/extensions': 'off',
    'react/forbid-component-props': 'off',
  },
};
