import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
    globalIgnores(['dist', '.next']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            tseslint.configs.recommendedTypeChecked,
            tseslint.configs.strictTypeChecked,
            tseslint.configs.stylisticTypeChecked,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
            reactX.configs['recommended-typescript'],
            reactDom.configs.recommended,
            eslintConfigPrettier,
        ],
        languageOptions: {
            globals: globals.browser,
            parserOptions: {
                project: ['./tsconfig.json'],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            'react-refresh/only-export-components': [
                'warn',
                {
                    allowExportNames: [
                        'metadata',
                        'generateStaticParams',
                        'generateMetadata',
                    ],
                },
            ],
            'react-x/no-context-provider': 'off',
            'react-x/no-use-context': 'off',
            'react-hooks/set-state-in-effect': 'off',
            'react-x/set-state-in-effect': 'off',
        },
    },
]);