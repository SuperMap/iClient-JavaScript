require('../../../src/leaflet/services/MapService');

var url = GlobeParameter.ChinaURL;
describe('leaflet_MapService', function () {
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('initialize', function () {
        var options = {
            projection: 'EPSG:3857'
        };
        var mapService = L.supermap.mapService(url, options);
        expect(mapService.options.projection).toBe('EPSG:3857');
        expect(mapService.url).toEqual(url);
    });

    it('getMapInfo', function () {
        L.supermap.mapService(url).getMapInfo(function (serviceResult) {
            expect(serviceResult).not.toBeNull();
            expect(serviceResult.type).toBe("processCompleted");
            expect(serviceResult.result).not.toBeNull();
            expect(serviceResult.object.options.method).toBe("GET");
        });
    });
});
