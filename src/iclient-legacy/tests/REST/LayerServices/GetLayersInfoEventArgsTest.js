module("GetLayersInfoEventArgs");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(3);

    var getLayersInfoEventArgs;
    getLayersInfoEventArgs = new SuperMap.REST.GetLayersInfoEventArgs();

    ok(getLayersInfoEventArgs != null, "not null");
    equal(getLayersInfoEventArgs.result, null, "getLayersInfoEventArgs.result");
    equal(getLayersInfoEventArgs.originResult, null, "getLayersInfoEventArgs.originResult");
});

test("TestDefaultConstructor_1", function () {
    expect(5);

    var getLayersInfoEventArgs;
    getLayersInfoEventArgs = new SuperMap.REST.GetLayersInfoEventArgs("result","teststring");

    ok(getLayersInfoEventArgs != null, "not null");
    ok(getLayersInfoEventArgs.result != null, "not null");
    ok(getLayersInfoEventArgs.originResult != null, "not null");
    
    getLayersInfoEventArgs.destroy();
    equal(getLayersInfoEventArgs.result, null, "getLayersInfoEventArgs.result");
    equal(getLayersInfoEventArgs.originResult, null, "getLayersInfoEventArgs.originResult");
});