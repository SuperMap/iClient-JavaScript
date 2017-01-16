module("MathExpressionAnalysisService");
var serviceFailedEventArgsSystem = null;
var analystEventArgsSystem = null;

function initMathExpressionAnalysisService() {
    return new SuperMap.REST.MathExpressionAnalysisService(GlobeParameter.spatialAnalystURL);
}

//成功事件
asyncTest("TestMathExpressionAnalysisServiceCompleted", function () {
    expect(9);

    var mathExpressionAnalysisService = initMathExpressionAnalysisService();
    ok(mathExpressionAnalysisService != null, "not null");
    equal(mathExpressionAnalysisService.url, GlobeParameter.spatialAnalystURL, "url");
    var mathExpressionAnalysisParameters = new SuperMap.REST.MathExpressionAnalysisParameters({
        dataset: "JingjinTerrain@Jingjin",
        "expression": "[Jingjin.JingjinTerrain] + 600",
        "targetDatasource": "Jingjin",
        "resultGridName": "MathExpressionAnalysis_Result",
        deleteExistResultDataset: true
    });
    mathExpressionAnalysisService.processAsync(mathExpressionAnalysisParameters);
    mathExpressionAnalysisService.events.on({"processCompleted":function(args){
        var mathExpressionAnalysisResult = mathExpressionAnalysisService.lastResult;
        ok(mathExpressionAnalysisResult != null, "mathExpressionAnalysisService.lastResult");
        ok(args != null,"mathExpressionAnalysisService.Succeed");

        mathExpressionAnalysisService.destroy();
        equal(mathExpressionAnalysisService.events, null, "mathExpressionAnalysisService.events");
        equal(mathExpressionAnalysisService.eventListeners , null, "mathExpressionAnalysisService.eventListeners");
        equal(mathExpressionAnalysisService.lastResult , null, "mathExpressionAnalysisService.lastResult");

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
asyncTest("TestMathExpressionAnalysisServiceFailed", function () {
    expect(7);

    var mathExpressionAnalysisService = initMathExpressionAnalysisService();
    ok(mathExpressionAnalysisService != null, "not null");
    equal(mathExpressionAnalysisService.url, GlobeParameter.spatialAnalystURL, "url");

    var mathExpressionAnalysisParameters = new SuperMap.REST.MathExpressionAnalysisParameters({
        dataset: "XX@Jingjin",
        "expression": "[Jingjin.JingjinTerrain] + 600",
        "targetDatasource": "XX",
        "resultGridName": "MathExpressionAnalysis_Result_Test",
        deleteExistResultDataset: true
    });
    mathExpressionAnalysisService.processAsync(mathExpressionAnalysisParameters);

    mathExpressionAnalysisService.events.on({"processCompleted":function(args){
        mathExpressionAnalysisService.destroy();
        start();
    },"processFailed":function(args){
        ok(args != null, "mathExpressionAnalysisService.Failed");

        mathExpressionAnalysisService.destroy();
        equal(mathExpressionAnalysisService.events, null, "mathExpressionAnalysisService.events");
        equal(mathExpressionAnalysisService.eventListeners , null, "mathExpressionAnalysisService.eventListeners");
        equal(mathExpressionAnalysisService.lastResult , null, "mathExpressionAnalysisService.lastResult");

        ok(args != null, "not null");
        start();
    }});
});