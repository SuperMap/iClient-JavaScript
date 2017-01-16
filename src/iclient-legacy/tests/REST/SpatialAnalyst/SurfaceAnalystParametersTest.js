module("surfaceAnalystParameters");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(4);

    var surfaceAnalystParameters;
    surfaceAnalystParameters = new SuperMap.REST.SurfaceAnalystParameters();

    ok(surfaceAnalystParameters != null, "not null");
    equal(surfaceAnalystParameters.resolution, 0, "surfaceAnalystParameters.result");
    ok(surfaceAnalystParameters.extractParameter != null,"not null");
    equal(surfaceAnalystParameters.surfaceAnalystMethod, SuperMap.REST.SurfaceAnalystMethod.ISOLINE, "surfaceAnalystParameters.surfaceAnalystMethod");
});