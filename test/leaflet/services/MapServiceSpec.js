import {mapService} from '../../../src/leaflet/services/MapService';

var url = GlobeParameter.ChinaURL;
describe('leaflet_MapService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('initialize', () => {
        var options = {
            projection: 'EPSG:3857'
        };
        var service = mapService(url, options);
        expect(service.options.projection).toBe('EPSG:3857');
        expect(service.url).toEqual(url);
    });

    it('getMapInfo', () => {
        mapService(url).getMapInfo((serviceResult) => {
            expect(serviceResult).not.toBeNull();
            expect(serviceResult.type).toBe("processCompleted");
            expect(serviceResult.result).not.toBeNull();
            expect(serviceResult.object.options.method).toBe("GET");
        });
    });
});
