module("RouteCalculateMeasureParameters");

test("TestDefaultConstructor", function () {
    var routeCalculateMeasureParameters = new SuperMap.REST.RouteCalculateMeasureParameters();
    ok(routeCalculateMeasureParameters !== null, "routeCalculateMeasureParameters not null");
    equal(routeCalculateMeasureParameters.sourceRoute, null, "routeCalculateMeasureParameters.sourceRoute");
    equal(routeCalculateMeasureParameters.point, null, "routeCalculateMeasureParameters.point");
    equal(routeCalculateMeasureParameters.tolerance, null, "routeCalculateMeasureParameters.tolerance");
    ok(!routeCalculateMeasureParameters.isIgnoreGap, "routeCalculateMeasureParameters.isIgnoreGap");
});

test("TestCustomConstructor", function () {
    var routeCalculateMeasureParameters = new SuperMap.REST.RouteCalculateMeasureParameters({
        "sourceRoute":{
            "type":"LINEM",
            "parts":[4],
            "points":[
                {
                    "measure":0,
                    "y":-6674.466867067764,
                    "x":3817.3527876130133
                },
                {
                    "measure":199.57954019411724,
                    "y":-6670.830929417594,
                    "x":3617.806369901496
                },
                {
                    "measure":609.3656478634477,
                    "y":-6877.837541432356,
                    "x":3264.1498746678444
                },
                {
                    "measure":936.0174126282958,
                    "y":-7038.687780615184,
                    "x":2979.846206068903
                }
            ]
        },
        "tolerance":1,
        "point":{
            "x":3330.7754269417,
            "y":-6838.8394457216
        },
        "isIgnoreGap":true
    });
    ok(routeCalculateMeasureParameters !== null, "routeCalculateMeasureParameters not null");
    equal(typeof routeCalculateMeasureParameters.sourceRoute, "object", "routeCalculateMeasureParameters.sourceRoute");
    equal(routeCalculateMeasureParameters.point.x, 3330.7754269417, "routeCalculateMeasureParameters.point.x");
    equal(routeCalculateMeasureParameters.point.y, -6838.8394457216, "routeCalculateMeasureParameters.point.y");
    equal(routeCalculateMeasureParameters.tolerance, 1, "routeCalculateMeasureParameters.tolerance");
    ok(routeCalculateMeasureParameters.isIgnoreGap, "routeCalculateMeasureParameters.isIgnoreGap");
});

test("TestDefaultConstructor_destroy", function () {
    var routeCalculateMeasureParameters = new SuperMap.REST.RouteCalculateMeasureParameters();
    routeCalculateMeasureParameters.destroy();
    ok(routeCalculateMeasureParameters !== null, "routeCalculateMeasureParameters not null");
    equal(routeCalculateMeasureParameters.sourceRoute, null, "routeCalculateMeasureParameters.sourceRoute");
    equal(routeCalculateMeasureParameters.point, null, "routeCalculateMeasureParameters.point");
    equal(routeCalculateMeasureParameters.tolerance, null, "routeCalculateMeasureParameters.tolerance");
    ok(!routeCalculateMeasureParameters.isIgnoreGap, "routeCalculateMeasureParameters.isIgnoreGap");
});

test("TestCustomConstructor_destroy", function () {
    var routeCalculateMeasureParameters = new SuperMap.REST.RouteCalculateMeasureParameters({
        "sourceRoute":{
            "type":"LINEM",
            "parts":[4],
            "points":[
                {
                    "measure":0,
                    "y":-6674.466867067764,
                    "x":3817.3527876130133
                },
                {
                    "measure":199.57954019411724,
                    "y":-6670.830929417594,
                    "x":3617.806369901496
                },
                {
                    "measure":609.3656478634477,
                    "y":-6877.837541432356,
                    "x":3264.1498746678444
                },
                {
                    "measure":936.0174126282958,
                    "y":-7038.687780615184,
                    "x":2979.846206068903
                }
            ]
        },
        "tolerance":1,
        "point":{
            "x":3330.7754269417,
            "y":-6838.8394457216
        },
        "isIgnoreGap":true
    });
    routeCalculateMeasureParameters.destroy();
    ok(routeCalculateMeasureParameters !== null, "routeCalculateMeasureParameters not null");
    equal(routeCalculateMeasureParameters.sourceRoute, null, "routeCalculateMeasureParameters.sourceRoute");
    equal(routeCalculateMeasureParameters.point, null, "routeCalculateMeasureParameters.point");
    equal(routeCalculateMeasureParameters.tolerance, null, "routeCalculateMeasureParameters.tolerance");
    ok(!routeCalculateMeasureParameters.isIgnoreGap, "routeCalculateMeasureParameters.isIgnoreGap");
});