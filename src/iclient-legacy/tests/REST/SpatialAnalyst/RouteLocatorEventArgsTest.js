module("RouteLocatorEventArgs");

test("TestDefaultConstructor", function () {
    expect(3);
    var routeLocatorEventArgs = new SuperMap.REST.RouteLocatorEventArgs();
    ok(routeLocatorEventArgs !== null, "routeLocatorEventArgs not null");
    equal(routeLocatorEventArgs.result, undefined, "routeLocatorEventArgs.result");
    equal(routeLocatorEventArgs.originResult, undefined, "routeLocatorEventArgs.originResult");
});

test("TestCustomConstructor", function () {
    expect(3);
    var routeLocatorResult = new SuperMap.REST.RouteLocatorResult({
        "image":null,
        "message":null,
        "resultGeometry":{
            "center":{
                "x":3807.3544472261465,
                "y":-6674.284687188672
            },
            "id":0,
            "parts":[1],
            "points":[
                {
                    "x":3807.3544472261465,
                    "y":-6674.284687188672
                }
            ],
            "style":null,
            "type":"POINT"
        },
        "succeed":true
    });
    var routeLocatorEventArgs = new SuperMap.REST.RouteLocatorEventArgs(routeLocatorResult);
    ok(routeLocatorEventArgs !== null, "routeLocatorEventArgs not null");
    equal(routeLocatorEventArgs.result.resultGeometry.type, "POINT", "routeLocatorEventArgs.result.resultGeometry.type");
    equal(routeLocatorEventArgs.originResult, undefined, "routeLocatorEventArgs.originResult");
});

test("TestDefaultConstructor_destroy", function () {
    var routeLocatorEventArgs = new SuperMap.REST.RouteLocatorEventArgs();
    routeLocatorEventArgs.destroy();
    ok(routeLocatorEventArgs !== null, "routeLocatorEventArgs not null");
    equal(routeLocatorEventArgs.result, undefined, "routeLocatorEventArgs.result");
    equal(routeLocatorEventArgs.originResult, null, "routeLocatorEventArgs.originResult");
});

test("TestCustomConstructor_destroy", function () {
    var routeLocatorResult = new SuperMap.REST.RouteLocatorResult({
        "image":null,
        "message":null,
        "resultGeometry":{
            "center":{
                "x":3807.3544472261465,
                "y":-6674.284687188672
            },
            "id":0,
            "parts":[1],
            "points":[
                {
                    "x":3807.3544472261465,
                    "y":-6674.284687188672
                }
            ],
            "style":null,
            "type":"POINT"
        },
        "succeed":true
    });
    var routeLocatorEventArgs = new SuperMap.REST.RouteLocatorEventArgs(routeLocatorResult,{});
    routeLocatorEventArgs.destroy();
    ok(routeLocatorEventArgs !== null, "routeLocatorEventArgs not null");
    equal(routeLocatorEventArgs.result, null, "routeLocatorEventArgs.result");
    equal(routeLocatorEventArgs.originResult, null, "routeLocatorEventArgs.originResult");
});