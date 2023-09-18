module.exports = function (config) {
  const webpackConfig = require('./webpack.config')({ development: true });
  webpackConfig.node = { fs: 'empty' };

  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './src',

    // This will be the new entry to webpack
    // so it should just be a single file
    files: ['index.specs.js'],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'index.specs.js': ['webpack'],
      '**/*.spec.js': ['webpack']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      stats: 'minimal'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
    // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    // Whether or not process should fail if test suite is empty
    failOnEmptyTestSuite: false,

    // Plugins to use
    plugins: ['karma-chrome-launcher', 'karma-jasmine', 'karma-teamcity-reporter', 'karma-webpack']
  });
};
