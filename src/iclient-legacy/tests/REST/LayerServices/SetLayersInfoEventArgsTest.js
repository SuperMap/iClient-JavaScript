module("SetLayersInfoEventArgs");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(3);

    var setLayersInfoEventArgs;
    setLayersInfoEventArgs = new SuperMap.REST.SetLayersInfoEventArgs();

    ok(setLayersInfoEventArgs != null, "not null");
    equal(setLayersInfoEventArgs.result, null, "setLayersInfoEventArgs.result");
    equal(setLayersInfoEventArgs.originResult, null, "setLayersInfoEventArgs.originResult");
});

test("TestDefaultConstructor_1", function () {
    expect(5);

    var setLayersInfoEventArgs;
    setLayersInfoEventArgs = new SuperMap.REST.SetLayersInfoEventArgs("result","teststring");

    ok(setLayersInfoEventArgs != null, "not null");
    ok(setLayersInfoEventArgs.result != null, "not null");
    ok(setLayersInfoEventArgs.originResult != null, "not null");
    
    setLayersInfoEventArgs.destroy();
    equal(setLayersInfoEventArgs.result, null, "setLayersInfoEventArgs.result");
    equal(setLayersInfoEventArgs.originResult, null, "setLayersInfoEventArgs.originResult");
});