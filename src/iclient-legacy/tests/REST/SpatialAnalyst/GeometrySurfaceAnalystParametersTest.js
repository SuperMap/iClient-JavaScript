module("geometrySurfaceAnalystParameters");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(11);

    var geometrySurfaceAnalystParameters;
    geometrySurfaceAnalystParameters = new SuperMap.REST.GeometrySurfaceAnalystParameters();

    ok(geometrySurfaceAnalystParameters != null, "not null");
    equal(geometrySurfaceAnalystParameters.points, null, "dsBufferAnalystParameters.points");
    equal(geometrySurfaceAnalystParameters.zValues, null, "geometrySurfaceAnalystParameters.zValues");    
    equal(geometrySurfaceAnalystParameters.resolution, 0, "geometrySurfaceAnalystParameters.resolution");
    ok(geometrySurfaceAnalystParameters.extractParameter != null, "not null");
    ok(geometrySurfaceAnalystParameters.surfaceAnalystMethod != null, "not null");
    
    geometrySurfaceAnalystParameters.destroy();
    equal(geometrySurfaceAnalystParameters.points, null, "dsBufferAnalystParameters.points");
    equal(geometrySurfaceAnalystParameters.zValues, null, "geometrySurfaceAnalystParameters.zValues");    
    equal(geometrySurfaceAnalystParameters.resolution, null, "geometrySurfaceAnalystParameters.resolution");
    equal(geometrySurfaceAnalystParameters.extractParameter, null, "not null");
    equal(geometrySurfaceAnalystParameters.surfaceAnalystMethod, null, "not null");
});