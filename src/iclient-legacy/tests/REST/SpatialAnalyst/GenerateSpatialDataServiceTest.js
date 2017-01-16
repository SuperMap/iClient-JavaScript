module("GenerateSpatialDataService");

var completedEventArgsSystem, failedEventArgsSystem;

function generateSpatialDataCompleted(completedEventArgs){
    completedEventArgsSystem = completedEventArgs;
}

function generateSpatialDataFailed(failedEventArgs){
    failedEventArgsSystem = failedEventArgs;
}
    
function initGenerateSpatialDataService() {
    var generateSpatialDataService = new SuperMap.REST.GenerateSpatialDataService(GlobeParameter.spatialAnalystURL_Changchun,{
        eventListeners: {
            processCompleted: generateSpatialDataCompleted,
            processFailed: generateSpatialDataFailed
        }
    });
    return generateSpatialDataService;
}
    
//点事件表数据集动态分段,并设置期望返回记录数2
asyncTest("PointEventTable", function() {
    expect(10);
    
    var generateSpatialDataService = initGenerateSpatialDataService();
    dataRtnOption = new SuperMap.REST.DataReturnOption({
        expectCount: 2,
        dataset: "generateSpatialData",
        deleteExistResultDataset: true,
        dataReturnMode: SuperMap.REST.DataReturnMode.RECORDSET_ONLY
    }),
    generateSpatialDataParameters = new SuperMap.REST.GenerateSpatialDataParameters({
        routeTable: "RouteDT_road@Changchun",
        routeIDField: "RouteID",
        eventTable: "PointEventTabDT@Changchun",
        eventRouteIDField: "RouteID",
        measureField: "measure",
        measureStartField: null,
        measureEndField: null,
        measureOffsetField: "",
        errorInfoField: "",
        dataReturnOption: dataRtnOption
    }),
        
    ok(generateSpatialDataService != null, "not null");
    equal(generateSpatialDataService.url, GlobeParameter.spatialAnalystURL_Changchun, "url");
    
    generateSpatialDataService.processAsync(generateSpatialDataParameters);
    
    setTimeout(function() {
        try{
            var generateSpatialDataResult = generateSpatialDataService.lastResult;
            
            ok(generateSpatialDataResult != null, "generateSpatialDataService.lastResult");  
            ok(generateSpatialDataResult.recordset != null, "generateSpatialDataResult.recordset");
			equal(generateSpatialDataResult.recordset.features.length, 2, "generateSpatialDataResult.recordset.features.length");
            equal(generateSpatialDataResult.succeed, true, "generateSpatialDataResult.succeed");            
                        
            generateSpatialDataService.destroy();
            
            equal(generateSpatialDataService.EVENT_TYPES, null, "generateSpatialDataService.EVENT_TYPES");
            equal(generateSpatialDataService.events, null, "generateSpatialDataService.events");
            equal(generateSpatialDataService.lastResult, null, "generateSpatialDataService.lastResult");
            equal(generateSpatialDataService.eventListeners, null, "generateSpatialDataService.eventListeners");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 20000);
});

//点事件表数据集动态分段,设置deleteExistResultDataset=false，并且设置一个已存在的数据集名称
asyncTest("PointEventTable_deleteExistResultDataset_false", function() {
    expect(3);
    
    var generateSpatialDataService = initGenerateSpatialDataService();
    dataRtnOption = new SuperMap.REST.DataReturnOption({
        expectCount: 2,
        dataset: "generateSpatialData",
        deleteExistResultDataset: false,
        dataReturnMode: SuperMap.REST.DataReturnMode.DATASET_AND_RECORDSET
    }),
    generateSpatialDataParameters = new SuperMap.REST.GenerateSpatialDataParameters({
        routeTable: "RouteDT_road@Changchun",
        routeIDField: "RouteID",
        eventTable: "PointEventTabDT@Changchun",
        eventRouteIDField: "RouteID",
        measureField: "measure",
        measureStartField: null,
        measureEndField: null,
        measureOffsetField: "",
        errorInfoField: "",
        dataReturnOption: dataRtnOption
    }),
        
    ok(generateSpatialDataService != null, "not null");
    equal(generateSpatialDataService.url, GlobeParameter.spatialAnalystURL_Changchun, "url");
    
    generateSpatialDataService.processAsync(generateSpatialDataParameters);
    
    setTimeout(function() {
        try{
            var generateSpatialDataResult = failedEventArgsSystem;
            ok(generateSpatialDataResult.error != null, generateSpatialDataResult.error.errorMsg);
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 20000);
});

//线事件表数据集动态分段,并设置期望返回记录数2
asyncTest("LinearEventTable", function() {
    expect(10);
    
    var generateSpatialDataService = initGenerateSpatialDataService();
    dataRtnOption = new SuperMap.REST.DataReturnOption({
        expectCount: 2,
        dataset: "generateSpatialData",
        deleteExistResultDataset: true,
        dataReturnMode: SuperMap.REST.DataReturnMode.RECORDSET_ONLY
    }),
    generateSpatialDataParameters = new SuperMap.REST.GenerateSpatialDataParameters({
        routeTable: "RouteDT_road@Changchun",
        routeIDField: "RouteID",
        eventTable: "LinearEventTabDT@Changchun",
        eventRouteIDField: "RouteID",
        measureField: "",
        measureStartField: "LineMeasureFrom",
        measureEndField: "LineMeasureTo",
        measureOffsetField: "",
        errorInfoField: "",
        dataReturnOption: dataRtnOption
    }),
        
    ok(generateSpatialDataService != null, "not null");
    equal(generateSpatialDataService.url, GlobeParameter.spatialAnalystURL_Changchun, "url");
    
    generateSpatialDataService.processAsync(generateSpatialDataParameters);
    
    setTimeout(function() {
        try{
            var generateSpatialDataResult = generateSpatialDataService.lastResult;
            
            ok(generateSpatialDataResult != null, "generateSpatialDataService.lastResult");  
            ok(generateSpatialDataResult.recordset != null, "generateSpatialDataResult.recordset");
			equal(generateSpatialDataResult.recordset.features.length, 2, "generateSpatialDataResult.recordset.features.length");
            equal(generateSpatialDataResult.succeed, true, "generateSpatialDataResult.succeed");            
                        
            generateSpatialDataService.destroy();
            
            equal(generateSpatialDataService.EVENT_TYPES, null, "generateSpatialDataService.EVENT_TYPES");
            equal(generateSpatialDataService.events, null, "generateSpatialDataService.events");
            equal(generateSpatialDataService.lastResult, null, "generateSpatialDataService.lastResult");
            equal(generateSpatialDataService.eventListeners, null, "generateSpatialDataService.eventListeners");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 20000);
});

//线事件表数据集动态分段,设置deleteExistResultDataset=false，并且设置一个已存在的数据集名称
asyncTest("LinearEventTable_deleteExistResultDataset_false", function() {
    expect(3);
    
    var generateSpatialDataService = initGenerateSpatialDataService();
    dataRtnOption = new SuperMap.REST.DataReturnOption({
        expectCount: 1000,
        dataset: "generateSpatialData",
        deleteExistResultDataset: false,
        dataReturnMode: SuperMap.REST.DataReturnMode.DATASET_AND_RECORDSET
    }),
    generateSpatialDataParameters = new SuperMap.REST.GenerateSpatialDataParameters({
        routeTable: "RouteDT_road@Changchun",
        routeIDField: "RouteID",
        eventTable: "LinearEventTabDT@Changchun",
        eventRouteIDField: "RouteID",
        measureField: "",
        measureStartField: "LineMeasureFrom",
        measureEndField: "",
        measureOffsetField: "",
        errorInfoField: "",
        dataReturnOption: dataRtnOption
    }),
        
    ok(generateSpatialDataService != null, "not null");
    equal(generateSpatialDataService.url, GlobeParameter.spatialAnalystURL_Changchun, "url");
    
    generateSpatialDataService.processAsync(generateSpatialDataParameters);
    
    setTimeout(function() {
        try{
            var generateSpatialDataResult = failedEventArgsSystem;
            ok(generateSpatialDataResult.error != null, generateSpatialDataResult.error.errorMsg);
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 20000);
});


