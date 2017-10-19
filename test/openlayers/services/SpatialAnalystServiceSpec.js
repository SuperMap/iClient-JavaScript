require('../../../src/openlayers/services/SpatialAnalystService');

var originalTimeout, serviceResults;
var changchunBaseUrl = GlobeParameter.tileSetsURL;
var changchunServiceUrl = GlobeParameter.spatialAnalystURL_Changchun;
var sampleServiceUrl = GlobeParameter.spatialAnalystURL;
describe('openlayers_SpatialAnalystService', function () {
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResults = null;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //缓冲区分析
    it('bufferAnalysis test', function (done) {
        var dsBufferAnalystParameters = new SuperMap.DatasetBufferAnalystParameters({
            dataset: "RoadLine2@Changchun",
            filterQueryParameter: new SuperMap.FilterParameter({
                attributeFilter: "NAME='团结路'"
            }),
            bufferSetting: new SuperMap.BufferSetting({
                endType: SuperMap.BufferEndType.ROUND,
                leftDistance: {value: 10},
                rightDistance: {value: 10},
                semicircleLineSegment: 10
            })
        });
        var spatialAnalystService = new ol.supermap.SpatialAnalystService(changchunServiceUrl);
        spatialAnalystService.bufferAnalysis(dsBufferAnalystParameters, function (serviceResult) {
            serviceResults = serviceResult;
        });

        setTimeout(function () {
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.recordset.features).not.toBeNull();
            done();
        }, 8000);
    });

    //点密度分析
    it('densityAnalysis test', function (done) {
        var densityAnalystParameters = new SuperMap.DensityKernelAnalystParameters({
            dataset: "Railway@Changchun",
            bounds: [3800, -3800, 8200, -2200],
            fieldName: "SmLength",
            searchRadius: 50,
            resultGridName: "KernelDensity_Result",
            deleteExistResultDataset: true
        });
        var spatialAnalystService = new ol.supermap.SpatialAnalystService(changchunServiceUrl);
        spatialAnalystService.densityAnalysis(densityAnalystParameters, function (serviceResult) {
            serviceResults = serviceResult;
        });

        setTimeout(function () {
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.dataset).not.toBeNull();
            done();
        }, 8000);
    });

    it('generateSpatialData test', function (done) {
        var generateSpatialDataParameters = new SuperMap.GenerateSpatialDataParameters({
            routeTable: "RouteDT_road@Changchun",
            routeIDField: "RouteID",
            eventTable: "LinearEventTabDT@Changchun",
            eventRouteIDField: "RouteID",
            measureField: "",
            measureStartField: "LineMeasureFrom",
            measureEndField: "LineMeasureTo",
            measureOffsetField: "",
            errorInfoField: "",
            dataReturnOption: new SuperMap.DataReturnOption({
                expectCount: 1000,
                dataset: "generateSpatialData@Changchun",
                deleteExistResultDataset: true,
                dataReturnMode: SuperMap.DataReturnMode.DATASET_ONLY
            })
        });
        var spatialAnalystService = new ol.supermap.SpatialAnalystService(changchunServiceUrl);
        spatialAnalystService.generateSpatialData(generateSpatialDataParameters, function (serviceResult) {
            serviceResults = serviceResult;
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.dataset).not.toBeNull();
        });

        setTimeout(function () {
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.dataset).not.toBeNull();
            done();
        }, 8000);
    });

    //空间关系分析
    it('geoRelationAnalysis test', function (done) {
        var geoRelationAnalystParameters = new SuperMap.GeoRelationAnalystParameters({
            dataset: "Park@Changchun",
            startRecord: 0,
            expectCount: 5,
            //空间关系分析中的源数据集查询参数
            sourceFilter: new SuperMap.FilterParameter({attributeFilter: "SMID>0"}),
            referenceFilter: new SuperMap.FilterParameter({name: "Frame_R@Changchun", attributeFilter: "SMID>0"}),
            spatialRelationType: SuperMap.SpatialRelationType.INTERSECT,
            //位于面边线上的点是否被面包含
            isBorderInside: true,
            //是否返回Feature信息
            returnFeature: false,
            returnGeoRelatedOnly: true

        });
        var service = new ol.supermap.SpatialAnalystService(changchunServiceUrl);
        service.geoRelationAnalysis(geoRelationAnalystParameters, function (result) {
            serviceResults = result;
        });
        setTimeout(function () {
            expect(service).not.toBeNull();
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toEqual("processCompleted");
            expect(serviceResults.result.succeed).toEqual(true);
            expect(serviceResults.result.length).toEqual(5);
            for (var i = 0; i < serviceResults.result.length; i++) {
                expect(serviceResults.result[i].count).toEqual(1);
                expect(serviceResults.result[i].source).toEqual(i + 1);
                expect(serviceResults.result[i].result.length).toEqual(1);
            }
            done();
        }, 5000)
    });

    //插值分析
    describe('interpolationAnalysis test', function () {
        //点密度插值分析
        it('interpolationAnalysis_Density test', function (done) {
            var interpolationAnalystParameters = new SuperMap.InterpolationDensityAnalystParameters({
                dataset: "SamplesP@Interpolation",
                //插值分析结果数据集的名称
                outputDatasetName: "Density_Result",
                //插值分析结果数据源的名称
                outputDatasourceName: "Interpolation",
                //结果栅格数据集存储的像素格式
                pixelFormat: SuperMap.PixelFormat.DOUBLE,
                //插值结果栅格数据集的分辨率
                resolution: 3000,
                // 存储用于进行插值分析的字段名称
                zValueFieldName: "AVG_TMP",
                //结果栅格数据集的范围（生效）
                bounds: [-2640403.63, 1873792.1, 3247669.39, 5921501.4]
            });
            var spatialAnalystService = new ol.supermap.SpatialAnalystService(sampleServiceUrl);
            spatialAnalystService.interpolationAnalysis(interpolationAnalystParameters, function (serviceResult) {
                serviceResults = serviceResult;
            });

            setTimeout(function () {
                expect(serviceResults).not.toBeNull();
                expect(serviceResults.type).toBe('processCompleted');
                expect(serviceResults.result.dataset).not.toBeNull();
                done();
            }, 30000);
        });
        //反距离加权插值分析
        it('interpolationAnalysis_IDW_dataset test', function (done) {
            var interpolationAnalystParameters = new SuperMap.InterpolationIDWAnalystParameters({
                //用于做插值分析的数据源中数据集的名称
                dataset: "SamplesP@Interpolation",
                //插值分析结果数据集的名称
                outputDatasetName: "IDW_result",
                //插值分析结果数据源的名称
                outputDatasourceName: "Interpolation",
                //结果栅格数据集存储的像素格式
                pixelFormat: SuperMap.PixelFormat.DOUBLE,
                zValueFieldName: "AVG_TMP",
                resolution: 7923.84989108,
                //采取固定点数查找参与运算点的方式
                searchMode: "KDTREE_FIXED_COUNT",
                //固定点数查找方式下,参与差值运算的点数默认为12。
                expectedCount: 12,
                bounds: [-2640403.63, 1873792.1, 3247669.39, 5921501.4]
            });
            var spatialAnalystService = new ol.supermap.SpatialAnalystService(sampleServiceUrl);
            spatialAnalystService.interpolationAnalysis(interpolationAnalystParameters, function (serviceResult) {
                serviceResults = serviceResult;
            });

            setTimeout(function () {
                expect(serviceResults).not.toBeNull();
                expect(serviceResults.type).toBe('processCompleted');
                expect(serviceResults.result.dataset).not.toBeNull();
                done();
            }, 30000);
        });
        //离散点插值分析
        it('interpolationAnalysis_IDW_geometry test', function (done) {
            var baseurl = "http://localhost:8090/iserver/services/map-temperature/rest/maps/全国温度变化图";
            //通过SQL查询的方法获取用于插值分析的geometry
            var queryBySQLParams, queryBySQLService;
            queryBySQLService = new ol.supermap.QueryService(baseurl);
            queryBySQLParams = new SuperMap.QueryBySQLParameters({
                queryParams: [
                    new SuperMap.FilterParameter({
                        name: "SamplesP@Interpolation",
                        attributeFilter: "SMID>0"
                    })
                ]
            });
            queryBySQLService.queryBySQL(queryBySQLParams, function (serviceResult) {
                var result = serviceResult.result;
                var z;
                var zMin = parseFloat(-5), zMax = parseFloat(28);
                points = [];
                if (result) {
                    for (var i = 0; i < result.recordsets[0].features.features.length; i++) {
                        gp = result.recordsets[0].features.features[i].geometry;
                        var point = new ol.geom.Point([gp.coordinates[0], gp.coordinates[1]]);
                        //每个插值点在插值过程中的权重值
                        z = Math.random() * (zMax - zMin) + zMin;
                        point.tag = z;
                        points.push(point);
                    }
                }

                //创建离散点插值分析服务实例
                interpolationAnalystService = new ol.supermap.SpatialAnalystService(sampleServiceUrl);
                //创建离散点插值分析参数实例
                interpolationAnalystParameters = new SuperMap.InterpolationIDWAnalystParameters({
                    // 插值分析类型,geometry类型表示对离散点插值分析,默认为“dataset”
                    InterpolationAnalystType: "geometry",
                    // 插值分析结果数据集的名称
                    outputDatasetName: "IDWcretePoints_result",
                    // 插值分析结果数据源的名称
                    outputDatasourceName: "Interpolation",
                    // 结果栅格数据集存储的像素格式
                    pixelFormat: SuperMap.PixelFormat.BIT16,
                    // 用于做插值分析的离散点集合
                    inputPoints: points,
                    searchMode: "KDTREE_FIXED_RADIUS",
                    // 查找半径,与点数据单位相同
                    searchRadius: 200,
                    resolution: 3000,
                    bounds: [-2640403.63, 1873792.1, 3247669.39, 5921501.4]
                });
                interpolationAnalystService.interpolationAnalysis(interpolationAnalystParameters, function (serviceResult) {
                    serviceResults = serviceResult;
                });
            });

            setTimeout(function () {
                expect(serviceResults).not.toBeNull();
                expect(serviceResults.type).toBe('processCompleted');
                expect(serviceResults.result.dataset).not.toBeNull();
                done();
            }, 30000);
        });
    });

    //栅格代数运算
    it('mathExpressionAnalysis test', function (done) {
        var mathExpressionAnalysisParameters = new SuperMap.MathExpressionAnalysisParameters({
            dataset: "JingjinTerrain@Jingjin",
            expression: "[Jingjin.JingjinTerrain] + 600",
            targetDatasource: "Jingjin",
            resultGridName: "MathExpressionAnalysis_Result",
            deleteExistResultDataset: true
        });
        var spatialAnalystService = new ol.supermap.SpatialAnalystService(sampleServiceUrl);
        spatialAnalystService.mathExpressionAnalysis(mathExpressionAnalysisParameters, function (serviceResult) {
            serviceResults = serviceResult;
        });

        setTimeout(function () {
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.dataset).not.toBeNull();
            done();
        }, 8000);
    });

    //叠加分析
    it('overlayAnalysis test', function (done) {
        var datasetOverlayAnalystParameters = new SuperMap.DatasetOverlayAnalystParameters({
            sourceDataset: "BaseMap_R@Jingjin",
            operateDataset: "Neighbor_R@Jingjin",
            tolerance: 0,
            operation: SuperMap.OverlayOperationType.UNION
        });
        var spatialAnalystService = new ol.supermap.SpatialAnalystService(sampleServiceUrl);
        spatialAnalystService.overlayAnalysis(datasetOverlayAnalystParameters, function (serviceResult) {
            serviceResults = serviceResult;
        });

        setTimeout(function () {
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.recordset).not.toBeNull();
            done();
        }, 8000);
    });

    //点定里程
    it('routeCalculateMeasure test', function (done) {
        queryBySQLService = new ol.supermap.QueryService(changchunBaseUrl);
        queryBySQLParams = new SuperMap.QueryBySQLParameters({
            queryParams: [
                new SuperMap.FilterParameter({
                    name: "RouteDT_road@Changchun",
                    attributeFilter: "RouteID=1690"
                })
            ]
        });
        queryBySQLService.queryBySQL(queryBySQLParams, function (SQLQueryServiceResult) {
            var queryBySQLResult = SQLQueryServiceResult.result.recordsets[0].features;

            //将形成路由的点提出来，为了构造下面点定里程服务sourceRoute
            var pointsList = [];
            var routeObj = queryBySQLResult.features[0].geometry.coordinates[0];
            for (var i = 0; i < routeObj.length; i++) {
                pointsList.push([routeObj[i][0], routeObj[i][1], routeObj[i][2]])
            }
            var routeLine = new ol.geom.LineString([pointsList]);

            //在组成路由的点中选取一个查询点(数组中第8个点),并添加到地图上
            var point = new ol.geom.Point([routeObj[7][0], routeObj[7][1]]);

            //点定里程服务
            routeCalculateMeasureService = new ol.supermap.SpatialAnalystService(changchunServiceUrl);
            routeCalculateMeasureParameters = new SuperMap.RouteCalculateMeasureParameters({
                "sourceRoute": routeLine,   //必选,路由类型
                "point": point,            //必选
                "tolerance": 10,
                "isIgnoreGap": false
            });
            routeCalculateMeasureService.routeCalculateMeasure(routeCalculateMeasureParameters, function (routeCaculateServiceResult) {
                serviceResults = routeCaculateServiceResult;
            });
        });

        setTimeout(function () {
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.dataset).not.toBeNull();
            done();
        }, 8000);
    });

    //里程分析
    describe('routeLocate test', function () {
        //里程定线
        it('routeLocate_line', function (done) {
            queryBySQLService = new ol.supermap.QueryService(changchunBaseUrl);
            queryBySQLParams = new SuperMap.QueryBySQLParameters({
                queryParams: [
                    new SuperMap.FilterParameter({
                        name: "RouteDT_road@Changchun",
                        attributeFilter: "RouteID=1690"
                    })
                ]
            });
            queryBySQLService.queryBySQL(queryBySQLParams, function (SQLQueryServiceResult) {
                var queryBySQLResult = SQLQueryServiceResult.result.recordsets[0].features;

                //将形成路由的点提出来，为了构造下面点定里程服务sourceRoute
                var pointsList = [];
                var routeObj = queryBySQLResult.features[0].geometry.coordinates[0];
                for (var i = 0; i < routeObj.length; i++) {
                    pointsList.push([routeObj[i][0], routeObj[i][1], routeObj[i][2]])
                }
                var routeLine = new ol.geom.LineString([pointsList]);

                //里程定线服务
                routeLocatorService = new ol.supermap.SpatialAnalystService(changchunServiceUrl);
                routeLocatorParameters_line = new SuperMap.RouteLocatorParameters({
                    "sourceRoute": routeLine,
                    "type": "LINE",
                    "startMeasure": 200,
                    "endMeasure": 1000,
                    "isIgnoreGap": true
                });
                routeLocatorService.routeLocate(routeLocatorParameters_line, function (routeLocateServiceResult) {
                    serviceResults = routeLocateServiceResult;
                });
            });

            setTimeout(function () {
                expect(serviceResults).not.toBeNull();
                expect(serviceResults.type).toBe('processCompleted');
                expect(serviceResults.result.dataset).not.toBeNull();
                done();
            }, 8000);
        });

        //里程定点
        it('routeLocate_point', function (done) {
            queryBySQLService = new ol.supermap.QueryService(changchunBaseUrl);
            queryBySQLParams = new SuperMap.QueryBySQLParameters({
                queryParams: [
                    new SuperMap.FilterParameter({
                        name: "RouteDT_road@Changchun",
                        attributeFilter: "RouteID=1690"
                    })
                ]
            });
            queryBySQLService.queryBySQL(queryBySQLParams, function (SQLQueryServiceResult) {
                var queryBySQLResult = SQLQueryServiceResult.result.recordsets[0].features;
                //将形成路由的点提出来，为了构造下面点定里程服务sourceRoute
                var pointsList = [];
                var routeObj = queryBySQLResult.features[0].geometry.coordinates[0];
                for (var i = 0; i < routeObj.length; i++) {
                    pointsList.push([routeObj[i][0], routeObj[i][1], routeObj[i][2]])
                }
                var routeLine = new ol.geom.LineString([pointsList]);

                //里程定点服务
                routeLocatorService = new ol.supermap.SpatialAnalystService(changchunServiceUrl);
                routeLocatorParameters_point = new SuperMap.RouteLocatorParameters({
                    "sourceRoute": routeLine,
                    "type": "POINT",
                    "measure": 800,
                    "offset": 0,
                    "isIgnoreGap": true
                });
                routeLocatorService.routeLocate(routeLocatorParameters_point, function (routeLocateServiceResult) {
                    serviceResults = routeLocateServiceResult;
                });
            });

            setTimeout(function () {
                expect(serviceResults).not.toBeNull();
                expect(serviceResults.type).toBe('processCompleted');
                expect(serviceResults.result.dataset).not.toBeNull();
                done();
            }, 8000);
        });
    });

    //表面分析(提取等值线)
    it('surfaceAnalysis test', function (done) {
        var region = new ol.geom.Polygon([[
            [0, 4010338],
            [1063524, 4010338],
            [1063524, 3150322],
            [0, 3150322]
        ]]);
        var surfaceAnalystParameters = new SuperMap.DatasetSurfaceAnalystParameters({
            extractParameter: new SuperMap.SurfaceAnalystParametersSetting({
                datumValue: 0,
                interval: 2,
                resampleTolerance: 0,
                smoothMethod: SuperMap.SmoothMethod.BSPLINE,
                smoothness: 3,
                clipRegion: region
            }),
            dataset: "SamplesP@Interpolation",
            resolution: 3000,
            zValueFieldName: "AVG_TMP"
        });
        //创建表面分析服务实例
        var surfaceAnalystService = new ol.supermap.SpatialAnalystService(sampleServiceUrl);
        surfaceAnalystService.surfaceAnalysis(surfaceAnalystParameters, function (surfaceAnalystServiceResult) {
            serviceResults = surfaceAnalystServiceResult;
        });

        setTimeout(function () {
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.recordset).not.toBeNull();
            done();
        }, 8000);
    });

    //地形曲率计算
    it('terrainCurvatureCalculate test', function (done) {
        var terrainCurvatureCalculationParameters = new SuperMap.TerrainCurvatureCalculationParameters({
            dataset: "JingjinTerrain@Jingjin",
            zFactor: 1.0,
            averageCurvatureName: "CurvatureA",
            deleteExistResultDataset: true
        });
        //向iServer发起地形曲率计算请求
        var spatialAnalystService = new ol.supermap.SpatialAnalystService(sampleServiceUrl);
        spatialAnalystService.terrainCurvatureCalculate(terrainCurvatureCalculationParameters, function (serviceResult) {
            serviceResults = serviceResult;
        });

        setTimeout(function () {
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.recordset).not.toBeNull();
            done();
        }, 8000);
    });

    //泰森多边形
    describe('thiessenAnalysis test', function () {
        //数据集泰森多边形
        it('thiessenAnalysis_datasets test', function (done) {

            var dThiessenAnalystParameters = new SuperMap.DatasetThiessenAnalystParameters({
                dataset: "Factory@Changchun"
            });
            var spatialAnalystService = new ol.supermap.SpatialAnalystService(changchunServiceUrl);
            spatialAnalystService.thiessenAnalysis(dThiessenAnalystParameters, function (serviceResult) {
                serviceResults = serviceResult;
            });

            setTimeout(function () {
                expect(serviceResults).not.toBeNull();
                expect(serviceResults.type).toBe('processCompleted');
                expect(serviceResults.result.dataset).not.toBeNull();
                done();
            }, 8000);
        });
        //几何泰森多边形
        it('thiessenAnalysis_geometry test', function (done) {
            //创建几何泰森多边形参数
            var pointsList = [
                new ol.geom.Point([5238.998556, -1724.229865]),
                new ol.geom.Point([4996.270055, -2118.538477]),
                new ol.geom.Point([5450.34263, -2070.794081]),
                new ol.geom.Point([5317.70775, -2521.162355]),
                new ol.geom.Point([5741.149405, -1970.130198]),
                new ol.geom.Point([4716.133098, -1575.858795]),
                new ol.geom.Point([5447.671615, -2255.928819]),
                new ol.geom.Point([4783.423507, -1135.598744]),
                new ol.geom.Point([5472.712382, -2189.15344]),
                new ol.geom.Point([5752.716961, -2425.40363])
            ];

            var gThiessenAnalystParameters = new SuperMap.GeometryThiessenAnalystParameters({
                points: pointsList
            });
            //创建泰森多边形服务实例
            var spatialAnalystService = new ol.supermap.SpatialAnalystService(changchunServiceUrl);
            spatialAnalystService.thiessenAnalysis(gThiessenAnalystParameters, function (serviceResult) {
                serviceResults = serviceResult;
            });

            setTimeout(function () {
                expect(serviceResults).not.toBeNull();
                expect(serviceResults.type).toBe('processCompleted');
                expect(serviceResults.result.dataset).not.toBeNull();
                done();
            }, 8000);
        });
    })
});
