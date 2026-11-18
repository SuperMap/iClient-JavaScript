// Karma configuration
// Generated on Fri Feb 17 2017 15:57:25 GMT+0800 (中国标准时间)
const fileUtil = require('karma-sonarqube-unit-reporter/src/file-util.js');
const { Command } = require('commander');
const program = new Command();
const testPath = ['./test'];
const testFilePattern = 'Spec.js';
const filesForDescriptions = fileUtil.getFilesForDescriptions(testPath, testFilePattern);

// maplibre-gl v6 仅以 ESM 发布，自包含的 mjs 里有两处 import.meta.url（仅用于推导 worker 地址）。
// 测试由 browserify 打成经典脚本，ESM 的 import.meta 在经典脚本中非法，这里替换为 { url: "" }，
// 真实 worker 地址改由 test-main-maplibregl.js 中的 setWorkerUrl 指定。
function importMetaToEmptyObject({ types: t }) {
  return {
    visitor: {
      MetaProperty(p) {
        if (p.node.meta.name === 'import' && p.node.property.name === 'meta') {
          p.replaceWith(t.objectExpression([t.objectProperty(t.identifier('url'), t.stringLiteral(''))]));
        }
      }
    }
  };
}

program.option('--single-run').option('--no-auto-watch').option('--server <server>');
const testServer = program.parse(process.argv).opts().server || 'http://localhost:8090/iserver';
console.log('testServer',testServer);
module.exports = function (config) {
  // 设置测试的超时时间
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'browserify'],

    client: {
      jasmine: {
        random: false
      }
    },

    browserify: {
      debug: false,
      cache: {},
      packageCache: {},
      // maplibre-gl v6 无 CommonJS 入口（package.json 仅 exports import 到 .mjs），browserify 无法直接解析裸名。
      // 将裸名 'maplibre-gl' 别名到官方自包含的生产 mjs，由 babelify 转译为 CJS 打进 bundle。
      configure(bundle) {
        bundle.exclude('maplibre-gl');
        const maplibreMjs = require.resolve('../node_modules/maplibre-gl/dist/maplibre-gl.mjs');
        bundle.require(maplibreMjs, { expose: 'maplibre-gl' });
        // 给 maplibre-gl 的 mjs 单独挂一个轻量 babel transform：
        // 只做 ESM→CJS（preset-env）+ import.meta.url 替换，
        // 不带 istanbul 覆盖率统计和 @babel/plugin-transform-runtime。
        bundle.transform(require('babelify'), {
          global: true,
          only: [maplibreMjs],
          presets: [['@babel/preset-env', { targets: { chrome: '79' } }]],
          plugins: [importMetaToEmptyObject]
        });
      },
      transform: [
        [
          require('babelify'),
          {
            global: true,
            presets: [['@babel/preset-env', { targets: { chrome: '79' } }]],
            ignore: [
              '../src/classic/libs/**',
              '../test/libs/**',
              '../node_modules/mapbox-gl/**',
              '../node_modules/maplibre-gl/**',
              '../node_modules/three/**',
              '../node_modules/xlsx/**',
              '../node_modules/@turf/**',
              '../node_modules/lodash/**',
              '../node_modules/echarts/dist/echarts.js',
              '../src/mapboxgl/overlay/L7/l7-render.js',
              '../src/maplibregl/overlay/L7/l7-render.js',
              '../node_modules/video.js/dist/video.cjs.js',
              '../src/common/util/UGCWasmAll.js'
              
            ],
            plugins: ['istanbul', '@babel/plugin-transform-runtime']
          }
        ],
        [require('browserify-css'), { global: true }],
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
      { pattern: '../src/classic/libs/SuperMap_Basic-8.1.1-17729.js', included: true },
      { pattern: '../src/classic/libs/Lang/*.js', included: true },
      { pattern: '../src/classic/theme/default/*.css', included: true },
      { pattern: './resources/data/**.fgb', included: false },
      { pattern: './resources/data/**.mp4', included: false },
      { pattern: './resources/img/**.svg', included: false },
      { pattern: './resources/img/baiduTileTest.png', included: false },
      /**测试文件**/
      './test-main-classic.js',

      /***common的源码***/
      '../src/common/!(ai)/*.js',
      /**测试文件**/
      './test-main-common.js',

      /***leaflet的源码***/
      { pattern: './libs/workers/TurfWorkerForTest.js', included: false },
      { pattern: '../node_modules/leaflet/dist/leaflet.css', included: true },
      { pattern: '../src/leaflet/**/**/*.css', included: true },
      '../src/leaflet/**/!(index).js',
      /**测试文件**/
      './test-main-leaflet.js',

      /***openlayers的源码***/
      { pattern: '../node_modules/ol/ol.css', included: true },
      { pattern: '../src/openlayers/**/**/*.css', included: true },
      '../src/openlayers/**/!(index).js',
      /**测试文件**/
      './test-main-openlayers.js',
      /***mapboxgl***/
      { pattern: '../node_modules/mapbox-gl/dist/mapbox-gl.css', included: true },
      { pattern: './resources/data/sprite.png', included: false },
      { pattern: './resources/data/sprite.json', included: false },
      '../src/mapboxgl/**/!(index).js',
      /**测试文件**/
      './test-main-mapboxgl.js',
      { pattern: '../node_modules/maplibre-gl/dist/maplibre-gl.css', included: false },
      { pattern: './libs/workers/maplibre-gl-worker.mjs', included: false },
      '../src/maplibregl/**/!(index).js',
      /**测试文件**/
      './test-main-maplibregl.js'
    ],

    // list of files to exclude 测试时排除的文件
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './tool/!(GlobeParameter).js': ['browserify'],
      '../node_modules/fetch-jsonp/build/fetch-jsonp.js': ['browserify'],
      '../src/classic/libs/SuperMap_Basic-8.1.1-17729.js': ['browserify'],
      '../src/classic/libs/Lang/*.js': ['browserify'],
      '../src/classic/**/!(index).js': ['browserify'],
      // './classic/**/*Spec.js': ['browserify'],
      './test-main-classic.js': ['browserify'],
      '../src/common/**/*.js': ['browserify'],
      // './common/**/*Spec.js': ['browserify'],
      './test-main-common.js': ['browserify'],

      '../node_modules/leaflet/dist/leaflet-src.js': ['browserify'],
      '../src/leaflet/**/!(index).js': ['browserify'],
      // './leaflet/**/*Spec.js': ['browserify'],
      './test-main-leaflet.js': ['browserify'],

      '../node_modules/ol/*.js': ['browserify'],
      '../node_modules/ol/**/*.js': ['browserify'],
      '../src/openlayers/**/!(index).js': ['browserify'],
      // './openlayers/**/*Spec.js': ['browserify'],
      './test-main-openlayers.js': ['browserify'],

      '../node_modules/mapbox-gl/dist/mapbox-gl-dev.js': ['browserify'],
      '../src/mapboxgl/**/!(index).js': ['browserify'],
      // './mapboxgl/**/*Spec.js': ['browserify'],
      './test-main-mapboxgl.js': ['browserify'],
      // maplibre-gl v6 无 .js 入口，configure(bundle) 中已处理 mjs 别名，此处不直接预处理器
      '../src/maplibregl/**/!(index).js': ['browserify'],
      './test-main-maplibregl.js': ['browserify']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'sonarqubeUnit', 'coverage', 'teamcity'],

    //最大超时时间
    captureTimeout: 120000,
    browserNoActivityTimeout: 120000,
    browserDisconnectTimeout: 20000,

    coverageReporter: {
      dir: 'testcoverage/',
      reporters: [{ type: 'lcov', subdir: '.' },{ type: 'json', subdir: '.' }]
    },
    sonarQubeUnitReporter: {
      sonarQubeVersion: 'LATEST',
      outputFile: 'testcoverage/ut_report.xml',
      filenameFormatter: (nextPath, result) => {
        return filesForDescriptions[nextPath] || '';
      },
      testnameFormatter: (testname, result) => {
        if (result.time < 1) {
          result.time = 1;
        }
        return testname;
      },
      useBrowserName: false
    },
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
    concurrency: Infinity,
    proxies: {
      '/iserver/': testServer
    }
  });
};
