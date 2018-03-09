﻿import {MeasureService} from '../../../src/common/iServer/MeasureService';
import {MeasureParameters} from '../../../src/common/iServer/MeasureParameters';
import {Point} from '../../../src/common/commontypes/geometry/Point';
import {LineString} from '../../../src/common/commontypes/geometry/LineString';
import {LinearRing} from '../../../src/common/commontypes/geometry/LinearRing';
import {Polygon} from '../../../src/common/commontypes/geometry/Polygon';
import {MeasureMode} from '../../../src/common/REST';
import {Unit} from '../../../src/common/REST';

var mapServiceURL = GlobeParameter.mapServiceURL;
var worldMapURL = mapServiceURL + "World Map";
var measureEventArgsSystem = null,
    serviceFailedEventArgsSystem = null;
var measureCompleted = (measureEventArgs) => {
    measureEventArgsSystem = measureEventArgs;
};
var measureFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
};
var initMeasureService = () => {
    return new MeasureService(worldMapURL);
}
var initMeasureService_RegisterListener = () => {
    return new MeasureService(worldMapURL, {
        eventListeners: {
            'processCompleted': measureCompleted,
            'processFailed': measureFailed
        },
        measureMode: MeasureMode.AREA
    });
}

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

    it('processAsync_distance', (done) => {
        var measureService = initMeasureService();
        var points = [new Point(0, 0), new Point(10, 10)];
        var geometry = new LineString(points);
        var measureParameters = new MeasureParameters(geometry);
        expect(measureService).not.toBeNull();
        expect(measureService.url).toEqual(worldMapURL);
        measureService.events.on({'processCompleted': measureCompleted, 'processFailed': measureFailed});
        measureService.processAsync(measureParameters);
        setTimeout(() => {
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
        }, 2000);
    });

    //反向测试用例，输入点进行距离量算
    it('fail0:processAsync_distance', (done) => {
        var measureService = initMeasureService();
        var point = new Point(0, 0);
        var measureParameters = new MeasureParameters(point);
        measureService.events.on({
            'processCompleted': measureCompleted,
            'processFailed': measureFailed
        });
        measureService.processAsync(measureParameters);

        setTimeout(() => {
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
        }, 2000);
    });

    //反向测试用例，输入距离单位枚举值错误
    it('fail1:processAsync_distance', (done) => {
        var measureService = initMeasureService();
        var points = [new Point(0, 0), new Point(0, 0)];
        var geometry = new LineString(points);
        var measureParameters = new MeasureParameters(geometry);
        measureParameters.unit = "error";
        measureService.events.on({
            'processCompleted': measureCompleted,
            'processFailed': measureFailed
        });
        measureService.processAsync(measureParameters);

        setTimeout(() => {
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
        }, 1500);
    });

    //area
    it('processAsync_area', (done) => {
        var measureService = initMeasureService_RegisterListener();
        var points = [
            new Point(0, 0),
            new Point(10, 10),
            new Point(10, 0),
            new Point(0, 0)
        ];
        var geometry = new Polygon(new LinearRing(points));
        var measureParameters = new MeasureParameters(geometry);
        measureService.processAsync(measureParameters);

        setTimeout(() => {
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
        }, 1500);
    });

    //反向测试用例，传入的点无法构成面
    it('fail:processAsync_area', (done) => {
        var measureService = initMeasureService_RegisterListener();
        var points = [
            new Point(0, 0),
            new Point(10, 10),
            new Point(0, 0)
        ];
        var geometry = new Polygon(new LinearRing(points));
        var measureParameters = new MeasureParameters(geometry);
        measureService.processAsync(measureParameters);

        setTimeout(() => {
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
        }, 1500);
    });

    //反向测试用例，传入线进行面积量算
    it('fail1_processAsync_area', (done) => {
        var measureService = initMeasureService_RegisterListener();
        var points = [new Point(0, 0), new Point(10, 10)];
        var geometry = new LineString(points);
        var measureParameters = new MeasureParameters(geometry);
        measureService.processAsync(measureParameters);

        setTimeout(() => {
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
        }, 1500);
    });

    //反向测试用例，地图名错误，无法调用回调函数
    it('fail2_processAsync_area', (done) => {
        var measureService = new MeasureService(worldMapURL + "_Error", {measureMode: MeasureMode.AREA});
        var points = [new Point(0, 0), new Point(10, 10), new Point(10, 0)];
        //服务端缺陷,new Point(20, 20),new Point(0, 0)
        var geometry = new Polygon(new LinearRing(points));
        var measureParameters = new MeasureParameters(geometry, {unit: Unit.KILOMETER});
        measureService.events.on({'processCompleted': measureCompleted, 'processFailed': measureFailed});
        measureService.processAsync(measureParameters);

        setTimeout(() => {
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
        }, 1500);
    });
});

