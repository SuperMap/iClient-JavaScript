import {SpatialAnalystService} from '../../../src/maplibregl/services/SpatialAnalystService';
import {RouteLocatorParameters} from '../../../src/common/iServer/RouteLocatorParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var url = GlobeParameter.spatialAnalystURL;
var options = {

};

describe('maplibregl_SpatialAnalystService_routeLocate', () => {
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

    //路由定位 里程定点
    it('routeLocate_point', (done) => {
        var piontLists = [
            [116.2143386597, 39.8959419733, 0],
            [116.217501999125, 39.896670999665, 282.3879789906],
            [116.220156000875, 39.896820999605, 511.787745072744],
            [116.228716999, 39.8968419995966, 1253.201708792909],
            [116.25000000025, 39.8968619995886, 3103.167523778722],
            [116.27412300025, 39.8967689996258, 5201.062444476062],
            [116.310443000875, 39.8971139994878, 8360.617856315024],
            [116.344168500812, 39.8976724992644, 11294.738396325054]
        ];
        var routeLine = {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": piontLists
            }
        };
        var routeLocatorParameters_point = new RouteLocatorParameters({
            "sourceRoute": routeLine,
            "type": "POINT",
            "measure": 6753,
            "offset": 0,
            "isIgnoreGap": true
        });
        var service = new SpatialAnalystService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(url + "/geometry/routelocator?returnContent=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.sourceRoute.type).toBe("LINEM");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"image":null,"resultGeometry":{"center":{"x":4076.2655245045335,"y":-4382.939424428795},"parts":[6],"style":null,"prjCoordSys":null,"id":0,"type":"LINE","partTopo":null,"points":[{"x":4029.930231958818,"y":-4378.2438540269895},{"x":4057.0600591960642,"y":-4381.569363260499},{"x":4064.595810063362,"y":-4382.60877717323},{"x":4076.2655245045335,"y":-4382.939424428795},{"x":4215.049444583775,"y":-4382.333381109672},{"x":4247.756955878764,"y":-4382.389670274902}]},"succeed":true,"message":null}`));
        });
        service.routeLocate(routeLocatorParameters_point, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.resultGeometry.type).toEqual("Feature");
                expect(serviceResult.result.resultGeometry.geometry.type).toEqual("LineString");
                expect(serviceResult.result.resultGeometry.geometry.coordinates.length).toEqual(6);
                done();
            } catch (e) {
                console.log("'routeLocate_point'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
    });
    });

    //路由定位 里程定线
    it('routeLocate_line', (done) => {
        var piontLists = [
            [116.2143386597, 39.8959419733, 0],
            [116.217501999125, 39.896670999665, 282.3879789906],
            [116.220156000875, 39.896820999605, 511.787745072744],
            [116.228716999, 39.8968419995966, 1253.201708792909],
            [116.25000000025, 39.8968619995886, 3103.167523778722],
            [116.27412300025, 39.8967689996258, 5201.062444476062],
            [116.310443000875, 39.8971139994878, 8360.617856315024],
            [116.344168500812, 39.8976724992644, 11294.738396325054]
        ];
        var routeLine = {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": piontLists
            }
        };
        var routeLocatorParameters_line = new RouteLocatorParameters({
            "sourceRoute": routeLine,
            "type": "LINE",
            "startMeasure": 1123,
            "endMeasure": 4489,
            "isIgnoreGap": true
        });
        var service = new SpatialAnalystService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(url + "/geometry/routelocator?returnContent=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.sourceRoute.type).toBe("LINEM");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"image":null,"resultGeometry":{"center":{"x":4076.2655245045335,"y":-4382.939424428795},"parts":[6],"style":null,"prjCoordSys":null,"id":0,"type":"LINE","partTopo":null,"points":[{"x":4029.930231958818,"y":-4378.2438540269895},{"x":4057.0600591960642,"y":-4381.569363260499},{"x":4064.595810063362,"y":-4382.60877717323},{"x":4076.2655245045335,"y":-4382.939424428795},{"x":4215.049444583775,"y":-4382.333381109672},{"x":4247.756955878764,"y":-4382.389670274902}]},"succeed":true,"message":null}`));
        });
        service.routeLocate(routeLocatorParameters_line, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.resultGeometry.type).toEqual("Feature");
                expect(serviceResult.result.resultGeometry.geometry.type).toEqual("LineString");
                var coordinates = serviceResult.result.resultGeometry.geometry.coordinates;
                expect(coordinates.length).toBeGreaterThan(0);
                for (var i = 0; i < coordinates.length; i++) {
                    expect(coordinates[i].length).toEqual(2);
                }
                done();
            } catch (e) {
                console.log("'routeLocate_line'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
    });
    });
});