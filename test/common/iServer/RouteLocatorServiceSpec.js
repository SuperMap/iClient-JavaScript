require('../../../src/common/iServer/RouteLocatorService');

var routeLocatorEventArgsSystem = null,
    serviceFailedEventArgsSystem = null;
var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
function routeLocatorCompleted(routeLocatorEventArgs) {
    routeLocatorEventArgsSystem = routeLocatorEventArgs;
}
function routeLocatorFailed(serviceFailedEventArgs) {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}
function initRouteLocatorService() {
    return new SuperMap.RouteLocatorService(spatialAnalystURL,
        {
            eventListeners:{
                "processCompleted":routeLocatorCompleted,
                'processFailed':routeLocatorFailed
            }
        }
    );
}

describe('testRouteLocatorService_processAsync',function(){
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        routeLocatorEventArgsSystem = null,
        serviceFailedEventArgsSystem = null;
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('RouteLocatorPoint',function(done){
        var routeLocatorParameters_point = new SuperMap.RouteLocatorParameters({
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
                var routeLocatorResult = routeLocatorEventArgsSystem.result;
                expect(routeLocatorResult).not.toBeNull();
                expect(routeLocatorResult.succeed).toBeTruthy();
                expect(routeLocatorResult.resultGeometry).not.toBeNull();
                routeLocatorService.destroy();
                expect(routeLocatorService.EVENT_TYPES == null).toBeTruthy();
                expect(routeLocatorService.events == null).toBeTruthy();
                expect(routeLocatorService.eventListeners == null).toBeTruthy();
                routeLocatorParameters_point.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("RouteLocatorService_" + exception.name + ":" + exception.message);
                routeLocatorService.destroy();
                routeLocatorParameters_point.destroy();
                done();
            }
        }, 2000);
    });

    it('RouteLocatorLine',function(done){
        var routeLocatorParameters_line = new SuperMap.RouteLocatorParameters({
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
                var routeLocatorResult = routeLocatorEventArgsSystem.result;
                expect(routeLocatorResult).not.toBeNull();
                expect(routeLocatorResult.succeed).toBeTruthy();
                expect(routeLocatorResult.resultGeometry).not.toBeNull();
                routeLocatorService.destroy();
                routeLocatorParameters_line.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("RouteLocatorService_" + exception.name + ":" + exception.message);
                routeLocatorService.destroy();
                routeLocatorParameters_line.destroy();
                done();
            }
        }, 2000);
    });
});

