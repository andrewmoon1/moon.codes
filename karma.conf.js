const webpack = require('webpack');
var webpackConfig = require('./webpack/webpack.config.js');

const PATHS = require('./webpack/paths');

process.env.NODE_ENV = 'test'
module.exports = function(config) {
  config.set({

    // Add any browsers here
    browsers: ['PhantomJS', 'Chrome'],
    frameworks: ['jasmine'],

    // The entry point for our test suite
    basePath: 'app',
    autoWatch: false,
    files: ['actions/__tests__/*.js'],
    preprocessors: {
      // Run this through webpack, and enable inline sourcemaps
      'actions/__tests__/*.js': ['webpack'],
    },
    babelPreprocessor: {
      options: {
        presets: ['es2015'],
      },
    },

    webpack: webpackConfig('test'),
    client: {
      // log console output in our test console
      captureConsole: true
    },

    reporters: ['dots'],
    singleRun: true, // exit after tests have completed

    webpackMiddleware: {
      noInfo: false
    },

    // Webpack takes a little while to compile -- this manifests as a really
    // long load time while webpack blocks on serving the request.
    browserNoActivityTimeout: 90000, // 60 seconds

  });
};
