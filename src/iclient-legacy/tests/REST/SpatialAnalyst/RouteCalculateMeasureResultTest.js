module("RouteCalculateMeasureResult");

test("TestDefaultConstructor", function () {
    var routeCalculateMeasureResult = new SuperMap.REST.RouteCalculateMeasureResult();
    ok(routeCalculateMeasureResult !== null, "routeCalculateMeasureResult not null");
    equal(routeCalculateMeasureResult.measure, null, "routeCalculateMeasureResult.measure");
    equal(routeCalculateMeasureResult.message, null, "routeCalculateMeasureResult.message");
    equal(routeCalculateMeasureResult.succeed, null, "routeCalculateMeasureResult.succeed");
});

test("TestCustomConstructor", function () {
    var routeCalculateMeasureResult = new SuperMap.REST.RouteCalculateMeasureResult({
        "measure": 532.1658053450747,
        "message": "message",
        "succeed": true
    });
    ok(routeCalculateMeasureResult !== null, "result not null");
    ok(routeCalculateMeasureResult.succeed, "routeCalculateMeasureResult.succeed is true");
    equal(routeCalculateMeasureResult.message, "message", "routeCalculateMeasureResult.message");
    equal(routeCalculateMeasureResult.measure,  532.1658053450747, "routeCalculateMeasureResult.measure");
});

test("TestDefaultConstructor_destroy", function () {
    var routeCalculateMeasureResult = new SuperMap.REST.RouteCalculateMeasureResult();
    routeCalculateMeasureResult.destroy();
    ok(routeCalculateMeasureResult !== null, "routeCalculateMeasureResult not null");
    equal(routeCalculateMeasureResult.measure, null, "routeCalculateMeasureResult.measure");
    equal(routeCalculateMeasureResult.message, null, "routeCalculateMeasureResult.message");
    equal(routeCalculateMeasureResult.succeed, null, "routeCalculateMeasureResult.succeed");
});

test("TestCustomConstructor_destroy", function () {
    var routeCalculateMeasureResult = new SuperMap.REST.RouteCalculateMeasureResult({
        "measure": 532.1658053450747,
        "message": "message",
        "succeed": true
    });
    routeCalculateMeasureResult.destroy();
    ok(routeCalculateMeasureResult !== null, "routeCalculateMeasureResult not null");
    ok(!routeCalculateMeasureResult.succeed, "routeCalculateMeasureResult.succeed is true");
    equal(routeCalculateMeasureResult.message, null, "routeCalculateMeasureResult.message");
    equal(routeCalculateMeasureResult.measure, null, "routeCalculateMeasureResult.measure");
});

test("Test_fromJson", function () {
    var jsonObjNoJson = SuperMap.REST.RouteCalculateMeasureResult.fromJson();
    var json = {
            "measure": 532.1658053450747,
            "message": "message",
            "succeed": true
        };
    var jsonObjHaveJson = SuperMap.REST.RouteCalculateMeasureResult.fromJson(json);
    ok(typeof jsonObjNoJson === "undefined", "undefined");
    ok(jsonObjHaveJson !== null, "jsonObjHaveJson");
    ok(jsonObjHaveJson.succeed, "jsonObjHaveJson.succeed is true");
    equal(jsonObjHaveJson.message, "message", "jsonObjHaveJson.message");
    equal(jsonObjHaveJson.measure,  532.1658053450747, "jsonObjHaveJson.measure");
});




