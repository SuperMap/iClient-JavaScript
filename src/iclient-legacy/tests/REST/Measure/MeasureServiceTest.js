module("MeasureService");

var measureEventArgsSystem = null;
var serviceFailedEventArgsSystem = null;
var worldMapURL = GlobeParameter.mapServiceURL + "World Map";

//跨域下的测试
function initMeasureService() {
    measureEventArgsSystem = null;
    serviceFailedEventArgsSystem = null;
    var measureService = new SuperMap.REST.MeasureService(worldMapURL);
    return measureService;
}

//注册监听器对象，面积量算
function initMeasureService_RegisterListener() {
    measureEventArgsSystem = null;
    serviceFailedEventArgsSystem = null;
    var measureService = new SuperMap.REST.MeasureService(worldMapURL, {
        eventListeners:{'processCompleted':measureCompleted,'processFailed':measureFailed},
        measureMode:SuperMap.REST.MeasureMode.AREA
    });
    return measureService;
}

function measureCompleted(measureEventArgs){
    measureEventArgsSystem = measureEventArgs;
}

function measureFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}

asyncTest("TestMeasureService_distance",function(){
    var measureService = initMeasureService();
    var points = new Array(new SuperMap.Geometry.Point(0, 0),new SuperMap.Geometry.Point(10, 10));
    var geometry = new SuperMap.Geometry.LineString(points);
    var measureParameters = new SuperMap.REST.MeasureParameters(geometry);
    ok(measureService!=null,"not null");
    equal(measureService.url,worldMapURL, "measureService.url");
    measureService.events.on({'processCompleted':measureCompleted,'processFailed':measureFailed});
    measureService.processAsync(measureParameters);
    
    setTimeout(function() {
        try{
            var measureResult=measureService.lastResult;
            ok(measureResult!=null,"measureService.lastResult"); 
            equal(measureResult.area,-1,"measureResult.area");
            //equal(measureResult.distance,1570277.6641936298,"measureResult.distance");
            equal(measureResult.unit,"METER","measureResult.unit");
            ok(measureEventArgsSystem != null,"measureEventArgsSystem");
            ok(measureEventArgsSystem.result != null,"measureEventArgsSystem.result");
            deepEqual(measureEventArgsSystem.result,measureResult,"measureEventArgsSystem.result");
            ok(measureEventArgsSystem.originResult != null,"measureEventArgsSystem.originResult");
            equal(measureEventArgsSystem.originResult.area,-1,"measureEventArgsSystem.originResult.area");
            //equal(measureEventArgsSystem.originResult.distance,1570277.6641936298,"measureEventArgsSystem.originResult.distance");
            equal(measureEventArgsSystem.originResult.unit,"METER","measureEventArgsSystem.originResult.unit");
            measureEventArgsSystem.destroy();
            ok(measureEventArgsSystem.result == null,"measureEventArgsSystem.result");
            ok(measureEventArgsSystem.originResult == null,"measureEventArgsSystem.originResult");
            measureParameters.destroy();
            ok(measureService.geometry==null,"measureService.geometry");
            ok(measureService.unit==null,"measureService.unit");
            measureService.destroy();
            ok(measureService.url==null,"measureService.url");
            ok(measureService.isInTheSameDomain==null,"measureService.isInTheSameDomain");
            ok(measureService.EVENT_TYPES==null,"measureService.EVENT_TYPES");
            ok(measureService.events==null,"measureService.events");
            ok(measureService.eventListeners==null,"measureService.eventListeners");
            ok(measureService.lastResult==null,"measureService.lastResult");
            ok(measureService.measureMode==null,"measureService.measureMode");
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
        }
    },8000);
});

//反向测试用例，输入点进行距离量算
asyncTest("TestMeasureService_distance_failed0",function(){
    var measureService = initMeasureService();
    var point = new SuperMap.Geometry.Point(0, 0);
    var measureParameters = new SuperMap.REST.MeasureParameters(point);
    ok(measureService!=null,"not null");
    equal(measureService.url,worldMapURL, "measureService.url");
    measureService.events.on({'processCompleted':measureCompleted,'processFailed':measureFailed});
    measureService.processAsync(measureParameters);
    
    setTimeout(function() {
        try{
            var measureResult=measureService.lastResult;
            ok(measureResult==null,"measureService.lastResult");
            ok(serviceFailedEventArgsSystem != null,"serviceFailedEventArgsSystem");
            ok(serviceFailedEventArgsSystem.error != null,"serviceFailedEventArgsSystem.error");
            equal(serviceFailedEventArgsSystem.error.code,400,"serviceFailedEventArgsSystem.error.code");
            equal(serviceFailedEventArgsSystem.error.errorMsg,"参数 point2Ds 不合法，必须至少包含两个二维点","serviceFailedEventArgsSystem.error.errorMsg");
            
            ok(serviceFailedEventArgsSystem.originResult != null,"serviceFailedEventArgsSystem.originResult");
            ok(serviceFailedEventArgsSystem.originResult.error != null,"serviceFailedEventArgsSystem.originResult.error");
            equal(serviceFailedEventArgsSystem.originResult.error.code,400,"serviceFailedEventArgsSystem.originResult.error.code");
            equal(serviceFailedEventArgsSystem.originResult.error.errorMsg,"参数 point2Ds 不合法，必须至少包含两个二维点","serviceFailedEventArgsSystem.originResult.error.errorMsg");
            
            serviceFailedEventArgsSystem.destroy();
            ok(serviceFailedEventArgsSystem.error == null,"serviceFailedEventArgsSystem.error");
            ok(serviceFailedEventArgsSystem.originResult == null,"serviceFailedEventArgsSystem.originResult");
            measureParameters.destroy();
            ok(measureService.geometry==null,"measureService.geometry");
            ok(measureService.unit==null,"measureService.unit");
            measureService.destroy();
            ok(measureService.url==null,"measureService.url");
            ok(measureService.isInTheSameDomain==null,"measureService.isInTheSameDomain");
            ok(measureService.EVENT_TYPES==null,"measureService.EVENT_TYPES");
            ok(measureService.events==null,"measureService.events");
            ok(measureService.eventListeners==null,"measureService.eventListeners");
            ok(measureService.lastResult==null,"measureService.lastResult");
            ok(measureService.measureMode==null,"measureService.measureMode");
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
        }
    },8000);
});

//反向测试用例，输入距离单位枚举值错误
asyncTest("TestMeasureService_distance_failed1",function(){
    var measureService = initMeasureService();
    var points = new Array(new SuperMap.Geometry.Point(0, 0),new SuperMap.Geometry.Point(0, 0));
    var geometry = new SuperMap.Geometry.LineString(points);
    var measureParameters = new SuperMap.REST.MeasureParameters(geometry);
    measureParameters.unit="error";
    ok(measureService!=null,"not null");
    equal(measureService.url,worldMapURL, "measureService.url");
    measureService.events.on({'processCompleted':measureCompleted,'processFailed':measureFailed});
    measureService.processAsync(measureParameters);
    
    setTimeout(function() {
        try{
            var measureResult=measureService.lastResult;
            ok(measureResult==null,"measureService.lastResult");
            ok(serviceFailedEventArgsSystem != null,"serviceFailedEventArgsSystem");
            ok(serviceFailedEventArgsSystem.error != null,"serviceFailedEventArgsSystem.error");
            equal(serviceFailedEventArgsSystem.error.code,400,"serviceFailedEventArgsSystem.error.code");
            equal(serviceFailedEventArgsSystem.error.errorMsg,"No enum constant com.supermap.services.components.commontypes.Unit.error","serviceFailedEventArgsSystem.error.errorMsg");
            
            ok(serviceFailedEventArgsSystem.originResult != null,"serviceFailedEventArgsSystem.originResult");
            ok(serviceFailedEventArgsSystem.originResult.error != null,"serviceFailedEventArgsSystem.originResult.error");
            equal(serviceFailedEventArgsSystem.originResult.error.code,400,"serviceFailedEventArgsSystem.originResult.error.code");
            equal(serviceFailedEventArgsSystem.originResult.error.errorMsg,"No enum constant com.supermap.services.components.commontypes.Unit.error","serviceFailedEventArgsSystem.originResult.error.errorMsg");
            
            serviceFailedEventArgsSystem.destroy();
            ok(serviceFailedEventArgsSystem.error == null,"serviceFailedEventArgsSystem.error");
            ok(serviceFailedEventArgsSystem.originResult == null,"serviceFailedEventArgsSystem.originResult");
            measureService.destroy();
            ok(measureService.url==null,"measureService.url");
            ok(measureService.isInTheSameDomain==null,"measureService.isInTheSameDomain");
            ok(measureService.EVENT_TYPES==null,"measureService.EVENT_TYPES");
            ok(measureService.events==null,"measureService.events");
            ok(measureService.eventListeners==null,"measureService.eventListeners");
            ok(measureService.lastResult==null,"measureService.lastResult");
            ok(measureService.measureMode==null,"measureService.measureMode");
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
        }
    },8000);
});


//反向测试用例，geometry为空
asyncTest("TestMeasureService_distance_failed2",function(){
    var measureService = initMeasureService();
    var geometry = null;
    var measureParameters = new SuperMap.REST.MeasureParameters(geometry);
    ok(measureService!=null,"not null");
    equal(measureService.url,worldMapURL, "measureService.url");
    measureService.events.on({'processCompleted':measureCompleted,'processFailed':measureFailed});
    measureService.processAsync(measureParameters);
    
    setTimeout(function() {
        try{
            var measureResult=measureService.lastResult;
            ok(measureResult==null,"measureService.lastResult");
            ok(serviceFailedEventArgsSystem==null,"serviceFailedEventArgsSystem");
            ok(measureEventArgsSystem==null,"measureEventArgsSystem");
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
        }
    },8000);
});

            
asyncTest("TestMeasureService_area",function(){
    var measureService = initMeasureService_RegisterListener();
    var points = new Array(new SuperMap.Geometry.Point(0, 0),new SuperMap.Geometry.Point(10, 10),new SuperMap.Geometry.Point(10, 0),new SuperMap.Geometry.Point(0, 0));
    var geometry = new SuperMap.Geometry.Polygon(new SuperMap.Geometry.LinearRing(points));
    var measureParameters = new SuperMap.REST.MeasureParameters(geometry);
    ok(measureService!=null,"not null");
    equal(measureService.url,worldMapURL, "measureService.url");
    measureService.processAsync(measureParameters);
    
    setTimeout(function() {
        try{
            var measureResult=measureService.lastResult;
            ok(measureResult!=null,"measureService.lastResult"); 
            equal(measureResult.area,	617049216619.1235,"measureResult.area");
            equal(measureResult.distance,-1,"measureResult.distance");
            equal(measureResult.unit,"METER","measureResult.unit");
            ok(measureEventArgsSystem != null,"measureEventArgsSystem");
            ok(measureEventArgsSystem.result != null,"measureEventArgsSystem.result");
            deepEqual(measureEventArgsSystem.result,measureResult,"measureEventArgsSystem.result");
            ok(measureEventArgsSystem.originResult != null,"measureEventArgsSystem.originResult");
            equal(measureEventArgsSystem.originResult.area,	617049216619.1235,"measureEventArgsSystem.originResult.area");
            equal(measureEventArgsSystem.originResult.distance,-1,"measureEventArgsSystem.originResult.distance");
            equal(measureEventArgsSystem.originResult.unit,"METER","measureEventArgsSystem.originResult.unit");
            measureEventArgsSystem.destroy();
            ok(measureEventArgsSystem.result == null,"measureEventArgsSystem.result");
            ok(measureEventArgsSystem.originResult == null,"measureEventArgsSystem.originResult");
            measureParameters.destroy();
            ok(measureService.geometry==null,"measureService.geometry");
            ok(measureService.unit==null,"measureService.unit");
            measureService.destroy();
            ok(measureService.url==null,"measureService.url");
            ok(measureService.isInTheSameDomain==null,"measureService.isInTheSameDomain");
            ok(measureService.EVENT_TYPES==null,"measureService.EVENT_TYPES");
            ok(measureService.events==null,"measureService.events");
            ok(measureService.eventListeners==null,"measureService.eventListeners");
            ok(measureService.lastResult==null,"measureService.lastResult");
            ok(measureService.measureMode==null,"measureService.measureMode");
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
        }
    },8000);
});

//反向测试用例，传入的点无法构成面
asyncTest("TestMeasureService_area_failed0",function(){
    var measureService = initMeasureService_RegisterListener();
    var points = new Array(new SuperMap.Geometry.Point(0, 0),new SuperMap.Geometry.Point(10, 10),new SuperMap.Geometry.Point(0, 0));
    var geometry = new SuperMap.Geometry.Polygon(new SuperMap.Geometry.LinearRing(points));
    var measureParameters = new SuperMap.REST.MeasureParameters(geometry);
    ok(measureService!=null,"not null");
    equal(measureService.url,worldMapURL, "measureService.url");
    measureService.processAsync(measureParameters);
    
    setTimeout(function() {
        try{
            var measureResult=measureService.lastResult;
            ok(measureResult!=null,"measureService.lastResult"); 
            equal(measureResult.area,0,"measureResult.area");
            equal(measureResult.distance,-1,"measureResult.distance");
            equal(measureResult.unit,"METER","measureResult.unit");
            ok(measureEventArgsSystem != null,"measureEventArgsSystem");
            ok(measureEventArgsSystem.result != null,"measureEventArgsSystem.result");
            deepEqual(measureEventArgsSystem.result,measureResult,"measureEventArgsSystem.result");
            ok(measureEventArgsSystem.originResult != null,"measureEventArgsSystem.originResult");
            equal(measureEventArgsSystem.originResult.area,0,"measureEventArgsSystem.originResult.area");
            equal(measureEventArgsSystem.originResult.distance,-1,"measureEventArgsSystem.originResult.distance");
            equal(measureEventArgsSystem.originResult.unit,"METER","measureEventArgsSystem.originResult.unit");
            measureEventArgsSystem.destroy();
            ok(measureEventArgsSystem.result == null,"measureEventArgsSystem.result");
            ok(measureEventArgsSystem.originResult == null,"measureEventArgsSystem.originResult");
            measureService.destroy();
            ok(measureService.url==null,"measureService.url");
            ok(measureService.isInTheSameDomain==null,"measureService.isInTheSameDomain");
            ok(measureService.EVENT_TYPES==null,"measureService.EVENT_TYPES");
            ok(measureService.events==null,"measureService.events");
            ok(measureService.eventListeners==null,"measureService.eventListeners");
            ok(measureService.lastResult==null,"measureService.lastResult");
            ok(measureService.measureMode==null,"measureService.measureMode");
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
        }
    },8000);
});

//反向测试用例，传入线进行面积量算
asyncTest("TestMeasureService_area_failed1",function(){
    var measureService = initMeasureService_RegisterListener();
    var points = new Array(new SuperMap.Geometry.Point(0, 0),new SuperMap.Geometry.Point(10, 10));
    var geometry = new SuperMap.Geometry.LineString(points);
    var measureParameters = new SuperMap.REST.MeasureParameters(geometry);
    ok(measureService!=null,"not null");
    equal(measureService.url,worldMapURL, "measureService.url");
    measureService.processAsync(measureParameters);
    
    setTimeout(function() {
        try{
            var measureResult=measureService.lastResult;
            ok(measureResult==null,"measureService.lastResult");
            ok(serviceFailedEventArgsSystem != null,"serviceFailedEventArgsSystem");
            ok(serviceFailedEventArgsSystem.error != null,"serviceFailedEventArgsSystem.error");
            equal(serviceFailedEventArgsSystem.error.code,400,"serviceFailedEventArgsSystem.error.code");
            equal(serviceFailedEventArgsSystem.error.errorMsg,"传入参数 points 的长度小于3。","serviceFailedEventArgsSystem.error.errorMsg");
            
            ok(serviceFailedEventArgsSystem.originResult != null,"serviceFailedEventArgsSystem.originResult");
            ok(serviceFailedEventArgsSystem.originResult.error != null,"serviceFailedEventArgsSystem.originResult.error");
            equal(serviceFailedEventArgsSystem.originResult.error.code,400,"serviceFailedEventArgsSystem.originResult.error.code");
            equal(serviceFailedEventArgsSystem.originResult.error.errorMsg,"传入参数 points 的长度小于3。","serviceFailedEventArgsSystem.originResult.error.errorMsg");
            
            serviceFailedEventArgsSystem.destroy();
            ok(serviceFailedEventArgsSystem.error == null,"serviceFailedEventArgsSystem.error");
            ok(serviceFailedEventArgsSystem.originResult == null,"serviceFailedEventArgsSystem.originResult");
            measureService.destroy();
            ok(measureService.url==null,"measureService.url");
            ok(measureService.isInTheSameDomain==null,"measureService.isInTheSameDomain");
            ok(measureService.EVENT_TYPES==null,"measureService.EVENT_TYPES");
            ok(measureService.events==null,"measureService.events");
            ok(measureService.eventListeners==null,"measureService.eventListeners");
            ok(measureService.lastResult==null,"measureService.lastResult");
            ok(measureService.measureMode==null,"measureService.measureMode");
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
        }
    },8000);
});

//反向测试用例，地图名错误，无法调用回调函数
asyncTest("TestMeasureService_area_failed2",function(){
    var measureService = new SuperMap.REST.MeasureService(worldMapURL + "_Error",{measureMode:SuperMap.REST.MeasureMode.AREA});    var points = new Array(new SuperMap.Geometry.Point(0, 0),new SuperMap.Geometry.Point(10, 10),new SuperMap.Geometry.Point(10, 0));//服务端缺陷,new SuperMap.Geometry.Point(20, 20),new SuperMap.Geometry.Point(0, 0)
    var geometry = new SuperMap.Geometry.Polygon(new SuperMap.Geometry.LinearRing(points));
    var measureParameters = new SuperMap.REST.MeasureParameters(geometry,{unit:SuperMap.REST.Unit.KILOMETER});
    ok(measureService!=null,"not null");
    equal(measureService.url,worldMapURL + "_Error", "measureService.url");
    measureService.events.on({'processCompleted':measureCompleted,'processFailed':measureFailed});
    measureService.processAsync(measureParameters);
    
    setTimeout(function() {
        try{
            var measureResult=measureService.lastResult;
            ok(measureResult==null,"measureService.lastResult");
            ok(serviceFailedEventArgsSystem != null,"serviceFailedEventArgsSystem");
            ok(serviceFailedEventArgsSystem.error != null,"serviceFailedEventArgsSystem.error");
            equal(serviceFailedEventArgsSystem.error.code,404,"serviceFailedEventArgsSystem.error.code");
            equal(serviceFailedEventArgsSystem.error.errorMsg,"资源不存在","serviceFailedEventArgsSystem.error.errorMsg");
            
            ok(serviceFailedEventArgsSystem.originResult != null,"serviceFailedEventArgsSystem.originResult");
            ok(serviceFailedEventArgsSystem.originResult.error != null,"serviceFailedEventArgsSystem.originResult.error");
            equal(serviceFailedEventArgsSystem.originResult.error.code,404,"serviceFailedEventArgsSystem.originResult.error.code");
            equal(serviceFailedEventArgsSystem.originResult.error.errorMsg,"资源不存在","serviceFailedEventArgsSystem.originResult.error.errorMsg");
            
            serviceFailedEventArgsSystem.destroy();
            ok(serviceFailedEventArgsSystem.error == null,"serviceFailedEventArgsSystem.error");
            ok(serviceFailedEventArgsSystem.originResult == null,"serviceFailedEventArgsSystem.originResult");
            measureService.destroy();
            ok(measureService.url==null,"measureService.url");
            ok(measureService.isInTheSameDomain==null,"measureService.isInTheSameDomain");
            ok(measureService.EVENT_TYPES==null,"measureService.EVENT_TYPES");
            ok(measureService.events==null,"measureService.events");
            ok(measureService.eventListeners==null,"measureService.eventListeners");
            ok(measureService.lastResult==null,"measureService.lastResult");
            ok(measureService.measureMode==null,"measureService.measureMode");
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
        }
    },8000);
    measureService.processAsync(null);
    ok(measureService.lastResult==null,"measureService.lastResult");
});

test("TestMeasureResult_fromJson_null",function(){
    var obj = SuperMap.REST.MeasureResult.fromJson(null);
    ok(obj == null, "SuperMap.REST.MeasureResult.fromJson(null)");
});

asyncTest("TestMeasureService_serverGeometry_null",function(){
    var measureService = initMeasureService_RegisterListener();
    var points = new Array(new SuperMap.Geometry.Point(0, 0),new SuperMap.Geometry.Point(10, 10),new SuperMap.Geometry.Point(10, 0),new SuperMap.Geometry.Point(0, 0));
    var geometry = new SuperMap.Geometry.Polygon(new SuperMap.Geometry.LinearRing(points));
    var measureParameters = new SuperMap.REST.MeasureParameters();
    ok(measureService!=null,"not null");
    equal(measureService.url,worldMapURL, "measureService.url");
    measureService.processAsync(measureParameters);
    
    setTimeout(function() {
        try{
            var measureResult=measureService.lastResult;
            equal(measureResult,null,"measureService.lastResult"); 
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
        }
    },8000);
});