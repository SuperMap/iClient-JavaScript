module("RouteLocatorService");

var routeLocatorEventArgsSystem = null,
    serviceFailedEventArgsSystem = null;

function routeLocatorCompleted(routeLocatorEventArgs) {
    routeLocatorEventArgsSystem = routeLocatorEventArgs;
}

function routeLocatorFailed(serviceFailedEventArgs) {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}

function initRouteLocatorService() {
    var routeLocatorService = new SuperMap.REST.RouteLocatorService(GlobeParameter.spatialAnalystURL,
        {
            eventListeners:{
                "processCompleted":routeLocatorCompleted,
                'processFailed':routeLocatorFailed
            }
        }
    );
    return routeLocatorService;
}

asyncTest("RouteLocatorPoint", function () {
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
    var routeLocatorService = initRouteLocatorService();
    routeLocatorService.processAsync(routeLocatorParameters_point);

    setTimeout(function() {
        try{
            var routeLocatorResult = routeLocatorService.lastResult;
            ok(routeLocatorResult != null, "routeLocatorService.lastResult");
            ok(routeLocatorResult.resultGeometry, "routeLocatorResult.resultGeometry.type");
            ok(routeLocatorResult.succeed,"routeLocatorResult.succeed");
            routeLocatorResult.destroy();
            ok(routeLocatorResult.resultGeometry == null, "routeLocatorResult.resultGeometry");

            routeLocatorService.destroy();
            ok(routeLocatorService.EVENT_TYPES == null, "routeLocatorService.EVENT_TYPES");
            ok(routeLocatorService.events == null, "routeLocatorService.events");
            ok(routeLocatorService.lastResult == null, "routeLocatorService.lastResult");
            ok(routeLocatorService.eventListeners == null, "routeLocatorService.eventListeners");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 10000);
});

asyncTest("RouteLocatorLine", function () {
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

    var routeLocatorService = initRouteLocatorService();
    routeLocatorService.processAsync(routeLocatorParameters_line);

    setTimeout(function() {
        try{
            var routeLocatorResult = routeLocatorService.lastResult;
            ok(routeLocatorResult != null, "routeLocatorService.lastResult");
            ok(routeLocatorResult.resultGeometry, "routeLocatorResult.resultGeometry.type");
            ok(routeLocatorResult.succeed,"routeLocatorResult.succeed");
            routeLocatorResult.destroy();
            ok(routeLocatorResult.resultGeometry == null, "routeLocatorResult.resultGeometry");

            routeLocatorService.destroy();
            ok(routeLocatorService.EVENT_TYPES == null, "routeLocatorService.EVENT_TYPES");
            ok(routeLocatorService.events == null, "routeLocatorService.events");
            ok(routeLocatorService.lastResult == null, "routeLocatorService.lastResult");
            ok(routeLocatorService.eventListeners == null, "routeLocatorService.eventListeners");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 10000);
});
