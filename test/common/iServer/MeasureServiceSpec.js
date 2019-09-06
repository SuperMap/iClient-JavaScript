import {MeasureService} from '../../../src/common/iServer/MeasureService';
import {MeasureParameters} from '../../../src/common/iServer/MeasureParameters';
import {Point} from '../../../src/common/commontypes/geometry/Point';
import {LineString} from '../../../src/common/commontypes/geometry/LineString';
import {LinearRing} from '../../../src/common/commontypes/geometry/LinearRing';
import {Polygon} from '../../../src/common/commontypes/geometry/Polygon';
import {MeasureMode} from '../../../src/common/REST';
import {Unit} from '../../../src/common/REST';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
var measureEventArgsSystem = null,
    serviceFailedEventArgsSystem = null;
var initMeasureService = (url,measureFailed,measureCompleted) => {
    return new MeasureService(url,{
        eventListeners: {
            'processCompleted': measureCompleted,
            'processFailed': measureFailed
        }
    });
};
describe('MeasureService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        measureEventArgsSystem = null;
        serviceFailedEventArgsSystem = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('headers', () => {
      let myHeaders = new Headers();
      var measureService = new MeasureService(GlobeParameter.mapServiceURL, { headers: myHeaders });
      expect(measureService).not.toBeNull();
      expect(measureService.headers).not.toBeNull();
      measureService.destroy();
    });
    
    it('crossOrigin', () => {
        var measureService = new MeasureService(GlobeParameter.mapServiceURL, { crossOrigin: false });
        expect(measureService).not.toBeNull();
        expect(measureService.crossOrigin).toBeFalsy();
        measureService.destroy();
    });

    it('processAsync_distance', (done) => {
        var mapServiceURL = GlobeParameter.mapServiceURL;
        var worldMapURL = mapServiceURL + "World Map";
        var measureCompleted = (measureEventArgs) => {
            measureEventArgsSystem = measureEventArgs;
            try {
                var measureResult = measureEventArgsSystem.result;
                expect(measureResult).not.toBeNull();
                expect(measureResult.succeed).toBeTruthy();
                expect(measureResult.area).toEqual(-1);
                expect(measureResult.distance).toEqual(1565109.0991230179);
                expect(measureResult.unit).toBe("METER");
                measureService.destroy();
                expect(measureService.url == null).toBeTruthy();
                expect(measureService.isInTheSameDomain == null).toBeTruthy();
                expect(measureService.EVENT_TYPES == null).toBeTruthy();
                expect(measureService.events == null).toBeTruthy();
                expect(measureService.distanceMode == null).toBeTruthy();
                measureParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("MeasureService_" + exception.name + ":" + exception.message);
                measureService.destroy();
                measureParameters.destroy();
                done();
            }
        };
        var measureFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var measureService = initMeasureService(worldMapURL,measureFailed,measureCompleted);
        var points = [new Point(0, 0), new Point(10, 10)];
        var geometry = new LineString(points);
        var measureParameters = new MeasureParameters(geometry);
        expect(measureService).not.toBeNull();
        expect(measureService.url).toEqual(worldMapURL);
        spyOn(FetchRequest, 'commit').and.callFake((method,testUrl) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(worldMapURL+"/distance.json?");
            return Promise.resolve(new Response(`{"area":-1,"unit":"METER","distance":1565109.0991230179}`));
        });
        measureService.events.on({'processCompleted': measureCompleted, 'processFailed': measureFailed});
        measureService.processAsync(measureParameters);
    });

    //反向测试用例，输入点进行距离量算
    it('fail0:processAsync_distance', (done) => {
        var mapServiceURL = GlobeParameter.mapServiceURL;
        var worldMapURL = mapServiceURL + "World Map";
        var measureCompleted = (measureEventArgs) => {
            measureEventArgsSystem = measureEventArgs;
        };
        var measureFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.succeed).toBeFalsy();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).toContain("参数 point2Ds 不合法，必须至少包含两个二维点");
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                measureService.destroy();
                measureParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("MeasureService_" + exception.name + ":" + exception.message);
                measureService.destroy();
                measureParameters.destroy();
                done();
            }
        };
        var measureService = initMeasureService(worldMapURL,measureFailed,measureCompleted);
        var point = new Point(0, 0);
        var measureParameters = new MeasureParameters(point);
        measureService.events.on({
            'processCompleted': measureCompleted,
            'processFailed': measureFailed
        });
        spyOn(FetchRequest, 'commit').and.callFake((method,testUrl) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(worldMapURL+"/distance.json?");
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"参数 point2Ds 不合法，必须至少包含两个二维点"}}`));
        });
        measureService.processAsync(measureParameters);
    });

    //反向测试用例，输入距离单位枚举值错误
    it('fail1:processAsync_distance', (done) => {
        var mapServiceURL = GlobeParameter.mapServiceURL;
        var worldMapURL = mapServiceURL + "World Map";
        var measureCompleted = (measureEventArgs) => {
            measureEventArgsSystem = measureEventArgs;
        };
        var measureFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.succeed).toBeFalsy();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).toContain("No enum constant com.supermap.services.components.commontypes.Unit.error");
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                measureService.destroy();
                measureParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("MeasureService_" + exception.name + ":" + exception.message);
                measureService.destroy();
                measureParameters.destroy();
                done();
            }
        };
        var measureService = initMeasureService(worldMapURL,measureFailed,measureCompleted);
        var points = [new Point(0, 0), new Point(0, 0)];
        var geometry = new LineString(points);
        var measureParameters = new MeasureParameters(geometry);
        measureParameters.unit = "error";
        spyOn(FetchRequest, 'commit').and.callFake((method,testUrl) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(worldMapURL+"/distance.json?");
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"No enum constant com.supermap.services.components.commontypes.Unit.error"}}`));
        });
        measureService.events.on({
            'processCompleted': measureCompleted,
            'processFailed': measureFailed
        });
        measureService.processAsync(measureParameters);
    });

    //area
    it('processAsync_area', (done) => {
        var mapServiceURL = GlobeParameter.mapServiceURL;
        var worldMapURL = mapServiceURL + "World Map";
        var measureCompleted = (measureEventArgs) => {
            measureEventArgsSystem = measureEventArgs;
            try {
                var measureResult = measureEventArgsSystem.result;
                expect(measureResult).not.toBeNull();
                expect(measureResult.area).toEqual(617049216619.1235);
                expect(measureResult.distance).toEqual(-1);
                expect(measureResult.unit).toBe("METER");
                measureService.destroy();
                measureParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("MeasureService_" + exception.name + ":" + exception.message);
                measureService.destroy();
                measureParameters.destroy();
                done();
            }
        };
        var measureFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var measureService = initMeasureService(worldMapURL,measureFailed,measureCompleted);
        measureService.measureMode= MeasureMode.AREA;
        var points = [
            new Point(0, 0),
            new Point(10, 10),
            new Point(10, 0),
            new Point(0, 0)
        ];
        var geometry = new Polygon(new LinearRing(points));
        var measureParameters = new MeasureParameters(geometry);
        spyOn(FetchRequest, 'commit').and.callFake((method,testUrl) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(worldMapURL+"/area.json?");
            return Promise.resolve(new Response(`{"area":6.170492166191235E11,"unit":"METER","distance":-1}`));
        });
        measureService.processAsync(measureParameters);
    });

    //反向测试用例，传入的点无法构成面
    it('fail:processAsync_area', (done) => {
        var mapServiceURL = GlobeParameter.mapServiceURL;
        var worldMapURL = mapServiceURL + "World Map";
        var measureCompleted = (measureEventArgs) => {
            measureEventArgsSystem = measureEventArgs;
            try {
                var measureResult = measureEventArgsSystem.result;
                expect(measureResult).not.toBeNull();
                expect(measureResult.area).toEqual(0);
                expect(measureResult.distance).toEqual(-1);
                expect(measureResult.unit).toBe("METER");
                measureService.destroy();
                measureParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("MeasureService_" + exception.name + ":" + exception.message);
                measureService.destroy();
                measureParameters.destroy();
                done();
            }
        };
        var measureFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;

        };
        var measureService = initMeasureService(worldMapURL,measureFailed,measureCompleted);
        measureService.measureMode= MeasureMode.AREA;
        var points = [
            new Point(0, 0),
            new Point(10, 10),
            new Point(0, 0)
        ];
        var geometry = new Polygon(new LinearRing(points));
        var measureParameters = new MeasureParameters(geometry);
        spyOn(FetchRequest, 'commit').and.callFake((method,testUrl) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(worldMapURL+"/area.json?");
            return Promise.resolve(new Response(`{"area":0,"unit":"METER","distance":-1}`));
        });
        measureService.processAsync(measureParameters);
    });

    //反向测试用例，传入线进行面积量算
    it('fail1_processAsync_area', (done) => {
        var mapServiceURL = GlobeParameter.mapServiceURL;
        var worldMapURL = mapServiceURL + "World Map";
        var measureCompleted = (measureEventArgs) => {
            measureEventArgsSystem = measureEventArgs;
        };
        var measureFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.succeed).toBeFalsy();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).toContain("传入参数 points 的长度小于3。");
                measureService.destroy();
                measureParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("MeasureService_" + exception.name + ":" + exception.message);
                measureService.destroy();
                measureParameters.destroy();
                done();
            }
        };
        var measureService = initMeasureService(worldMapURL,measureFailed,measureCompleted);
        measureService.measureMode= MeasureMode.AREA;
        var points = [new Point(0, 0), new Point(10, 10)];
        var geometry = new LineString(points);
        var measureParameters = new MeasureParameters(geometry);
        spyOn(FetchRequest, 'commit').and.callFake((method,testUrl) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(worldMapURL+"/area.json?");
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"传入参数 points 的长度小于3。"}}`));
        });
        measureService.processAsync(measureParameters);
    });

    //反向测试用例，地图名错误，无法调用回调函数
    it('fail2_processAsync_area', (done) => {
        var mapServiceURL = GlobeParameter.mapServiceURL;
        var worldMapURL = mapServiceURL + "World Map";
        var measureCompleted = (measureEventArgs) => {
            measureEventArgsSystem = measureEventArgs;
        };
        var measureFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.succeed).toBeFalsy();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(404);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).toContain("资源不存在");
                measureService.destroy();
                measureParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("MeasureService_" + exception.name + ":" + exception.message);
                measureService.destroy();
                measureParameters.destroy();
                done();
            }

        };
        var measureService = initMeasureService(worldMapURL + "_Error",measureFailed,measureCompleted);
        measureService.measureMode= MeasureMode.AREA;
        // var measureService = new MeasureService(worldMapURL + "_Error", {measureMode: MeasureMode.AREA});
        var points = [new Point(0, 0), new Point(10, 10), new Point(10, 0)];
        //服务端缺陷,new Point(20, 20),new Point(0, 0)
        var geometry = new Polygon(new LinearRing(points));
        var measureParameters = new MeasureParameters(geometry, {unit: Unit.KILOMETER});
        spyOn(FetchRequest, 'commit').and.callFake((method,testUrl) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(mapServiceURL+"World Map_Error/area.json?");
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":404,"errorMsg":"资源不存在"}}`));
        });
        measureService.events.on({'processCompleted': measureCompleted, 'processFailed': measureFailed});
        measureService.processAsync(measureParameters);
    });
});

