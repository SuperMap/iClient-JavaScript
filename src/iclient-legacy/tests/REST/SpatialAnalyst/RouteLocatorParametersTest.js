module("RouteLocatorParameters");

test("TestDefaultConstructor", function () {
    var routeLocatorParameters = new SuperMap.REST.RouteLocatorParameters();
    ok(routeLocatorParameters !== null, "routeLocatorParameters not null");
    equal(routeLocatorParameters.sourceRoute, null, "routeLocatorParameters.sourceRoute");
    equal(routeLocatorParameters.type, null, "routeLocatorParameters.type");
    equal(routeLocatorParameters.offset, 0, "routeLocatorParameters.offset");
    ok(!routeLocatorParameters.isIgnoreGap, "routeLocatorParameters.isIgnoreGap");
    equal(routeLocatorParameters.startMeasure, null, "routeLocatorParameters.startMeasure");
    equal(routeLocatorParameters.startMeasure, null, "routeLocatorParameters.startMeasure");
});

test("TestCustomConstructor", function () {
    var routeLocatorParameters_point = new SuperMap.REST.RouteLocatorParameters({
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
        "type":"POINT",
        "measure":10,
        "offset":3,
        "isIgnoreGap":true
    });

    var routeLocatorParameters_line = new SuperMap.REST.RouteLocatorParameters({
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
        "type":"LINE",
        "startMeasure":150,
        "endMeasure":240,
        "isIgnoreGap":true
    });
    ok(routeLocatorParameters_point !== null, "routeLocatorParameters_point not null");
    ok(routeLocatorParameters_line !== null, "routeLocatorParameters_line not null");
    equal(routeLocatorParameters_point.sourceRoute.type, "LINEM", "routeLocatorParameters_point.sourceRoute.type");
    equal(routeLocatorParameters_line.sourceRoute.type, "LINEM", "routeLocatorParameters_line.sourceRoute.type");
    equal(routeLocatorParameters_point.type, "POINT", "routeLocatorParameters_point.type");
    equal(routeLocatorParameters_line.type, "LINE", "routeLocatorParameters_line.type");
    equal(routeLocatorParameters_point.offset, 3, "routeLocatorParameters_point.offset");
    equal(routeLocatorParameters_line.offset, 0, "routeLocatorParameters_line.offset");
    ok(routeLocatorParameters_point.isIgnoreGap, "routeLocatorParameters_point.isIgnoreGap");
    ok(routeLocatorParameters_line.isIgnoreGap, "routeLocatorParameters_line.isIgnoreGap");
    equal(routeLocatorParameters_point.startMeasure, null, "routeLocatorParameters_point.startMeasure");
    equal(routeLocatorParameters_line.startMeasure, 150, "routeLocatorParameters_line.startMeasure");
    equal(routeLocatorParameters_point.startMeasure, null, "routeLocatorParameters_point.startMeasure");
    equal(routeLocatorParameters_line.endMeasure, 240, "routeLocatorParameters_line.startMeasure");
});

test("TestDefaultConstructor_destroy", function () {
    var routeLocatorParameters = new SuperMap.REST.RouteLocatorParameters();
    routeLocatorParameters.destroy();
    ok(routeLocatorParameters !== null, "routeLocatorParameters not null");
    equal(routeLocatorParameters.sourceRoute, null, "routeLocatorParameters.sourceRoute");
    equal(routeLocatorParameters.type, null, "routeLocatorParameters.type");
    equal(routeLocatorParameters.offset, 0, "routeLocatorParameters.offset");
    ok(!routeLocatorParameters.isIgnoreGap, "routeLocatorParameters.isIgnoreGap");
    equal(routeLocatorParameters.startMeasure, null, "routeLocatorParameters.startMeasure");
    equal(routeLocatorParameters.startMeasure, null, "routeLocatorParameters.startMeasure");
});

test("TestCustomConstructor", function () {
    var routeLocatorParameters_point = new SuperMap.REST.RouteLocatorParameters({
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
        "type":"POINT",
        "measure":10,
        "offset":3,
        "isIgnoreGap":true
    });

    var routeLocatorParameters_line = new SuperMap.REST.RouteLocatorParameters({
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
        "type":"LINE",
        "startMeasure":150,
        "endMeasure":240,
        "isIgnoreGap":true
    });

    routeLocatorParameters_point.destroy();
    routeLocatorParameters_line.destroy();

    ok(routeLocatorParameters_point !== null, "routeLocatorParameters_point not null");
    equal(routeLocatorParameters_point.sourceRoute, null, "routeLocatorParameters_point.sourceRoute");
    equal(routeLocatorParameters_point.type, null, "routeLocatorParameters_point.type");
    equal(routeLocatorParameters_point.offset, 0, "routeLocatorParameters_point.offset");
    ok(!routeLocatorParameters_point.isIgnoreGap, "routeLocatorParameters_point.isIgnoreGap");
    equal(routeLocatorParameters_point.startMeasure, null, "routeLocatorParameters_point.startMeasure");
    equal(routeLocatorParameters_point.startMeasure, null, "routeLocatorParameters_point.startMeasure");

    ok(routeLocatorParameters_line !== null, "routeLocatorParameters_line not null");
    equal(routeLocatorParameters_line.sourceRoute, null, "routeLocatorParameters_line.sourceRoute");
    equal(routeLocatorParameters_line.type, null, "routeLocatorParameters_line.type");
    equal(routeLocatorParameters_line.offset, 0, "routeLocatorParameters_line.offset");
    ok(!routeLocatorParameters_line.isIgnoreGap, "routeLocatorParameters_line.isIgnoreGap");
    equal(routeLocatorParameters_line.startMeasure, null, "routeLocatorParameters_line.startMeasure");
    equal(routeLocatorParameters_line.startMeasure, null, "routeLocatorParameters_line.startMeasure");
});