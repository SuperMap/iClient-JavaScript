require('../../../src/common/iServer/SurfaceAnalystService');

var surfaceAnalystEventArgsSystem = null,
    serviceFailedEventArgsSystem = null;

function surfaceAnalystCompleted(surfaceAnalystEventArgs) {
    surfaceAnalystEventArgsSystem = surfaceAnalystEventArgs;
}
function surfaceAnalystFailed(serviceFailedEventArgs) {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}
var spatialAnalystURL = GlobeParameter.spatialAnalystURL;
function initSurfaceService() {
    return new SuperMap.SurfaceAnalystService(spatialAnalystURL, {
        eventListeners: {
            "processCompleted": surfaceAnalystCompleted,
            'processFailed': surfaceAnalystFailed
        }
    });
}

describe('testSurfaceAnalystService_processAsync', function () {
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        //   surfaceAnalystEventArgsSystem = null;
        //   serviceFailedEventArgsSystem = null;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    /* 等值线LinearRing待开发添加到GeoJason后再测试
     //点数据集提取等值线
     it('Dataset_ISOLINE',function(done){
     var surfaceAnalystService = initSurfaceService();
     var surfaceAnalystParameters = new SuperMap.SurfaceAnalystParametersSetting({
     datumValue: 70,
     interval: 100,
     resampleTolerance: 0.7,
     smoothMethod: SuperMap.SmoothMethod.BSPLINE,
     smoothness: 3
     });
     var params = new SuperMap.DatasetSurfaceAnalystParameters({
     extractParameter: surfaceAnalystParameters,
     dataset: "SamplesP@Interpolation",
     resolution: 3000,
     zValueFieldName: "AVG_WTR"
     });

     expect(surfaceAnalystService).not.toBeNull();
     expect(surfaceAnalystService.url).toEqual(spatialAnalystURL);
     surfaceAnalystService.processAsync(params);

     setTimeout(function() {
     try{
     var surfaceAnalystResult = surfaceAnalystEventArgsSystem.result;
     expect(surfaceAnalystResult).not.toBeNull();

     /!*  ok(surfaceAnalystResult.recordset != null, "surfaceAnalystResult.recordset");
     equal(surfaceAnalystResult.succeed, true, "surfaceAnalystResult.succeed");
     ok(surfaceAnalystResult.recordset != null,
     "surfaceAnalystResult.recordset:" + surfaceAnalystResult.recordset);*!/

     surfaceAnalystService.destroy();
     expect(surfaceAnalystService.EVENT_TYPES == null).toBeTruthy();
     expect(surfaceAnalystService.events == null).toBeTruthy();
     expect(surfaceAnalystService.lastResult == null).toBeTruthy();
     expect(surfaceAnalystService.eventListeners == null).toBeTruthy();
     done();
     } catch (exception) {
     expect(false).toBeTruthy();
     console.log("SurfaceAnalystService" + exception.name + ":" + exception.message);
     surfaceAnalystService.destroy();
     done();
     }
     }, 2000);
     });*/

    //点数据集提取等值面
    it('Dataset_ISOREGION', function (done) {
        var surfaceAnalystService = initSurfaceService();
        var surfaceAnalystParameters = new SuperMap.SurfaceAnalystParametersSetting({
            datumValue: 70,
            interval: 100,
            resampleTolerance: 0.7,
            smoothMethod: SuperMap.SmoothMethod.BSPLINE,
            smoothness: 3
        });

        var params = new SuperMap.DatasetSurfaceAnalystParameters({
            extractParameter: surfaceAnalystParameters,
            dataset: "SamplesP@Interpolation",
            resolution: 3000,
            zValueFieldName: "AVG_WTR",
            surfaceAnalystMethod: SuperMap.SurfaceAnalystMethod.ISOREGION
        });
        surfaceAnalystService.processAsync(params);

        setTimeout(function () {
            try {
                var surfaceAnalystResult = surfaceAnalystEventArgsSystem.result.recordset.features;
                expect(surfaceAnalystResult).not.toBeNull();
                expect(surfaceAnalystResult.features).not.toBeNull();
                expect(surfaceAnalystResult.type).toBe("FeatureCollection");
                surfaceAnalystService.destroy();
                params.destroy();
                done();
            } catch (exception) {
                console.log("SurfaceAnalystService" + exception.name + ":" + exception.message);
                surfaceAnalystService.destroy();
                params.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 10000);
    });

    //对象提取等值线
    it('Geometry_ISOLINE', function (done) {
        var surfaceAnalystService = initSurfaceService();
        var surfaceAnalystParameters = new SuperMap.SurfaceAnalystParametersSetting({
            datumValue: -3,
            interval: 0.5,
            resampleTolerance: 0.7,
            smoothMethod: SuperMap.SmoothMethod.BSPLINE,
            smoothness: 3
        });

        var params = new SuperMap.GeometrySurfaceAnalystParameters({
            extractParameter: surfaceAnalystParameters,
            points: [new SuperMap.Geometry.Point(-4000, 2000),
                new SuperMap.Geometry.Point(-4500, 2000),
                new SuperMap.Geometry.Point(-3000, 3000),
                new SuperMap.Geometry.Point(-3000, 2000),
                new SuperMap.Geometry.Point(-2500, 2500),
                new SuperMap.Geometry.Point(-2000, 2000),
                new SuperMap.Geometry.Point(-2000, 3000),
                new SuperMap.Geometry.Point(-2000, 2000),
                new SuperMap.Geometry.Point(2000, 4000),
                new SuperMap.Geometry.Point(0, 0)
            ],
            resolution: 3000,
            zValues: [-3, -2, 0, -1, -3, 0, 1, 0, 1, 1,],
            surfaceAnalystMethod: SuperMap.SurfaceAnalystMethod.ISOLINE,
            resultSetting: new SuperMap.DataReturnOption({
                expectCount: 100
            })
        });
        surfaceAnalystService.processAsync(params);

        setTimeout(function () {
            try {
                var surfaceAnalystResult = surfaceAnalystEventArgsSystem.result.recordset.features;
                expect(surfaceAnalystResult).not.toBeNull();
                expect(surfaceAnalystResult.features).not.toBeNull();
                expect(surfaceAnalystResult.type).toBe("FeatureCollection");
                surfaceAnalystService.destroy();
                params.destroy();
                done();
            } catch (exception) {
                console.log("SurfaceAnalystService" + exception.name + ":" + exception.message);
                surfaceAnalystService.destroy();
                params.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 10000);
    });

    //对象提取等值面
    it('Geometry_ISOREGION', function (done) {
        var surfaceAnalystService = initSurfaceService();
        var surfaceAnalystParameters = new SuperMap.SurfaceAnalystParametersSetting({
            datumValue: -3,
            interval: 0.5,
            resampleTolerance: 0.7,
            smoothMethod: SuperMap.SmoothMethod.BSPLINE,
            smoothness: 3
        });

        var params = new SuperMap.GeometrySurfaceAnalystParameters({
            extractParameter: surfaceAnalystParameters,
            points: [new SuperMap.Geometry.Point(-4000, 2000),
                new SuperMap.Geometry.Point(-4500, 2000),
                new SuperMap.Geometry.Point(-3000, 3000),
                new SuperMap.Geometry.Point(-3000, 2000),
                new SuperMap.Geometry.Point(-2500, 2500),
                new SuperMap.Geometry.Point(-2000, 2000),
                new SuperMap.Geometry.Point(-2000, 3000),
                new SuperMap.Geometry.Point(-2000, 2000),
                new SuperMap.Geometry.Point(2000, 4000),
                new SuperMap.Geometry.Point(0, 0)
            ],
            resolution: 3000,
            zValues: [-3, 0, 10, 20, 13, 8, 5, 20, 10, 15],
            surfaceAnalystMethod: SuperMap.SurfaceAnalystMethod.ISOREGION,
            resultSetting: new SuperMap.DataReturnOption({
                expectCount: 100
            })
        });
        surfaceAnalystService.processAsync(params);

        setTimeout(function () {
            try {
                var surfaceAnalystResult = surfaceAnalystEventArgsSystem.result.recordset.features;
                expect(surfaceAnalystResult).not.toBeNull();
                expect(surfaceAnalystResult.features).not.toBeNull();
                expect(surfaceAnalystResult.type).toBe("FeatureCollection");
                surfaceAnalystService.destroy();
                params.destroy();
                done();
            } catch (exception) {
                console.log("SurfaceAnalystService" + exception.name + ":" + exception.message);
                surfaceAnalystService.destroy();
                params.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 10000);
    });

    /*  暂时没法测
     //参数为空
     it('parameter_null',function(done){
     var surfaceAnalystService = initSurfaceService();
     surfaceAnalystService.processAsync();

     setTimeout(function() {
     try{
     ok(surfaceAnalystResult == null, "surfaceAnalystService.lastResult");
     done();
     } catch (exception) {
     expect(false).toBeTruthy();
     console.log("SurfaceAnalystService" + exception.name + ":" + exception.message);
     surfaceAnalystService.destroy();
     done();
     }
     }, 2000);
     });*/

    //失败
    it('fail', function (done) {
        var surfaceAnalystService = initSurfaceService();
        var surfaceAnalystParameters = new SuperMap.SurfaceAnalystParametersSetting({
            datumValue: 70,
            interval: 100,
            resampleTolerance: 0.7,
            smoothMethod: SuperMap.SmoothMethod.BSPLINE,
            smoothness: 3
        });
        var params = new SuperMap.DatasetSurfaceAnalystParameters({
            extractParameter: surfaceAnalystParameters,
            dataset: "SamplesP1@Interpolation",
            resolution: 3000,
            zValueFieldName: "AVG_WTR"
        });
        surfaceAnalystService.processAsync(params);

        setTimeout(function () {
            try {
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.errorMsg).toContain("数据集SamplesP1@Interpolation不存在");
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                surfaceAnalystService.destroy();
                params.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("SurfaceAnalystService" + exception.name + ":" + exception.message);
                surfaceAnalystService.destroy();
                params.destroy();
                done();
            }
        }, 2000);
    })
});


