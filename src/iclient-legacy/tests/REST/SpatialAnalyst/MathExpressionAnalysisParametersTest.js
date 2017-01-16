module("MathExpressionAnalysisParameters");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(6);

    var mathExpressionAnalysisParameters = new SuperMap.REST.MathExpressionAnalysisParameters({
        dataset: "JingjinTerrain@Jingjin",
        bounds: new SuperMap.Geometry.Polygon([
            new SuperMap.Geometry.LinearRing([
                new SuperMap.Geometry.Point(116, 39),
                new SuperMap.Geometry.Point(117, 39),
                new SuperMap.Geometry.Point(117, 40),
                new SuperMap.Geometry.Point(116, 40)
            ])
        ]),
        "expression": "[Jingjin.JingjinTerrain] + 600",
        "targetDatasource": "Jingjin",
        "resultGridName": "MathExpressionAnalysis_Result"
    });

    ok(mathExpressionAnalysisParameters != null, "not null");
    ok(mathExpressionAnalysisParameters.dataset != null, "not null");
    ok(mathExpressionAnalysisParameters.bounds != null, "not null");
    ok(mathExpressionAnalysisParameters.expression != null, "not null");
    ok(mathExpressionAnalysisParameters.targetDatasource != null, "not null");
    ok(mathExpressionAnalysisParameters.resultGridName != null, "not null");

    mathExpressionAnalysisParameters.destroy();
});