module("RouteCalculateMeasureEventArgs");

test("TestDefaultConstructor", function () {
    expect(3);
    var routeCalculateMeasureEventArgs = new SuperMap.REST.RouteCalculateMeasureEventArgs();
    ok(routeCalculateMeasureEventArgs !== null, "routeCalculateMeasureEventArgs not null");
    equal(routeCalculateMeasureEventArgs.result, undefined, "routeCalculateMeasureEventArgs.result");
    equal(routeCalculateMeasureEventArgs.originResult, undefined, "routeCalculateMeasureEventArgs.originResult");
});

test("TestCustomConstructor", function () {
    expect(3);
    var routeCalculateMeasureResult = new SuperMap.REST.RouteCalculateMeasureResult({
        "measure": 532.1658053450747,
        "message": "message",
        "succeed": true
    });
    var routeCalculateMeasureEventArgs = new SuperMap.REST.RouteCalculateMeasureEventArgs(routeCalculateMeasureResult);
    ok(routeCalculateMeasureEventArgs !== null, "routeCalculateMeasureEventArgs not null");
    equal(typeof routeCalculateMeasureEventArgs.result, "object", "routeCalculateMeasureEventArgs.result");
    equal(routeCalculateMeasureEventArgs.originResult, undefined, "routeCalculateMeasureEventArgs.originResult");
});

test("TestDefaultConstructor_destroy", function () {
    var routeCalculateMeasureEventArgs = new SuperMap.REST.RouteCalculateMeasureEventArgs();
    routeCalculateMeasureEventArgs.destroy();
    ok(routeCalculateMeasureEventArgs !== null, "routeCalculateMeasureEventArgs not null");
    equal(routeCalculateMeasureEventArgs.result, undefined, "routeCalculateMeasureEventArgs.result");
    equal(routeCalculateMeasureEventArgs.originResult, null, "routeCalculateMeasureEventArgs.originResult");
});

test("TestCustomConstructor_destroy", function () {
    var routeCalculateMeasureResult = new SuperMap.REST.RouteCalculateMeasureResult({
        "measure": 532.1658053450747,
        "message": "message",
        "succeed": true
    });
    var routeCalculateMeasureEventArgs = new SuperMap.REST.RouteCalculateMeasureEventArgs(routeCalculateMeasureResult,{});
    routeCalculateMeasureEventArgs.destroy();
    ok(routeCalculateMeasureEventArgs !== null, "routeCalculateMeasureEventArgs not null");
    equal(routeCalculateMeasureEventArgs.result, null, "routeCalculateMeasureEventArgs.result");
    equal(routeCalculateMeasureEventArgs.originResult, null, "routeCalculateMeasureEventArgs.originResult");
});