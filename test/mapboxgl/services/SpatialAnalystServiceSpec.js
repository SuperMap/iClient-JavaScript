require('../../../src/mapboxgl/services/SpatialAnalystService');
var mapboxgl = require('mapbox-gl');

var url1 = GlobeParameter.spatialAnalystURL;
var url2 = GlobeParameter.spatialAnalystURL_Changchun;
var options = {
    serverType: 'iServer'
};
describe('mapboxgl_SpatialAnalystService', function () {
    var serviceResult;
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //地区太阳辐射 暂无相关服务
    /*xit('getAreaSolarRadiationResult_test', function () {
    });*/

    //缓冲区数据集分析  isAttributeRetained 默认为 true
    it('bufferAnalysis_test', function (done) {
        var bufferAnalystParameters = new SuperMap.DatasetBufferAnalystParameters({
            dataset: "Road_L@Jingjin",
            //设置数据集中几何对象的过滤条件。只有满足此条件的几何对象才参与缓冲区分析
            filterQueryParameter: new SuperMap.FilterParameter({attributeFilter: "NAME='莲花池东路'"}),
            bufferSetting: new SuperMap.BufferSetting({
                endType: SuperMap.BufferEndType.ROUND,
                leftDistance: {value: 200},
                rightDistance: {value: 200},
                semicircleLineSegment: 10
            })
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url1, options);
        service.bufferAnalysis(bufferAnalystParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.object.mode).toEqual("datasets");
                var result = serviceResult.result;
                expect(result).not.toBeNull();
                expect(result.succeed).toBe(true);
                expect(result.recordset.features.type).toEqual("FeatureCollection");
                var features = result.recordset.features.features[0];
                expect(features.id).toEqual(1);
                expect(features.type).toEqual("Feature");
                expect(features.geometry.type).toEqual("MultiPolygon");
                var coordinate = features.geometry.coordinates[0][0];
                expect(coordinate.length).toBeGreaterThan(0);
                for (var i = 0; i < coordinate.length; i++) {
                    expect(coordinate[i].length).toEqual(2);
                }
                expect(result.recordset.fieldCaptions.length).toEqual(18);
                expect(result.recordset.fieldTypes.length).toEqual(result.recordset.fieldCaptions.length);
                expect(result.recordset.fields.length).toEqual(result.recordset.fieldCaptions.length);
                done();
            } catch (e) {
                console.log("'bufferAnalysis_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    //缓冲区数据集分析  isAttributeRetained 为 false
    it('bufferAnalysis_isAttributeRetained_false_test', function (done) {
        var bufferAnalystParameters = new SuperMap.DatasetBufferAnalystParameters({
            dataset: "Road_L@Jingjin",
            //设置数据集中几何对象的过滤条件。只有满足此条件的几何对象才参与缓冲区分析
            filterQueryParameter: new SuperMap.FilterParameter({attributeFilter: "NAME='莲花池东路'"}),
            //是否将缓冲区与源记录集中的对象合并后返回
            isUnion: true,
            //是否保留进行缓冲区分析的对象的字段属性
            isAttributeRetained: false,
            bufferSetting: new SuperMap.BufferSetting({
                endType: SuperMap.BufferEndType.ROUND,
                leftDistance: {value: 200},
                rightDistance: {value: 200},
                semicircleLineSegment: 10
            })
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url1, options);
        service.bufferAnalysis(bufferAnalystParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.mode).toEqual("datasets");
                var result = serviceResult.result;
                expect(result).not.toBeNull();
                expect(result.succeed).toBe(true);
                expect(result.recordset.features.type).toEqual("FeatureCollection");
                var features = result.recordset.features.features[0];
                expect(features.id).toEqual(1);
                expect(features.type).toEqual("Feature");
                expect(features.geometry.type).toEqual("MultiPolygon");
                var coordinate = features.geometry.coordinates[0][0];
                expect(coordinate.length).toBeGreaterThan(0);
                for (var i = 0; i < coordinate.length; i++) {
                    expect(coordinate[i].length).toEqual(2);
                }
                expect(result.recordset.fieldCaptions.length).toEqual(10);
                expect(result.recordset.fieldTypes.length).toEqual(result.recordset.fieldCaptions.length);
                expect(result.recordset.fields.length).toEqual(result.recordset.fieldCaptions.length);
                done();
            } catch (e) {
                console.log("'bufferAnalysis_isAttributeRetained_false_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    //缓冲区分析 几何对象缓冲区分析
    it('bufferAnalysis_geometry_test', function (done) {
        var pointList = [
            [116.1916654036, 39.8888542507],
            [116.2031567225, 39.8888542507],
            [116.2156351162, 39.8963250173],
            [116.2740019864, 39.8970124079],
            [116.3103285499, 39.8970574832],
            [116.3321510064, 39.8970392162],
            [116.3377051439, 39.8973437531],
            [116.3463089006, 39.8978391816],
        ];
        var geometryLine = {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": pointList
            }
        };
        var goBufferAnalystParameters = new SuperMap.GeometryBufferAnalystParameters({
            sourceGeometry: geometryLine,
            sourceGeometrySRID: 4326,
            bufferSetting: new SuperMap.BufferSetting({
                endType: SuperMap.BufferEndType.ROUND,
                leftDistance: new SuperMap.BufferDistance({value: 300}),
                rightDistance: new SuperMap.BufferDistance({value: 300}),
                radiusUnit: "METER",
                semicircleLineSegment: 10
            })
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url1, options);
        service.bufferAnalysis(goBufferAnalystParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.mode).toEqual("geometry");
                var result = serviceResult.result;
                expect(result).not.toBeNull();
                expect(result.succeed).toBe(true);
                expect(result.resultGeometry.type).toEqual("Feature");
                expect(result.resultGeometry.geometry.type).toEqual("MultiPolygon");
                var coordinates = result.resultGeometry.geometry.coordinates[0][0];
                expect(coordinates.length).toBeGreaterThan(0);
                for (var i = 0; i < coordinates.length; i++) {
                    expect(coordinates[i].length).toEqual(2);
                }
                done();
            } catch (e) {
                console.log("'bufferAnalysis_geometry_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });


    //点密度分析,删除重复的数据集
    it('densityAnalysis_deleteExistResultDataset_true_test', function (done) {
        var densityKernelAnalystParameters = new SuperMap.DensityKernelAnalystParameters({
            dataset: "Railway@Changchun",
            //用于进行核密度分析的测量值的字段名称
            fieldName: "SmLength",
            resultGridName: "KernelDensity_Result",
            //删除重复的数据集
            deleteExistResultDataset: true
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url2, options);
        service.densityAnalysis(densityKernelAnalystParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.dataset).toEqual("KernelDensity_Result@Changchun");
                done();
            } catch (e) {
                console.log("'densityAnalysis_deleteExistResultDataset_true_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 8000);
    });

    //点密度分析,不删除重复的数据集（默认），此时创建一个重复的数据集，分析失败
    it('densityAnalysis_deleteExistResultDataset_false_test', function (done) {
        var densityKernelAnalystParameters = new SuperMap.DensityKernelAnalystParameters({
            dataset: "Railway@Changchun",
            //用于进行核密度分析的测量值的字段名称
            fieldName: "SmLength",
            resultGridName: "KernelDensity_Result",
            //不删除重复的数据集
            deleteExistResultDataset: false
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url2, options);
        service.densityAnalysis(densityKernelAnalystParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).toEqual("数据集KernelDensity_Result@Changchun已存在。");
                done();
            } catch (e) {
                console.log("'densityAnalysis_deleteExistResultDataset_false_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    //动态分段分析
    it('generateSpatialData_test', function (done) {
        var generateSpatialDataParameters = new SuperMap.GenerateSpatialDataParameters({
            routeTable: "RouteDT_road@Changchun",
            routeIDField: "RouteID",
            eventTable: "LinearEventTabDT@Changchun",
            eventRouteIDField: "RouteID",
            //用于生成空间数据的事件表的刻度字段，只有当事件为点事件的时候该属性才有意义
            measureField: "",
            measureStartField: "LineMeasureFrom", //只有当事件为线事件的时候该属性才有意义
            measureEndField: "LineMeasureTo",  //只有当事件为线事件的时候该属性才有意义
            measureOffsetField: "",
            errorInfoField: "",
            dataReturnOption: new SuperMap.DataReturnOption({
                expectCount: 1000,
                dataset: "generateSpatialData@Changchun",
                deleteExistResultDataset: true,
                dataReturnMode: SuperMap.DataReturnMode.DATASET_ONLY
            })
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url2, options);
        service.generateSpatialData(generateSpatialDataParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.dataset).toEqual("generateSpatialData@Changchun");
                done();
            } catch (e) {
                console.log("'generateSpatialData_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);

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
        var service = new mapboxgl.supermap.SpatialAnalystService(url2);
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

    //插值分析 点密度插值分析
    it('interpolationAnalysis_density_test', function (done) {
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
        var service = new mapboxgl.supermap.SpatialAnalystService(url1, options);
        service.interpolationAnalysis(interpolationAnalystParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.dataset).toContain("Density_Result");
                expect(serviceResult.object.mode).toEqual("Density");
                done();
            } catch (e) {
                console.log("'interpolationAnalysis_density_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 25000);
    });

    //插值分析 反距离加权插值分析
    it('interpolationAnalysis_IDW_dataset_test', function (done) {
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
        var service = new mapboxgl.supermap.SpatialAnalystService(url1, options);
        service.interpolationAnalysis(interpolationAnalystParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.dataset).toContain("IDW_result");
                expect(serviceResult.object.mode).toEqual("IDW");
                done();
            } catch (e) {
                console.log("'interpolationAnalysis_IDW_dataset_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 25000);
    });

    //栅格代数运算 删除已有的数据集  默认不删除
    it('mathExpressionAnalysis_deleteExistResultDataset_true_test', function (done) {
        var mathExpressionAnalysisParameters = new SuperMap.MathExpressionAnalysisParameters({
            dataset: "JingjinTerrain@Jingjin",
            expression: "[Jingjin.JingjinTerrain] + 600",
            targetDatasource: "Jingjin",
            resultGridName: "MathExpressionAnalysis_Result",
            //如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。默认为 false，即不删除
            deleteExistResultDataset: true
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url1, options);
        service.mathExpressionAnalysis(mathExpressionAnalysisParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.dataset).toEqual("MathExpressionAnalysis_Result@Jingjin");
                done();
            } catch (e) {
                console.log("'mathExpressionAnalysis_deleteExistResultDataset_true_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 8000);
    });

    //栅格代数运算 不删除已有的数据集
    it('mathExpressionAnalysis_deleteExistResultDataset__false_test', function (done) {
        var mathExpressionAnalysisParameters = new SuperMap.MathExpressionAnalysisParameters({
            dataset: "JingjinTerrain@Jingjin",
            expression: "[Jingjin.JingjinTerrain] + 600",
            targetDatasource: "Jingjin",
            resultGridName: "MathExpressionAnalysis_Result1",
            //如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。默认为 false，即不删除
            deleteExistResultDataset: false
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url1, options);
        service.mathExpressionAnalysis(mathExpressionAnalysisParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processFailed");
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).toEqual("数据集MathExpressionAnalysis_Result1@Jingjin已存在。");
                done();
            } catch (e) {
                console.log("'mathExpressionAnalysis_deleteExistResultDataset_false_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 8000);
    });

    //叠加分析
    it('overlayAnalysis_test', function (done) {
        var datasetOverlayAnalystParameters = new SuperMap.DatasetOverlayAnalystParameters({
            //叠加分析中源数据集的名称
            sourceDataset: "BaseMap_R@Jingjin",
            //叠加分析中操作数据集的名称
            operateDataset: "Neighbor_R@Jingjin",
            //容限
            tolerance: 0,
            //叠加操作枚举值
            operation: SuperMap.OverlayOperationType.UNION
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url1, options);
        service.overlayAnalysis(datasetOverlayAnalystParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.recordset.features.type).toEqual("FeatureCollection");
                var features = serviceResult.result.recordset.features.features;
                expect(features.length).toBeGreaterThan(0);
                for (var i = 0; i < features.length; i++) {
                    expect(features[i].type).toEqual("Feature");
                    expect(features[i].id).not.toBeNull();
                    expect(features[i].properties).not.toBeNull();
                    expect(features[i].geometry.type).toEqual("MultiPolygon");
                    var coordinates = features[i].geometry.coordinates[0][0];
                    expect(coordinates.length).toBeGreaterThan(0);
                    for (var j = 0; j < coordinates.length; j++) {
                        expect(coordinates[j].length).toEqual(2);
                    }
                }
                done();
            } catch (e) {
                console.log("'overlayAnalysis_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 8000);
    });

    //路由测量计算
    it('routeCalculateMeasure_test', function (done) {
        var piontLists = [
            [116.2143386597, 39.8959419733, 0],
            [116.217501999125, 39.896670999665, 282.3879789906],
            [116.220156000875, 39.896820999605, 509.9746364534],
            [116.228716999, 39.8968419995966, 1242.1340098965],
            [116.25000000025, 39.8968619995886, 3062.3045713007],
            [116.27412300025, 39.8967689996258, 5125.3836697258],
            [116.310443000875, 39.8971139994878, 8231.7823666408],
            [116.344168500812, 39.8976724992644, 11116.7053546891]
        ];
        var lineGeometryData = {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": piontLists
            }
        };
        var routeObj = lineGeometryData.geometry.coordinates;
        var routeLine = lineGeometryData;
        var point = [routeObj[4][0], routeObj[4][1]];
        var pointGeometryData = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": point
            }
        };
        var routeCalculateMeasureParameters = new SuperMap.RouteCalculateMeasureParameters({
            "sourceRoute": routeLine,   //必选,路由类型
            "point": pointGeometryData,            //必选
            "tolerance": 10,
            "isIgnoreGap": false
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url1, options);
        service.routeCalculateMeasure(routeCalculateMeasureParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.measure).toEqual(3103.167523778722);
                done();
            } catch (e) {
                console.log("'routeCalculateMeasure_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });

    //路由定位 里程定点
    it('routeLocate_point_test', function (done) {
        var piontLists = [
            [116.2143386597, 39.8959419733, 0],
            [116.217501999125, 39.896670999665, 282.3879789906],
            [116.220156000875, 39.896820999605, 511.787745072744],
            [116.228716999, 39.8968419995966, 1253.201708792909],
            [116.25000000025, 39.8968619995886, 3103.167523778722],
            [116.27412300025, 39.8967689996258, 5201.062444476062],
            [116.310443000875, 39.8971139994878, 8360.617856315024],
            [116.344168500812, 39.8976724992644, 11294.738396325054]
        ];

        var lineGeometryData = {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": piontLists
            }
        };

        var routeLine = lineGeometryData;
        var routeLocatorParameters_point = new SuperMap.RouteLocatorParameters({
            "sourceRoute": routeLine,
            "type": "POINT",
            "measure": 6753,
            "offset": 0,
            "isIgnoreGap": true
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url1, options);
        service.routeLocate(routeLocatorParameters_point, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.resultGeometry.type).toEqual("Feature");
                expect(serviceResult.result.resultGeometry.geometry.type).toEqual("Point");
                expect(serviceResult.result.resultGeometry.geometry.coordinates.length).toEqual(2);
                done();
            } catch (e) {
                console.log("'routeLocate_point_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)

    });

    //路由定位 里程定线
    it('routeLocate_line_test', function (done) {
        var piontLists = [
            [116.2143386597, 39.8959419733, 0],
            [116.217501999125, 39.896670999665, 282.3879789906],
            [116.220156000875, 39.896820999605, 511.787745072744],
            [116.228716999, 39.8968419995966, 1253.201708792909],
            [116.25000000025, 39.8968619995886, 3103.167523778722],
            [116.27412300025, 39.8967689996258, 5201.062444476062],
            [116.310443000875, 39.8971139994878, 8360.617856315024],
            [116.344168500812, 39.8976724992644, 11294.738396325054]
        ];
        var LineGeometryData = {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": piontLists
            }
        };
        var routeLine = LineGeometryData;
        var routeLocatorParameters_line = new SuperMap.RouteCalculateMeasureParameters({
            "sourceRoute": routeLine,
            "type": "LINE",
            "startMeasure": 1123,
            "endMeasure": 4489,
            "isIgnoreGap": true
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url1, options);
        service.routeLocate(routeLocatorParameters_line, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.resultGeometry.type).toEqual("Feature");
                expect(serviceResult.result.resultGeometry.geometry.type).toEqual("LineString");
                var coordinates = serviceResult.result.resultGeometry.geometry.coordinates;
                expect(coordinates.length).toBeGreaterThan(0);
                for (var i = 0; i < coordinates.length; i++) {
                    expect(coordinates[i].length).toEqual(2);
                }
                done();
            } catch (e) {
                console.log("'routeLocate_line_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });

    //表面分析
    it('surfaceAnalysis_test', function (done) {
        var datasetSurfaceAnalystParameters = new SuperMap.DatasetSurfaceAnalystParameters({
            dataset: "SamplesP@Interpolation",
            //获取或设置用于提取操作的字段名称
            zValueFieldName: "AVG_TMP",
            //获取或设置表面分析参数
            extractParameter: new SuperMap.SurfaceAnalystParametersSetting({
                datumValue: 0,
                interval: 2,
                resampleTolerance: 0,
                smoothMethod: SuperMap.SmoothMethod.BSPLINE,
                smoothness: 3,
                clipRegion: null
            }),
            resolution: 3000,
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url1, options);
        service.surfaceAnalysis(datasetSurfaceAnalystParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.recordset.features.type).toEqual("FeatureCollection");
                var features = serviceResult.result.recordset.features.features;
                expect(features.length).toBeGreaterThan(0);
                for (var i = 0; i < features.length; i++) {
                    expect(features[i].id).not.toBeNull();
                    expect(features[i].properties.ID).toEqual(features[i].id);
                    expect(features[i].properties).not.toBeNull();
                    expect(features[i].type).toEqual("Feature");
                    expect(features[i].geometry.type).toEqual("LineString");
                    expect(features[i].geometry.coordinates.length).toBeGreaterThan(2);
                    for (var j = 0; j < features[i].geometry.coordinates.length; j++) {
                        expect(features[i].geometry.coordinates[j].length).toEqual(2);
                    }
                }
                expect(serviceResult.result.recordset.fieldCaptions.length).toEqual(11);
                expect(serviceResult.result.recordset.fieldTypes.length).toEqual(serviceResult.result.recordset.fieldCaptions.length);
                expect(serviceResult.result.recordset.fields.length).toEqual(serviceResult.result.recordset.fieldCaptions.length);
                done();
            } catch (e) {
                console.log("'surfaceAnalysis_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 10000)
    });

    //地形曲率计算
    it('terrainCurvatureCalculate_test', function (done) {
        var terrainCurvatureCalculationParameters = new SuperMap.TerrainCurvatureCalculationParameters({
            dataset: "JingjinTerrain@Jingjin",
            zFactor: 1.0,
            averageCurvatureName: "CurvatureA",
            deleteExistResultDataset: true
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url1, options);
        service.terrainCurvatureCalculate(terrainCurvatureCalculationParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.averageCurvatureResult.dataset).toEqual("CurvatureA@Jingjin");
                expect(serviceResult.result.averageCurvatureResult.succeed).toEqual(true);
                done();
            } catch (e) {
                console.log("'terrainCurvatureCalculate_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });

    //泰森多边形分析 数据集泰森多边形
    it('thiessenAnalysis_datasets_test', function (done) {
        var datasetThiessenAnalystParameters = new SuperMap.DatasetThiessenAnalystParameters({
            dataset: "Town_P@Jingjin"
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url1, options);
        service.thiessenAnalysis(datasetThiessenAnalystParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.regions.type).toEqual("FeatureCollection");
                var features = serviceResult.result.regions.features;
                expect(features.length).toBeGreaterThan(0);
                for (var i = 0; i < features.length; i++) {
                    expect(features[i].type).toEqual("Feature");
                    expect(features[i].geometry.type).toEqual("MultiPolygon");
                    var coordinates = features[i].geometry.coordinates[0][0];
                    expect(coordinates.length).toBeGreaterThan(2);
                    for (var j = 0; j < coordinates.length; j++) {
                        expect(coordinates[j].length).toEqual(2);
                    }
                }
                done();
            } catch (e) {
                console.log("'thiessenAnalysis_datasets_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)

    });
    //泰森多边形分析 几何泰森多边形
    it('thiessenAnalysis_geometry_test', function (done) {
        var pointsList = [{
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [116.1916654036, 39.8888542507]
            }
        }, {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [116.7031567225, 40.0118542507]
            }
        }, {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [116.2156351162, 39.8963250173]
            }
        }, {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [116.2740019864, 40.0000124079]
            }
        }, {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [116.6003285499, 39.8970574832]
            }
        }];
        var gThiessenAnalystParameters = new SuperMap.GeometryThiessenAnalystParameters({
            points: pointsList
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url1, options);
        service.thiessenAnalysis(gThiessenAnalystParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.regions.type).toEqual("FeatureCollection");
                var features = serviceResult.result.regions.features;
                expect(features.length).toEqual(5);
                for (var i = 0; i < features.length; i++) {
                    expect(features[i].type).toEqual("Feature");
                    expect(features[i].geometry.type).toEqual("MultiPolygon");
                    var coordinates = features[i].geometry.coordinates[0][0];
                    for (var j = 0; j < coordinates.length; j++) {
                        expect(coordinates[j].length).toEqual(2);
                    }
                }
                done();
            } catch (e) {
                console.log("'thiessenAnalysis_geometry_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)

    });
});