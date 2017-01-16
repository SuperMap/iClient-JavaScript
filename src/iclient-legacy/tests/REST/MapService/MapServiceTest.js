module("MapService");

var getMapStatusEventArgsSystem=null;
var serviceFailedEventArgsSystem=null;
var worldMapURL = GlobeParameter.mapServiceURL + "世界地图";

function initMapService() {
    getMapStatusEventArgsSystem=null;
    serviceFailedEventArgsSystem=null;
    var getMapService = new SuperMap.REST.MapService(worldMapURL);
    return getMapService;
}

//初始化注册事件监听器的Services
function initMapService_RegisterListener() {
    getMapStatusEventArgsSystem=null;
    serviceFailedEventArgsSystem=null;
    var getMapService = new SuperMap.REST.MapService(worldMapURL,{eventListeners:{'processFailed':GetMapStatusFailed,'processCompleted':GetMapStatusCompleted}});
    return getMapService;
}

function GetMapStatusCompleted(getMapStatusEventArgs){
    getMapStatusEventArgsSystem=getMapStatusEventArgs;
}

function GetMapStatusFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem=serviceFailedEventArgs;
}

test("Constructor_token",function(){
	var getMapService = new SuperMap.REST.MapService(worldMapURL,{token:88888});
	ok(getMapService !== null,"not null");
    ok(getMapService.token == 88888,"token parameter exist");
});
asyncTest("TestMapService_pass",function(){
    var getMapService = initMapService_RegisterListener();
    ok(getMapService!=null,"getMapService");
    equal(getMapService.url,worldMapURL+".jsonp","url");
    getMapService.processAsync();
    //QUnit.stop(3500);
    //stop(3500);
    setTimeout(function() {
        try{
            //获取getMapService.lastResult并判断是否正确
            var getMapStatusResult=getMapService.lastResult;
            ok(getMapStatusResult!=null,"getMapService.lastResult");
            equal(getMapStatusResult.scale,4.6292443017131065e-9,"getMapStatusResult.scale");
            var bounds=new SuperMap.Bounds(-180,-90,180,90);
            ok(boundsEqual(getMapStatusResult.bounds,bounds),"getMapStatusResult.bounds");
            var viewBounds=new SuperMap.Bounds(-65.71902951328249, -65.71902951328249, 65.71902951328249, 65.71902951328249);
            ok(boundsEqual(getMapStatusResult.viewBounds,viewBounds),"getMapStatusResult.viewBounds");
            ok(getMapStatusResult.viewer!=null,"getMapStatusResult.viewer");
            equal(getMapStatusResult.viewer.height,256,"getMapStatusResult.viewer.height");
            equal(getMapStatusResult.viewer.width,256,"getMapStatusResult.viewer.width");
            
            
            ok(getMapStatusEventArgsSystem!=null,"getMapStatusEventArgsSystem");
            ok(getMapStatusEventArgsSystem.originResult!=null,"getMapStatusEventArgsSystem.originResult!=null");
            var getMapStatusResultFromEventArgs=getMapStatusEventArgsSystem.result;
            equal(getMapStatusResultFromEventArgs,getMapStatusResult,"assert equals");
            
            var jsonOjbect = getMapStatusEventArgsSystem.originResult;
            
            getMapStatusResultFromEventArgs.destroy();
            //测试destroy之后是否正确
            getMapStatusResult.destroy();
            ok(getMapStatusResult.scale == null,"getMapStatusResult.scale == null");
            ok(getMapStatusResult.bounds == null,"getMapStatusResult.bounds == null");
            ok(getMapStatusResult.viewBounds == null,"getMapStatusResult.viewBounds == null");
            ok(getMapStatusResult.viewer == null,"getMapStatusResult.viewer == null");
            ok(getMapStatusResult.coordUnit == null,"getMapStatusResult.coordUnit == null");
            ok(getMapStatusResult.datumAxis == null,"getMapStatusResult.datumAxis == null");

            getMapStatusEventArgsSystem.destroy();
            ok(getMapStatusEventArgsSystem.result==null,"getMapStatusEventArgsSystem.result,");
            ok(getMapStatusEventArgsSystem.originResult==null,"getMapStatusEventArgsSystem.originResult");

            getMapService.destroy();
            ok(getMapService.EVENT_TYPES==null,"getMapService.EVENT_TYPES");
            ok(getMapService.events==null,"getMapService.events");
            ok(getMapService.lastResult==null,"getMapService.lastResult");
            ok(getMapService.eventListeners==null,"getMapService.eventListeners");
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
            }
    },3000);
});


asyncTest("TestMapService_fail",function(){
    var getMapService = new SuperMap.REST.MapService(GlobeParameter.mapServiceURL + "MapNameError");
    getMapService.events.on({'processFailed':GetMapStatusFailed});
    getMapService.processAsync();
    setTimeout(function() {
        try{
            ok(serviceFailedEventArgsSystem!=null,"serviceFailedEventArgsSystem");
            ok(serviceFailedEventArgsSystem.error!=null,"serviceFailedEventArgsSystem.error");
            equal(serviceFailedEventArgsSystem.error.code,404,"serviceFailedEventArgsSystem.error.code");
            equal(serviceFailedEventArgsSystem.error.errorMsg,"地图 MapNameError 不存在，获取相应的地图业务组件失败","serviceFailedEventArgsSystem.error.errorMsg");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },3000);
    
    var mapServiceResult = SuperMap.REST.MapServiceResult.fromJson(null);
    ok(mapServiceResult == null,"MapServiceResult.fromJson(null)");
});

 function boundsEqual(jsonObject,bounds,tolerance){
    if(!(jsonObject && bounds)) {
        return false;
    }
    if(tolerance == undefined ){
        tolerance=1.0E-6;
    }
    Math
    if(Math.abs(jsonObject.left - bounds.left) <tolerance  && Math.abs(jsonObject.bottom - bounds.bottom) <tolerance  && Math.abs(jsonObject.right - bounds.right)  <tolerance &&  Math.abs(jsonObject.top - bounds.top) <tolerance ){
        return true;
    }else{
        return false;
    }
};