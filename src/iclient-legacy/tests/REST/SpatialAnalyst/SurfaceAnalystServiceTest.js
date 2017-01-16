module("SurfaceAnalystService");

var surfaceAnalystEventArgsSystem = null,
    serviceFailedEventArgsSystem = null;

function surfaceAnalystCompleted(surfaceAnalystEventArgs){
    surfaceAnalystEventArgsSystem = surfaceAnalystEventArgs;
}

function surfaceAnalystFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}
    
function initSurfaceService() {
    var surfaceAnalystService = new SuperMap.REST.SurfaceAnalystService(GlobeParameter.spatialAnalystURL, {eventListeners:{"processCompleted": surfaceAnalystCompleted,'processFailed': surfaceAnalystFailed}});
    return surfaceAnalystService;
}
    
//点数据集提取等值线
asyncTest("SurfaceAnalystService_Dataset_ISOLINE", function() {
    var surfaceAnalystService = initSurfaceService();
    var surfaceAnalystParameters = new SuperMap.REST.SurfaceAnalystParametersSetting({
        datumValue: 70,
        interval: 100,
        resampleTolerance: 0.7,
        smoothMethod: SuperMap.REST.SmoothMethod.BSPLINE,
        smoothness: 3
    });
    var params = new SuperMap.REST.DatasetSurfaceAnalystParameters({
        extractParameter: surfaceAnalystParameters,
        dataset: "SamplesP@Interpolation",
        resolution: 3000,
        zValueFieldName: "AVG_WTR"
    });
        
    ok(surfaceAnalystService != null, "not null");
    equal(surfaceAnalystService.url, GlobeParameter.spatialAnalystURL, "url");
    
    surfaceAnalystService.processAsync(params);
    
    setTimeout(function() {
        try{
            var surfaceAnalystResult = surfaceAnalystService.lastResult;
            ok(surfaceAnalystResult != null, "surfaceAnalystService.lastResult");  
            ok(surfaceAnalystResult.recordset != null, "surfaceAnalystResult.recordset");
            equal(surfaceAnalystResult.succeed, true, "surfaceAnalystResult.succeed");
            ok(surfaceAnalystResult.recordset != null, 
                "surfaceAnalystResult.recordset:" + surfaceAnalystResult.recordset);
                        
            surfaceAnalystParameters.destroy();
            ok(surfaceAnalystParameters.smoothMethod == null, "surfaceAnalystParameters.smoothMethod");
                        
            params.destroy();
            ok(params.extractParameter == null, "params.extractParameter");
                        
            surfaceAnalystService.destroy();
            ok(surfaceAnalystService.EVENT_TYPES == null, "surfaceAnalystService.EVENT_TYPES");
            ok(surfaceAnalystService.events == null, "surfaceAnalystService.events");
            ok(surfaceAnalystService.lastResult == null, "surfaceAnalystService.lastResult");
            ok(surfaceAnalystService.eventListeners == null, "surfaceAnalystService.eventListeners");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 20000);
});

//点数据集提取等值面
asyncTest("SurfaceAnalystService_Dataset_ISOREGION", function() {
    var surfaceAnalystService = initSurfaceService();
    var surfaceAnalystParameters = new SuperMap.REST.SurfaceAnalystParametersSetting({
        datumValue: 70,
        interval: 100,
        resampleTolerance: 0.7,
        smoothMethod: SuperMap.REST.SmoothMethod.BSPLINE,
        smoothness: 3
    });
    
    var params = new SuperMap.REST.DatasetSurfaceAnalystParameters({
        extractParameter: surfaceAnalystParameters,
        dataset: "SamplesP@Interpolation",
        resolution: 3000,
        zValueFieldName: "AVG_WTR",
        surfaceAnalystMethod: SuperMap.REST.SurfaceAnalystMethod.ISOREGION
    });
        
    ok(surfaceAnalystService != null, "not null");
    equal(surfaceAnalystService.url, GlobeParameter.spatialAnalystURL, "url");
    
    surfaceAnalystService.processAsync(params);
    
    setTimeout(function() {
        try{
            var surfaceAnalystResult = surfaceAnalystService.lastResult;
            ok(surfaceAnalystResult != null, "surfaceAnalystService.lastResult");  
            ok(surfaceAnalystResult.recordset != null, "surfaceAnalystResult.recordset");
            equal(surfaceAnalystResult.succeed, true, "surfaceAnalystResult.succeed");
            ok(surfaceAnalystResult.recordset != null, 
                "surfaceAnalystResult.recordset:" + surfaceAnalystResult.recordset);
                        
            surfaceAnalystParameters.destroy();
            ok(surfaceAnalystParameters.smoothMethod == null, "surfaceAnalystParameters.smoothMethod");
                        
            params.destroy();
            ok(params.extractParameter == null, "params.extractParameter");
                        
            surfaceAnalystService.destroy();
            ok(surfaceAnalystService.EVENT_TYPES == null, "surfaceAnalystService.EVENT_TYPES");
            ok(surfaceAnalystService.events == null, "surfaceAnalystService.events");
            ok(surfaceAnalystService.lastResult == null, "surfaceAnalystService.lastResult");
            ok(surfaceAnalystService.eventListeners == null, "surfaceAnalystService.eventListeners");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 20000);
});

//对象提取等值线
asyncTest("SurfaceAnalystService_Geometry_ISOLINE", function() {
    var surfaceAnalystService = initSurfaceService();
    var surfaceAnalystParameters = new SuperMap.REST.SurfaceAnalystParametersSetting({
        datumValue: -3,
        interval: 0.5,
        resampleTolerance: 0.7,
        smoothMethod: SuperMap.REST.SmoothMethod.BSPLINE,
        smoothness: 3
    });
    
    var params = new SuperMap.REST.GeometrySurfaceAnalystParameters({
        extractParameter: surfaceAnalystParameters,
        points: [new SuperMap.Geometry.Point(-4000, 1000),
                 new SuperMap.Geometry.Point(-4500, 2000),
                 new SuperMap.Geometry.Point(-3000, 3000),
                 new SuperMap.Geometry.Point(-3000, 2000),
                 new SuperMap.Geometry.Point(-2500, 2500),
                 new SuperMap.Geometry.Point(-2000, 2000),
                 new SuperMap.Geometry.Point(-2000, 3000),
                 new SuperMap.Geometry.Point(-1000, 1000),
                 new SuperMap.Geometry.Point(1000, 4000),
                 new SuperMap.Geometry.Point(0, 0)
        ],
        resolution: 3000,
        zValues: [-3, -2, 0, -1, -3, 0, 1, 0, 1, 1,],
        surfaceAnalystMethod: SuperMap.REST.SurfaceAnalystMethod.ISOLINE,
        resultSetting: new SuperMap.REST.DataReturnOption({
            expectCount: 100,        
        })
    });
        
    ok(surfaceAnalystService != null, "not null");
    equal(surfaceAnalystService.url, GlobeParameter.spatialAnalystURL, "url");
    
    surfaceAnalystService.processAsync(params);
    
    setTimeout(function() {
        try{
            var surfaceAnalystResult = surfaceAnalystService.lastResult;
            ok(surfaceAnalystResult != null, "surfaceAnalystService.lastResult");  
            ok(surfaceAnalystResult.recordset != null, "surfaceAnalystResult.recordset");
            equal(surfaceAnalystResult.succeed, true, "surfaceAnalystResult.succeed");
            ok(surfaceAnalystResult.recordset != null, 
                "surfaceAnalystResult.recordset:" + surfaceAnalystResult.recordset);
            
            surfaceAnalystParameters.destroy();
            ok(surfaceAnalystParameters.smoothMethod == null, "surfaceAnalystParameters.smoothMethod");
                        
            params.destroy();
            ok(params.extractParameter == null, "params.extractParameter");
                        
            surfaceAnalystService.destroy();
            ok(surfaceAnalystService.EVENT_TYPES == null, "surfaceAnalystService.EVENT_TYPES");
            ok(surfaceAnalystService.events == null, "surfaceAnalystService.events");
            ok(surfaceAnalystService.lastResult == null, "surfaceAnalystService.lastResult");
            ok(surfaceAnalystService.eventListeners == null, "surfaceAnalystService.eventListeners");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 10000);
});

//对象提取等值面
asyncTest("SurfaceAnalystService_Geometry_ISOREGION", function() {
    var surfaceAnalystService = initSurfaceService();
    var surfaceAnalystParameters = new SuperMap.REST.SurfaceAnalystParametersSetting({
        datumValue: -3,
        interval: 0.5,
        resampleTolerance: 0.7,
        smoothMethod: SuperMap.REST.SmoothMethod.BSPLINE,
        smoothness: 3
    });
    
    var params = new SuperMap.REST.GeometrySurfaceAnalystParameters({
        extractParameter: surfaceAnalystParameters,
        points: [new SuperMap.Geometry.Point(-4000, 1000),
                 new SuperMap.Geometry.Point(-4500, 2000),
                 new SuperMap.Geometry.Point(-3000, 3000),
                 new SuperMap.Geometry.Point(-3000, 2000),
                 new SuperMap.Geometry.Point(-2500, 2500),
                 new SuperMap.Geometry.Point(-2000, 2000),
                 new SuperMap.Geometry.Point(-2000, 3000),
                 new SuperMap.Geometry.Point(-1000, 1000),
                 new SuperMap.Geometry.Point(1000, 4000),
                 new SuperMap.Geometry.Point(0, 0)
        ],
        resolution: 3000,
        zValues: [-3, 0, 10, 20, 13, 8, 5, 20, 10, 15],
        surfaceAnalystMethod: SuperMap.REST.SurfaceAnalystMethod.ISOREGION,
        resultSetting: new SuperMap.REST.DataReturnOption({
            expectCount: 100,        
        })
    });
        
    ok(surfaceAnalystService != null, "not null");
    equal(surfaceAnalystService.url, GlobeParameter.spatialAnalystURL, "url");
    
    surfaceAnalystService.processAsync(params);
    
    setTimeout(function() {
        try{
            var surfaceAnalystResult = surfaceAnalystService.lastResult;
            ok(surfaceAnalystResult != null, "surfaceAnalystService.lastResult");  
            ok(surfaceAnalystResult.recordset != null, "surfaceAnalystResult.recordset");
            equal(surfaceAnalystResult.succeed, true, "surfaceAnalystResult.succeed");
            ok(surfaceAnalystResult.recordset != null, 
                "surfaceAnalystResult.recordset:" + surfaceAnalystResult.recordset);
           
            surfaceAnalystParameters.destroy();
            ok(surfaceAnalystParameters.smoothMethod == null, "surfaceAnalystParameters.smoothMethod");
                        
            params.destroy();
            ok(params.extractParameter == null, "params.extractParameter");
                        
            surfaceAnalystService.destroy();
            ok(surfaceAnalystService.EVENT_TYPES == null, "surfaceAnalystService.EVENT_TYPES");
            ok(surfaceAnalystService.events == null, "surfaceAnalystService.events");
            ok(surfaceAnalystService.lastResult == null, "surfaceAnalystService.lastResult");
            ok(surfaceAnalystService.eventListeners == null, "surfaceAnalystService.eventListeners");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 10000);
});

asyncTest("SurfaceAnalystService_parameter_null", function() {
    var surfaceAnalystService = initSurfaceService();
    ok(surfaceAnalystService != null, "not null");
    equal(surfaceAnalystService.url, GlobeParameter.spatialAnalystURL, "url");
    
    surfaceAnalystService.processAsync();
    
    setTimeout(function() {
        try{
            var surfaceAnalystResult = surfaceAnalystService.lastResult;
            ok(surfaceAnalystResult == null, "surfaceAnalystService.lastResult");  
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 20000);
});

asyncTest("SurfaceAnalystService_fail", function() {
    var surfaceAnalystService = initSurfaceService();
    var surfaceAnalystParameters = new SuperMap.REST.SurfaceAnalystParametersSetting({
        datumValue: 70,
        interval: 100,
        resampleTolerance: 0.7,
        smoothMethod: SuperMap.REST.SmoothMethod.BSPLINE,
        smoothness: 3
    });
    
    var params = new SuperMap.REST.DatasetSurfaceAnalystParameters({
        extractParameter: surfaceAnalystParameters,
        dataset: "SamplesP1@Interpolation",
        resolution: 3000,
        zValueFieldName: "AVG_WTR"
    });
        
    ok(surfaceAnalystService != null, "not null");
    equal(surfaceAnalystService.url, GlobeParameter.spatialAnalystURL, "url");
    
    surfaceAnalystService.processAsync(params);
    
    setTimeout(function() {
        try{
            var surfaceAnalyResult = surfaceAnalystService.lastResult;
            equal(serviceFailedEventArgsSystem.error.errorMsg,"数据集SamplesP1@Interpolation不存在","serviceFailedEventArgsSystem.error.errorMsg");
            ok(surfaceAnalyResult == null, "surfaceAnalyResult.lastResult");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 20000);
});


