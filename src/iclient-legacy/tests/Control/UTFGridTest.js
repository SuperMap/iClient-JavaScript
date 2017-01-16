module("UTFGrid");
test("TestUTFGrid_constructorDefault", function () {
    expect(5);
    var params = new SuperMap.Control.UTFGrid();
    var defaultOptions = {
        'delay': 300,
        'pixelTolerance': 4,
        'stopMove': false,
        'single': true,
        'double': false,
        'stopSingle': false,
        'stopDouble': false
    };
    ok(params != null, "params not null");
    equal(params.autoActivate, true, "params.autoActivate");
    equal(params.layers, null, "params.layers");
    deepEqual(params.defaultHandlerOptions, defaultOptions, "params.defaultHandlerOptions");
    equal(params.handlerMode, "click", "params.handlerMode");
});

