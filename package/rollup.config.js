const packageJson = require('./package.json');  
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import dts from "rollup-plugin-dts";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap:true
            },
            {
                file: packageJson.main,
                format: 'esm',
                sourcemap:true
            }
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' }),
            terser(),
            postcss()
        ],
        external: Object.keys(packageJson.dependencies),
    },
    {
        input: 'src/index.ts',
        output: [
           {file:packageJson.types}
        ],
        plugins: [
           dts.default()
        ],
        external: [/\.css/]
   
    }
]