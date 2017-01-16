module("GeometryBufferAnalystResult");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(4);

    var geoBufferAnalystResult;
    geoBufferAnalystResult = new SuperMap.REST.GeometryBufferAnalystResult();

    ok(geoBufferAnalystResult != null, "not null");
    equal(geoBufferAnalystResult.resultGeometry, null, "geoBufferAnalystResult.resultGeometry");
    equal(geoBufferAnalystResult.succeed, null, "geoBufferAnalystResult.succeed");
    
    geoBufferAnalystResult.destroy();
    equal(geoBufferAnalystResult.resultGeometry, null, "geoBufferAnalystResult.resultGeometry");
    
});

test("TestDefaultConstructor_custom", function () {
    var geoBufferAnalystResult;
    geoBufferAnalystResult = new SuperMap.REST.GeometryBufferAnalystResult({
        resultGeometry: new SuperMap.Geometry()
    });

    ok(geoBufferAnalystResult != null, "not null");
    
});

test("Test_fromJson", function () {
    var geoBufferAnalystResult;
    geoBufferAnalystResult = SuperMap.REST.GeometryBufferAnalystResult.fromJson();
    ok(geoBufferAnalystResult == null, "not null");
    
});

