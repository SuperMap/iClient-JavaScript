module("MathExpressionAnalysisResult");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(2);

    var mathExpressionAnalysisResult;
    mathExpressionAnalysisResult = new SuperMap.REST.MathExpressionAnalysisResult();

    ok(mathExpressionAnalysisResult != null, "not null");
    equal(mathExpressionAnalysisResult.recordset, null, "mathExpressionAnalysisResult.recordset");
});

test("TestDefaultConstructor_custom", function () {
    expect(2);

    var mathExpressionAnalysisResult;
    mathExpressionAnalysisResult = new SuperMap.REST.MathExpressionAnalysisResult({
        recordset: new SuperMap.REST.Recordset()
    });

    ok(mathExpressionAnalysisResult != null, "not null");
    ok(mathExpressionAnalysisResult.recordset != null, "mathExpressionAnalysisResult.recordset");
});

test("Test_fromJson", function () {
    var mathExpressionAnalysisResult;
    mathExpressionAnalysisResult = SuperMap.REST.MathExpressionAnalysisResult.fromJson();
    ok(mathExpressionAnalysisResult == null, "not null");
});