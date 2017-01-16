module("SurfaceAnalystEventArgs");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {

    var surfaceAnalystEventArgs,
    myResult = new SuperMap.REST.SurfaceAnalystResult();
    surfaceAnalystEventArgs = new SuperMap.REST.SurfaceAnalystEventArgs(myResult,"string");

    ok(surfaceAnalystEventArgs != null, "not null");
    equal(surfaceAnalystEventArgs.result, myResult, "SurfaceAnalystEventArgs.result");
    equal(surfaceAnalystEventArgs.originResult, "string", "SurfaceAnalystEventArgs.originResult");

    surfaceAnalystEventArgs.destroy();
    ok(surfaceAnalystEventArgs != null, "not null");
    equal(surfaceAnalystEventArgs.result, null, "SurfaceAnalystEventArgs.result");
    equal(surfaceAnalystEventArgs.originResult, null, "SurfaceAnalystEventArgs.originResult");
});