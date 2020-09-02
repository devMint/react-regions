import autoExternals from 'rollup-plugin-auto-external'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonJs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import * as pkg from './package.json'
import * as path from 'path'

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  plugins: [
    autoExternals(),
    resolve({
      mainFields: ['module', 'main', 'jsnext:main', 'browser'],
      extensions: ['.ts', '.tsx', '.d.ts'],
    }),
    commonJs(),
    babel({
      extensions: ['.ts', '.tsx', '.d.ts'],
    }),
    terser(),
  ],
}