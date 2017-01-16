module("GetFeaturesByGeometryServiceTest");
var serviceFailedEventArgsSystem = null;
var getFeatureEventArgsSystem = null;
var dataServiceURL = GlobeParameter.dataServiceURL;

function initGetFeaturesByGeometryService() {
    var getFeaturesByGeometryService = new SuperMap.REST.GetFeaturesByGeometryService(dataServiceURL);
    return getFeaturesByGeometryService;
}
function getFeaturesByGeometryFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem=serviceFailedEventArgs;
}

function getFeaturesByGeometryCompleted(getFeaturesEventArgs){
    getFeatureEventArgsSystem=getFeaturesEventArgs;
}
//不直接返回结果情况
asyncTest("Test_GetFeaturesByGeometryService_not_returncontent",function(){
	expect(13);
	var getFeaturesByGeometryService = initGetFeaturesByGeometryService();
	ok(getFeaturesByGeometryService != null, "getFeaturesByGeometryService is not null");
	equal(getFeaturesByGeometryService.url, dataServiceURL + "/featureResults.jsonp?", "url");
	var point = new SuperMap.Geometry.Point(112,36);
    var getFeaturesByGeometryParameters = new SuperMap.REST.GetFeaturesByGeometryParameters({
		returnContent:false,
		datasetNames: ["World:Countries"],
		fields: ["SMID"],
        fromIndex: 0,
		toIndex:-1,
        spatialQueryMode:SuperMap.REST.SpatialQueryMode.INTERSECT,
		geometry:point
    });

    getFeaturesByGeometryService.processAsync(getFeaturesByGeometryParameters);
    setTimeout(function() {
        try{
            var getFeaturesResult=getFeaturesByGeometryService.lastResult;
            ok(getFeaturesResult!=null,"getFeaturesByGeometryService.lastResult");
            ok(getFeaturesResult.resourceInfo!=null,"getFeaturesResult.resourceInfo");
            equal(getFeaturesResult.resourceInfo.succeed,true,"getFeaturesResult.resourceInfo.succeed");
            ok(getFeaturesResult.resourceInfo.newResourceLocation!=null,"getFeaturesResult.resourceInfo.newResourceLocation:"+getFeaturesResult.resourceInfo.newResourceLocation);
            ok(getFeaturesResult.resourceInfo.newResourceLocation.length>0,"getFeaturesResult.resourceInfo.newResourceLocation.length");
			ok(getFeaturesResult.resourceInfo.id!=null,"getFeaturesResult.resourceInfo.id:"+getFeaturesResult.resourceInfo.id);
            ok(getFeaturesResult.resourceInfo.id.length>0,"getFeaturesResult.resourceInfo.id.length");
			
            getFeaturesByGeometryService.destroy();
            ok(getFeaturesByGeometryService.EVENT_TYPES==null,"getFeaturesByGeometryService.EVENT_TYPES");
            ok(getFeaturesByGeometryService.events==null,"getFeaturesByGeometryService.events");
            ok(getFeaturesByGeometryService.lastResult==null,"getFeaturesByGeometryService.lastResult");
            ok(getFeaturesByGeometryService.returnContent==null,"getFeaturesByGeometryService.returnContent");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

//直接返回结果情况
asyncTest("Test_GetFeaturesByGeometryServie_with_returnContent",function(){
	expect(11);
	var getFeaturesByGeometryService = initGetFeaturesByGeometryService();
	ok(getFeaturesByGeometryService != null, "getFeaturesByGeometryService is not null");
	equal(getFeaturesByGeometryService.url, dataServiceURL + "/featureResults.jsonp?", "url");
	var point = new SuperMap.Geometry.Point(112, 36);
	var getFeaturesByGeometryParameters = new SuperMap.REST.GetFeaturesByGeometryParameters({
	datasetNames: ["World:Countries"],
	toIndex: -1,
	spatialQueryMode:SuperMap.REST.SpatialQueryMode.INTERSECT,
	geometry:point
	});
	getFeaturesByGeometryService.events.on({'processCompleted':getFeaturesByGeometryCompleted});
	getFeaturesByGeometryService.processAsync(getFeaturesByGeometryParameters);
	setTimeout(function(){
		try{
			var getFeaturesResult = getFeaturesByGeometryService.lastResult;
			ok(getFeaturesResult != null, "getFeaturesByGeometryService.lastResult");
			equal(getFeaturesResult.featureCount,1,"getFeaturesResult.featureCount")
            ok(getFeaturesResult.features!=null,"getFeaturesResult.features");
            ok(getFeaturesResult.resourceInfo==null,"getFeaturesResult.resourceInfo is null");
            var feature=getFeaturesResult.features[0]
            ok(feature!=null,"getFeaturesResult.features[0]");

            getFeaturesByGeometryService.destroy();
            ok(getFeaturesByGeometryService.EVENT_TYPES==null,"getFeaturesByGeometryService.EVENT_TYPES");
            ok(getFeaturesByGeometryService.events==null,"getFeaturesByGeometryService.events");
            ok(getFeaturesByGeometryService.lastResult==null,"getFeaturesByGeometryService.lastResult");
            ok(getFeaturesByGeometryService.returnContent==null,"getFeaturesByGeometryService.returnContent");
            
            getFeaturesResult.destroy();
            start();
		}catch(exception){
			ok(false,"exception occurs,message is :" + exception.message);
			start();
		}
	},10000);
});

//具有attributeFilter直接返回结果情况
asyncTest("Test_GetFeaturesByGeometryServie_withattributeFilter_returnContent",function(){
	expect(11);
	var getFeaturesByGeometryService = initGetFeaturesByGeometryService();
	ok(getFeaturesByGeometryService != null, "getFeaturesByGeometryService is not null");
	equal(getFeaturesByGeometryService.url, dataServiceURL + "/featureResults.jsonp?", "url");
	var point = new SuperMap.Geometry.Point(112, 36);
	var getFeaturesByGeometryParameters = new SuperMap.REST.GetFeaturesByGeometryParameters({
	datasetNames: ["World:Countries"],
	toIndex: -1,
	attributeFilter: "SMID<100",
	spatialQueryMode:SuperMap.REST.SpatialQueryMode.INTERSECT,
	geometry:point
	});
	getFeaturesByGeometryService.events.on({'processCompleted':getFeaturesByGeometryCompleted});
	getFeaturesByGeometryService.processAsync(getFeaturesByGeometryParameters);
	setTimeout(function(){
		try{
			var getFeaturesResult = getFeaturesByGeometryService.lastResult;
			ok(getFeaturesResult != null, "getFeaturesByGeometryService.lastResult");
			equal(getFeaturesResult.featureCount,0,"getFeaturesResult.featureCount")
            ok(getFeaturesResult.features!=null,"getFeaturesResult.features");
            ok(getFeaturesResult.resourceInfo==null,"getFeaturesResult.resourceInfo is null");
			ok(getFeaturesResult.features.length == 0, "getFeaturesResult.features.length");

            getFeaturesByGeometryService.destroy();
            ok(getFeaturesByGeometryService.EVENT_TYPES==null,"getFeaturesByGeometryService.EVENT_TYPES");
            ok(getFeaturesByGeometryService.events==null,"getFeaturesByGeometryService.events");
            ok(getFeaturesByGeometryService.lastResult==null,"getFeaturesByGeometryService.lastResult");
            ok(getFeaturesByGeometryService.returnContent==null,"getFeaturesByGeometryService.returnContent");
            
            getFeaturesResult.destroy();
            start();
		}catch(exception){
			ok(false,"exception occurs,message is :" + exception.message);
			start();
		}
	},10000);
});

//测试没有传入参数时的情况
asyncTest("TestGetFeaturesByGeometryService_noParams",function(){
    var getFeaturesByGeometryService = initGetFeaturesByGeometryService();
    ok(getFeaturesByGeometryService!=null,"not null");
    equal(getFeaturesByGeometryService.url,dataServiceURL + "/featureResults.jsonp?","url");
    var getFeaturesByGeometryParameters = new SuperMap.REST.GetFeaturesByGeometryParameters({
		returnContent:false,
        datasetNames: ["World:Capitals"],
		toIndex: -1,
		spatialQueryMode:SuperMap.REST.SpatialQueryMode.CONTAIN,
    });
    getFeaturesByGeometryService.events.on({'processFailed':getFeaturesByGeometryFailed});
    getFeaturesByGeometryService.processAsync(getFeaturesByGeometryParameters);
    setTimeout(function() {
        try{
            ok(getFeaturesByGeometryService.lastResult==null,"getFeaturesByGeometryService.lastResult");
            ok(serviceFailedEventArgsSystem!=null,"serviceFailedEventArgsSystem");
            ok(serviceFailedEventArgsSystem.error!=null,"serviceFailedEventArgsSystem.error");
            equal(serviceFailedEventArgsSystem.error.code,400,"serviceFailedEventArgsSystem.error.code");
            equal(serviceFailedEventArgsSystem.error.errorMsg,"getFeatureByBuffer方法中传入的参数为空","serviceFailedEventArgsSystem.error.errorMsg");
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
asyncTest("TestgetFeaturesByGeometryService_LayerNotExist",function(){
    var getFeaturesByGeometryService = initGetFeaturesByGeometryService();
    ok(getFeaturesByGeometryService!=null,"not null");
    equal(getFeaturesByGeometryService.url,dataServiceURL + "/featureResults.jsonp?","url");
	var point = new SuperMap.Geometry.Point(112, 36);
    var getFeaturesByGeometryParameters = new SuperMap.REST.GetFeaturesByGeometryParameters({
        returnContent:false,
		datasetNames: ["World:CountriesNotExsit"],
        toIndex: -1,
		spatialQueryMode:SuperMap.REST.SpatialQueryMode.INTERSECT,
		geometry:point
    });
    
    getFeaturesByGeometryService.events.on({'processFailed':getFeaturesByGeometryFailed});
    getFeaturesByGeometryService.processAsync(getFeaturesByGeometryParameters );
    setTimeout(function() {
        try{
            ok(getFeaturesByGeometryService.lastResult==null,"getFeaturesByGeometryService.lastResult");
            ok(serviceFailedEventArgsSystem!=null,"serviceFailedEventArgsSystem");
            ok(serviceFailedEventArgsSystem.error!=null,"serviceFailedEventArgsSystem.error");
            equal(serviceFailedEventArgsSystem.error.code,400,"serviceFailedEventArgsSystem.error.code");
            equal(serviceFailedEventArgsSystem.error.errorMsg,"getFeature方法中数据集名CountriesNotExsit不存在","serviceFailedEventArgsSystem.error.errorMsg");
            
            start();
        }catch(excepion){
            ok(false,"exception occcurs,message is:"+excepion.message)
            start();
        }
    },3000);
});