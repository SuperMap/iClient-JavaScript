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
                    presets: ["env"],
                    ignore: ["**/libs/**"],
                    plugins: ['istanbul']
                }],
                require('browserify-css'),
                require('browserify-imgify')
            ]
        },

        // list of files  patterns to load in the browser
        // false 表示初始化的时候不会使用 script 标签直接将相关 js 引入到浏览器，需要自己写代码加载, 注意添加顺序
        files: [
            /***测试文件***/
            './tool/**.js',
            './resources/**.js',
            /***classic的源码***/
            /*由于除了classic其他都不依赖于8c,所以classic 的引入放在最后，以免被common覆盖*/
            {pattern: '../src/classic/libs/SuperMap_Basic-8.1.1-15626.js', include: false},
            {pattern: '../src/classic/libs/Lang/*.js', include: false},
            {pattern: '../src/classic/theme/default/*.css', include: false},
            /**测试文件**/
            './test-main-classic.js',

            /***common的源码***/
            '../src/common/**/*.js',
            '../src/common/commontypes/**/*.js',
            '../src/common/overlay/**/*.js',
            /**测试文件**/
            './test-main-common.js',

            /***leaflet的源码***/
            {pattern: '../node_modules/leaflet/dist/leaflet.css', include: false},
            {pattern: '../src/leaflet/**/**/*.css', include: false},
            '../src/leaflet/**/*.js',
            '../src/leaflet/overlay/**/*.js',
            /**测试文件**/
            './test-main-leaflet.js',

            /***openlayers的源码***/
            {pattern: '../node_modules/openlayers/dist/ol-debug.css', include: false},
            {pattern: '../src/openlayers/**/**/*.css', include: false},
            '../src/openlayers/**/*.js',
            '../src/openlayers/overlay/**/*.js',
            /**测试文件**/
            './test-main-openlayers.js',

            /***mapboxgl***/
            {pattern: '../node_modules/mapbox-gl/dist/mapbox-gl.css', include: false},
            '../src/mapboxgl/**/*.js',
            '../src/mapboxgl/overlay/**/*.js',
            /**测试文件**/
            './test-main-mapboxgl.js'

        ],

        // list of files to exclude 测试时排除的文件
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '../node_modules/whatwg-fetch-importable/whatwgFetch.js': ['browserify'],
            '../node_modules/fetch-jsonp/build/fetch-jsonp.js': ['browserify'],
            '../src/classic/libs/SuperMap_Basic-8.1.1-15626.js': ['browserify'],
            '../src/classic/libs/Lang/*.js': ['browserify'],
            '../src/classic/**/*.js': ['browserify'],
            './classic/**/*Spec.js': ['browserify'],
            './test-main-classic.js': ['browserify'],

            '../src/common/**/*.js': ['browserify'],
            '../src/common/commontypes/**/*.js': ['browserify'],
            '../src/common/overlay/**/*.js': ['browserify'],
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
            './test-main-openlayers.js': ['browserify'],

            '../node_modules/mapbox-gl/dist/mapbox-gl-dev.js': ['browserify'],
            '../src/mapboxgl/**/*.js': ['browserify'],
            '../src/mapboxgl/overlay/**/*.js': ['browserify'],
            './mapboxgl/**/*Spec.js': ['browserify'],
            './test-main-mapboxgl.js': ['browserify']
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
