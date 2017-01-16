module("OverlayAnalystParameters");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(3);

    var overlayAnalystParameters;
    overlayAnalystParameters = new SuperMap.REST.OverlayAnalystParameters();
    ok(overlayAnalystParameters != null, "not null");
    equal(overlayAnalystParameters.operation, SuperMap.REST.OverlayOperationType.UNION, "overlayAnalystParameters.operation");
    
    overlayAnalystParameters.destroy();
    equal(overlayAnalystParameters.operation, null, "overlayAnalystParameters.operation");
    
});