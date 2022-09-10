import { terser } from "rollup-plugin-terser";
import scss from 'rollup-plugin-scss'
import pkg from './package.json';

export default {
    input: 'src/asset-cart.js',
    plugins: [
        terser(),
        scss({
            output: 'dist/asset-cart.min.css',
            outputStyle: "compressed"
        }),
    ],
    output: [
        {
            name: 'asset-cart',
            file: pkg.browser,
            format: 'umd',
        },
        {
            file: pkg.module,
            format: 'es'
        },
    ],
};