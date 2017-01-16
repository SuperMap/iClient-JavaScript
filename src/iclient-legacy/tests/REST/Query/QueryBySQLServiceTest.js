module("QueryBySQLService");
var serviceFailedEventArgsSystem=null;
var queryEventArgsSystem=null;
var worldMapURL = GlobeParameter.mapServiceURL + "World Map";

function initQueryBySQLService() {
    queryBySQLService = new SuperMap.REST.QueryBySQLService(worldMapURL);
    return queryBySQLService;
}

function QueryBySQLFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem=serviceFailedEventArgs;
}

function QueryBySQLCompleted(queryEventArgs){
    queryEventArgsSystem=queryEventArgs;
}

//不直接返回查询结果
asyncTest("TestQueryBySQLService_NotreturnContent",function(){
    expect(11);
    var queryBySQLService = initQueryBySQLService();
    ok(queryBySQLService!=null,"not null");
    equal(queryBySQLService.url,worldMapURL + "/queryResults.jsonp?","url");
    var queryBySQLParameters = new SuperMap.REST.QueryBySQLParameters({
        customParams:null,
        expectCount:100,
        networkType:SuperMap.REST.GeometryType.POINT,
        queryOption:SuperMap.REST.QueryOption.ATTRIBUTE,
        queryParams:new Array(new SuperMap.REST.FilterParameter({
            attributeFilter:"SmID>0",
            name:"Countries@World",
        })),
        returnContent:false,
    });
    
    queryBySQLParameters.startRecord=0;
    queryBySQLParameters.holdTime=10;
    returnCustomResult=false;

    queryBySQLService.processAsync(queryBySQLParameters);
    setTimeout(function() {
        try{
            var queryResult=queryBySQLService.lastResult;
            ok(queryResult!=null,"queryBySQLService.lastResult");
            ok(queryResult.resourceInfo!=null,"queryResult.resourceInfo");
            equal(queryResult.resourceInfo.succeed,true,"queryResult.resourceInfo.succeed");
            ok(queryResult.resourceInfo.newResourceLocation!=null,"queryResult.resourceInfo.newResourceLocation:"+queryResult.resourceInfo.newResourceLocation);
            ok(queryResult.resourceInfo.newResourceLocation.length>0,"queryResult.resourceInfo.newResourceLocation.length");
            
            queryBySQLService.destroy();
            ok(queryBySQLService.EVENT_TYPES==null,"queryBySQLService.EVENT_TYPES");
            ok(queryBySQLService.events==null,"queryBySQLService.events");
            ok(queryBySQLService.lastResult==null,"queryBySQLService.lastResult");
            ok(queryBySQLService.returnContent==null,"queryBySQLService.returnContent");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

//直接返回查询结果
asyncTest("TestQueryBySQLService_returnContent",function(){
    expect(13)
    var queryBySQLService = initQueryBySQLService();
    ok(queryBySQLService!=null,"not null");
    equal(queryBySQLService.url,worldMapURL + "/queryResults.jsonp?","url");
    var queryBySQLParameters = new SuperMap.REST.QueryBySQLParameters({
        customParams:null,
        expectCount:100,
        networkType:SuperMap.REST.GeometryType.POINT,
        queryOption:SuperMap.REST.QueryOption.ATTRIBUTEANDGEOMETRY,
        queryParams:new Array(new SuperMap.REST.FilterParameter({
            attributeFilter:"SmID<3",
            name:"CountryLabel@World"
        }),
        new SuperMap.REST.FilterParameter({
            attributeFilter:"SmID<3",
            name:"Capitals@World"
        }),
        new SuperMap.REST.FilterParameter({
            attributeFilter:"SmID<3",
            name:"Countries@World",
            fields:new Array("COLOR_MAP","CAPITAL")
        })),
        returnContent:true,
    });
    
    queryBySQLParameters.startRecord=0;
    queryBySQLParameters.holdTime=10;
    queryBySQLParameters.returnCustomResult=false;
    
    queryBySQLService.events.on({'processCompleted':QueryBySQLCompleted});
    queryBySQLService.processAsync();    //此代码纯粹是为了提高覆盖率
    queryBySQLService.processAsync(queryBySQLParameters);
    //stop(1000);
    setTimeout(function() {
        try{
            ok(queryBySQLService != null,"queryEventArgsSystem");
            var queryResult = queryBySQLService.lastResult;
            ok(queryResult != null,"queryBySQLService.lastResult");
            equal(queryResult.totalCount,6,"queryResult.totalCount")
            
            var queryResultFrom = queryResult;
            ok(queryResultFrom!=null,"queryResultFrom");
            ok(queryResultFrom.recordsets!=null,"queryResultFrom.recordsets");
            ok(queryResultFrom.recordsets[1]!=null,"queryResultFrom.recordsets[1]");
            var featureVector=queryResultFrom.recordsets[1].features[1]
            ok(featureVector!=null,"queryResultFrom.recordsets.features[1]");

            queryBySQLService.destroy();
            ok(queryBySQLService.EVENT_TYPES==null,"queryBySQLService.EVENT_TYPES");
            ok(queryBySQLService.events==null,"queryBySQLService.events");
            ok(queryBySQLService.lastResult==null,"queryBySQLService.lastResult");
            ok(queryBySQLService.returnContent==null,"queryBySQLService.returnContent");
            
            queryResult.destroy();
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },10000)
});

//返回bounds信息
asyncTest("TestQueryBySQLService_returnCustomResult",function(){
    expect(14);
    var queryBySQLService = initQueryBySQLService();
    ok(queryBySQLService!=null,"not null");
    equal(queryBySQLService.url,worldMapURL + "/queryResults.jsonp?","url");
    var queryBySQLParameters = new SuperMap.REST.QueryBySQLParameters({
        customParams:null,
        expectCount:100,
        networkType:SuperMap.REST.GeometryType.POINT,
        queryOption:SuperMap.REST.QueryOption.ATTRIBUTEANDGEOMETRY,
        queryParams:new Array(new SuperMap.REST.FilterParameter({
            attributeFilter:"SmID=50",
            name:"Countries@World",
            fields:null
        })),
        returnContent:false,
    });
    
    queryBySQLParameters.startRecord=0;
    queryBySQLParameters.holdTime=10;
    queryBySQLParameters.returnCustomResult=true;

    queryBySQLService.processAsync(queryBySQLParameters);
    setTimeout(function() {
        try{
            var queryResult=queryBySQLService.lastResult;
            ok(queryResult!=null,"queryBySQLService.lastResult");
            ok(queryResult.resourceInfo!=null,"queryResult.resourceInfo");
            equal(queryResult.resourceInfo.succeed,true,"queryResult.resourceInfo.succeed");
            ok(queryResult.resourceInfo.newResourceLocation!=null,"queryResult.resourceInfo.newResourceLocation:"+queryResult.resourceInfo.newResourceLocation);
            ok(queryResult.resourceInfo.newResourceLocation.length>0,"queryResult.resourceInfo.newResourceLocation.length");
            var customResponse=queryResult.customResponse;
            ok(customResponse!=null,"queryResult.customResponse"); 
            ok(customResponse.getWidth()>0,queryResult.customResponse.getWidth);
            ok(customResponse.getHeight()>0,queryResult.customResponse.getHeight);
            
            queryBySQLService.destroy();
            ok(queryBySQLService.EVENT_TYPES==null,"queryBySQLService.EVENT_TYPES");
            ok(queryBySQLService.events==null,"queryBySQLService.events");
            ok(queryBySQLService.lastResult==null,"queryBySQLService.lastResult");
            ok(queryBySQLService.returnContent==null,"queryBySQLService.returnContent");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },3000)
});

//测试没有传入参数时的情况
asyncTest("TestQueryBySQLService_noParams",function(){
    var queryBySQLService = initQueryBySQLService();
    ok(queryBySQLService!=null,"not null");
    equal(queryBySQLService.url,worldMapURL + "/queryResults.jsonp?","url");
    var queryBySQLParameters = new SuperMap.REST.QueryBySQLParameters({
        customParams:null,
        expectCount:100,
        networkType:SuperMap.REST.GeometryType.POINT,
        queryOption:SuperMap.REST.QueryOption.ATTRIBUTEANDGEOMETRY,
        queryParams:new Array()
    });
    queryBySQLService.events.on({'processFailed':QueryBySQLFailed});
    queryBySQLService.processAsync(queryBySQLParameters);
    setTimeout(function() {
        try{
            ok(queryBySQLService.lastResult==null,"queryBySQLService.lastResult");
            ok(serviceFailedEventArgsSystem!=null,"serviceFailedEventArgsSystem");
            ok(serviceFailedEventArgsSystem.error!=null,"serviceFailedEventArgsSystem.error");
            equal(serviceFailedEventArgsSystem.error.code,400,"serviceFailedEventArgsSystem.error.code");
            equal(serviceFailedEventArgsSystem.error.errorMsg,"参数 queryParameters 非法，queryParameters.queryParams 不能为空。","serviceFailedEventArgsSystem.error.errorMsg");
            serviceFailedEventArgsSystem.destroy();
            ok(serviceFailedEventArgsSystem.error==null,"serviceFailedEventArgsSystem.error");
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
        }
    },3000);
    
});

//查询目标图层不存在情况
asyncTest("TestQueryBySQLService_LayerNotExist",function(){
    var queryBySQLService = initQueryBySQLService();
    ok(queryBySQLService!=null,"not null");
    equal(queryBySQLService.url,worldMapURL + "/queryResults.jsonp?","url");
    var queryBySQLParameters = new SuperMap.REST.QueryBySQLParameters({
        customParams:null,
        expectCount:100,
        networkType:SuperMap.REST.GeometryType.POINT,
        queryOption:SuperMap.REST.QueryOption.ATTRIBUTE,
        queryParams:new Array(new SuperMap.REST.FilterParameter({
            attributeFilter:"SmID>0",
            name:"notExist",
        })),
        returnContent:false,
    });
    
    queryBySQLService.events.on({'processFailed':QueryBySQLFailed});
    queryBySQLService.processAsync(queryBySQLParameters );
    setTimeout(function() {
        try{
            ok(queryBySQLService.lastResult==null,"queryBySQLService.lastResult");
            ok(serviceFailedEventArgsSystem!=null,"serviceFailedEventArgsSystem");
            ok(serviceFailedEventArgsSystem.error!=null,"serviceFailedEventArgsSystem.error");
            equal(serviceFailedEventArgsSystem.error.code,400,"serviceFailedEventArgsSystem.error.code");
            equal(serviceFailedEventArgsSystem.error.errorMsg,"查询目标图层不存在。(notExist)","serviceFailedEventArgsSystem.error.errorMsg");
            
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
        }
    },3000);
});