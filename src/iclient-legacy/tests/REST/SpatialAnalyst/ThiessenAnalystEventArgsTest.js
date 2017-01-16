module("ThiessenAnalystEventArgs");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(3);

    var tsAnalystEventArgs;
    tsAnalystEventArgs = new SuperMap.REST.ThiessenAnalystEventArgs();

    ok(tsAnalystEventArgs != null, "not null");
    equal(tsAnalystEventArgs.result, null, "tsAnalystEventArgs.result");
    equal(tsAnalystEventArgs.originResult, null, "tsAnalystEventArgs.originResult");
});

test("TestDefaultConstructor_1", function () {
    expect(5);

    var tsAnalystEventArgs;
    tsAnalystEventArgs = new SuperMap.REST.ThiessenAnalystEventArgs(new SuperMap.REST.GeometryBufferAnalystResult(),"teststring");

    ok(tsAnalystEventArgs != null, "not null");
    ok(tsAnalystEventArgs.result != null, "not null");
    ok(tsAnalystEventArgs.originResult != null, "not null");
    
    tsAnalystEventArgs.destroy();
    equal(tsAnalystEventArgs.result, null, "tsAnalystEventArgs.result");
    equal(tsAnalystEventArgs.originResult, null, "tsAnalystEventArgs.originResult");
});