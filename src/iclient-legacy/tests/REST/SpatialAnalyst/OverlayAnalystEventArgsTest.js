module("OverlayAnalystEventArgs");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(3);

    var overlayAnalystEventArgs;
    overlayAnalystEventArgs = new SuperMap.REST.OverlayAnalystEventArgs();

    ok(overlayAnalystEventArgs != null, "not null");
    equal(overlayAnalystEventArgs.result, null, "overlayAnalystEventArgs.result");
    
    overlayAnalystEventArgs.destroy();    
    equal(overlayAnalystEventArgs.result, null, "overlayAnalystEventArgs.result");
});

test("TestDefaultConstructor_1", function () {
    expect(3);

    var overlayAnalystEventArgs;
    overlayAnalystEventArgs = new SuperMap.REST.OverlayAnalystEventArgs(new SuperMap.REST.GeometryOverlayAnalystResult(),"teststring");

    ok(overlayAnalystEventArgs != null, "not null");
    ok(overlayAnalystEventArgs.result != null, "overlayAnalystEventArgs.resultl");
    
    overlayAnalystEventArgs.destroy();    
    equal(overlayAnalystEventArgs.result, null, "overlayAnalystEventArgs.result");
});