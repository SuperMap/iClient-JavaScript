module("AreaSolarRadiationService");
var serviceFailedEventArgsSystem = null;
var analystEventArgsSystem = null;

function initAreaSolarRadiationService() {
    return new SuperMap.REST.AreaSolarRadiationService(GlobeParameter.spatialAnalystURL, {eventListeners:{"processCompleted": analyzeCompleted,'processFailed': analyzeFailed}});
}
function analyzeFailed(serviceFailedEventArgs) {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}
function analyzeCompleted(analyseEventArgs) {
    analystEventArgsSystem = analyseEventArgs;
}

//成功事件
asyncTest("TestAreaSolarRadiationServiceCompleted", function () {
    expect(9);

    var areaSolarRadiationService = initAreaSolarRadiationService();
    ok(areaSolarRadiationService != null, "not null");
    equal(areaSolarRadiationService.url, GlobeParameter.spatialAnalystURL, "url");
    var areaSolarRadiationParameters = new SuperMap.REST.AreaSolarRadiationParameters({
        dataset: "JingjinTerrain@Jingjin",
        targetDatasourceName: "Jingjin",
        totalGridName: "areaSolarRadiation_Result",
        //diffuseDatasetGridName: "areaSolarRadiation_ResultA",
        //durationDatasetGridName: "areaSolarRadiation_ResultB",
        //directDatasetGridName: "areaSolarRadiation_ResultC",
        latitude: 39,
        timeMode: "WITHINDAY",
        dayStart: "1",
        dayEnd: "1",
        hourStart: "12",
        hourEnd: "12",
        transmittance: 0.5,
        //hourInterval: 1,
        //dayInterval: 5,
        deleteExistResultDataset: true
    });
    areaSolarRadiationService.processAsync(areaSolarRadiationParameters);

    setTimeout(function () {
        try {
            var areaSolarRadiationResult = areaSolarRadiationService.lastResult;
            ok(areaSolarRadiationResult != null, "areaSolarRadiationService.lastResult");
            ok(analystEventArgsSystem != null,"areaSolarRadiationService.Succeed");

            areaSolarRadiationService.destroy();
            equal(areaSolarRadiationService.events, null, "areaSolarRadiationService.events");
            equal(areaSolarRadiationService.eventListeners , null, "areaSolarRadiationService.eventListeners");
            equal(areaSolarRadiationService.lastResult , null, "areaSolarRadiationService.lastResult");

            analystEventArgsSystem.destroy();
            ok(analystEventArgsSystem != null, "not null");
            equal(analystEventArgsSystem.result, null, "analystEventArgsSystem.result");
            start();
        } catch (exception) {
            ok(false, "exception occcurs,message is:" + exception.message)
            start();
        }
    }, 90000)
});

//测试失败事件
asyncTest("TestAreaSolarRadiationServiceFailed", function () {
    expect(7);

    var areaSolarRadiationService = initAreaSolarRadiationService();
    ok(areaSolarRadiationService != null, "not null");
    equal(areaSolarRadiationService.url, GlobeParameter.spatialAnalystURL, "url");

    var areaSolarRadiationParameters = new SuperMap.REST.AreaSolarRadiationParameters({
        dataset: "XX@Jingjin",
        targetDatasourceName: "Jingjin",
        totalGridName: "areaSolarRadiation_Result",
        dayStart: "1",
        dayEnd: "1"
    });
    areaSolarRadiationService.processAsync(areaSolarRadiationParameters);


    setTimeout(function () {
        try {
            ok(serviceFailedEventArgsSystem != null, "areaSolarRadiationService.Failed");

            areaSolarRadiationService.destroy();
            equal(areaSolarRadiationService.events, null, "areaSolarRadiationService.events");
            equal(areaSolarRadiationService.eventListeners , null, "areaSolarRadiationService.eventListeners");
            equal(areaSolarRadiationService.lastResult , null, "areaSolarRadiationService.lastResult");

            ok(analystEventArgsSystem != null, "not null");
            start();
        } catch (exception) {
            start();
        }
    }, 5000)
});