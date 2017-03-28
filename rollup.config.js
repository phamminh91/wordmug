import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import progress from 'rollup-plugin-progress';
// import alias from 'rollup-plugin-resolve-aliases';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'app/index.js',
  dest: 'dist/app.js',
  format: 'iife',
  plugins: [
    postcss(),
    resolve({
      // jsnext: true,
      main: true,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    }),
    json(),
    // alias({
    //   aliases: {
    //     'react': 'node_modules/react/dist/react.js',
    //     'react-dom': 'node_modules/react-dom/dist/react-dom.js',
    //   },
    //   jsnext: true,
    // }),
    commonjs({
      include: 'node_modules/**',
      namedExports:
      {
        './node_modules/react/react.js':
        [
          'cloneElement',
          'createElement',
          'PropTypes',
          'Children',
          'Component',
        ],
        './node_modules/redux-saga/effects.js':
        [
          'take', 'takem', 'put', 'race', 'call', 'apply', 'cps', 'fork', 'spawn', 'join', 'cancel', 'select', 'actionChannel', 'cancelled', 'flush', 'takeEvery', 'takeLatest', 'throttle'
        ],
      },
    }),
    babel({
      "presets": [
        ["es2015", { "modules": false }],
        "stage-2",
        'react',
      ],
      "plugins": [
        "syntax-dynamic-import",
        "external-helpers",
      ],
      exclude: 'node_modules/**',
    }),
    uglify({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),
    progress(),
  ].filter(Boolean),
};