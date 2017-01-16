module("GetFeaturesByBufferService");
var serviceFailedEventArgsSystem = null;
var getFeaturesEventArgsSystem = null;
var dataServiceURL = GlobeParameter.dataServiceURL;

function initGetFeaturesByBufferService() {
    var getFeaturesByBufferService = new SuperMap.REST.GetFeaturesByBufferService(dataServiceURL);
    return getFeaturesByBufferService;
}

function getFeaturesByBufferFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}

function getFeaturesByBufferCompleted(getFeaturesEventArgs){
    getFeaturesEventArgsSystem = getFeaturesEventArgs;
}

//不直接返回查询结果
asyncTest("GetFeaturesByBufferService_NotreturnContent_Test",function(){
    var getFeaturesByBufferService = initGetFeaturesByBufferService();
    ok(getFeaturesByBufferService !== null,"not null");
    equal(getFeaturesByBufferService.url,dataServiceURL + "/featureResults.jsonp?","url");
	
	var geometry = new SuperMap.Geometry.Point(7.25,18.75);
    var getFeaturesByBufferParameters = new SuperMap.REST.GetFeaturesBySQLParameters({
        datasetNames:["World:Capitals"],
		bufferDistance:30,
		attributeFilter:"SMID>0",
        geometry:geometry,
        returnContent:false
    });

    getFeaturesByBufferService.processAsync(getFeaturesByBufferParameters);
    setTimeout(function() {
        try{
            var getFeaturesResult = getFeaturesByBufferService.lastResult;
            ok(getFeaturesResult !== null,"getFeaturesByBufferService.lastResult");
            ok(getFeaturesResult.resourceInfo !== null,"getFeaturesResult.resourceInfo");
            equal(getFeaturesResult.resourceInfo.succeed,true,"getFeaturesResult.resourceInfo.succeed");
            ok(getFeaturesResult.resourceInfo.newResourceLocation !== null,"getFeaturesResult.resourceInfo.newResourceLocation:"+getFeaturesResult.resourceInfo.newResourceLocation);
            ok(getFeaturesResult.resourceInfo.newResourceLocation.length > 0,"getFeaturesResult.resourceInfo.newResourceLocation.length");
            
            getFeaturesByBufferService.destroy();
            ok(getFeaturesByBufferService.EVENT_TYPES === null,"getFeaturesByBufferService.EVENT_TYPES");
            ok(getFeaturesByBufferService.events === null,"getFeaturesByBufferService.events");
			ok(getFeaturesByBufferService.eventListeners === null,"getFeaturesByBufferService.events");
            ok(getFeaturesByBufferService.lastResult === null,"getFeaturesByBufferService.lastResult");
            ok(getFeaturesByBufferService.returnContent === null,"getFeaturesByBufferService.returnContent");
			ok(getFeaturesByBufferService.fromIndex === null,"getFeaturesByBufferService.fromIndex");
			ok(getFeaturesByBufferService.toIndex === null,"getFeaturesByBufferService.toIndex");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

//直接返回查询结果
asyncTest("GetFeaturesByBufferService_returnContent_Test",function(){
    var getFeaturesByBufferService = initGetFeaturesByBufferService();
    ok(getFeaturesByBufferService !== null,"not null");
    equal(getFeaturesByBufferService.url,dataServiceURL + "/featureResults.jsonp?","url");
	
	var geometry = new SuperMap.Geometry.Point(7.25,18.75);
    var getFeaturesByBufferParameters = new SuperMap.REST.GetFeaturesBySQLParameters({
        datasetNames:["World:Capitals"],
		bufferDistance:30,
		attributeFilter:"SMID>0",
        geometry:geometry,
		fromIndex:0,
		toIndex:19,
        returnContent:true
    });
    
    getFeaturesByBufferService.events.on({'processCompleted':getFeaturesByBufferCompleted});
    getFeaturesByBufferService.processAsync(getFeaturesByBufferParameters);
    setTimeout(function() {
        try{
            ok(getFeaturesByBufferService !== null,"getFeaturesEventArgsSystem");
            var getFeaturesResult = getFeaturesByBufferService.lastResult;
            ok(getFeaturesResult !== null,"getFeaturesByBufferService.lastResult");
            //返回结果中featureCount一直表示总的结果数，实际返回数目通过features数据个数来判断
			// equal(getFeaturesResult.featureCount,20,"getFeaturesResult.featureCount");
			equal(getFeaturesResult.features.length, 20, "getFeaturesByBufferService.features.length");
            
            var getFeaturesResultFrom = getFeaturesResult;
            ok(getFeaturesResultFrom !== null,"getFeaturesResultFrom");
			ok(getFeaturesResultFrom.featureUriList !== null,"getFeaturesResultFrom.featureUriList");
            ok(getFeaturesResultFrom.features !== null,"getFeaturesResultFrom.features");
            ok(getFeaturesResultFrom.features[0] !== null,"getFeaturesResultFrom.features[1]");
            var feature = getFeaturesResultFrom.features[0];
            ok(feature !== null,"getFeaturesResultFrom.features[1]");

            getFeaturesByBufferService.destroy();
            ok(getFeaturesByBufferService.EVENT_TYPES === null,"getFeaturesByBufferService.EVENT_TYPES");
            ok(getFeaturesByBufferService.events === null,"getFeaturesByBufferService.events");
			ok(getFeaturesByBufferService.eventListeners === null,"getFeaturesByBufferService.events");
            ok(getFeaturesByBufferService.lastResult === null,"getFeaturesByBufferService.lastResult");
            ok(getFeaturesByBufferService.returnContent === null,"getFeaturesByBufferService.returnContent");
			ok(getFeaturesByBufferService.fromIndex === null,"getFeaturesByBufferService.fromIndex");
			ok(getFeaturesByBufferService.toIndex === null,"getFeaturesByBufferService.toIndex");
            
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
	var getFeaturesByBufferService = initGetFeaturesByBufferService();
    ok(getFeaturesByBufferService !== null,"not null");
    equal(getFeaturesByBufferService.url,dataServiceURL + "/featureResults.jsonp?","url");
	
	var geometry = new SuperMap.Geometry.Point(7.25,18.75);
    var getFeaturesByBufferParameters = new SuperMap.REST.GetFeaturesBySQLParameters({
        datasetNames:["World:Capitals"],
		bufferDistance:30,
		attributeFilter:"SMID>0",
        //geometry:geometry,
		fields: ["SMID"],
		fromIndex:0,
		toIndex:19,
        returnContent:true
    });
	getFeaturesByBufferService.events.on({'processFailed':getFeaturesByBufferFailed});
    getFeaturesByBufferService.processAsync(getFeaturesByBufferParameters);
    setTimeout(function() {
        try{
            ok(getFeaturesByBufferService.lastResult === null,"getFeaturesByBufferService.lastResult");
            ok(serviceFailedEventArgsSystem !== null,"serviceFailedEventArgsSystem");
            ok(serviceFailedEventArgsSystem.error !== null,"serviceFailedEventArgsSystem.error");
            equal(serviceFailedEventArgsSystem.error.code,400,"serviceFailedEventArgsSystem.error.code");
            equal(serviceFailedEventArgsSystem.error.errorMsg,"getFeatureByBuffer方法中传入的参数为空","serviceFailedEventArgsSystem.error.errorMsg");
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
    var getFeaturesByBufferService = initGetFeaturesByBufferService();
    ok(getFeaturesByBufferService !== null,"not null");
    equal(getFeaturesByBufferService.url,dataServiceURL + "/featureResults.jsonp?","url");
	
	var geometry = new SuperMap.Geometry.Point(7.25,18.75);
    var getFeaturesByBufferParameters = new SuperMap.REST.GetFeaturesBySQLParameters({
        datasetNames:["World:Capitalss"],
		bufferDistance:30,
		attributeFilter:"SMID>0",
        geometry:geometry,
		fromIndex:0,
		toIndex:19,
        returnContent:true
    });
    
    getFeaturesByBufferService.events.on({'processFailed':getFeaturesByBufferFailed});
    getFeaturesByBufferService.processAsync(getFeaturesByBufferParameters );
    setTimeout(function() {
        try{
            ok(getFeaturesByBufferService.lastResult === null,"getFeaturesByBufferService.lastResult");
            ok(serviceFailedEventArgsSystem !== null,"serviceFailedEventArgsSystem");
            ok(serviceFailedEventArgsSystem.error !== null,"serviceFailedEventArgsSystem.error");
            equal(serviceFailedEventArgsSystem.error.code,400,"serviceFailedEventArgsSystem.error.code");
            equal(serviceFailedEventArgsSystem.error.errorMsg,"getFeature方法中数据集名Capitalss不存在","serviceFailedEventArgsSystem.error.errorMsg");
            
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
        }
    },3000);
});