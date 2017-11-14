require('../../../src/leaflet/services/MeasureService');

var url = GlobeParameter.WorldURL;
describe('leaflet_MeasureService', function () {
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
            serverType: 'iServer'
        };
        var measureService = L.supermap.measureService(url, options);
        expect(measureService.options.serverType).toBe('iServer');
        expect(measureService.url).toEqual(url);
    });

    it('measureDistance_line', function () {
        var line = L.polyline([[25, 102], [40, 116]]);
        var params = new SuperMap.MeasureParameters(line);
        L.supermap.measureService(url).measureDistance(params, function (serviceResult) {
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

    it('measureDistance_polygon', function () {
        var polygon = L.polygon([[0, 0], [39, 0], [39, 60], [0, 60], [0, 0]]);
        var params = new SuperMap.MeasureParameters(polygon);
        L.supermap.measureService(url).measureDistance(params, function (serviceResult) {
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

    it('measureArea_line', function () {
        var line = L.polyline([[25, 102], [40, 116]]);
        var params = new SuperMap.MeasureParameters(line);
        L.supermap.measureService(url).measureArea(params, function (serviceResult) {
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

    it('measureDistance_polygon', function () {
        var polygon = L.polygon([[0, 0], [39, 0], [39, 60], [0, 60], [0, 0]]);
        var params = new SuperMap.MeasureParameters(polygon);
        L.supermap.measureService(url).measureArea(params, function (serviceResult) {
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

    it('measure_DISTANCE', function () {
        var line = L.polyline([[25, 102], [40, 116]]);
        var params = new SuperMap.MeasureParameters(line);
        L.supermap.measureService(url).measure("DISTANCE", params, function (serviceResult) {
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

    it('measure_AREA', function () {
        var polygon = L.polygon([[0, 0], [39, 0], [39, 60], [0, 60], [0, 0]]);
        var params = new SuperMap.MeasureParameters(polygon);
        L.supermap.measureService(url).measure("AREA", params, function (serviceResult) {
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
