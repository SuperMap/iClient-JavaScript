module("QueryByDistanceService");

var failedResult,
    distanceUrl = GlobeParameter.mapServiceURL + "World Map";

function initQueryByDistanceService() {
    var queryByDistanceService = new SuperMap.REST.QueryByDistanceService(distanceUrl);
    return queryByDistanceService;
}

asyncTest("TestQueryByDistanceService_returnContent", function() {
    var queryByDistanceService = initQueryByDistanceService();
    
    ok(queryByDistanceService != null, "not null");
    equal(queryByDistanceService.url, GlobeParameter.mapServiceURL + "World Map/queryResults.jsonp?", "url");
    var queryByDistanceParameters = new SuperMap.REST.QueryByDistanceParameters({
        customParams: null,
        startRecord: 1,
        queryOption: SuperMap.REST.QueryOption.ATTRIBUTEANDGEOMETRY,
        queryParams: new Array(new SuperMap.REST.FilterParameter({
            name: "Capitals@World"
        })),
        returnContent: true,
        distance: 20,
        geometry: new SuperMap.Geometry.Point(-50, -10)
    });
    
    queryByDistanceParameters.holdTime = 10;
    queryByDistanceService.processAsync(queryByDistanceParameters);
    
    setTimeout(function() {
        try{
            var queryResult = queryByDistanceService.lastResult;
            ok(queryResult != null, "queryByDistanceService.lastResult");  
            equal(queryResult.totalCount, 6, "queryByDistanceService.totalCount");
            equal(queryResult.currentCount, 5, "queryByDistanceService.currentCount");
                
            queryByDistanceService.destroy();
            ok(queryByDistanceService.EVENT_TYPES == null, "queryByDistanceService.EVENT_TYPES");
            ok(queryByDistanceService.events == null, "queryByDistanceService.events");
            ok(queryByDistanceService.lastResult == null, "queryByDistanceService.lastResult");
            ok(queryByDistanceService.returnContent == null, "queryByDistanceService.returnContent");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 6000);
});

asyncTest("TestQueryByDistanceService_pass", function() {
    var queryByDistanceService = initQueryByDistanceService();
    
    ok(queryByDistanceService != null, "not null");
    equal(queryByDistanceService.url, GlobeParameter.mapServiceURL + "World Map/queryResults.jsonp?", "url");
    var queryByDistanceParameters = new SuperMap.REST.QueryByDistanceParameters({
        customParams: null,
        expectCount: 100,
        queryOption: SuperMap.REST.QueryOption.GEOMETRY,
        queryParams: new Array(new SuperMap.REST.FilterParameter({
            name: "Capitals@World"
        })),
        returnContent: false,
        distance: 20,
        isNearest: true,
        geometry: new SuperMap.Geometry.Point(-50, -10)
    });
    

    queryByDistanceParameters.startRecord = 0;
    queryByDistanceParameters.holdTime = 10;
    queryByDistanceService.processAsync(queryByDistanceParameters);
    
    setTimeout(function() {
        try {
            var queryResult = queryByDistanceService.lastResult;
            ok(queryResult != null, "queryByDistanceService.lastResult"); 
            ok(queryResult.totalCount == null, "queryResult.totalCount")
            ok(queryResult.resourceInfo != null, "queryResult.resourceInfo");
            equal(queryResult.resourceInfo.succeed, true, "queryResult.resourceInfo.succeed");
            ok(queryResult.resourceInfo.newResourceLocation != null, "queryResult.resourceInfo.newResourceLocation:"+queryResult.resourceInfo.newResourceLocation);
            ok(queryResult.resourceInfo.newResourceLocation.length>0, "queryResult.resourceInfo.newResourceLocation.length");
            ok(queryResult.resourceInfo != null, "queryByDistanceService.resourceInfo"); 

            queryResult.destroy();
            ok(queryResult=!null, "null" );
            ok(queryResult.totalCount==null,"queryResult.totalCount");
            ok(queryResult.currentCount==null, "queryResult.currentCount" );
            ok(queryResult.customResponse==null, "queryResult.customResponse" );
            ok(queryResult.recordsets==null,"queryResult.recordsets");
            ok(queryResult.resourceInfo==null,"queryResult.resourceInfo");
            
            queryByDistanceService.destroy();
            ok(queryByDistanceService.EVENT_TYPES == null, "queryByDistanceService.EVENT_TYPES");
            ok(queryByDistanceService.events == null, "queryByDistanceService.events");
            ok(queryByDistanceService.lastResult == null, "queryByDistanceService.lastResult");
            ok(queryByDistanceService.returnContent == null, "queryByDistanceService.returnContent");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 6000);

});

//查询参数为空
asyncTest("TestQueryByDistanceService_fail", function() {
    var queryByDistanceService = initQueryByDistanceService();
    
    ok(queryByDistanceService != null, "not null");
    equal(queryByDistanceService.url, GlobeParameter.mapServiceURL + "World Map/queryResults.jsonp?", "url");
    var queryByDistanceParameters = new SuperMap.REST.QueryByDistanceParameters({
        customParams: null,
        expectCount: 100,
        networkType: SuperMap.REST.GeometryType.POINT,
        queryOption: SuperMap.REST.QueryOption.ATTRIBUTE,
        queryParams: new Array(),
        geometry: new SuperMap.Geometry.Point(-50, -10),
        distance:20
    });
    
    queryByDistanceParameters.startRecord = 0;
    queryByDistanceParameters.holdTime = 10;
    queryByDistanceService.events.on({ 'processFailed': queryFailed });
    queryByDistanceService.processAsync(queryByDistanceParameters);

    function queryFailed(e) {
        failedResult = e;
    }

    setTimeout(function() {
        try {
            var queryResult = queryByDistanceService.lastResult;
            ok(queryResult == null, "queryByDistanceService.lastResult"); 
            ok(failedResult != null, "failedResult");
            ok(failedResult.error != null, "failedResult.error");
            equal(failedResult.error.code, 400, "failedResult.error.code");
            equal(failedResult.error.errorMsg, "参数 queryParameters 非法，queryParameters.queryParams 不能为空。", "serviceFailedEventArgsSystem.error.errorMsg");
            
            queryByDistanceService.destroy();
            ok(queryByDistanceService.EVENT_TYPES == null, "queryByDistanceService.EVENT_TYPES");
            ok(queryByDistanceService.events == null, "queryByDistanceService.events");
            ok(queryByDistanceService.lastResult == null, "queryByDistanceService.lastResult"); 
            ok(queryByDistanceService.returnContent == null, "queryByDistanceService.returnContent");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 3000);
});