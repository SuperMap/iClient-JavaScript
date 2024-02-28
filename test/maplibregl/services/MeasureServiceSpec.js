import {MeasureService} from '../../../src/maplibregl/services/MeasureService';
import {MeasureParameters} from '../../../src/common/iServer/MeasureParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var url = GlobeParameter.WorldURL;
var options = {

};

describe('maplibregl_MeasureService', () => {
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

    //测距, 成功事件
    it('success:measureDistance', (done) => {
        var line = {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [0, 0],
                    [10, 10]
                ]
            }
        };
        var measureParameters = new MeasureParameters(line);
        var service = new MeasureService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method) => {
            expect(method).toBe("GET");
            return Promise.resolve(new Response(`{"area":-1,"unit":"METER","distance":1565109.0991230179}`));
        });
        service.measureDistance(measureParameters, (result) => {
            serviceResult = result
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.area).toEqual(-1);
                expect(serviceResult.result.distance).toEqual(1565109.0991230179);
                expect(serviceResult.result.unit).toEqual("METER");
                done();
            } catch (e) {
                console.log("'success:measureDistance'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
    });
    });

    //测距:失败事件
    it('fail:measureDistance', (done) => {
        var line = {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [0, 0]
                ]
            }
        };
        var measureParameters = new MeasureParameters(line);
        var service = new MeasureService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method) => {
            expect(method).toBe("GET");
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"参数 point2Ds 不合法，必须至少包含两个二维点"}}`));
        });
        service.measureDistance(measureParameters, (result) => {
            serviceResult = result
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.error.code).toBe(400);
                expect(serviceResult.error.errorMsg).toEqual("参数 point2Ds 不合法，必须至少包含两个二维点");
                done();
            } catch (e) {
                console.log("'fail:measureDistance'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
    });
    });

    //测面积成功事件
    it('measureArea_success_test', (done) => {
        var geo = {
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[[0, 0],
                    [-10, 30],
                    [-30, 0],
                    [0, 0]]]
            }
        };
        var measureParameters = new MeasureParameters(geo);
        var service = new MeasureService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method) => {
            expect(method).toBe("GET");
            return Promise.resolve(new Response(`{"area":5.586861668611416E12,"unit":"METER","distance":-1}`));
        });
        service.measureArea(measureParameters, (result) => {
            serviceResult = result
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.area).toEqual(5586861668611.416);
                expect(serviceResult.result.distance).toEqual(-1);
                expect(serviceResult.result.unit).toEqual("METER");
                done();
            } catch (e) {
                console.log("'measureArea_success_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
    });
    });

    //测面积失败事件
    it('measureArea_failed_test', (done) => {
        var geo = {
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[[0, 0], [0, 0]]]
            }
        };
        var measureParameters = new MeasureParameters(geo);
        var service = new MeasureService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method) => {
            expect(method).toBe("GET");
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"传入参数 points 的长度小于3。"}}`));
        });
        service.measureArea(measureParameters, (result) => {
            serviceResult = result
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.error.code).toBe(400);
                expect(serviceResult.error.errorMsg).toEqual("传入参数 points 的长度小于3。");
                done();
            } catch (e) {
                console.log("'measureArea_failed_test'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
    });
    });
});