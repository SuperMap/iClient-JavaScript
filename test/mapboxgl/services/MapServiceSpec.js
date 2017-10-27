require('../../../src/mapboxgl/services/MapService');
var mapboxgl = require('mapbox-gl');
var url = GlobeParameter.WorldURL;
var options = {
    serverType: SuperMap.ServerType.ISERVER
};
describe('mapboxgl_MapService', function () {
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

    //地图信息查询服务
    it('getMapInfo', function (done) {
        var service = new mapboxgl.supermap.MapService(url, options);
        service.getMapInfo(function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.antialias).toEqual(true);
                expect(serviceResult.result.bounds).not.toBeNull();
                expect(serviceResult.result.clipRegion).not.toBeNull();
                expect(serviceResult.result.clipRegion.type).toEqual("REGION");
                expect(serviceResult.result.colorMode).toEqual("DEFAULT");
                expect(serviceResult.result.coordUnit).toEqual("DEGREE");
                expect(serviceResult.result.distanceUnit).toEqual("METER");
                expect(serviceResult.result.name).toEqual("World");
                expect(serviceResult.result.prjCoordSys.coordSystem).not.toBeNull();
                expect(serviceResult.result.prjCoordSys.coordUnit).toEqual("DEGREE");
                expect(serviceResult.result.prjCoordSys.distanceUnit).toEqual("METER");
                expect(serviceResult.result.prjCoordSys.epsgCode).toEqual(4326);
                expect(serviceResult.result.viewer).not.toBeNull();
                done();
            } catch (e) {
                console.log("'getMapInfo'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 3000)
    });

    //切片列表信息查询服务
    it('getTilesets', function (done) {
        var service = new mapboxgl.supermap.MapService(url, options);
        service.getTilesets(function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                done();
            } catch (e) {
                console.log("'getMapInfo'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 3000)
    });
});


