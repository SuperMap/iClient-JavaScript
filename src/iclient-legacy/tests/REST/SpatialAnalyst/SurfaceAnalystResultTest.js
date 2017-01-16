module("SurfaceAnalystResult");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(2);

    var surfaceAnalystResult;
    surfaceAnalystResult = new SuperMap.REST.SurfaceAnalystResult();

    ok(surfaceAnalystResult != null, "not null");
    equal(surfaceAnalystResult.recordset, null, "surfaceAnalystResult.recordset");    
});

test("TestDefaultConstructor_custom", function () {
    expect(2);

    var surfaceAnalystResult;
    surfaceAnalystResult = new SuperMap.REST.SurfaceAnalystResult({
        recordset: new SuperMap.REST.Recordset()
    });

    ok(surfaceAnalystResult != null, "not null");
    ok(surfaceAnalystResult.recordset != null, "surfaceAnalystResult.recordset");    
});

test("Test_fromJson", function () {
    var surfaceAnalystResult;
    surfaceAnalystResult = SuperMap.REST.SurfaceAnalystResult.fromJson();
    ok(surfaceAnalystResult == null, "not null");
});