require('../../../src/common/iServer/ThiessenAnalystService');

var serviceFailedEventArgsSystem = null;
var analystEventArgsSystem = null;
var spatialAnalystURL_Changchun = GlobeParameter.spatialAnalystURL_Changchun;
function initThiessenAnalystService() {
    return new SuperMap.ThiessenAnalystService(spatialAnalystURL_Changchun,
        {eventListeners:{
            "processCompleted": analyzeCompleted,
            'processFailed': analyzeFailed
        }});
}
function analyzeFailed(serviceFailedEventArgs) {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}
function analyzeCompleted(analyseEventArgs) {
    analystEventArgsSystem = analyseEventArgs;
}

describe('testThiessenAnalystService_processAsync',function(){
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //成功事件 AnalyzeByDatasets
    it('AnalyzeByDatasets',function(done){
        var tsServiceByDatasets = initThiessenAnalystService();
        expect(tsServiceByDatasets).not.toBeNull();
        expect(tsServiceByDatasets.url).toEqual(spatialAnalystURL_Changchun);

        var dsThiessenAnalystParameters = new SuperMap.DatasetThiessenAnalystParameters({
            dataset: "Park@Changchun",
            filterQueryParameter: new SuperMap.FilterParameter({attributeFilter: "SMID < 5"})
        });
        tsServiceByDatasets.processAsync(dsThiessenAnalystParameters);

        setTimeout(function () {
            try {
                var tsResult = analystEventArgsSystem.result.regions;
                expect(tsResult).not.toBeNull();
                expect(tsResult.type).toEqual("FeatureCollection");
                expect(tsResult.features.length).toEqual(4);
                expect(tsResult.features[0].type).toEqual("Feature");
                expect(tsResult.features[0].geometry).not.toBeNull();
                expect(tsResult.features[0].geometry.coordinates).not.toBeNull();
                expect(tsResult.features[0].geometry.type).toEqual("MultiPolygon");

                tsServiceByDatasets.destroy();
                expect(tsServiceByDatasets.events).toBeNull();
                expect(tsServiceByDatasets.eventListeners).toBeNull();
                dsThiessenAnalystParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ThiessenAnalystService_" + exception.name + ":" + exception.message);
                tsServiceByDatasets.destroy();
                dsThiessenAnalystParameters.destroy();
                done();
            }
        }, 1500);
    });

    //成功事件 AnalyzeByGeometry
    it('AnalyzeByGeometry',function(done){
        var tsServiceByGeometry = initThiessenAnalystService();
        var points = [new SuperMap.Geometry.Point(21.35414430430097,91.59340881700358),
            new SuperMap.Geometry.Point(20.50760752363726,0.6802641290663991),
            new SuperMap.Geometry.Point(28.208029226321006,92.81799910814934),
            new SuperMap.Geometry.Point(23.986958756157428,95.21525547430991),
            new SuperMap.Geometry.Point(30.762395431757028,0.29794739028268236),
            new SuperMap.Geometry.Point(20.607496079935604,77.0461900744243)];
        var geoThiessenAnalystParameters = new SuperMap.GeometryThiessenAnalystParameters({
            points: points
        });
        tsServiceByGeometry.processAsync(geoThiessenAnalystParameters);

        setTimeout(function () {
            try {
                var tsResult = analystEventArgsSystem.result.regions;
                expect(tsResult).not.toBeNull();
                expect(tsResult.type).toEqual("FeatureCollection");
                expect(tsResult.features.length).toEqual(6);
                expect(tsResult.features[0].type).toEqual("Feature");
                expect(tsResult.features[0].geometry).not.toBeNull();
                expect(tsResult.features[0].geometry.coordinates).not.toBeNull();
                expect(tsResult.features[0].geometry.type).toEqual("MultiPolygon");

                tsServiceByGeometry.destroy();
                expect(tsServiceByGeometry.events).toBeNull();
                expect(tsServiceByGeometry.eventListeners).toBeNull();
                geoThiessenAnalystParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ThiessenAnalystService_" + exception.name + ":" + exception.message);
                tsServiceByGeometry.destroy();
                geoThiessenAnalystParameters.destroy();
                done();
            }
        }, 1500);
    });

    //测试失败事件 AnalyzeByGeometry
    it('AnalyzeByGeometry_failed',function(done){
        var tsServiceByGeometry = initThiessenAnalystService();
        var geoThiessenAnalystParameters = new SuperMap.GeometryThiessenAnalystParameters();
        tsServiceByGeometry.processAsync(geoThiessenAnalystParameters);

        setTimeout(function () {
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).toContain("参数 points 错误：不能为空。");
                tsServiceByGeometry.destroy();
                geoThiessenAnalystParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ThiessenAnalystService_" + exception.name + ":" + exception.message);
                tsServiceByGeometry.destroy();
                geoThiessenAnalystParameters.destroy();
                done();
            }
        }, 1500);
    });

    //测试失败事件 AnalyzeByDataset
    it('AnalyzeByDataset_failed',function(done){
        var tsServiceByDataset = initThiessenAnalystService();
        var dsThiessenAnalystParameters = new SuperMap.DatasetThiessenAnalystParameters({
            dataset: 'test'
        });
        tsServiceByDataset.processAsync(dsThiessenAnalystParameters);

        setTimeout(function () {
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(404);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).toContain("数据集test不存在");
                tsServiceByDataset.destroy();
                dsThiessenAnalystParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ThiessenAnalystService_" + exception.name + ":" + exception.message);
                tsServiceByDataset.destroy();
                dsThiessenAnalystParameters.destroy();
                done();
            }
        }, 1500);
    })
});

