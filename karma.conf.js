// Karma configuration
// Generated on Fri Feb 17 2017 15:57:25 GMT+0800 (中国标准时间)

module.exports = function(config) {
  // 设置测试的超时时间

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine','commonjs'],

    // list of files  patterns to load in the browser
    // include:false表示不包含这些文件到浏览器中,注意添加顺序
    files: [

	/***Legacy文件夹下的源码添加至此***/
	{pattern:'src/Legacy/libs/SuperMap_Basic-8.1.1-14426.js',include:false},
	{pattern:'src/Legacy/libs/SuperMap_IServer-8.1.1-14426.js',include:false},
	{pattern:'src/Legacy/libs/Lang/*.js',include:false},
	{pattern:'src/Legacy/theme/default/*.css',include:false},

    /***Core文件夹下的源码添加至此***/
	'src/Core/base.js',
	'src/Core/**/*.js',

    /***Leaflet文件夹下的源码添加至此，暂未添加***/

    /***OL3文件夹下的源码添加至此，暂未添加***/

	/***以下全是测试文件***/
    'test/Tool/GlobeParameter.js',
    /**Core --iServer**/
    //'test/Core/iServer/AreaSolarRadiationServiceSpec.js',     //iclient8注释掉
    'test/Core/iServer/BufferAnalystServiceSpec.js',
    'test/Core/iServer/BufferDistanceSpec.js',
    'test/Core/iServer/BufferSettingSpec.js',
    'test/Core/iServer/BurstPipelineAnalystServiceSpec.js',
    //'test/Core/iServer/ChartFeatureInfoSpecsServiceSpec.js',  //iclient8注释掉,海图测试LayerServices相关的类，等待服务端支持后添加
    //'test/Core/iServer/ChartQueryServiceSpec.js',             //iclient8注释掉
    'test/Core/iServer/ComputeWeightMatrixServiceSpec.js',
    //'test/Core/iServer/DensityAnalystServiceSpec.js',         //iclient8注释掉,fieldName
    'test/Core/iServer/EditFeaturesServiceSpec.js',             //delete方法有问题，暂时将delete方法注释掉
    //三维网络分析Facility系列的测试全部被iClient8注释掉
    //'test/Core/iServer/FacilityAnalystSinks3DServiceSpec.js',
    //'test/Core/iServer/FacilityAnalystSources3DServiceSpec.js',
    //'test/Core/iServer/FacilityAnalystStreamServiceSpec.js',
    //'test/Core/iServer/FacilityAnalystTracedown3DServiceSpec.js',
    //'test/Core/iServer/FacilityAnalystTraceup3DServiceSpec.js',
    //'test/Core/iServer/FacilityAnalystUpstream3DServiceSpec.js',
    'test/Core/iServer/FieldStatisticServiceSpec.js',
    'test/Core/iServer/FindClosestFacilitiesServiceSpec.js',
    'test/Core/iServer/FindLocationServiceSpec.js',
    'test/Core/iServer/FindMTSPPathsServiceSpec.js',
    'test/Core/iServer/FindPathServiceSpec.js',
    'test/Core/iServer/FindServiceAreasServiceSpec.js',
    'test/Core/iServer/FindTSPPathsServiceSpec.js',
    'test/Core/iServer/GenerateSpatialDataServiceSpec.js',
    'test/Core/iServer/GeoRelationAnalystServiceSpec.js',
    'test/Core/iServer/GetFeaturesByBoundsServiceSpec.js',
    'test/Core/iServer/GetFeaturesByBufferServiceSpec.js',
    'test/Core/iServer/GetFeaturesByGeometryServiceSpec.js',
    'test/Core/iServer/GetFeaturesByIDsServiceSpec.js',
    'test/Core/iServer/GetFeaturesBySQLServiceSpec.js',
    'test/Core/iServer/GetFieldsServiceSpec.js',
    'test/Core/iServer/GetGridCellInfosServiceSpec.js',
    'test/Core/iServer/GetLayersInfoServiceSpec.js',
    //'test/Core/iServer/InterpolationAnalystServiceSpec.js',   //iclient8注释掉
    'test/Core/iServer/MapServiceSpec.js',
    'test/Core/iServer/MathExpressionAnalysisServiceSpec.js',
    'test/Core/iServer/MeasureServiceSpec.js',
    'test/Core/iServer/OverlayAnalystServiceSpec.js',
    'test/Core/iServer/QueryByBoundsServiceSpec.js',
    'test/Core/iServer/QueryByDistanceServiceSpec.js',
    'test/Core/iServer/QueryByGeometryServiceSpec.js',
    'test/Core/iServer/QueryBySQLServiceSpec.js',
    'test/Core/iServer/QueryServiceSpec.js',
    'test/Core/iServer/RouteCalculateMeasureServiceSpec.js',
    'test/Core/iServer/RouteLocatorServiceSpec.js',
    //'test/Core/iServer/SetLayerInfoServiceSpec.js',          //待开发先进行验证,再进行测试,暂时忽略
    //'test/Core/iServer/SetLayersInfoServiceSpec.js',         //待开发先进行验证,再进行测试,暂时忽略
    'test/Core/iServer/SetLayerStatusServiceSpec.js',
    'test/Core/iServer/StopQueryServiceSpec.js',
    'test/Core/iServer/SurfaceAnalystServiceSpec.js',          //待开发将等值线LinearRing添加到GeoJason后再补充对应测试
    'test/Core/iServer/TerrainCurvatureCalculationServiceSpec.js',
    'test/Core/iServer/ThemeServiceSpec.js',
    'test/Core/iServer/ThiessenAnalystServiceSpec.js',
    'test/Core/iServer/TilesetsServiceSpec.js',
    'test/Core/iServer/TransferPathServiceSpec.js',
    'test/Core/iServer/TransferSolutionServiceSpec.js',
    'test/Core/iServer/UpdateEdgeWeightServiceSpec.js',
    'test/Core/iServer/UpdateTurnNodeWeightServiceSpec.js'

    /*Leaflet、OL3、Legacy文件夹测试代码，暂未添加*/

    ],

    // list of files to exclude 测试时排除的文件
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
		'src/Legacy/libs/SuperMap_Basic-8.1.1-14426.js':['commonjs'],
		'src/Legacy/libs/SuperMap_IServer-8.1.1-14426.js':['commonjs'],
	    'src/Legacy/libs/Lang/*.js':['commonjs'],
		'src/Core/**/*.js':['commonjs','coverage'],
        'test/Core/**/*Spec.js': ['commonjs']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage','teamcity'],

    //最大超时时间
    captureTimeout: 120000,
    browserNoActivityTimeout: 120000,
    browserDisconnectTimeout:20000,

	coverageReporter: {
      dir: 'testcoverage/',
      reporters: [
        { type: 'lcov',subdir: '.'}
      ]
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
    concurrency: Infinity
  })
};
