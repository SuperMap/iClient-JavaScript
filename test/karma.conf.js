// Karma configuration
// Generated on Fri Feb 17 2017 15:57:25 GMT+0800 (中国标准时间)

module.exports = function (config) {
    // 设置测试的超时时间

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'browserify'],

        browserify: {
            debug: true,
            transform: [
                [require('babelify'), {
                    presets: ["es2015"],
                    ignore: ["**/legacy/libs/**", "**/test/**"],
                    plugins: ['transform-class-properties']
                }],
                require('browserify-css'),
                [require('browserify-istanbul'), {
                    instrumenterConfig: {
                        embedSource: true
                    }
                }]
            ]
        },

        // list of files  patterns to load in the browser
        // false 表示初始化的时候不会使用 script 标签直接将相关 js 引入到浏览器，需要自己写代码加载, 注意添加顺序
        files: [
        /***legacy的源码***/
            {pattern: '../src/legacy/libs/SuperMap_Basic-8.1.1-15125.js', include: false},
            {pattern: '../src/legacy/libs/Lang/*.js', include: false},
            {pattern: '../src/legacy/theme/default/*.css', include: false},
        /***common的源码***/
            '../src/common/*.js',
            '../src/common/**/*.js',
        /***leaflet的源码***/
            {pattern: '../node_modules/leaflet/dist/leaflet.css', include: false},
            {pattern: '../src/leaflet/**/**/*.css', include: false},
            '../src/leaflet/**/*.js',
            '../src/leaflet/overlay/**/*.js',
        /***openlayers的源码***/
            {pattern: '../node_modules/openlayers/dist/ol-debug.css', include: false},
            {pattern: '../src/leaflet/**/**/*.css', include: false},
            '../src/openlayers/**/*.js',
            '../src/openlayers/overlay/**/*.js',
        /***测试文件***/
            './tool/**.js',
            // 以下为不同客户端对应的配置文件, 分别存放各自的测试用例以便调试
            './test-main-common.js',
            './test-main-leaflet.js',
            './test-main-openlayers.js'
        ],

        // list of files to exclude 测试时排除的文件
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '../node_modules/whatwg-fetch-importable/whatwgFetch.js': ['browserify'],
            '../node_modules/fetch-jsonp/build/fetch-jsonp.js': ['browserify'],
            '../src/legacy/libs/SuperMap_Basic-8.1.1-15125.js': ['browserify'],
            '../src/legacy/libs/Lang/*.js': ['browserify'],
            '../src/common/**/*.js': ['browserify'],
            './common/**/*Spec.js': ['browserify'],
            './test-main-common.js': ['browserify'],

            '../node_modules/leaflet/dist/leaflet-src.js': ['browserify'],
            '../src/leaflet/**/*.js': ['browserify'],
            '../src/leaflet/overlay/**/*.js': ['browserify'],
            './leaflet/**/*Spec.js': ['browserify'],
            './test-main-leaflet.js': ['browserify'],

            '../node_modules/openlayers/dist/ol-debug.js': ['browserify'],
            '../src/openlayers/**/*.js': ['browserify'],
            '../src/openlayers/overlay/**/*.js': ['browserify'],
            './openlayers/**/*Spec.js': ['browserify'],
            './test-main-openlayers.js': ['browserify']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage', 'teamcity'],

        //最大超时时间
        captureTimeout: 120000,
        browserNoActivityTimeout: 120000,
        browserDisconnectTimeout: 20000,

        coverageReporter: {
            dir: 'testcoverage/',
            reporters: [
                {type: 'lcov', subdir: '.'}
            ]
        }
        ,

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity

    })
};
