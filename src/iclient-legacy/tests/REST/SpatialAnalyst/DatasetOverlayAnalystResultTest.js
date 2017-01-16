module("DatasetOverlayAnalystResult");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(4);

    var dsOverlayAnalystResult;
    dsOverlayAnalystResult = new SuperMap.REST.DatasetOverlayAnalystResult();

    ok(dsOverlayAnalystResult != null, "not null");
    equal(dsOverlayAnalystResult.recordset, null, "dsOverlayAnalystResult.recordset");
    equal(dsOverlayAnalystResult.succeed, null, "dsOverlayAnalystResult.succeed");
    
    dsOverlayAnalystResult.destroy();
    equal(dsOverlayAnalystResult.recordset, null, "dsOverlayAnalystResult.recordset");
});

test("TestDefaultConstructor_CUSTOM", function () {
    var dsOverlayAnalystResult;
    dsOverlayAnalystResult = new SuperMap.REST.DatasetOverlayAnalystResult({
        recordset: new SuperMap.REST.Recordset()
    });

    ok(dsOverlayAnalystResult != null, "not null");
});

test("Test_fromJson", function () {
    var dsOverlayAnalystResult;
    dsOverlayAnalystResult = SuperMap.REST.DatasetOverlayAnalystResult.fromJson();
    ok(dsOverlayAnalystResult == null, "fromJson");
});