module("GeometryBufferAnalystParameters");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(3);

    var geoBufferAnalystParameters;
    geoBufferAnalystParameters = new SuperMap.REST.GeometryBufferAnalystParameters();

    ok(geoBufferAnalystParameters != null, "not null");
    equal(geoBufferAnalystParameters.sourceGeometry, null, "dsBufferAnalystParameters.sourceGeometry");
    
    geoBufferAnalystParameters.destroy();
    equal(geoBufferAnalystParameters.sourceGeometry, null, "dsBufferAnalystParameters.sourceGeometry");
});

test("TestDefaultConstructor_custom", function () {
    var geoBufferAnalystParameters;
    geoBufferAnalystParameters = new SuperMap.REST.GeometryBufferAnalystParameters({
        sourceGeometry: new SuperMap.Geometry()
    });

    ok(geoBufferAnalystParameters != null, "not null");
    geoBufferAnalystParameters.destroy();
    equal(geoBufferAnalystParameters.sourceGeometry, null, "dsBufferAnalystParameters.sourceGeometry");
});