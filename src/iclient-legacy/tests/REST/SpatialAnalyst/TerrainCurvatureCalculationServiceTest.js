module("TerrainCurvatureCalculationService");
var serviceFailedEventArgsSystem = null;
var analystEventArgsSystem = null;

function initTerrainCurvatureCalculationService() {
    return new SuperMap.REST.TerrainCurvatureCalculationService(GlobeParameter.spatialAnalystURL);
}

//成功事件
asyncTest("TestTerrainCurvatureCalculationServiceCompleted", function () {
    expect(9);

    var terrainCurvatureCalculationService = initTerrainCurvatureCalculationService();
    ok(terrainCurvatureCalculationService != null, "not null");
    equal(terrainCurvatureCalculationService.url, GlobeParameter.spatialAnalystURL, "url");
    var terrainCurvatureCalculationParameters = new SuperMap.REST.TerrainCurvatureCalculationParameters({
        dataset: "JingjinTerrain@Jingjin",
        zFactor: 1.0,
        averageCurvatureName: "CurvatureA_Test",
        deleteExistResultDataset: true
    });
    terrainCurvatureCalculationService.processAsync(terrainCurvatureCalculationParameters);

    terrainCurvatureCalculationService.events.on({"processCompleted":function(args){
        var terrainCurvatureCalculationResult = terrainCurvatureCalculationService.lastResult;
        ok(terrainCurvatureCalculationResult != null, "terrainCurvatureCalculationService.lastResult");
        ok(args != null,"terrainCurvatureCalculationService.Succeed");

        terrainCurvatureCalculationService.destroy();
        equal(terrainCurvatureCalculationService.events, null, "terrainCurvatureCalculationService.events");
        equal(terrainCurvatureCalculationService.eventListeners , null, "terrainCurvatureCalculationService.eventListeners");
        equal(terrainCurvatureCalculationService.lastResult , null, "terrainCurvatureCalculationService.lastResult");

        args.destroy();
        ok(args != null, "not null");
        equal(args.result, null, "analystEventArgsSystem.result");
        start();
    },"processFailed":function(args){
        ok(false, "exception occcurs,message is:" + args.error.errorMsg);
        start();
    }});
});

//测试失败事件
asyncTest("TestTerrainCurvatureCalculationServiceFailed", function () {
    expect(7);
    var terrainCurvatureCalculationService = initTerrainCurvatureCalculationService();
    ok(terrainCurvatureCalculationService != null, "not null");
    equal(terrainCurvatureCalculationService.url, GlobeParameter.spatialAnalystURL, "url");

    var terrainCurvatureCalculationParameters = new SuperMap.REST.TerrainCurvatureCalculationParameters({
        dataset: "XX@Jingjin",
        zFactor: 1.0,
        averageCurvatureName: "CurvatureA_Test",
        deleteExistResultDataset: true
    });
    terrainCurvatureCalculationService.processAsync(terrainCurvatureCalculationParameters);

    terrainCurvatureCalculationService.events.on({"processCompleted":function(args){
        terrainCurvatureCalculationService.destroy();
        start();
    },"processFailed":function(args){
        ok(args != null, "terrainCurvatureCalculationService.Failed");

        terrainCurvatureCalculationService.destroy();
        equal(terrainCurvatureCalculationService.events, null, "terrainCurvatureCalculationService.events");
        equal(terrainCurvatureCalculationService.eventListeners , null, "terrainCurvatureCalculationService.eventListeners");
        equal(terrainCurvatureCalculationService.lastResult , null, "terrainCurvatureCalculationService.lastResult");

        ok(args != null, "not null");
        start();
    }});
});