module("GetFeaturesBySQLService");
var serviceFailedEventArgsSystem = null;
var getFeaturesEventArgsSystem = null;
var dataServiceURL = GlobeParameter.dataServiceURL;

function initGetFeaturesBySQLService() {
    var getFeaturesBySQLService = new SuperMap.REST.GetFeaturesBySQLService(dataServiceURL);
    return getFeaturesBySQLService;
}

function getFeaturesBySQLFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}

function getFeaturesBySQLCompleted(getFeaturesEventArgs){
    getFeaturesEventArgsSystem = getFeaturesEventArgs;
}

//不直接返回查询结果
asyncTest("GetFeaturesBySQLService_NotreturnContent_Test",function(){
    var getFeaturesBySQLService = initGetFeaturesBySQLService();
    ok(getFeaturesBySQLService!=null,"not null");
    equal(getFeaturesBySQLService.url,dataServiceURL + "/featureResults.jsonp?","url");
    var getFeaturesBySQLParameters = new SuperMap.REST.GetFeaturesBySQLParameters({
        datasetNames:["World:Countries"],
        queryParameter:new SuperMap.REST.FilterParameter({
            attributeFilter:"SmID>0",
            name:"Countries@World",
        }),
        returnContent:false
    });

    getFeaturesBySQLService.processAsync(getFeaturesBySQLParameters);
    setTimeout(function() {
        try{
            var getFeaturesResult = getFeaturesBySQLService.lastResult;
            ok(getFeaturesResult !== null,"getFeaturesBySQLService.lastResult");
            ok(getFeaturesResult.resourceInfo !== null,"getFeaturesResult.resourceInfo");
            equal(getFeaturesResult.resourceInfo.succeed,true,"getFeaturesResult.resourceInfo.succeed");
            ok(getFeaturesResult.resourceInfo.newResourceLocation !== null,"getFeaturesResult.resourceInfo.newResourceLocation:"+getFeaturesResult.resourceInfo.newResourceLocation);
            ok(getFeaturesResult.resourceInfo.newResourceLocation.length > 0,"getFeaturesResult.resourceInfo.newResourceLocation.length");
            
            getFeaturesBySQLService.destroy();
            ok(getFeaturesBySQLService.EVENT_TYPES === null,"getFeaturesBySQLService.EVENT_TYPES");
            ok(getFeaturesBySQLService.events === null,"getFeaturesBySQLService.events");
			ok(getFeaturesBySQLService.eventListeners === null,"getFeaturesBySQLService.events");
            ok(getFeaturesBySQLService.lastResult === null,"getFeaturesBySQLService.lastResult");
            ok(getFeaturesBySQLService.returnContent === null,"getFeaturesBySQLService.returnContent");
			ok(getFeaturesBySQLService.fromIndex === null,"getFeaturesBySQLService.fromIndex");
			ok(getFeaturesBySQLService.toIndex === null,"getFeaturesBySQLService.toIndex");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

//直接返回查询结果
asyncTest("GetFeaturesBySQLService_returnContent_Test",function(){
    var getFeaturesBySQLService = initGetFeaturesBySQLService();
    ok(getFeaturesBySQLService !== null,"not null");
    equal(getFeaturesBySQLService.url,dataServiceURL + "/featureResults.jsonp?","url");
    var getFeaturesBySQLParameters = new SuperMap.REST.GetFeaturesBySQLParameters({
        datasetNames:["World:Countries"],
        queryParameter:new SuperMap.REST.FilterParameter({
            attributeFilter:"SMID<10",
            name:"Countries@World",
        }),
        returnContent:true,
		fromIndex:2,
		toIndex:10
    });
    
    getFeaturesBySQLService.events.on({'processCompleted':getFeaturesBySQLCompleted});
    getFeaturesBySQLService.processAsync(getFeaturesBySQLParameters);
    setTimeout(function() {
        try{
            ok(getFeaturesBySQLService !== null,"getFeaturesEventArgsSystem");
            var getFeaturesResult = getFeaturesBySQLService.lastResult;
            ok(getFeaturesResult !== null,"getFeaturesBySQLService.lastResult");
            equal(getFeaturesResult.featureCount,9,"getFeaturesResult.featureCount");
            
            var getFeaturesResultFrom = getFeaturesResult;
            ok(getFeaturesResultFrom !== null,"getFeaturesResultFrom");
			ok(getFeaturesResultFrom.featureUriList !== null,"getFeaturesResultFrom.featureUriList");
            ok(getFeaturesResultFrom.features !== null,"getFeaturesResultFrom.features");
            ok(getFeaturesResultFrom.features[1] !== null,"getFeaturesResultFrom.features[1]");

            getFeaturesBySQLService.destroy();
            ok(getFeaturesBySQLService.EVENT_TYPES === null,"getFeaturesBySQLService.EVENT_TYPES");
            ok(getFeaturesBySQLService.events === null,"getFeaturesBySQLService.events");
			ok(getFeaturesBySQLService.eventListeners === null,"getFeaturesBySQLService.events");
            ok(getFeaturesBySQLService.lastResult === null,"getFeaturesBySQLService.lastResult");
            ok(getFeaturesBySQLService.returnContent === null,"getFeaturesBySQLService.returnContent");
			ok(getFeaturesBySQLService.fromIndex === null,"getFeaturesBySQLService.fromIndex");
			ok(getFeaturesBySQLService.toIndex === null,"getFeaturesBySQLService.toIndex");
            
            getFeaturesResult.destroy();
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },10000)
});

//测试没有传入参数时的情况
asyncTest("GetFeaturesBySQLService_noParams_Test",function(){
	var getFeaturesBySQLService = initGetFeaturesBySQLService();
    ok(getFeaturesBySQLService !== null,"not null");
    equal(getFeaturesBySQLService.url,dataServiceURL + "/featureResults.jsonp?","url");
    var getFeaturesBySQLParameters = new SuperMap.REST.GetFeaturesBySQLParameters({
        datasetNames:["World:Countries"],
        returnContent:true,
		fromIndex:2,
		toIndex:10
    });
	getFeaturesBySQLService.events.on({'processFailed':getFeaturesBySQLFailed});
    getFeaturesBySQLService.processAsync(getFeaturesBySQLParameters);
    setTimeout(function() {
        try{
            ok(getFeaturesBySQLService.lastResult === null,"getFeaturesBySQLService.lastResult");
            ok(serviceFailedEventArgsSystem !== null,"serviceFailedEventArgsSystem");
            ok(serviceFailedEventArgsSystem.error !== null,"serviceFailedEventArgsSystem.error");
            equal(serviceFailedEventArgsSystem.error.code,400,"serviceFailedEventArgsSystem.error.code");
            ok(!!serviceFailedEventArgsSystem.error.errorMsg,"serviceFailedEventArgsSystem.error.errorMsg");
            serviceFailedEventArgsSystem.destroy();
            ok(serviceFailedEventArgsSystem.error === null,"serviceFailedEventArgsSystem.error");
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
        }
    },3000);
    
});

//查询目标图层不存在情况
asyncTest("GetFeaturesBySQLService_LayerNotExist",function(){
    var getFeaturesBySQLService = initGetFeaturesBySQLService();
    ok(getFeaturesBySQLService !== null,"not null");
    equal(getFeaturesBySQLService.url,dataServiceURL + "/featureResults.jsonp?","url");
    var getFeaturesBySQLParameters = new SuperMap.REST.GetFeaturesBySQLParameters({
        datasetNames:["World:Countriess"],
        queryParameter:new SuperMap.REST.FilterParameter({
            attributeFilter:"SMID<10",
            name:"Countries@World",
        }),
        returnContent:true,
		fromIndex:2,
		toIndex:10
    });
    
    getFeaturesBySQLService.events.on({'processFailed':getFeaturesBySQLFailed});
    getFeaturesBySQLService.processAsync(getFeaturesBySQLParameters );
    setTimeout(function() {
        try{
            ok(getFeaturesBySQLService.lastResult === null,"getFeaturesBySQLService.lastResult");
            ok(serviceFailedEventArgsSystem !== null,"serviceFailedEventArgsSystem");
            ok(serviceFailedEventArgsSystem.error !== null,"serviceFailedEventArgsSystem.error");
            equal(serviceFailedEventArgsSystem.error.code,400,"serviceFailedEventArgsSystem.error.code");
            equal(serviceFailedEventArgsSystem.error.errorMsg,"getFeature方法中数据集名Countriess不存在","serviceFailedEventArgsSystem.error.errorMsg");
            
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
        }
    },3000);
});