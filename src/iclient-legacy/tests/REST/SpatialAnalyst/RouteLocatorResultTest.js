module("RouteLocatorResult");

test("TestDefaultConstructor", function () {
    var routeLocatorResult = new SuperMap.REST.RouteLocatorResult();
    ok(routeLocatorResult !== null, "routeLocatorResult not null");
    equal(routeLocatorResult.image, null, "routeLocatorResult.image");
    equal(routeLocatorResult.message, null, "routeLocatorResult.message");
    equal(routeLocatorResult.resultGeometry, null, "routeLocatorResult.resultGeometry");
    equal(routeLocatorResult.succeed, null, "routeLocatorResult.succeed");
});

test("TestCustomConstructor", function () {
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
    ok(routeLocatorResult !== null, "routeLocatorResult not null");
    equal(routeLocatorResult.image, null, "routeLocatorResult.image");
    equal(routeLocatorResult.message, null, "routeLocatorResult.message");
    equal(routeLocatorResult.resultGeometry.type, "POINT", " routeLocatorResult.resultGeometry.type");
    ok(routeLocatorResult.succeed, "routeLocatorResult.succeed");
});

test("TestDefaultConstructor_destroy", function () {
    var routeLocatorResult = new SuperMap.REST.RouteLocatorResult();
    routeLocatorResult.destroy();
    ok(routeLocatorResult !== null, "routeLocatorResult not null");
    equal(routeLocatorResult.image, null, "routeLocatorResult.image");
    equal(routeLocatorResult.message, null, "routeLocatorResult.message");
    equal(routeLocatorResult.resultGeometry, null, "routeLocatorResult.resultGeometry");
    equal(routeLocatorResult.succeed, null, "routeLocatorResult.succeed");
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
    routeLocatorResult.destroy();
    ok(routeLocatorResult !== null, "routeLocatorResult not null");
    equal(routeLocatorResult.image, null, "routeLocatorResult.image");
    equal(routeLocatorResult.message, null, "routeLocatorResult.message");
    equal(routeLocatorResult.resultGeometry, null, "routeLocatorResult.resultGeometry");
    equal(routeLocatorResult.succeed, null, "routeLocatorResult.succeed");
});

