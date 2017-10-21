/* eslint-env-node */

import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';

import path from 'path';

const pkg = require(path.join(process.cwd(), 'package.json')); // eslint-disable-line

const isProduction = process.env.BUILD === 'production';

const hasName = process.argv.indexOf('--name') + 1 || process.argv.indexOf('-n') + 1;
const name = hasName ? process.argv[hasName] : 'litequery';
const fileName = name.replace(/([A-Z])/g, (m, s) => `-${s.toLowerCase()}`);

const config = {
  entry: 'src/index.js',
  dest: `dist/${fileName}.js`,
  moduleName: name,
  format: 'umd',
  sourceMap: !isProduction,
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: [['es2015', { modules: false }]],
      plugins: ['external-helpers'],
      babelrc: false
    }),
    filesize()
  ]
};

if (isProduction) {
  config.dest = config.dest.replace(/js$/, 'min.js');
  config.plugins.push(uglify());
}

export default config;
