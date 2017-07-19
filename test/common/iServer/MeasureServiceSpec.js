require('../../../src/common/iServer/MeasureService');

var measureEventArgsSystem = null,
    serviceFailedEventArgsSystem = null;
var mapServiceURL = GlobeParameter.mapServiceURL;
var worldMapURL = mapServiceURL + "World Map";

//跨域下的测试
function initMeasureService() {
    return new SuperMap.MeasureService(worldMapURL);
}

//注册监听器对象，面积量算
function initMeasureService_RegisterListener() {
    return new SuperMap.MeasureService(worldMapURL, {
        eventListeners: {
            'processCompleted': measureCompleted,
            'processFailed': measureFailed
        },
        measureMode: SuperMap.MeasureMode.AREA
    });
}
function measureCompleted(measureEventArgs) {
    measureEventArgsSystem = measureEventArgs;
}
function measureFailed(serviceFailedEventArgs) {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}

describe('testMeasureService_processAsync', function () {
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        measureEventArgsSystem = null;
        serviceFailedEventArgsSystem = null;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('distance', function (done) {
        var measureService = initMeasureService();
        var points = [new SuperMap.Geometry.Point(0, 0), new SuperMap.Geometry.Point(10, 10)];
        var geometry = new SuperMap.Geometry.LineString(points);
        var measureParameters = new SuperMap.MeasureParameters(geometry);
        expect(measureService).not.toBeNull();
        expect(measureService.url).toEqual(worldMapURL);
        measureService.events.on({'processCompleted': measureCompleted, 'processFailed': measureFailed});
        measureService.processAsync(measureParameters);

        setTimeout(function () {
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
    it('distance_failed0', function (done) {
        var measureService = initMeasureService();
        var point = new SuperMap.Geometry.Point(0, 0);
        var measureParameters = new SuperMap.MeasureParameters(point);
        measureService.events.on({
            'processCompleted': measureCompleted,
            'processFailed': measureFailed
        });
        measureService.processAsync(measureParameters);

        setTimeout(function () {
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
    it('distance_failed1', function (done) {
        var measureService = initMeasureService();
        var points = [new SuperMap.Geometry.Point(0, 0), new SuperMap.Geometry.Point(0, 0)];
        var geometry = new SuperMap.Geometry.LineString(points);
        var measureParameters = new SuperMap.MeasureParameters(geometry);
        measureParameters.unit = "error";
        measureService.events.on({
            'processCompleted': measureCompleted,
            'processFailed': measureFailed
        });
        measureService.processAsync(measureParameters);

        setTimeout(function () {
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
    it('area', function (done) {
        var measureService = initMeasureService_RegisterListener();
        var points = [
            new SuperMap.Geometry.Point(0, 0),
            new SuperMap.Geometry.Point(10, 10),
            new SuperMap.Geometry.Point(10, 0),
            new SuperMap.Geometry.Point(0, 0)
        ];
        var geometry = new SuperMap.Geometry.Polygon(new SuperMap.Geometry.LinearRing(points));
        var measureParameters = new SuperMap.MeasureParameters(geometry);
        measureService.processAsync(measureParameters);

        setTimeout(function () {
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
    it('area_failed0', function (done) {
        var measureService = initMeasureService_RegisterListener();
        var points = [
            new SuperMap.Geometry.Point(0, 0),
            new SuperMap.Geometry.Point(10, 10),
            new SuperMap.Geometry.Point(0, 0)
        ];
        var geometry = new SuperMap.Geometry.Polygon(new SuperMap.Geometry.LinearRing(points));
        var measureParameters = new SuperMap.MeasureParameters(geometry);
        measureService.processAsync(measureParameters);

        setTimeout(function () {
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
    it('area_failed1', function (done) {
        var measureService = initMeasureService_RegisterListener();
        var points = [new SuperMap.Geometry.Point(0, 0), new SuperMap.Geometry.Point(10, 10)];
        var geometry = new SuperMap.Geometry.LineString(points);
        var measureParameters = new SuperMap.MeasureParameters(geometry);
        measureService.processAsync(measureParameters);

        setTimeout(function () {
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
    it('area_failed2', function (done) {
        var measureService = new SuperMap.MeasureService(worldMapURL + "_Error", {measureMode: SuperMap.MeasureMode.AREA});
        var points = [new SuperMap.Geometry.Point(0, 0), new SuperMap.Geometry.Point(10, 10), new SuperMap.Geometry.Point(10, 0)];
        //服务端缺陷,new SuperMap.Geometry.Point(20, 20),new SuperMap.Geometry.Point(0, 0)
        var geometry = new SuperMap.Geometry.Polygon(new SuperMap.Geometry.LinearRing(points));
        var measureParameters = new SuperMap.MeasureParameters(geometry, {unit: SuperMap.Unit.KILOMETER});
        measureService.events.on({'processCompleted': measureCompleted, 'processFailed': measureFailed});
        measureService.processAsync(measureParameters);

        setTimeout(function () {
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


    /*  与iclient8不同，暂时忽略
     //反向测试用例，geometry为空
     it('distance_failed2',function(done){
     var measureService = initMeasureService();
     var geometry = null;
     var measureParameters = new SuperMap.MeasureParameters(geometry);
     measureService.events.on({
     'processCompleted':measureCompleted,
     'processFailed':measureFailed
     });
     measureService.processAsync(measureParameters);

     setTimeout(function() {
     try{
     expect(measureEventArgsSystem).not.toBeNull();
     expect(serviceFailedEventArgsSystem).not.toBeNull();
     measureService.destroy();
     done();
     }catch(exception){
     alert(exception.name + ":" + exception.message);
     measureService.destroy();
     done();
     }
     },1500);
     });

     asyncTest("TestMeasureService_serverGeometry_null",function(){
     var measureService = initMeasureService_RegisterListener();
     //var points = new Array(new SuperMap.Geometry.Point(0, 0),new SuperMap.Geometry.Point(10, 10),new SuperMap.Geometry.Point(10, 0),new SuperMap.Geometry.Point(0, 0));
     //var geometry = new SuperMap.Geometry.Polygon(new SuperMap.Geometry.LinearRing(points));
     var measureParameters = new SuperMap.MeasureParameters();
     measureService.processAsync(measureParameters);

     setTimeout(function() {
     try{
     var measureResult=measureService.lastResult;
     equal(measureResult,null,"measureService.lastResult");
     start();
     }catch(exception){
     ok(false,"exception occcurs,message is:"+exception.message)
     start();
     }
     },1500);
     });
     */
});

