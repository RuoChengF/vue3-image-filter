import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { string } from 'rollup-plugin-string';

export default {
    input: 'src/index.ts',
    output: [
        { file: 'dist/index.cjs', format: 'cjs' },
        { file: 'dist/index.mjs', format: 'esm' }
    ],
    external: ['pixi.js', 'pixi-filters'],
    plugins: [
        nodeResolve(),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.json'
        }),
        string({
            include: ['**/*.vert', '**/*.frag'],
            exclude: 'node_modules/**'
        })
    ]
};
