import {spatialAnalystService} from '../../../src/leaflet/services/SpatialAnalystService';
import {RouteLocatorParameters} from '../../../src/common/iServer/RouteLocatorParameters';

var spatialAnalystURL = GlobeParameter.spatialAnalystURL_Changchun;
var options = {
    serverType: 'iServer'
};

describe('leaflet_SpatialAnalystService_routeLocate', () => {
    var serviceResult;
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('routeLocate', (done) => {
        var pointsList = [
            [-4377.027184298267, 4020.0045221720466, 0],
            [-4381.569363260499, 4057.0600591960642, 37.33288381391519],
            [-4382.60877717323, 4064.595810063362, 44.93998065935882],
            [-4382.939424428795, 4076.2655245045335, 56.614378405970754],
            [-4382.333381109672, 4215.049444583775, 195.39962171759203],
            [-4382.389670274902, 4247.756955878764, 228.1071814489743]
        ];
        var routeLine = L.polyline(pointsList);
        var routeLocatorParameters_line = new RouteLocatorParameters({
            "sourceRoute": routeLine,
            "type": "LINE",
            "startMeasure": 10,
            "endMeasure": 800,
            "isIgnoreGap": true
        });
        var routeLocatorService = spatialAnalystService(spatialAnalystURL, options);
        routeLocatorService.routeLocate(routeLocatorParameters_line, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(routeLocatorService).not.toBeNull();
                expect(routeLocatorService.options.serverType).toBe('iServer');
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBe(true);
                var resultGeometry = serviceResult.result.resultGeometry;
                expect(resultGeometry).not.toBeNull();
                expect(resultGeometry.type).toEqual("Feature");
                expect(resultGeometry.geometry.coordinates.length).toBeGreaterThan(0);
                for (var i = 0; i < resultGeometry.geometry.coordinates.length; i++) {
                    expect(resultGeometry.geometry.coordinates[i].length).toEqual(2);
                }
                expect(resultGeometry.geometry.type).toEqual("LineString");
                routeLocatorService.destroy();
                done();
            } catch (exception) {
                console.log("'routeLocate'案例失败" + exception.name + ":" + exception.message);
                routeLocatorService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });
});