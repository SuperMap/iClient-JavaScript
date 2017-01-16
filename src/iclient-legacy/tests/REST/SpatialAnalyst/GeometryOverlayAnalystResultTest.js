module("GeometryOverlayAnalystResult");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(4);

    var geoOverlayAnalystResult;
    geoOverlayAnalystResult = new SuperMap.REST.GeometryOverlayAnalystResult();

    ok(geoOverlayAnalystResult != null, "not null");
    equal(geoOverlayAnalystResult.resultGeometry, null, "geoOverlayAnalystResult.resultGeometry");
    equal(geoOverlayAnalystResult.succeed, null, "geoOverlayAnalystResult.succeed");
    
    geoOverlayAnalystResult.destroy();
    equal(geoOverlayAnalystResult.resultGeometry, null, "geoOverlayAnalystResult.resultGeometry");
});

test("TestDefaultConstructor_custom", function () {
    expect(4);

    var geoOverlayAnalystResult;
        myResultGeometry = new SuperMap.Geometry();
    geoOverlayAnalystResult = new SuperMap.REST.GeometryOverlayAnalystResult({
        resultGeometry: myResultGeometry
    });

    ok(geoOverlayAnalystResult != null, "not null");
    equal(geoOverlayAnalystResult.resultGeometry, myResultGeometry, "geoOverlayAnalystResult.resultGeometry");
    equal(geoOverlayAnalystResult.succeed, null, "geoOverlayAnalystResult.succeed");
    
    geoOverlayAnalystResult.destroy();
    equal(geoOverlayAnalystResult.resultGeometry, null, "geoOverlayAnalystResult.resultGeometry");
});

test("Test_fromJson", function () {
    var geoOverlayAnalystResult;
    geoOverlayAnalystResult = SuperMap.REST.GeometryOverlayAnalystResult.fromJson();

    ok(geoOverlayAnalystResult == null, "not null");
});
