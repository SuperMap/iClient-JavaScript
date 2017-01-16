module("QueryByGeometryService");

var serviceFailedEventArgsSystem = null;
var url = null;        //测试机的IP地址，用于测试非跨域下的请求
var worldMapURL = GlobeParameter.mapServiceURL + "World Map";

//跨域下的测试
function initQueryByGeometryService() {
    QueryByGeometryService = new SuperMap.REST.QueryByGeometryService(worldMapURL);
    return QueryByGeometryService;
}

asyncTest("TestQueryByGeometryService_pass",function(){
    var queryByGeometryService = initQueryByGeometryService();
    var points = new Array(new SuperMap.Geometry.Point(-90,-45),new SuperMap.Geometry.Point(90,-45),new SuperMap.Geometry.Point(90,45),new SuperMap.Geometry.Point(-90,45),new SuperMap.Geometry.Point(-90,-45));
    var geometry = new SuperMap.Geometry.Polygon(new SuperMap.Geometry.LinearRing(points));
    ok(queryByGeometryService!=null,"not null");
    equal(queryByGeometryService.url,worldMapURL + "/queryResults.jsonp?","url");
    
    var queryByGeometryParameters = new SuperMap.REST.QueryByGeometryParameters({
        customParams:null,
        expectCount:3,
        startRecord:1,
        networkType:SuperMap.REST.GeometryType.POINT,
        queryOption:SuperMap.REST.QueryOption.ATTRIBUTEANDGEOMETRY,
        spatialQueryMode:SuperMap.REST.SpatialQueryMode.INTERSECT,
        queryParams:new Array(new SuperMap.REST.FilterParameter({
            attributeFilter:"SmID<20",
            name:"Capitals@World",
        })),
        returnContent:false,
        geometry:geometry
    });
    
    queryByGeometryParameters.startRecord=0;
    queryByGeometryParameters.holdTime=10;
    
    queryByGeometryService.processAsync(queryByGeometryParameters);
    
    setTimeout(function() {
        try{
        var queryResult=queryByGeometryService.lastResult;
            ok(queryResult!=null,"queryByGeometryService.lastResult"); 
            ok(queryResult.resourceInfo!=null,"queryResult.resourceInfo");
            equal(queryResult.resourceInfo.succeed,true,"queryResult.resourceInfo.succeed");
            ok(queryResult.resourceInfo.newResourceLocation!=null,"queryResult.resourceInfo.newResourceLocation:"+queryResult.resourceInfo.newResourceLocation);
            ok(queryResult.resourceInfo.newResourceLocation.length>0,"queryResult.resourceInfo.newResourceLocation.length");
            ok(queryResult.resourceInfo!=null,"queryByGeometryService.resourceInfo");         
            queryByGeometryService.destroy();
            ok(queryByGeometryService.EVENT_TYPES==null,"queryByGeometryService.EVENT_TYPES");
            ok(queryByGeometryService.events==null,"queryByGeometryService.events");
            ok(queryByGeometryService.lastResult==null,"queryByGeometryService.lastResult");
            ok(queryByGeometryService.returnContent==null,"queryByGeometryService.returnContent");
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
            }
    },10000);
});

asyncTest("TestQueryByGeometryService_returnContent",function(){
    var queryByGeometryService = initQueryByGeometryService();
    ok(queryByGeometryService!=null,"not null");
    equal(queryByGeometryService.url,worldMapURL + "/queryResults.jsonp?","url");
    var points = new Array(new SuperMap.Geometry.Point(-90,-45),new SuperMap.Geometry.Point(90,-45),new SuperMap.Geometry.Point(90,45),new SuperMap.Geometry.Point(-90,45),new SuperMap.Geometry.Point(-90,-45));
    var geometry = new SuperMap.Geometry.Polygon(new SuperMap.Geometry.LinearRing(points));
    var queryByGeometryParameters = new SuperMap.REST.QueryByGeometryParameters({
        customParams:null,
        expectCount:10,
        startRecord:1,
        networkType:SuperMap.REST.GeometryType.POINT,
        queryOption:SuperMap.REST.QueryOption.ATTRIBUTEANDGEOMETRY,
        spatialQueryMode:SuperMap.REST.SpatialQueryMode.INTERSECT,
        queryParams:new Array(new SuperMap.REST.FilterParameter({
            attributeFilter:"SmID<20",
            name:"Capitals@World",
        })),
        returnContent:true,
        geometry:geometry
    });    
    queryByGeometryParameters.startRecord=0;
    queryByGeometryParameters.holdTime=10;    
    queryByGeometryService.processAsync(queryByGeometryParameters);    
    setTimeout(function() {
        try{
            var queryResult=queryByGeometryService.lastResult;
            ok(queryResult!=null,"queryByGeometryService.lastResult"); 
            equal(queryResult.totalCount,15,"queryByDistanceService.totalCount");
            equal(queryResult.currentCount,10,"queryByDistanceService.currentCount");            
            queryByGeometryService.destroy();
            ok(queryByGeometryService.EVENT_TYPES==null,"queryByGeometryService.EVENT_TYPES");
            ok(queryByGeometryService.events==null,"queryByGeometryService.events");
            ok(queryByGeometryService.lastResult==null,"queryByGeometryService.lastResult");
            ok(queryByGeometryService.returnContent==null,"queryByGeometryService.returnContent");
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
        }
    },10000);
});

//查询参数为空
asyncTest("TestQueryByGeometryService_fail",function(){
    var queryByGeometryService = initQueryByGeometryService();
    ok(queryByGeometryService!=null,"not null");
    equal(queryByGeometryService.url,worldMapURL + "/queryResults.jsonp?","url");
    var queryByGeometryParameters = new SuperMap.REST.QueryByGeometryParameters({
        customParams:null,
        expectCount:100,
        networkType:SuperMap.REST.GeometryType.POINT,
        queryOption:SuperMap.REST.QueryOption.ATTRIBUTE,
        spatialQueryMode:SuperMap.REST.SpatialQueryMode.OVERLAP,
        queryParams:new Array(),
        geometry:new SuperMap.Geometry.Point(-50,-20)
    });    
    queryByGeometryParameters.startRecord=0;
    queryByGeometryParameters.holdTime=10;
    queryByGeometryService.events.on({'processFailed': queryFailed});
    queryByGeometryService.processAsync(queryByGeometryParameters);
    
    function queryFailed(e){
        failedResult = e;
    }
    
    setTimeout(function() {
        try{
            var queryResult=queryByGeometryService.lastResult;
            ok(queryResult==null,"queryByGeometryService.lastResult"); 
            ok(failedResult!=null,"failedResult");
            ok(failedResult.error!=null,"failedResult.error");
            equal(failedResult.error.code,400,"failedResult.error.code");
            equal(failedResult.error.errorMsg,"参数 queryParameters 非法，queryParameters.queryParams 不能为空。","serviceFailedEventArgsSystem.error.errorMsg");            
            queryByGeometryService.destroy();
            ok(queryByGeometryService.EVENT_TYPES==null,"queryByGeometryService.EVENT_TYPES");
            ok(queryByGeometryService.events==null,"queryByGeometryService.events");
            ok(queryByGeometryService.lastResult==null,"queryByGeometryService.lastResult");
            ok(queryByGeometryService.returnContent==null,"queryByGeometryService.returnContent");
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
        }
    },20000);
});