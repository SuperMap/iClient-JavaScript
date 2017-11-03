require('../../../src/mapboxgl/services/SpatialAnalystService');
var request = require('request');
var mapboxgl = require('mapbox-gl');

var url = GlobeParameter.spatialAnalystURL;
var options = {
    serverType: 'iServer'
};
describe('mapboxgl_SpatialAnalystService_bufferAnalysis', function () {
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

    //缓冲区数据集分析  isAttributeRetained 默认为 true
    it('bufferAnalysis_isAttributeRetained:true', function (done) {
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
        var service = new mapboxgl.supermap.SpatialAnalystService(url, options);
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
                console.log("'bufferAnalysis_isAttributeRetained:true'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 7000);
    });

    //缓冲区数据集分析  isAttributeRetained 为 false
    it('bufferAnalysis_isAttributeRetained:false', function (done) {
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
        var service = new mapboxgl.supermap.SpatialAnalystService(url, options);
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
                console.log("'bufferAnalysis_isAttributeRetained:false'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    var resultDataset = "BufferAnalystByDatasets_mbglTest";
    //缓冲区数据集分析  返回值为数据集
    it('bufferAnalysis_DATASET_ONLY', function (done) {
        var bufferAnalystParameters = new SuperMap.DatasetBufferAnalystParameters({
            dataset: "Road_L@Jingjin",
            //设置数据集中几何对象的过滤条件。只有满足此条件的几何对象才参与缓冲区分析
            filterQueryParameter: new SuperMap.FilterParameter({attributeFilter: "NAME='莲花池东路'"}),
            bufferSetting: new SuperMap.BufferSetting({
                endType: SuperMap.BufferEndType.ROUND,
                leftDistance: {value: 200},
                rightDistance: {value: 200},
                semicircleLineSegment: 10
            }),
            resultSetting: new SuperMap.DataReturnOption({
                expectCount: 2000,
                dataset: resultDataset,
                dataReturnMode: SuperMap.DataReturnMode.DATASET_ONLY,
                deleteExistResultDataset: true
            })
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url, options);
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
                expect(result.dataset).toEqual(resultDataset + "@Jingjin");
                done();
            } catch (e) {
                console.log("'bufferAnalysis_isAttributeRetained:true'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 6000);
    });

    //缓冲区分析 几何对象缓冲区分析
    it('bufferAnalysis_byGeometry', function (done) {
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
        var service = new mapboxgl.supermap.SpatialAnalystService(url, options);
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
                console.log("'bufferAnalysis_byGeometry'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    // 删除测试过程中产生的测试数据集
    it('delete test resources', function (done) {
        var testResult = GlobeParameter.datajingjinURL + resultDataset;
        request.delete(testResult);
        done();
    });
});