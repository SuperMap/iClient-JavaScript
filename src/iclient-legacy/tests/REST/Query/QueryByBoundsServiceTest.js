module("QueryByBoundsService");

var serviceFailedEventArgsSystem = null;
var worldMapURL = GlobeParameter.mapServiceURL + "World Map";

function initQueryByBoundsService() {
    queryByBoundsService = new SuperMap.REST.QueryByBoundsService(worldMapURL);
    return queryByBoundsService;
}

//服务初始化时注册事件监听函数
function initQueryByBoundsService_RegisterListener() {
    queryByBoundsService = new SuperMap.REST.QueryByBoundsService(worldMapURL, {eventListeners:{'processFailed':QueryByBoundsFailed}});
    return queryByBoundsService;
}

function QueryByBoundsFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem=serviceFailedEventArgs;
}

asyncTest("TestQueryByBoundsService_pass",function(){
    var queryByBoundsService = initQueryByBoundsService();
    ok(queryByBoundsService!=null,"not null");
    equal(queryByBoundsService.url,worldMapURL + "/queryResults.jsonp?","url");
    var queryByBoundsParameters = new SuperMap.REST.QueryByBoundsParameters({
        customParams:null,
        expectCount:100,
        networkType:SuperMap.REST.GeometryType.POINT,
        queryOption:SuperMap.REST.QueryOption.ATTRIBUTEANDGEOMETRY,
        queryParams:new Array(new SuperMap.REST.FilterParameter({
            attributeFilter:"SmID<21",
            name:"Countries@World",
        })),
        returnContent:true,
        bounds:new SuperMap.Bounds(0,0,100,100)
    });
    
    queryByBoundsParameters.startRecord=0;
    queryByBoundsParameters.holdTime=10;
    returnCustomResult=false;
    
    queryByBoundsService.processAsync(queryByBoundsParameters);
    //QUnit.stop(3500);
    //stop(3500);
    setTimeout(function() {
        try{
            var queryResult=queryByBoundsService.lastResult;
            ok(queryResult!=null,"queryByBoundsService.lastResult");  
            equal(queryResult.totalCount,15,"queryResult.totalCount")
            
            queryByBoundsService.destroy();
            ok(queryByBoundsService.EVENT_TYPES==null,"queryByBoundsService.EVENT_TYPES");
            ok(queryByBoundsService.events==null,"queryByBoundsService.events");
            ok(queryByBoundsService.lastResult==null,"queryByBoundsService.lastResult");
            ok(queryByBoundsService.returnContent==null,"queryByBoundsService.returnContent");

            //var jsonObject = queryResult;
            //queryResultFrom = SuperMap.SuperMap.REST.QueryResult.fromJson(jsonObject);
            //equal(queryResultFrom,queryResult,"SuperMap.SuperMap.REST.QueryResult.fromJson");
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
            }
    },10000);
});

asyncTest("TestQueryByBoundsService_CustomsResult",function(){
    var queryByBoundsService = initQueryByBoundsService();
    ok(queryByBoundsService!=null,"not null");
    equal(queryByBoundsService.url,worldMapURL + "/queryResults.jsonp?","url");
    var queryByBoundsParameters = new SuperMap.REST.QueryByBoundsParameters({
        customParams:null,
        expectCount:100,
        networkType:SuperMap.REST.GeometryType.POINT,
        queryOption:SuperMap.REST.QueryOption.ATTRIBUTEANDGEOMETRY,
        queryParams:new Array(new SuperMap.REST.FilterParameter({
            attributeFilter:"SmID<3",
            name:"Countries@World",
        })),
        returnContent:false,
        bounds:new SuperMap.Bounds(0,0,100,100)
    });
    
    queryByBoundsParameters.startRecord=0;
    queryByBoundsParameters.holdTime=10;
    queryByBoundsParameters.returnCustomResult=true;
    
    queryByBoundsService.processAsync(queryByBoundsParameters);
    //stop(2500);
    //QUnit.stop(2500);
    setTimeout(function() {
        try{
            var queryResult=queryByBoundsService.lastResult;
            ok(queryResult!=null,"queryByBoundsService.lastResult"); 
            ok(queryResult.totalCount==null,"queryResult.totalCount")
            ok(queryResult.resourceInfo!=null,"queryResult.resourceInfo");
            equal(queryResult.resourceInfo.succeed,true,"queryResult.resourceInfo.succeed");
            ok(queryResult.resourceInfo.newResourceLocation!=null,"queryResult.resourceInfo.newResourceLocation:"+queryResult.resourceInfo.newResourceLocation);
            ok(queryResult.resourceInfo.newResourceLocation.length>0,"queryResult.resourceInfo.newResourceLocation.length");
            var customResponse=queryResult.customResponse;
            ok(customResponse!=null,"queryResult.customResponse"); 
            ok(customResponse.getWidth()>0,queryResult.customResponse.getWidth);
            ok(customResponse.getHeight()>0,queryResult.customResponse.getHeight);
            ok(queryResult.resourceInfo!=null,"queryByBoundsService.resourceInfo"); 

            queryByBoundsService.destroy();
            ok(queryByBoundsService.EVENT_TYPES==null,"queryByBoundsService.EVENT_TYPES");
            ok(queryByBoundsService.events==null,"queryByBoundsService.events");
            ok(queryByBoundsService.lastResult==null,"queryByBoundsService.lastResult");
            ok(queryByBoundsService.returnContent==null,"queryByBoundsService.returnContent");
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
        }
    },3000);
});

//查询参数为空
asyncTest("TestQueryByBoundsService_fail",function(){
    var queryByBoundsService = initQueryByBoundsService_RegisterListener();
    ok(queryByBoundsService != null, "not null");
    equal(queryByBoundsService.url, worldMapURL + "/queryResults.jsonp?","url");

    var queryByBoundsParameters = new SuperMap.REST.QueryByBoundsParameters({
        customParams:null,
        expectCount:100,
        networkType:SuperMap.REST.GeometryType.POINT,
        queryOption:SuperMap.REST.QueryOption.ATTRIBUTE,
        queryParams:new Array(),
        bounds:new SuperMap.Bounds(0,0,100,100)
    });
    
    queryByBoundsParameters.startRecord=0;
    queryByBoundsParameters.holdTime=10;
    returnCustomResult=false;
    queryByBoundsService.processAsync(queryByBoundsParameters);
    //QUnit.stop(3500);
    //(3500);
    setTimeout(function() {
        try{
            var queryResult=queryByBoundsService.lastResult;
            ok(queryResult==null,"queryByBoundsService.lastResult"); 
            ok(serviceFailedEventArgsSystem!=null,"serviceFailedEventArgsSystem");
            ok(serviceFailedEventArgsSystem.error!=null,"serviceFailedEventArgsSystem.error");
            equal(serviceFailedEventArgsSystem.error.code,400,"serviceFailedEventArgsSystem.error.code");
            equal(serviceFailedEventArgsSystem.error.errorMsg,"参数 queryParameters 非法，queryParameters.queryParams 不能为空。","serviceFailedEventArgsSystem.error.errorMsg");
            
            queryByBoundsService.destroy();
            ok(queryByBoundsService.EVENT_TYPES==null,"queryByBoundsService.EVENT_TYPES");
            ok(queryByBoundsService.events==null,"queryByBoundsService.events");
            ok(queryByBoundsService.lastResult==null,"queryByBoundsService.lastResult");
            ok(queryByBoundsService.returnContent==null,"queryByBoundsService.returnContent");
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
        }
    },3000);
});