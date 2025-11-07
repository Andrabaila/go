// eslint.config.js
import tseslint from 'typescript-eslint';
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierPlugin from 'eslint-plugin-prettier';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backendRoot = path.join(__dirname, 'apps/backend');
const frontendRoot = path.join(__dirname, 'apps/frontend');

export default [
  {
    ignores: ['**/dist', '**/node_modules', '**/coverage'],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      prettier: prettierPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      'no-restricted-imports': ['error', { patterns: ['@/types/*'] }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': 'error',
    },
  },

  {
    files: ['apps/backend/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: [path.join(backendRoot, 'tsconfig.json')],
        tsconfigRootDir: backendRoot,
      },
    },
  },

  {
    files: ['apps/frontend/**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parserOptions: {
        project: [path.join(frontendRoot, 'tsconfig.json')],
        tsconfigRootDir: frontendRoot,
      },
    },
  },
];
