require('../../../src/mapboxgl/services/SpatialAnalystService');
var mapboxgl = require('mapbox-gl');

var url = GlobeParameter.spatialAnalystURL;
var options = {
    serverType: 'iServer'
};
describe('mapboxgl_SpatialAnalystService_routeLocate', function () {
    var serviceResult;
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    //路由定位 里程定点
    it('routeLocate_point_test', function (done) {
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

        var lineGeometryData = {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": piontLists
            }
        };

        var routeLine = lineGeometryData;
        var routeLocatorParameters_point = new SuperMap.RouteLocatorParameters({
            "sourceRoute": routeLine,
            "type": "POINT",
            "measure": 6753,
            "offset": 0,
            "isIgnoreGap": true
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url, options);
        service.routeLocate(routeLocatorParameters_point, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.resultGeometry.type).toEqual("Feature");
                expect(serviceResult.result.resultGeometry.geometry.type).toEqual("Point");
                expect(serviceResult.result.resultGeometry.geometry.coordinates.length).toEqual(2);
                done();
            } catch (e) {
                console.log("'routeLocate_point_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)

    });

    //路由定位 里程定线
    it('routeLocate_line_test', function (done) {
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
        var LineGeometryData = {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": piontLists
            }
        };
        var routeLine = LineGeometryData;
        var routeLocatorParameters_line = new SuperMap.RouteLocatorParameters({
            "sourceRoute": routeLine,
            "type": "LINE",
            "startMeasure": 1123,
            "endMeasure": 4489,
            "isIgnoreGap": true
        });
        var service = new mapboxgl.supermap.SpatialAnalystService(url, options);
        service.routeLocate(routeLocatorParameters_line, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
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
                console.log("'routeLocate_line_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });
});