module("GeometryOverlayAnalystParameters");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(5);

    var geoOverlayAnalystParameters;
    geoOverlayAnalystParameters = new SuperMap.REST.GeometryOverlayAnalystParameters();

    ok(geoOverlayAnalystParameters != null, "not null");
    equal(geoOverlayAnalystParameters.sourceGeometry, null, "dsBufferAnalystParameters.sourceGeometry");
    equal(geoOverlayAnalystParameters.operateGeometry, null, "dsBufferAnalystParameters.operateGeometry");
    
    geoOverlayAnalystParameters.destroy();
    equal(geoOverlayAnalystParameters.sourceGeometry, null, "dsBufferAnalystParameters.sourceGeometry");
    equal(geoOverlayAnalystParameters.operateGeometry, null, "dsBufferAnalystParameters.operateGeometry");
});

test("TestDefaultConstructor_custom", function () {
    expect(5);

    var geoOverlayAnalystParameters,
        myOperateGeometry = new SuperMap.Geometry(),
        mySourceGeometry = new SuperMap.Geometry();
    geoOverlayAnalystParameters = new SuperMap.REST.GeometryOverlayAnalystParameters({
        operateGeometry: myOperateGeometry,
        sourceGeometry: mySourceGeometry
    });

    ok(geoOverlayAnalystParameters != null, "not null");
    equal(geoOverlayAnalystParameters.sourceGeometry, mySourceGeometry, "dsBufferAnalystParameters.sourceGeometry");
    equal(geoOverlayAnalystParameters.operateGeometry, myOperateGeometry, "dsBufferAnalystParameters.operateGeometry");
    
    geoOverlayAnalystParameters.destroy();
    equal(geoOverlayAnalystParameters.sourceGeometry, null, "dsBufferAnalystParameters.sourceGeometry");
    equal(geoOverlayAnalystParameters.operateGeometry, null, "dsBufferAnalystParameters.operateGeometry");
});