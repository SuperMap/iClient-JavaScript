module("GetFeaturesByIDsService");
var serviceFailedEventArgsSystem=null;
var getFeatureEventArgsSystem=null;
var dataServiceURL = GlobeParameter.dataServiceURL;

function initGetFeaturesByIDsService() {
    var getFeaturesByIDsService = new SuperMap.REST.GetFeaturesByIDsService(dataServiceURL);
    return getFeaturesByIDsService;
}
function getFeaturesByIDsFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem=serviceFailedEventArgs;
}

function getFeaturesByIDsCompleted(getFeaturesEventArgs){
    getFeatureEventArgsSystem=getFeaturesEventArgs;
}

//不直接返回查询结果
asyncTest("TestGetFeaturesByIDsService_NotreturnContent",function(){
    expect(13);
    var getFeaturesByIDsService = initGetFeaturesByIDsService();
    ok(getFeaturesByIDsService!=null,"not null");
    equal(getFeaturesByIDsService.url,dataServiceURL + "/featureResults.jsonp?","url");
    var getFeaturesByIDsParameters = new SuperMap.REST.GetFeaturesByIDsParameters({
		returnContent:false,
		datasetNames: ["World:Capitals"],
        fromIndex: 0,
		fields: ["SMID"],
		toIndex:-1,
        IDs: [1,2,3]
    });

    getFeaturesByIDsService.processAsync(getFeaturesByIDsParameters);
    setTimeout(function() {
        try{
            var getFeaturesResult=getFeaturesByIDsService.lastResult;
            ok(getFeaturesResult!=null,"getFeaturesByIDsService.lastResult");
            ok(getFeaturesResult.resourceInfo!=null,"getFeaturesResult.resourceInfo");
            equal(getFeaturesResult.resourceInfo.succeed,true,"getFeaturesResult.resourceInfo.succeed");
            ok(getFeaturesResult.resourceInfo.newResourceLocation!=null,"getFeaturesResult.resourceInfo.newResourceLocation:"+getFeaturesResult.resourceInfo.newResourceLocation);
            ok(getFeaturesResult.resourceInfo.newResourceLocation.length>0,"getFeaturesResult.resourceInfo.newResourceLocation.length");
			ok(getFeaturesResult.resourceInfo.id!=null,"getFeaturesResult.resourceInfo.id:"+getFeaturesResult.resourceInfo.id);
            ok(getFeaturesResult.resourceInfo.id.length>0,"getFeaturesResult.resourceInfo.id.length");
            
            getFeaturesByIDsService.destroy();
            ok(getFeaturesByIDsService.EVENT_TYPES==null,"getFeaturesByIDsService.EVENT_TYPES");
            ok(getFeaturesByIDsService.events==null,"getFeaturesByIDsService.events");
            ok(getFeaturesByIDsService.lastResult==null,"getFeaturesByIDsService.lastResult");
            ok(getFeaturesByIDsService.returnContent==null,"getFeaturesByIDsService.returnContent");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

//直接返回查询结果
asyncTest("TestGetFeaturesByIDsService_returnContent",function(){
    expect(12)
    var getFeaturesByIDsService = initGetFeaturesByIDsService();
    ok(getFeaturesByIDsService!=null,"not null");
    equal(getFeaturesByIDsService.url,dataServiceURL + "/featureResults.jsonp?","url");
    var getFeaturesByIDsParameters = new SuperMap.REST.GetFeaturesByIDsParameters({
		returnContent: true,
        datasetNames: ["World:Capitals"],
        fromIndex: 0,
		toIndex:-1,
        IDs: [1,2,3]
    });
    
    getFeaturesByIDsService.events.on({'processCompleted':getFeaturesByIDsCompleted});
    getFeaturesByIDsService.processAsync(getFeaturesByIDsParameters);
    //stop(1000);
    setTimeout(function() {
        try{
            ok(getFeatureEventArgsSystem != null,"getFeatureEventArgsSystem");
            var getFeaturesResult = getFeaturesByIDsService.lastResult;
            ok(getFeaturesResult != null,"getFeaturesByIDsService.lastResult");
            equal(getFeaturesResult.featureCount,3,"getFeaturesResult.featureCount")
            ok(getFeaturesResult.features!=null,"getFeaturesResult.features");
            ok(getFeaturesResult.resourceInfo==null,"getFeaturesResult.resourceInfo is null");
            var feature=getFeaturesResult.features[0]
            ok(feature!=null,"getFeaturesResult.features[0]");

            getFeaturesByIDsService.destroy();
            ok(getFeaturesByIDsService.EVENT_TYPES==null,"getFeaturesByIDsService.EVENT_TYPES");
            ok(getFeaturesByIDsService.events==null,"getFeaturesByIDsService.events");
            ok(getFeaturesByIDsService.lastResult==null,"getFeaturesByIDsService.lastResult");
            ok(getFeaturesByIDsService.returnContent==null,"getFeaturesByIDsService.returnContent");
            
            getFeaturesResult.destroy();
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },10000)
});


//测试没有传入参数时的情况
asyncTest("TestGetFeaturesByIDsService_noParams",function(){
    var getFeaturesByIDsService = initGetFeaturesByIDsService();
    ok(getFeaturesByIDsService!=null,"not null");
    equal(getFeaturesByIDsService.url,dataServiceURL + "/featureResults.jsonp?","url");
    var getFeaturesByIDsParameters = new SuperMap.REST.GetFeaturesByIDsParameters({
        IDs: []
    });
    getFeaturesByIDsService.events.on({'processFailed':getFeaturesByIDsFailed});
    getFeaturesByIDsService.processAsync(getFeaturesByIDsParameters);
    setTimeout(function() {
        try{
            ok(getFeaturesByIDsService.lastResult==null,"getFeaturesByIDsService.lastResult");
            ok(serviceFailedEventArgsSystem!=null,"serviceFailedEventArgsSystem");
            ok(serviceFailedEventArgsSystem.error!=null,"serviceFailedEventArgsSystem.error");
            equal(serviceFailedEventArgsSystem.error.code,400,"serviceFailedEventArgsSystem.error.code");
            equal(serviceFailedEventArgsSystem.error.errorMsg,"在FeatureResults中，在检验请求体时，请求体参数datasetNames为空","serviceFailedEventArgsSystem.error.errorMsg");
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
asyncTest("TestGetFeaturesByIDsService_LayerNotExist",function(){
    var getFeaturesByIDsService = initGetFeaturesByIDsService();
    ok(getFeaturesByIDsService!=null,"not null");
    equal(getFeaturesByIDsService.url,dataServiceURL + "/featureResults.jsonp?","url");
    var getFeaturesByIDsParameters = new SuperMap.REST.GetFeaturesByIDsParameters({
        returnContent:false,
		datasetNames: ["World:CapitalsNotExsit"],
        fromIndex: 0,
		toIndex:-1,
        IDs: [1,2,3]
    });
    
    getFeaturesByIDsService.events.on({'processFailed':getFeaturesByIDsFailed});
    getFeaturesByIDsService.processAsync(getFeaturesByIDsParameters );
    setTimeout(function() {
        try{
            ok(getFeaturesByIDsService.lastResult==null,"getFeaturesByIDsService.lastResult");
            ok(serviceFailedEventArgsSystem!=null,"serviceFailedEventArgsSystem");
            ok(serviceFailedEventArgsSystem.error!=null,"serviceFailedEventArgsSystem.error");
            equal(serviceFailedEventArgsSystem.error.code,400,"serviceFailedEventArgsSystem.error.code");
            equal(serviceFailedEventArgsSystem.error.errorMsg,"getFeature方法中数据集名CapitalsNotExsit不存在","serviceFailedEventArgsSystem.error.errorMsg");
            
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
        }
    },3000);
});