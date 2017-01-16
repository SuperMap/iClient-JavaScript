module("DensityAnalystService");
var serviceFailedEventArgsSystem = null;
var analystEventArgsSystem = null;

function initDensityKernelAnalystService() {
    return new SuperMap.REST.DensityAnalystService(GlobeParameter.spatialAnalystURL_Changchun, {eventListeners:{"processCompleted": analyzeCompleted,'processFailed': analyzeFailed}});
}
function analyzeFailed(serviceFailedEventArgs) {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}
function analyzeCompleted(analyseEventArgs) {
    analystEventArgsSystem = analyseEventArgs;
}

//成功事件
asyncTest("TestDensityAnalystServiceCompleted", function () {
    expect(9);
    
    var densityAnalystService = initDensityKernelAnalystService();
    ok(densityAnalystService != null, "not null");
    equal(densityAnalystService.url, GlobeParameter.spatialAnalystURL_Changchun, "url");
    var densityKernelAnalystParameters = new SuperMap.REST.DensityKernelAnalystParameters({
        dataset: "Railway@Changchun",
        bounds: new SuperMap.Bounds(4000, -3500, 6000, -2500),
        fieldName: "SmLength",
        resultGridDatasetResolution: 2,
        targetDatasource: "Changchun",
        resultGridName: "KernelDensity_Result_Test",
        deleteExistResultDataset: true
    });
    densityAnalystService.processAsync(densityKernelAnalystParameters);

    setTimeout(function () {
        try {
            var densityAnalystResult = densityAnalystService.lastResult;
            ok(densityAnalystResult != null, "densityAnalystService.lastResult");
            ok(analystEventArgsSystem != null,"densityAnalystService.Succeed");

            densityAnalystService.destroy();
            equal(densityAnalystService.events, null, "densityAnalystService.events");
            equal(densityAnalystService.eventListeners , null, "densityAnalystService.eventListeners");
            equal(densityAnalystService.lastResult , null, "densityAnalystService.lastResult");

            analystEventArgsSystem.destroy();
            ok(analystEventArgsSystem != null, "not null");
            equal(analystEventArgsSystem.result, null, "analystEventArgsSystem.result");
            start();
        } catch (exception) {
            ok(false, "exception occcurs,message is:" + exception.message)
            start();
        }
    }, 15000)
});

//测试失败事件
asyncTest("TestDensityAnalystServiceFailed", function () {
    expect(7)
    var densityAnalystService = initDensityKernelAnalystService();
    ok(densityAnalystService != null, "not null");
    equal(densityAnalystService.url, GlobeParameter.spatialAnalystURL_Changchun, "url");

    var densityKernelAnalystParameters = new SuperMap.REST.DensityKernelAnalystParameters({
        dataset: "XX@Changchun",
        bounds: new SuperMap.Bounds(4000, -3500, 6000, -2500),
        fieldName: "SmLength",
        resultGridDatasetResolution: 2,
        searchRadius: -50,
        targetDatasource: "XX",
        resultGridName: "KernelDensity_Result_Test",
        deleteExistResultDataset: true
    });
    densityAnalystService.processAsync(densityKernelAnalystParameters);


    setTimeout(function () {
        try {
            ok(serviceFailedEventArgsSystem != null, "densityAnalystService.Failed");

            densityAnalystService.destroy();
            equal(densityAnalystService.events, null, "densityAnalystService.events");
            equal(densityAnalystService.eventListeners , null, "densityAnalystService.eventListeners");
            equal(densityAnalystService.lastResult , null, "densityAnalystService.lastResult");

            ok(analystEventArgsSystem != null, "not null");
            start();
        } catch (exception) {
            start();
        }
    }, 2000)
});