'use strict'; //eslint-disable-line

const wallabyWebpack = require('wallaby-webpack');
const webpackConfig = require('./internals/webpack/webpack.test.babel');
const webpackPostprocessor = wallabyWebpack(webpackConfig);

module.exports = (wallaby) => ({
  files: [
    'node_modules/babel-polyfill/dist/polyfill.min.js',
    { pattern: 'app/**/!(*.test).js', load: false },
    { pattern: 'app/**/*.json', load: false },
  ],

  tests: [
    { pattern: 'app/**/*.test.js', load: false },
  ],

  testFramework: 'mocha',

  compilers: {
    'app/**/*.js': wallaby.compilers.babel({
      presets: [
        'react',
        'stage-0',
      ],
    }),
  },

  env: {
    kind: 'electron',
  },

  postprocessor: webpackPostprocessor,

  setup() {
    window.__moduleBundler.loadTests(); // eslint-disable-line
  },
});
