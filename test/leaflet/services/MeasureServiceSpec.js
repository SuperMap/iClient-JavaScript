import { measureService } from '../../../src/leaflet/services/MeasureService';
import { MeasureParameters } from '../../../src/common/iServer/MeasureParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

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

    it('measureDistance_line', (done) => {
        var line = L.polyline([[25, 102], [40, 116]]);
        var params = new MeasureParameters(line);
        spyOn(FetchRequest, 'commit').and.callFake((method) => {
            expect(method).toBe("GET");
            return Promise.resolve(new Response(`{"area":-1,"unit":"METER","distance":2115093.3333095433}`));
        });
        measureService(url).measureDistance(params, (serviceResult) => {
            try {
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.area).toEqual(-1);
                expect(serviceResult.result.distance).toBeGreaterThan(0);
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.unit).toBe("METER");
                expect(serviceResult.object.measureMode).toBe("DISTANCE");
                expect(serviceResult.object.options.method).toBe("GET");
                expect(serviceResult.object.options.params.point2Ds).not.toBeNull();
                params.destroy();
                done();
            } catch (exception) {
                console.log("measureDistance_line'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    it('measureDistance_polygon', (done) => {
        var polygon = L.polygon([[0, 0], [39, 0], [39, 60], [0, 60], [0, 0]]);
        var params = new MeasureParameters(polygon);
        spyOn(FetchRequest, 'commit').and.callFake((method) => {
            expect(method).toBe("GET");
            return Promise.resolve(new Response(`{"area":-1,"unit":"METER","distance":2.0413717122988027E7}`));
        });
        measureService(url).measureDistance(params, (serviceResult) => {
            try {
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.area).toEqual(-1);
                expect(serviceResult.result.distance).toBeGreaterThan(0);
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.unit).toBe("METER");
                expect(serviceResult.object.measureMode).toBe("DISTANCE");
                expect(serviceResult.object.options.method).toBe("GET");
                expect(serviceResult.object.options.params.point2Ds).not.toBeNull();
                params.destroy();
                done();
            } catch (exception) {
                console.log("measureDistance_line'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    it('measureArea_line', (done) => {
        var line = L.polyline([[25, 102], [40, 116]]);
        var params = new MeasureParameters(line);
        spyOn(FetchRequest, 'commit').and.callFake((method) => {
            expect(method).toBe("GET");
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"传入参数 points 的长度小于3。"}}`));
        });
        measureService(url).measureArea(params, (serviceResult) => {
            try {
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).toBe("传入参数 points 的长度小于3。");
                expect(serviceResult.object.measureMode).toBe("AREA");
                expect(serviceResult.object.options.method).toBe("GET");
                params.destroy();
                done();
            } catch (exception) {
                console.log("measureArea_line'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    it('measureDistance_polygon', (done) => {
        var polygon = L.polygon([[0, 0], [39, 0], [39, 60], [0, 60], [0, 0]]);
        var params = new MeasureParameters(polygon);
        spyOn(FetchRequest, 'commit').and.callFake((method) => {
            expect(method).toBe("GET");
            return Promise.resolve(new Response(`{"area":2.619618191560064E13,"unit":"METER","distance":-1}`));
        });
        measureService(url).measureArea(params, (serviceResult) => {
            try {
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
                done();
            } catch (exception) {
                console.log("measureDistance_polygon'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    it('measure_DISTANCE', (done) => {
        var line = L.polyline([[25, 102], [40, 116]]);
        var params = new MeasureParameters(line);
        spyOn(FetchRequest, 'commit').and.callFake((method) => {
            expect(method).toBe("GET");
            return Promise.resolve(new Response(`{"area":-1,"unit":"METER","distance":2115093.3333095433}`));
        });
        measureService(url).measure("DISTANCE", params, (serviceResult) => {
            try {
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.area).toEqual(-1);
                expect(serviceResult.result.distance).toBeGreaterThan(0);
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.unit).toBe("METER");
                expect(serviceResult.object.measureMode).toBe("DISTANCE");
                expect(serviceResult.object.options.method).toBe("GET");
                expect(serviceResult.object.options.params.point2Ds).not.toBeNull();
                params.destroy();
                done();
            } catch (exception) {
                console.log("measure_DISTANCE'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    it('measure_AREA', (done) => {
        var polygon = L.polygon([[0, 0], [39, 0], [39, 60], [0, 60], [0, 0]]);
        var params = new MeasureParameters(polygon);
        spyOn(FetchRequest, 'commit').and.callFake((method) => {
            expect(method).toBe("GET");
            return Promise.resolve(new Response(`{"area":2.619618191560064E13,"unit":"METER","distance":-1}`));
        });
        measureService(url).measure("AREA", params, (serviceResult) => {
            try {
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
                done();
            } catch (exception) {
                console.log("measure_AREA'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
});
