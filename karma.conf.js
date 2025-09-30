// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const path = require('path');

const targetDir = path.join(__dirname, '../../target');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-spec-reporter'),

    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    specReporter: {
      maxLogLines: 5,         // limit number of lines logged per test
      suppressErrorSummary: true,  // do not print error summary
      suppressFailed: false,  // do not print information about failed tests
      suppressPassed: true,  // do not print information about passed tests
      suppressSkipped: true,  // do not print information about skipped tests
      showSpecTiming: false // print the time elapsed for each spec
    },
    sonarqubeReporter: {
      basePath: path.join(__dirname, 'src/lib'),        // test files folder
      filePattern: '**/*spec.ts', // test files glob pattern
      encoding: 'utf-8',          // test files encoding
      outputFolder: path.join(targetDir, 'sonarqube'),    // report destination
      legacyMode: false,          // report for Sonarqube < 6.2 (disabled)
      reportName: 'test-report.xml'
    },
    coverageReporter: {
      dir: targetDir,
      subdir: 'coverage',
      reporters: [
        {type: 'lcov'},
        {type: 'text-summary'}
      ]
    },
    reporters: ['progress', 'kjhtml', 'spec', 'coverage'],
    check: {
      global: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80
      }
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadlessCI'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },

    singleRun: false,
    restartOnFileChange: true
  });
};
