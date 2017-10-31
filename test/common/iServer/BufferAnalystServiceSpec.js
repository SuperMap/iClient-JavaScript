require('../../../src/common/iServer/BufferAnalystService');
var request = require('request');

var serviceFailedEventArgsSystem = null;
var analystEventArgsSystem = null;
var url = GlobeParameter.spatialAnalystURL;
var options = {
    eventListeners: {"processCompleted": analyzeCompleted, 'processFailed': analyzeFailed}
};

function initBufferAnalystService() {
    return new SuperMap.BufferAnalystService(url, options);
}

function analyzeFailed(serviceFailedEventArgs) {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}

function analyzeCompleted(analyseEventArgs) {
    analystEventArgsSystem = analyseEventArgs;
}

describe('BufferAnalystService', function () {
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        serviceFailedEventArgsSystem = null;
        analystEventArgsSystem = null;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //测试成功事件
    it('success:BufferAnalystService_byDatasets', function (done) {
        var bfServiceByDatasets = initBufferAnalystService();
        var resultSetting = new SuperMap.DataReturnOption({
            expectCount: 2000,
            dataset: "bufferAnalystByDS_commonTest",
            dataReturnMode: SuperMap.DataReturnMode.DATASET_ONLY,
            deleteExistResultDataset: true
        });
        var dsBufferAnalystParameters = new SuperMap.DatasetBufferAnalystParameters();
        dsBufferAnalystParameters.dataset = "Landuse_R@Jingjin";
        dsBufferAnalystParameters.filterQueryParameter.attributeFilter = "smid like 48";
        dsBufferAnalystParameters.bufferSetting.endType = SuperMap.BufferEndType.ROUND;
        dsBufferAnalystParameters.bufferSetting.semicircleLineSegment = 5;
        dsBufferAnalystParameters.bufferSetting.leftDistance.value = 100;
        dsBufferAnalystParameters.resultSetting = resultSetting;
        bfServiceByDatasets.processAsync(dsBufferAnalystParameters);
        setTimeout(function () {
            try {
                expect(bfServiceByDatasets.mode).toEqual("datasets");
                expect(analystEventArgsSystem).not.toBeNull();
                bfServiceByDatasets.destroy();
                expect(bfServiceByDatasets.events).toBeNull();
                expect(bfServiceByDatasets.eventListeners).toBeNull();
                expect(bfServiceByDatasets.mode).toBeNull();
                dsBufferAnalystParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("BufferAnalystService_byDatasets" + exception.name + ":" + exception.message);
                bfServiceByDatasets.destroy();
                dsBufferAnalystParameters.destroy();
                done();
            }
        }, 5000)
    });

    it('success:BufferAnalystService_byGeometry', function (done) {
        var bfServiceByGeometry = initBufferAnalystService();
        expect(bfServiceByGeometry).not.toBeNull();
        expect(bfServiceByGeometry.url).toEqual(url);
        var sourceGeometry = new SuperMap.Geometry.Point(7884.79277012316, 5072.18865322196);
        var bufferSetting = new SuperMap.BufferSetting();
        bufferSetting.endType = SuperMap.BufferEndType.ROUND;
        bufferSetting.leftDistance.value = 300;
        bufferSetting.semicircleLineSegment = 5;
        var geometryBufferAnalystParameters = new SuperMap.GeometryBufferAnalystParameters();
        geometryBufferAnalystParameters.sourceGeometry = sourceGeometry;
        geometryBufferAnalystParameters.bufferSetting = bufferSetting;
        bfServiceByGeometry.processAsync(geometryBufferAnalystParameters);
        setTimeout(function () {
            try {
                var bfMode = analystEventArgsSystem.result.resultGeometry;
                expect(bfMode).not.toBeNull();
                expect(bfMode.type).toEqual("Feature");
                bfServiceByGeometry.destroy();
                expect(bfServiceByGeometry.events).toBeNull();
                expect(bfServiceByGeometry.eventListeners).toBeNull();
                expect(bfServiceByGeometry.mode).toBeNull();
                geometryBufferAnalystParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("BufferAnalystService_byGeometry" + exception.name + ":" + exception.message);
                bfServiceByGeometry.destroy();
                geometryBufferAnalystParameters.destroy();
                done();
            }
        }, 4000)
    });

    //测试失败事件
    it('fail:BufferAnalystService_byGeometry', function (done) {
        var bfServiceByGeometry = initBufferAnalystService();
        expect(bfServiceByGeometry).not.toBeNull();
        expect(bfServiceByGeometry.url).toEqual(url);
        var sourceGeometry = new SuperMap.Geometry.Point(7884.79277012316, 5072.18865322196);
        var bufferSetting = new SuperMap.BufferSetting();
        bufferSetting.endType = SuperMap.BufferEndType.ROUND;
        bufferSetting.leftDistance.value = -1;
        bufferSetting.semicircleLineSegment = 5;
        var geometryBufferAnalystParameters = new SuperMap.GeometryBufferAnalystParameters();
        geometryBufferAnalystParameters.sourceGeometry = sourceGeometry;
        geometryBufferAnalystParameters.bufferSetting = bufferSetting;
        bfServiceByGeometry.processAsync(geometryBufferAnalystParameters);
        setTimeout(function () {
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).toContain("左缓冲距离不能小于等于0");
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                bfServiceByGeometry.destroy();
                expect(bfServiceByGeometry.events).toBeNull();
                expect(bfServiceByGeometry.eventListeners).toBeNull();
                expect(bfServiceByGeometry.mode).toBeNull();
                geometryBufferAnalystParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("fail:BufferAnalystService_byGeometry" + exception.name + ":" + exception.message);
                bfServiceByGeometry.destroy();
                dsBufferAnalystParameters.destroy();
                done();
            }
        }, 4000)
    });

    // 删除测试过程中产生的测试数据集
    it('delete test resources', function (done) {
        var bufferbyDSResult = GlobeParameter.datajingjinURL + "bufferAnalystByDS_commonTest";
        request.delete(bufferbyDSResult, function (response) {
            console.log(response);
        });
        done();
    });
});




