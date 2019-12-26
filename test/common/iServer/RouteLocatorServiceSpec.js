import {RouteLocatorService} from '../../../src/common/iServer/RouteLocatorService';
import {RouteLocatorParameters} from '../../../src/common/iServer/RouteLocatorParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var routeLocatorEventArgsSystem = null,
    serviceFailedEventArgsSystem = null;
var initRouteLocatorService = (url,routeLocatorFailed,routeLocatorCompleted) => {
    return new RouteLocatorService(url,
        {
            eventListeners: {
                "processCompleted": routeLocatorCompleted,
                'processFailed': routeLocatorFailed
            }
        }
    );
};
describe('RouteLocatorService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        routeLocatorEventArgsSystem = null;
            serviceFailedEventArgsSystem = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('headers', () => {
        let myHeaders = new Headers();
        var routeLocatorService = new RouteLocatorService(GlobeParameter.spatialAnalystURL, { headers: myHeaders });
        expect(routeLocatorService).not.toBeNull();
        expect(routeLocatorService.headers).not.toBeNull();
        routeLocatorService.destroy();
    });
    
    it('crossOrigin', () => {
        var routeLocatorService = new RouteLocatorService(GlobeParameter.spatialAnalystURL, { crossOrigin: false });
        expect(routeLocatorService).not.toBeNull();
        expect(routeLocatorService.crossOrigin).toBeFalsy();
        routeLocatorService.destroy();
    });

    it('processAsync_RouteLocatorPoint', (done) => {
        var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
        var routeLocatorCompleted = (routeLocatorEventArgs) => {
            routeLocatorEventArgsSystem = routeLocatorEventArgs;
            try {
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
        };
        var routeLocatorFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var routeLocatorParameters_point = new RouteLocatorParameters({
            "sourceRoute": {
                "type": "LINEM",
                "parts": [4],
                "points": [
                    {
                        "measure": 0,
                        "y": -6674.466867067764,
                        "x": 3817.3527876130133
                    },
                    {
                        "measure": 199.57954019411724,
                        "y": -6670.830929417594,
                        "x": 3617.806369901496
                    },
                    {
                        "measure": 609.3656478634477,
                        "y": -6877.837541432356,
                        "x": 3264.1498746678444
                    },
                    {
                        "measure": 936.0174126282958,
                        "y": -7038.687780615184,
                        "x": 2979.846206068903
                    }
                ]
            },
            "type": "POINT",
            "measure": 10,
            "offset": 3,
            "isIgnoreGap": true
        });
        var routeLocatorService = initRouteLocatorService(spatialAnalystURL,routeLocatorFailed,routeLocatorCompleted);
        spyOn(FetchRequest, 'post').and.callFake((url, params, options) => {
            expect(url).toBe(spatialAnalystURL + "/geometry/routelocator.json?returnContent=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.type).toBe("POINT");
            expect(paramsObj.sourceRoute.type).toBe("LINEM");
            expect(paramsObj.sourceRoute.points.length).toEqual(4);
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"image":null,"resultGeometry":{"center":{"x":3807.299793262419,"y":-6677.2841893047325},"parts":[1],"style":null,"prjCoordSys":null,"id":0,"type":"POINT","partTopo":null,"points":[{"x":3807.299793262419,"y":-6677.2841893047325}]},"succeed":true,"message":null}`));
        });
        routeLocatorService.processAsync(routeLocatorParameters_point);
    });

    it('processAsync_RouteLocatorLine', (done) => {
        var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
        var routeLocatorCompleted = (routeLocatorEventArgs) => {
            routeLocatorEventArgsSystem = routeLocatorEventArgs;
            try {
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
        };
        var routeLocatorFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var routeLocatorParameters_line = new RouteLocatorParameters({
            "sourceRoute": {
                "type": "LINEM",
                "parts": [4],
                "points": [
                    {
                        "measure": 0,
                        "y": -6674.466867067764,
                        "x": 3817.3527876130133
                    },
                    {
                        "measure": 199.57954019411724,
                        "y": -6670.830929417594,
                        "x": 3617.806369901496
                    },
                    {
                        "measure": 609.3656478634477,
                        "y": -6877.837541432356,
                        "x": 3264.1498746678444
                    },
                    {
                        "measure": 936.0174126282958,
                        "y": -7038.687780615184,
                        "x": 2979.846206068903
                    }
                ]
            },
            "type": "LINE",
            "startMeasure": 150,
            "endMeasure": 240,
            "isIgnoreGap": true
        });
        var routeLocatorService = initRouteLocatorService(spatialAnalystURL,routeLocatorFailed,routeLocatorCompleted);
        spyOn(FetchRequest, 'post').and.callFake((url, params) => {
            expect(url).toBe(spatialAnalystURL + "/geometry/routelocator.json?returnContent=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.type).toBe("LINE");
            expect(paramsObj.sourceRoute.type).toBe("LINEM");
            expect(paramsObj.sourceRoute.points.length).toEqual(4);
            return Promise.resolve(new Response(`{"image":null,"resultGeometry":{"center":{"x":3617.806369901496,"y":-6670.830929417594},"parts":[3],"style":null,"prjCoordSys":null,"id":0,"type":"LINE","partTopo":null,"points":[{"x":3667.3776818100096,"y":-6671.734168881392},{"x":3617.806369901496,"y":-6670.830929417594},{"x":3582.922419754957,"y":-6691.249636357378}]},"succeed":true,"message":null}`));
        });
        routeLocatorService.processAsync(routeLocatorParameters_line);
    });
});

