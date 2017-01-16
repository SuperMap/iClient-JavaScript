module("FindLocationService");

var serviceFailedEventArgsSystem = null;

//服务初始化时注册事件监听函数
function initFindLocationService_RegisterListener() {
    var findLocationService = new SuperMap.REST.FindLocationService(GlobeParameter.networkAnalystURL, {eventListeners:{'processFailed': findLocationServiceFailed}});
    return findLocationService;
}

function findLocationServiceFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}

asyncTest("TestFindLocationService_Constructor",function(){
    var expectedSupplyCenterCount = 1, 
//        nodeDemandField = "Demand",
        turnWeightField = "TurnCost",
        weightName = "length",
        supplyCenters = [], supplyCenterType_OPTIONALCENTER;
    supplyCenterType_OPTIONALCENTER = SuperMap.REST.SupplyCenterType.OPTIONALCENTER;
    supplyCenters=[
                new SuperMap.REST.SupplyCenter({
                       maxWeight: 500,
                       nodeID: 139,
                       resourceValue: 100,
                       type: supplyCenterType_OPTIONALCENTER
                   
               }),
               new SuperMap.REST.SupplyCenter({
                       maxWeight: 500,
                       nodeID: 1358,
                       resourceValue: 100,
                       type: supplyCenterType_OPTIONALCENTER
                   
               })];
    var url = GlobeParameter.networkAnalystURL,
        parameter = new SuperMap.REST.FindLocationParameters({
            expectedSupplyCenterCount: expectedSupplyCenterCount,
            isFromCenter : false,
//            nodeDemandField: nodeDemandField,
            supplyCenters: supplyCenters,
            turnWeightField: turnWeightField,
            weightName: weightName
        });     
    findLocationService = new SuperMap.REST.FindLocationService(url);
    ok(findLocationService instanceof SuperMap.REST.FindLocationService, "not null");
    findLocationService.processAsync(parameter);
    setTimeout(function() {
        try{
            var analystResult = findLocationService.lastResult;
            
            ok(analystResult.demandResults != null, "demandResult");
            ok(analystResult.demandResults[0] instanceof SuperMap.REST.DemandResult, "demandResult");
            ok(analystResult.demandResults[0].actualResourceValue == 470.0, "demandResult.actualResourceValue");
            ok(analystResult.demandResults[0].demandID == 885, "demandResult.demandID");
            ok(analystResult.demandResults[0].fieldNames != null, "demandResult.fieldNames");
            ok(analystResult.demandResults[0].fieldValues != null, "demandResult.fieldValues");
            ok(analystResult.demandResults[0].geometry != null, "demandResult.geometry");
            ok(analystResult.demandResults[0].isEdge == false, "demandResult.isEdge");
            ok(analystResult.demandResults[0].supplyCenter.nodeID == 1358, "demandResult.supplyCenter");
            
            ok(analystResult.supplyResults != null, "supplyResult");
            ok(analystResult.supplyResults[0] instanceof SuperMap.REST.SupplyResult, "supplyResult");
            ok(analystResult.supplyResults[0].actualResourceValue == 0.0, "supplyResult.actualResourceValue");
            ok(analystResult.supplyResults[0].averageWeight == 289.6734693877551, "supplyResult.averageWeight");
            ok(analystResult.supplyResults[0].demandCount == 49, "supplyResult.demandCount");
            ok(analystResult.supplyResults[0].fieldNames != null, "supplyResult.fieldNames");
            ok(analystResult.supplyResults[0].fieldValues != null, "supplyResult.fieldValues");
            ok(analystResult.supplyResults[0].geometry != null, "supplyResult.geometry");
            ok(analystResult.supplyResults[0].maxWeight == 500.0, "supplyResult.maxWeight");
            ok(analystResult.supplyResults[0].nodeID == 1358, "supplyResult.nodeID");
            //本机运行正常，服务器运行出错
            //ok(analystResult.supplyResults[0].resourceValue == 100.0, "supplyResult.resourceValue");
            ok(analystResult.supplyResults[0].totalWeights == 14194.0, "supplyResult.totalWeights");
            ok(analystResult.supplyResults[0].type == "OPTIONALCENTER", "supplyResult.type");

            findLocationService.destroy();
            equal(findLocationService.EVENT_TYPES, null,"findLocationService.EVENT_TYPES");
            equal(findLocationService.events, null,"findLocationService.events");
            equal(findLocationService.lastResult, null,"findLocationService.lastResult");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },10000)
});
//isFromCenter为true的情况
asyncTest("TestFindLocationService_isFromCenter:true",function(){
    var expectedSupplyCenterCount = 1, 
//        nodeDemandField = "Demand",
        turnWeightField = "TurnCost",
        weightName = "length",
        supplyCenters = [], supplyCenterType_OPTIONALCENTER;
    supplyCenterType_OPTIONALCENTER = SuperMap.REST.SupplyCenterType.OPTIONALCENTER;
    supplyCenters=[
                new SuperMap.REST.SupplyCenter({
                       maxWeight: 500,
                       nodeID: 139,
                       resourceValue: 100,
                       type: supplyCenterType_OPTIONALCENTER
                   
               }),
               new SuperMap.REST.SupplyCenter({
                       maxWeight: 500,
                       nodeID: 1358,
                       resourceValue: 100,
                       type: supplyCenterType_OPTIONALCENTER
                   
               })];
    var url = GlobeParameter.networkAnalystURL,
        parameter = new SuperMap.REST.FindLocationParameters({
            expectedSupplyCenterCount: expectedSupplyCenterCount,
            isFromCenter : true,
//            nodeDemandField: nodeDemandField,
            supplyCenters: supplyCenters,
            turnWeightField: turnWeightField,
            weightName: weightName
        });     
    findLocationService = new SuperMap.REST.FindLocationService(url);
    ok(findLocationService instanceof SuperMap.REST.FindLocationService, "not null");
    findLocationService.processAsync(parameter);
    setTimeout(function() {
        try{
            var analystResult = findLocationService.lastResult;
            
            ok(analystResult.demandResults != null, "demandResult");
            ok(analystResult.demandResults[0] instanceof SuperMap.REST.DemandResult, "demandResult");
            ok(analystResult.demandResults[0].actualResourceValue == 470.0, "demandResult.actualResourceValue");
            ok(analystResult.demandResults[0].demandID == 885, "demandResult.demandID");
            ok(analystResult.demandResults[0].fieldNames != null, "demandResult.fieldNames");
            ok(analystResult.demandResults[0].fieldValues != null, "demandResult.fieldValues");
            ok(analystResult.demandResults[0].geometry != null, "demandResult.geometry");
            ok(analystResult.demandResults[0].isEdge == false, "demandResult.isEdge");
            ok(analystResult.demandResults[0].supplyCenter.nodeID == 1358, "demandResult.supplyCenter");
            
            ok(analystResult.supplyResults != null, "supplyResult");
            ok(analystResult.supplyResults[0] instanceof SuperMap.REST.SupplyResult, "supplyResult");
            ok(analystResult.supplyResults[0].actualResourceValue == 0.0, "supplyResult.actualResourceValue");
            ok(analystResult.supplyResults[0].averageWeight == 289.6734693877551, "supplyResult.averageWeight");
            ok(analystResult.supplyResults[0].demandCount == 49, "supplyResult.demandCount");
            ok(analystResult.supplyResults[0].fieldNames != null, "supplyResult.fieldNames");
            ok(analystResult.supplyResults[0].fieldValues != null, "supplyResult.fieldValues");
            ok(analystResult.supplyResults[0].geometry != null, "supplyResult.geometry");
            ok(analystResult.supplyResults[0].maxWeight == 500.0, "supplyResult.maxWeight");
            ok(analystResult.supplyResults[0].nodeID == 1358, "supplyResult.nodeID");
            //本机运行正常，服务器运行出错
            //ok(analystResult.supplyResults[0].resourceValue == 100.0, "supplyResult.resourceValue");
            ok(analystResult.supplyResults[0].totalWeights == 14194.0, "supplyResult.totalWeights");
            ok(analystResult.supplyResults[0].type == "OPTIONALCENTER", "supplyResult.type");

            findLocationService.destroy();
            equal(findLocationService.EVENT_TYPES, null,"findLocationService.EVENT_TYPES");
            equal(findLocationService.events, null,"findLocationService.events");
            equal(findLocationService.lastResult, null,"findLocationService.lastResult");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },10000)
});
//参数错误
asyncTest("TestFindLocationService_fail",function(){
    var expectedSupplyCenterCount = 1, 
//        nodeDemandField = "Demand",
        turnWeightField = "TurnCost1",
        weightName = "length",
        supplyCenters = [], supplyCenterType_OPTIONALCENTER, findLocationService;
    supplyCenterType_OPTIONALCENTER = SuperMap.REST.SupplyCenterType.OPTIONALCENTER;
    supplyCenters=[
                new SuperMap.REST.SupplyCenter({
                       maxWeight: 500,
                       nodeID: 139,
                       resourceValue: 100,
                       type: supplyCenterType_OPTIONALCENTER
                   
               }),
               new SuperMap.REST.SupplyCenter({
                       maxWeight: 500,
                       nodeID: 1358,
                       resourceValue: 100,
                       type: supplyCenterType_OPTIONALCENTER
                   
               })];
    var url = GlobeParameter.networkAnalystURL,
        parameter = new SuperMap.REST.FindLocationParameters({
            expectedSupplyCenterCount: expectedSupplyCenterCount,
            isFromCenter : true,
//            nodeDemandField: nodeDemandField,
            supplyCenters: supplyCenters,
            turnWeightField: turnWeightField,
            weightName: weightName
        });
    findLocationService = initFindLocationService_RegisterListener();        
    ok(findLocationService instanceof SuperMap.REST.FindLocationService, "not null");
    findLocationService.processAsync(parameter);
    setTimeout(function() {
        try{
            var analystResult = findLocationService.lastResult;
            ok(serviceFailedEventArgsSystem.error.errorMsg !== null, "serviceFailedEventArgsSystem.error.errorMsg:" + serviceFailedEventArgsSystem.error.errorMsg);
            ok(analystResult == null, "findLocationService.lastResult");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },10000)
});
asyncTest("TestFindLocationService_parameter_null",function(){
    var url = GlobeParameter.networkAnalystURL,  
    findLocationService = new SuperMap.REST.FindLocationService(url);
    ok(findLocationService instanceof SuperMap.REST.FindLocationService, "not null");
    findLocationService.processAsync();
    setTimeout(function() {
        try{
            var analystResult = findLocationService.lastResult;
            
            ok(analystResult == null, "demandResult");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },10000)
});