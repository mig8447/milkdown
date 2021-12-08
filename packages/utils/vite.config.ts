/* Copyright 2021, Milkdown by Mirone. */
import typescript from '@rollup/plugin-typescript';
import path from 'path';
import { defineConfig } from 'vite';

const resolvePath = (str: string) => path.resolve(__dirname, str);

export default defineConfig({
    build: {
        lib: {
            entry: resolvePath('src/index.ts'),
            name: 'milkdown_utils',
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            external: ['@milkdown/core', '@milkdown/prose'],
            output: {
                sourcemap: true,
                dir: resolvePath('lib'),
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    '@milkdown/core': 'milkdown_core',
                    '@milkdown/prose': 'milkdown_prose',
                },
            },
            plugins: [typescript()],
        },
    },
});