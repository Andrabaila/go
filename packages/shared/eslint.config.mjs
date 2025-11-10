import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
  {
    files: ['**/*.ts'],
    ignores: ['node_modules'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [join(__dirname, 'tsconfig.json')],
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
    },
    plugins: { '@typescript-eslint': tseslint },
    rules: {},
  },
];
