import {measureService} from '../../../src/leaflet/services/MeasureService';
import {MeasureParameters} from '../../../src/common/iServer/MeasureParameters';

var url = GlobeParameter.WorldURL;
describe('leaflet_MeasureService', () => {
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
            serverType: 'iServer'
        };
        var service = measureService(url, options);
        expect(service.options.serverType).toBe('iServer');
        expect(service.url).toEqual(url);
    });

    it('measureDistance_line', () => {
        var line = L.polyline([[25, 102], [40, 116]]);
        var params = new MeasureParameters(line);
        measureService(url).measureDistance(params, (serviceResult) => {
            expect(serviceResult.type).toBe("processCompleted");
            expect(serviceResult.result.area).toEqual(-1);
            expect(serviceResult.result.distance).toBeGreaterThan(0);
            expect(serviceResult.result.succeed).toBeTruthy();
            expect(serviceResult.result.unit).toBe("METER");
            expect(serviceResult.object.measureMode).toBe("DISTANCE");
            expect(serviceResult.object.options.method).toBe("GET");
            expect(serviceResult.object.options.params.point2Ds).not.toBeNull();
            params.destroy();
        });
    });

    it('measureDistance_polygon', () => {
        var polygon = L.polygon([[0, 0], [39, 0], [39, 60], [0, 60], [0, 0]]);
        var params = new MeasureParameters(polygon);
        measureService(url).measureDistance(params, (serviceResult) => {
            expect(serviceResult.type).toBe("processCompleted");
            expect(serviceResult.result.area).toEqual(-1);
            expect(serviceResult.result.distance).toBeGreaterThan(0);
            expect(serviceResult.result.succeed).toBeTruthy();
            expect(serviceResult.result.unit).toBe("METER");
            expect(serviceResult.object.measureMode).toBe("DISTANCE");
            expect(serviceResult.object.options.method).toBe("GET");
            expect(serviceResult.object.options.params.point2Ds).not.toBeNull();
            params.destroy();
        });
    });

    it('measureArea_line', () => {
        var line = L.polyline([[25, 102], [40, 116]]);
        var params = new MeasureParameters(line);
        measureService(url).measureArea(params, (serviceResult) => {
            expect(serviceResult).not.toBeNull();
            expect(serviceResult.type).toBe("processFailed");
            expect(serviceResult.error).not.toBeNull();
            expect(serviceResult.error.code).toEqual(400);
            expect(serviceResult.error.errorMsg).toBe("传入参数 points 的长度小于3。");
            expect(serviceResult.object.measureMode).toBe("AREA");
            expect(serviceResult.object.options.method).toBe("GET");
            params.destroy();
        });
    });

    it('measureDistance_polygon', () => {
        var polygon = L.polygon([[0, 0], [39, 0], [39, 60], [0, 60], [0, 0]]);
        var params = new MeasureParameters(polygon);
        measureService(url).measureArea(params, (serviceResult) => {
            expect(serviceResult).not.toBeNull();
            expect(serviceResult.type).toBe("processCompleted");
            expect(serviceResult.result.area).toBeGreaterThan(0);
            expect(serviceResult.result.distance).toEqual(-1);
            expect(serviceResult.result.succeed).toBeTruthy();
            expect(serviceResult.result.unit).toBe("METER");
            expect(serviceResult.object.measureMode).toBe("AREA");
            expect(serviceResult.object.options.method).toBe("GET");
            expect(serviceResult.object.options.params.point2Ds).not.toBeNull();
            params.destroy();
        });
    });

    it('measure_DISTANCE', () => {
        var line = L.polyline([[25, 102], [40, 116]]);
        var params = new MeasureParameters(line);
        measureService(url).measure("DISTANCE", params, (serviceResult) => {
            expect(serviceResult.type).toBe("processCompleted");
            expect(serviceResult.result.area).toEqual(-1);
            expect(serviceResult.result.distance).toBeGreaterThan(0);
            expect(serviceResult.result.succeed).toBeTruthy();
            expect(serviceResult.result.unit).toBe("METER");
            expect(serviceResult.object.measureMode).toBe("DISTANCE");
            expect(serviceResult.object.options.method).toBe("GET");
            expect(serviceResult.object.options.params.point2Ds).not.toBeNull();
            params.destroy();
        });
    });

    it('measure_AREA', () => {
        var polygon = L.polygon([[0, 0], [39, 0], [39, 60], [0, 60], [0, 0]]);
        var params = new MeasureParameters(polygon);
        measureService(url).measure("AREA", params, (serviceResult) => {
            expect(serviceResult).not.toBeNull();
            expect(serviceResult.type).toBe("processCompleted");
            expect(serviceResult.result.area).toBeGreaterThan(0);
            expect(serviceResult.result.distance).toEqual(-1);
            expect(serviceResult.result.succeed).toBeTruthy();
            expect(serviceResult.result.unit).toBe("METER");
            expect(serviceResult.object.measureMode).toBe("AREA");
            expect(serviceResult.object.options.method).toBe("GET");
            expect(serviceResult.object.options.params.point2Ds).not.toBeNull();
            params.destroy();
        });
    });
});
