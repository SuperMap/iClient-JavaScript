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
            transform: ['browserify-istanbul']
        },
        // list of files  patterns to load in the browser
        // false 表示初始化的时候不会使用 script 标签直接将相关 js 引入到浏览器，需要自己写代码加载, 注意添加顺序
        files: [
        /***legacy文件夹下的源码添加至此***/
            {pattern: 'src/legacy/libs/SuperMap_Basic-8.1.1-14426.js', include: false},
            {pattern: 'src/legacy/libs/Lang/*.js', include: false},
            {pattern: 'src/legacy/theme/default/*.css', include: false},
        /***common文件夹下的源码添加至此***/
            'src/common/SuperMap.js',
            'src/common/REST.js',
            'src/common/style/CartoCSS.js',
            'src/common/**/*.js',
        /***Leaflet文件夹下的源码添加至此，暂未添加***/
            'src/leaflet/**/*.js',
            'src/leaflet/overlay/**/*.js',
        /***OL3文件夹下的源码添加至此，暂未添加***/
            //'src/openlayers/**/*.js',
            //'src/openlayers/overlay/**/*.js',

        /***以下全是测试文件***/
            'test/tool/GlobeParameter.js',
        /**common --iServer**/
            //'test/common/iServer/AreaSolarRadiationServiceSpec.js',     //iclient8注释掉
            'test/common/iServer/BufferAnalystServiceSpec.js',
            'test/common/iServer/BufferDistanceSpec.js',
            'test/common/iServer/BufferSettingSpec.js',
            'test/common/iServer/BurstPipelineAnalystServiceSpec.js',
            //'test/common/iServer/ChartFeatureInfoSpecsServiceSpec.js',  //iclient8注释掉,海图测试LayerServices相关的类，等待服务端支持后添加
            //'test/common/iServer/ChartQueryServiceSpec.js',             //iclient8注释掉
            'test/common/iServer/ComputeWeightMatrixServiceSpec.js',
            //'test/common/iServer/DensityAnalystServiceSpec.js',         //iclient8注释掉,fieldName
            'test/common/iServer/EditFeaturesServiceSpec.js',
            //三维网络分析Facility系列的测试全部被iClient8注释掉
            //'test/common/iServer/FacilityAnalystSinks3DServiceSpec.js',
            //'test/common/iServer/FacilityAnalystSources3DServiceSpec.js',
            //'test/common/iServer/FacilityAnalystStreamServiceSpec.js',
            //'test/common/iServer/FacilityAnalystTracedown3DServiceSpec.js',
            //'test/common/iServer/FacilityAnalystTraceup3DServiceSpec.js',
            //'test/common/iServer/FacilityAnalystUpstream3DServiceSpec.js',
            'test/common/iServer/FieldStatisticServiceSpec.js',
            'test/common/iServer/FindClosestFacilitiesServiceSpec.js',
            'test/common/iServer/FindLocationServiceSpec.js',
            'test/common/iServer/FindMTSPPathsServiceSpec.js',
            'test/common/iServer/FindPathServiceSpec.js',
            'test/common/iServer/FindServiceAreasServiceSpec.js',
            'test/common/iServer/FindTSPPathsServiceSpec.js',
            'test/common/iServer/GenerateSpatialDataServiceSpec.js',
            'test/common/iServer/GeoRelationAnalystServiceSpec.js',
            'test/common/iServer/GetFeaturesByBoundsServiceSpec.js',
            'test/common/iServer/GetFeaturesByBufferServiceSpec.js',
            'test/common/iServer/GetFeaturesByGeometryServiceSpec.js',
            'test/common/iServer/GetFeaturesByIDsServiceSpec.js',
            'test/common/iServer/GetFeaturesBySQLServiceSpec.js',
            'test/common/iServer/GetFieldsServiceSpec.js',
            'test/common/iServer/GetGridCellInfosServiceSpec.js',
            'test/common/iServer/GetLayersInfoServiceSpec.js',
            //'test/common/iServer/InterpolationAnalystServiceSpec.js',   //iclient8注释掉
            'test/common/iServer/MapServiceSpec.js',
            'test/common/iServer/MathExpressionAnalysisServiceSpec.js',
            'test/common/iServer/MeasureServiceSpec.js',
            'test/common/iServer/OverlayAnalystServiceSpec.js',
            'test/common/iServer/QueryByBoundsServiceSpec.js',
            'test/common/iServer/QueryByDistanceServiceSpec.js',
            'test/common/iServer/QueryByGeometryServiceSpec.js',
            'test/common/iServer/QueryBySQLServiceSpec.js',
            'test/common/iServer/QueryServiceSpec.js',
            'test/common/iServer/RouteCalculateMeasureServiceSpec.js',
            'test/common/iServer/RouteLocatorServiceSpec.js',
            //'test/common/iServer/SetLayerInfoServiceSpec.js',          //待开发先进行验证,再进行测试,暂时忽略
            //'test/common/iServer/SetLayersInfoServiceSpec.js',         //待开发先进行验证,再进行测试,暂时忽略
            'test/common/iServer/SetLayerStatusServiceSpec.js',
            'test/common/iServer/StopQueryServiceSpec.js',
            //'test/common/iServer/SurfaceAnalystServiceSpec.js',          //待开发将等值线LinearRing添加到GeoJason后再补充对应测试
            'test/common/iServer/TerrainCurvatureCalculationServiceSpec.js',
            'test/common/iServer/ThemeServiceSpec.js',
            'test/common/iServer/ThiessenAnalystServiceSpec.js',
            'test/common/iServer/TilesetsServiceSpec.js',
            'test/common/iServer/TransferPathServiceSpec.js',
            'test/common/iServer/TransferSolutionServiceSpec.js',
            'test/common/iServer/UpdateEdgeWeightServiceSpec.js',
            'test/common/iServer/UpdateTurnNodeWeightServiceSpec.js',

            /*Leaflet、OL3、legacy文件夹测试代码，暂未添加*/
        /**leaflet --services**/
            'test/leaflet/services/QueryByBoundsServiceSpec.js',
            'test/leaflet/services/QueryByDistanceServiceSpec.js',
            'test/leaflet/services/QueryBySQLServiceSpec.js',
            'test/leaflet/services/QueryByGeometryServiceSpec.js',
            'test/leaflet/services/GetFeaturesByIDsServiceSpec.js',
            'test/leaflet/services/GetFeaturesByBoundsServiceSpec.js',
            'test/leaflet/services/GetFeaturesByBufferServiceSpec.js',
            'test/leaflet/services/GetFeaturesBySQLServiceSpec.js',
            'test/leaflet/services/GetFeaturesByGeometryServiceSpec.js',
            'test/leaflet/services/EditFeaturesServiceRegionSpec.js',
            'test/leaflet/services/EditFeaturesServiceLineSpec.js',
            'test/leaflet/services/EditFeaturesServicePointSpec.js',
            'test/leaflet/services/AddressServiceSpec.js',
            'test/leaflet/services/FieldServiceSpec.js',
            'test/leaflet/services/ThemeServiceSpec.js',

        /**openlayers --services**/
            //'test/openlayers/services/QueryServiceSpec.js'
        ],

        // list of files to exclude 测试时排除的文件
        exclude: [
            //暂时先排除(因为Request引用了node_modules中的库，但在karma下识别不到路径，暂时找不到解决办法)

            /*leaflet*/
            'test/leaflet/services/AddressServiceSpec.js'    //启了服务再测
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/legacy/libs/SuperMap_Basic-8.1.1-14426.js': ['browserify'],
            './node_modules/whatwg-fetch/fetch.js': ['browserify'],
            './node_modules/fetch-jsonp/build/fetch-jsonp.js': ['browserify'],
            'src/legacy/libs/Lang/*.js': ['browserify'],
            'src/common/**/*.js': ['browserify'],
            'test/common/**/*Spec.js': ['browserify'],

            'src/leaflet/**/*.js': ['browserify'],
            'src/leaflet/overlay/**/*.js': ['browserify'],
            './node_modules/leaflet/dist/leaflet-src.js': ['browserify'],
            './node_modules/leaflet/dist/leaflet.js': ['browserify'],
            './node_modules/leaflet/src/Leaflet.js': ['browserify'],
            'test/leaflet/**/*Spec.js': ['browserify'],

            //'src/openlayers/**/*.js': ['browserify'],
            //'src/openlayers/overlay/**/*.js': ['browserify'],
            //'node_modules/openlayers/dist/ol-debug.js': ['browserify'],
            //'node_modules/openlayers/dist/ol.js': ['browserify'],
            //'test/openlayers/**/*Spec.js': ['browserify']
        }
        ,

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
        concurrency: Infinity,

    })
};
