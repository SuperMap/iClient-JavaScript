require('../../../src/common/iServer/DensityAnalystService');
var request = require('request');

var serviceFailedEventArgsSystem = null;
var analystEventArgsSystem = null;
var url = GlobeParameter.spatialAnalystURL_Changchun;
var options = {
    eventListeners: {"processCompleted": analyzeCompleted, 'processFailed': analyzeFailed}
};

function initDensityAnalystService() {
    return new SuperMap.DensityAnalystService(url, options);
}

function analyzeCompleted(analyseEventArgs) {
    analystEventArgsSystem = analyseEventArgs;
}

function analyzeFailed(serviceFailedEventArgs) {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}

describe('DensityAnalystService', function () {
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

    var resultDataset = "KernelDensity_commonTest";
    //成功事件
    it('SuccessEvent', function (done) {
        var densityAnalystService = initDensityAnalystService();
        expect(densityAnalystService).not.toBeNull();
        expect(densityAnalystService.url).toEqual(url);
        var densityKernelAnalystParameters = new SuperMap.DensityKernelAnalystParameters({
            dataset: "Railway@Changchun",
            //用于进行核密度分析的测量值的字段名称
            fieldName: "SmLength",
            resultGridName: resultDataset,
            //删除重复的数据集
            deleteExistResultDataset: true
        });
        densityAnalystService.processAsync(densityKernelAnalystParameters);
        densityAnalystService.events.on({"processCompleted": analyzeCompleted});
        setTimeout(function () {
            try {
                expect(analystEventArgsSystem.type).toEqual("processCompleted");
                var serviceResult = analystEventArgsSystem.result;
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.succeed).toBeTruthy();
                expect(serviceResult.dataset).toEqual(resultDataset + "@Changchun");
                densityAnalystService.destroy();
                densityKernelAnalystParameters.destroy();
                done();
            } catch (e) {
                expect(false).toBeTruthy();
                console.log("SuccessEvent" + e.name + ":" + e.message);
                densityAnalystService.destroy();
                densityKernelAnalystParameters.destroy();
                done();
            }
        }, 5000);
    });

    //失败事件
    it('FailedEvent', function (done) {
        var densityAnalystService = initDensityAnalystService();
        expect(densityAnalystService).not.toBeNull();
        expect(densityAnalystService.url).toEqual(url);
        var densityKernelAnalystParameters = new SuperMap.DensityKernelAnalystParameters({
            dataset: "xx@Changchun",
            //用于进行核密度分析的测量值的字段名称
            fieldName: "SmLength",
            resultGridName: resultDataset,
            deleteExistResultDataset: true
        });
        densityAnalystService.processAsync(densityKernelAnalystParameters);
        densityAnalystService.events.on({"processFailed": analyzeFailed});
        setTimeout(function () {
            try {
                expect(serviceFailedEventArgsSystem.type).toEqual("processFailed");
                var serviceResult = serviceFailedEventArgsSystem;
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).not.toBeNull();
                densityAnalystService.destroy();
                densityKernelAnalystParameters.destroy();
                done();
            } catch (e) {
                expect(false).toBeTruthy();
                console.log("FailedEvent" + e.name + ":" + e.message);
                densityAnalystService.destroy();
                densityKernelAnalystParameters.destroy();
                done();
            }
        }, 5000);
    });

    // 删除测试过程中产生的测试数据集
    it('delete test resources', function (done) {
        var testResult = GlobeParameter.datachangchunURL + resultDataset;
        request.delete(testResult);
        done();
    });
});