import {spatialAnalystService} from '../../../src/leaflet/services/SpatialAnalystService';
import {RouteLocatorParameters} from '../../../src/common/iServer/RouteLocatorParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
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
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(spatialAnalystURL + "/geometry/routelocator.json?returnContent=true");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.sourceRoute.type).toBe("LINEM");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"image":null,"resultGeometry":{"center":{"x":4076.2655245045335,"y":-4382.939424428795},"parts":[6],"style":null,"prjCoordSys":null,"id":0,"type":"LINE","partTopo":null,"points":[{"x":4029.930231958818,"y":-4378.2438540269895},{"x":4057.0600591960642,"y":-4381.569363260499},{"x":4064.595810063362,"y":-4382.60877717323},{"x":4076.2655245045335,"y":-4382.939424428795},{"x":4215.049444583775,"y":-4382.333381109672},{"x":4247.756955878764,"y":-4382.389670274902}]},"succeed":true,"message":null}`));
        });
        routeLocatorService.routeLocate(routeLocatorParameters_line, (result) => {
            serviceResult = result;
        
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
        });
    });
});