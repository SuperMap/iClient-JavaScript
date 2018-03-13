import {RouteCalculateMeasureService} from '../../../src/common/iServer/RouteCalculateMeasureService';
import {RouteCalculateMeasureParameters} from '../../../src/common/iServer/RouteCalculateMeasureParameters';

var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
var routeCalculateMeasureEventArgsSystem = null, serviceFailedEventArgsSystem = null;

var routeCalculateMeasureCompleted = (routeCalculateMeasureEventArgs) => {
    routeCalculateMeasureEventArgsSystem = routeCalculateMeasureEventArgs;
}

var routeCalculateMeasureFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}

var initCalculateMeasureService = () => {
    return new RouteCalculateMeasureService(spatialAnalystURL,
        {
            eventListeners: {
                "processCompleted": routeCalculateMeasureCompleted,
                'processFailed': routeCalculateMeasureFailed
            }
        }
    );
}

describe('RouteCalculateMeasureService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        routeCalculateMeasureEventArgsSystem = null;
        serviceFailedEventArgsSystem = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('processAsync', (done) => {
        var parameters = new RouteCalculateMeasureParameters({
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
            "tolerance": 1,
            "point": {
                "x": 3330.7754269417,
                "y": -6838.8394457216
            },
            "isIgnoreGap": false
        });
        var calculateMeasureService = initCalculateMeasureService();
        calculateMeasureService.processAsync(parameters);

        setTimeout(() => {
            try {
                var calculateMeasureResult = routeCalculateMeasureEventArgsSystem.result;
                expect(calculateMeasureResult).not.toBeNull();
                expect(calculateMeasureResult.succeed).toBeTruthy();
                expect(calculateMeasureResult.measure).toEqual(532.1658053450747);
                calculateMeasureService.destroy();
                expect(calculateMeasureService.EVENT_TYPES == null).toBeTruthy();
                expect(calculateMeasureResult.events == null).toBeTruthy();
                expect(calculateMeasureResult.eventListeners == null).toBeTruthy();
                parameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("RouteCalculateMeasureService_" + exception.name + ":" + exception.message);
                calculateMeasureService.destroy();
                parameters.destroy();
                done();
            }
        }, 2000);
    });
});

