module("GeoRelationAnalystService");

var completedEventArgsSystem, failedEventArgsSystem;

function generateSpatialDataCompleted(completedEventArgs){
    completedEventArgsSystem = completedEventArgs;
}

function generateSpatialDataFailed(failedEventArgs){
    failedEventArgsSystem = failedEventArgs;
}
    
function initGeoRelationAnalystService() {
    var datasetRelationService = new SuperMap.REST.GeoRelationAnalystService(GlobeParameter.spatialAnalystURL_Changchun,{
        eventListeners: {
            processCompleted: generateSpatialDataCompleted,
            processFailed: generateSpatialDataFailed
        }
    });
    return datasetRelationService;
}
    
//空间关系分析服务，比较返回结果
asyncTest("testService_returnFeature", function() {
    expect(10);
    
    var datasetRelationService = initGeoRelationAnalystService();
    var referenceFilter = new SuperMap.REST.FilterParameter({name:"Frame_R@Changchun",attributeFilter:"SMID>0"});
	var sourceFilter = new SuperMap.REST.FilterParameter({
							attributeFilter:"SMID>0"});
    datasetGeoRelationParameters = new SuperMap.REST.GeoRelationAnalystParameters({
        dataset: "Park@Changchun",
		startRecord: 0,
		expectCount: 20,
		sourceFilter: sourceFilter,
		referenceFilter: referenceFilter,
		spatialRelationType: SuperMap.REST.SpatialRelationType.INTERSECT,
		isBorderInside: true,
		returnFeature: true,
		returnGeoRelatedOnly: true
    }),
        
    ok(datasetRelationService != null, "not null");
    equal(datasetRelationService.url, GlobeParameter.spatialAnalystURL_Changchun, "url");
    
    datasetRelationService.processAsync(datasetGeoRelationParameters);
    
    setTimeout(function() {
        try{
            var datasetGeoRelationResult = datasetRelationService.lastResult;
            
            ok(datasetGeoRelationResult != null, "datasetRelationService.lastResult");  
            equal(datasetGeoRelationResult.geoRelationResults.length, 7, 
				"datasetGeoRelationResult.geoRelationResults.length");   
			ok(datasetGeoRelationResult.geoRelationResults[0] instanceof SuperMap.REST.GeoRelationResult, 
				"datasetGeoRelationResult.geoRelationResults[0] intantceof GeoRelationResult");  
			ok(datasetGeoRelationResult.geoRelationResults[0].source instanceof SuperMap.Feature, 
				"datasetGeoRelationResult.geoRelationResults[0].source intantceof Feature");   				
                        
            datasetRelationService.destroy();
            
            equal(datasetRelationService.EVENT_TYPES, null, "datasetRelationService.EVENT_TYPES");
            equal(datasetRelationService.events, null, "datasetRelationService.events");
            equal(datasetRelationService.lastResult, null, "datasetRelationService.lastResult");
            equal(datasetRelationService.eventListeners, null, "datasetRelationService.eventListeners");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 5000);
});

//空间关系分析服务，比较返回结果
asyncTest("testService_Not_returnFeature", function() {
    expect(10);
    
    var datasetRelationService = initGeoRelationAnalystService();
    var referenceFilter = new SuperMap.REST.FilterParameter({name:"Frame_R@Changchun",attributeFilter:"SMID>0"});
	var sourceFilter = new SuperMap.REST.FilterParameter({
							attributeFilter:"SMID>0"});
    datasetGeoRelationParameters = new SuperMap.REST.GeoRelationAnalystParameters({
        dataset: "Park@Changchun",
		startRecord: 0,
		expectCount: 5,
		sourceFilter: sourceFilter,
		referenceFilter: referenceFilter,
		spatialRelationType: SuperMap.REST.SpatialRelationType.INTERSECT,
		isBorderInside: true,
		returnFeature: false,
		returnGeoRelatedOnly: true
    }),
        
    ok(datasetRelationService != null, "not null");
    equal(datasetRelationService.url, GlobeParameter.spatialAnalystURL_Changchun, "url");
    
    datasetRelationService.processAsync(datasetGeoRelationParameters);
    
    setTimeout(function() {
        try{
            var datasetGeoRelationResult = datasetRelationService.lastResult;
            
            ok(datasetGeoRelationResult != null, "datasetRelationService.lastResult");  
            equal(datasetGeoRelationResult.geoRelationResults.length, 5, 
				"datasetGeoRelationResult.geoRelationResults.length");   
			ok(datasetGeoRelationResult.geoRelationResults[0] instanceof  SuperMap.REST.GeoRelationResult, 
				"datasetGeoRelationResult.geoRelationResults[0] intantceof GeoRelationResult");
			equal(datasetGeoRelationResult.geoRelationResults[0].source, 1, 
				"datasetGeoRelationResult.geoRelationResults[0].source is Integer");   				
                        
            datasetRelationService.destroy();
            equal(datasetRelationService.EVENT_TYPES, null, "datasetRelationService.EVENT_TYPES");
            equal(datasetRelationService.events, null, "datasetRelationService.events");
            equal(datasetRelationService.lastResult, null, "datasetRelationService.lastResult");
            equal(datasetRelationService.eventListeners, null, "datasetRelationService.eventListeners");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 5000);
});

//空间关系分析服务，比较返回结果
asyncTest("testService_failed", function() {
    
    var datasetRelationService = initGeoRelationAnalystService();
    var referenceFilter = new SuperMap.REST.FilterParameter({attributeFilter:"SMID>0"});
	var sourceFilter = new SuperMap.REST.FilterParameter({
							attributeFilter:"SMID>0"});
    datasetGeoRelationParameters = new SuperMap.REST.GeoRelationAnalystParameters({
        dataset: "Park@Changchun",
		sourceFilter: sourceFilter,
		referenceFilter: referenceFilter,
		spatialRelationType: SuperMap.REST.SpatialRelationType.INTERSECT,
		isBorderInside: true,
		returnFeature: false,
		returnGeoRelatedOnly: true
    }),
        
    ok(datasetRelationService != null, "not null");
    equal(datasetRelationService.url, GlobeParameter.spatialAnalystURL_Changchun, "url");
    
    datasetRelationService.processAsync(datasetGeoRelationParameters);
    
    setTimeout(function() {
        try{
            var datasetGeoRelationResult = datasetRelationService.lastResult;
            
            ok(datasetGeoRelationResult == null, "datasetRelationService.lastResult");  
			ok(failedEventArgsSystem != null, "failedEventArgsSystem");
            ok(failedEventArgsSystem.error != null, "failedEventArgsSystem.error");
            equal(failedEventArgsSystem.error.code, 400, "failedEventArgsSystem.error.code");
            equal(failedEventArgsSystem.error.errorMsg, "数据集标识为null。", "failedEventArgsSystem.error.errorMsg");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 5000);
});


