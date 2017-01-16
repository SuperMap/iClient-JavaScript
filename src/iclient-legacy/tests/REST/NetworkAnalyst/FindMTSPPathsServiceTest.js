module("FindMTSPPathsService");
var serviceFailedEventArgsSystem = null;
//基本测试
asyncTest("TestFindMTSPPathsService_Constructor",function(){
    var url = GlobeParameter.networkAnalystURL,
        centerArray = [new SuperMap.Geometry.Point(3000,-3000), new SuperMap.Geometry.Point(3500,-2000)],
        nodeArray = [new SuperMap.Geometry.Point(5600, -3600),
            new SuperMap.Geometry.Point(5000, -4600),
            new SuperMap.Geometry.Point(6000,-4600)
        ],
        findMTSPPathsService, parameter, analystParameter, resultSetting;
    resultSetting = new SuperMap.REST.TransportationAnalystResultSetting({
        returnEdgeFeatures: true,
        returnEdgeGeometry: true,
        returnEdgeIDs: true,
        returnNodeFeatures: true,
        returnNodeGeometry: true,
        returnNodeIDs: true,
        returnPathGuides: true,
        returnRoutes: true
    });
    analystParameter = new SuperMap.REST.TransportationAnalystParameter({
        resultSetting: resultSetting,
        weightFieldName: "length"
    });
    parameter = new SuperMap.REST.FindMTSPPathsParameters({
        isAnalyzeById: false,
        centers: centerArray,
        nodes: nodeArray,
        parameter: analystParameter,
        hasLeastTotalCost:false,
        
    });     
    findMTSPPathsService = new SuperMap.REST.FindMTSPPathsService(url);
    ok(findMTSPPathsService instanceof SuperMap.REST.FindMTSPPathsService, "this service is FintMTSPPathService");
    findMTSPPathsService.processAsync(parameter);
    setTimeout(function() {
        try{
            var analystResult = findMTSPPathsService.lastResult;
            ok(analystResult.pathList != null, "pathListNotNull");
            ok(analystResult.pathList[0] instanceof SuperMap.REST.MTSPPath, "pathList is MTSPPath Array");
            ok(analystResult.pathList[0].edgeFeatures != null, "pathList.edgeFeatures");
            equal(analystResult.pathList[0].edgeIDs[0], 4664, "pathList.edgeIDs");
            ok(analystResult.pathList[0].nodeFeatures != null, "pathList.nodeFeatures");
            equal(analystResult.pathList[0].nodeIDs[0], 2128, "pathList.nodeIDs");
            ok(analystResult.pathList[0].pathGuideItems != null, "pathList.pathGuideItems");
            ok(analystResult.pathList[0].route != null, "pathList.route");
            equal(analystResult.pathList[0].stopWeights[0], 3960.6991409433713, "pathList.stopWeights");
            equal(analystResult.pathList[0].stopIndexes[0], 2, "pathList.stopIndexes");
            equal(analystResult.pathList[0].weight, 7921.398281886743, "pathList.weight");
            findMTSPPathsService.destroy();
            equal(findMTSPPathsService.EVENT_TYPES, null,"findMTSPPathsService.EVENT_TYPES");
            equal(findMTSPPathsService.events, null,"findMTSPPathsService.events");
            equal(findMTSPPathsService.lastResult, null,"findMTSPPathsService.lastResult");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

//测试hasLeastTotalCost为true
asyncTest("TestFindMTSPPathsService_hasLeastTotalCost:true",function(){
    var url = GlobeParameter.networkAnalystURL,
        centerArray = [new SuperMap.Geometry.Point(3000,-3000), new SuperMap.Geometry.Point(3500,-2000)],
        nodeArray = [new SuperMap.Geometry.Point(5600, -3600),
            new SuperMap.Geometry.Point(5000, -4600),
            new SuperMap.Geometry.Point(6000,-4600)
        ],
        findMTSPPathsService, parameter, analystParameter, resultSetting;
    resultSetting = new SuperMap.REST.TransportationAnalystResultSetting({
        returnEdgeFeatures: true,
        returnEdgeGeometry: true,
        returnEdgeIDs: true,
        returnNodeFeatures: true,
        returnNodeGeometry: true,
        returnNodeIDs: true,
        returnPathGuides: true,
        returnRoutes: true
    });
    analystParameter = new SuperMap.REST.TransportationAnalystParameter({
        resultSetting: resultSetting,
        weightFieldName: "length"
    });
    parameter = new SuperMap.REST.FindMTSPPathsParameters({
        isAnalyzeById: false,
        centers: centerArray,
        nodes: nodeArray,
        parameter: analystParameter,
        hasLeastTotalCost:true,
        
    });     
    findMTSPPathsService = new SuperMap.REST.FindMTSPPathsService(url);
    ok(findMTSPPathsService instanceof SuperMap.REST.FindMTSPPathsService, "this service is FintMTSPPathService");
    findMTSPPathsService.processAsync(parameter);
    setTimeout(function() {
        try{
            var analystResult = findMTSPPathsService.lastResult;
            ok(analystResult.pathList != null, "pathListNotNull");
            ok(analystResult.pathList[0] instanceof SuperMap.REST.MTSPPath, "pathList is MTSPPath Array");
            ok(analystResult.pathList[0].edgeFeatures != null, "pathList.edgeFeatures");
            equal(analystResult.pathList[0].edgeIDs[0], 4664, "pathList.edgeIDs");
            ok(analystResult.pathList[0].nodeFeatures != null, "pathList.nodeFeatures");
            equal(analystResult.pathList[0].nodeIDs[0], 2128, "pathList.nodeIDs");
            ok(analystResult.pathList[0].pathGuideItems != null, "pathList.pathGuideItems");
            ok(analystResult.pathList[0].route != null, "pathList.route");
            equal(analystResult.pathList[0].stopWeights[0], 3255.101675323638, "pathList.stopWeights");
            equal(analystResult.pathList[0].stopIndexes[0], 1, "pathList.stopIndexes");
            equal(analystResult.pathList[0].weight, 8782.556125048039, "pathList.weight");
            findMTSPPathsService.destroy();
            equal(findMTSPPathsService.EVENT_TYPES, null,"findMTSPPathsService.EVENT_TYPES");
            equal(findMTSPPathsService.events, null,"findMTSPPathsService.events");
            equal(findMTSPPathsService.lastResult, null,"findMTSPPathsService.lastResult");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

//测试传入参数为id。
asyncTest("TestFindMTSPPathsService_isAnalyzeById",function(){
    var url = GlobeParameter.networkAnalystURL,
        centerArray = [2,5,7],
        nodeArray = [1,6,21],
        findMTSPPathsService, parameter, analystParameter, resultSetting;
    resultSetting = new SuperMap.REST.TransportationAnalystResultSetting({
        returnEdgeFeatures: true,
        returnEdgeGeometry: true,
        returnEdgeIDs: true,
        returnNodeFeatures: true,
        returnNodeGeometry: true,
        returnNodeIDs: true,
        returnPathGuides: true,
        returnRoutes: true
    });
    analystParameter = new SuperMap.REST.TransportationAnalystParameter({
        resultSetting: resultSetting,
        weightFieldName: "length"
    });
    parameter = new SuperMap.REST.FindMTSPPathsParameters({
        isAnalyzeById: true,
        centers: centerArray,
        nodes: nodeArray,
        parameter: analystParameter,
        hasLeastTotalCost:true,
        
    });     
    findMTSPPathsService = new SuperMap.REST.FindMTSPPathsService(url);
    ok(findMTSPPathsService instanceof SuperMap.REST.FindMTSPPathsService, "this service is FintMTSPPathService");
    findMTSPPathsService.processAsync(parameter);
    setTimeout(function() {
        try{
            var analystResult = findMTSPPathsService.lastResult;
            ok(analystResult.pathList != null, "pathListNotNull");
            ok(analystResult.pathList[0] instanceof SuperMap.REST.MTSPPath, "pathList is MTSPPath Array");
            ok(analystResult.pathList[0].edgeFeatures != null, "pathList.edgeFeatures");
            equal(analystResult.pathList[0].edgeIDs[0], 8366, "pathList.edgeIDs");
            ok(analystResult.pathList[0].nodeFeatures != null, "pathList.nodeFeatures");
            equal(analystResult.pathList[0].nodeIDs[0], 2, "pathList.nodeIDs");
            //ok(analystResult.pathList[0].pathGuideItems != null, "pathList.pathGuideItems");
            ok(analystResult.pathList[0].route != null, "pathList.route");
            equal(analystResult.pathList[0].stopWeights[0], 125.0, "pathList.stopWeights");
            equal(analystResult.pathList[0].stopIndexes[0], 0, "pathList.stopIndexes");
            equal(analystResult.pathList[0].weight, 250.0, "pathList.weight");
            findMTSPPathsService.destroy();
            equal(findMTSPPathsService.EVENT_TYPES, null,"findMTSPPathsService.EVENT_TYPES");
            equal(findMTSPPathsService.events, null,"findMTSPPathsService.events");
            equal(findMTSPPathsService.lastResult, null,"findMTSPPathsService.lastResult");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

//测试传入参数为id，但是传入为空
function initFindMTSPPathService_RegisterListener() {
    findMTSPPathsService = new SuperMap.REST.FindMTSPPathsService(GlobeParameter.networkAnalystURL, {eventListeners:{'processFailed':FindMTSPPathServiceFailed}});
    return findMTSPPathsService;
}

function FindMTSPPathServiceFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem=serviceFailedEventArgs;
}

asyncTest("TestFindMTSPPathsService_isAnalyzeById but null",function(){
    var findMTSPPathsService = initFindMTSPPathService_RegisterListener(),
        url = GlobeParameter.networkAnalystURL,
        centerArray = [new SuperMap.Geometry.Point(3000,-3000), new SuperMap.Geometry.Point(3500,-2000)],
        nodeArray = [new SuperMap.Geometry.Point(5600, -3600),
            new SuperMap.Geometry.Point(5000, -4600),
            new SuperMap.Geometry.Point(6000,-4600)
        ],
        findMTSPPathsService, parameter, analystParameter, resultSetting;
    resultSetting = new SuperMap.REST.TransportationAnalystResultSetting({
        returnEdgeFeatures: true,
        returnEdgeGeometry: true,
        returnEdgeIDs: true,
        returnNodeFeatures: true,
        returnNodeGeometry: true,
        returnNodeIDs: true,
        returnPathGuides: true,
        returnRoutes: true
    });
    analystParameter = new SuperMap.REST.TransportationAnalystParameter({
        resultSetting: resultSetting,
        weightFieldName: "length"
    });
    parameter = new SuperMap.REST.FindMTSPPathsParameters({
        isAnalyzeById: true,
        centers: centerArray,
        nodes: nodeArray,
        parameter: analystParameter,
        hasLeastTotalCost:true,
        
    });
    ok(findMTSPPathsService instanceof SuperMap.REST.FindMTSPPathsService, "this service is FintMTSPPathService");
    findMTSPPathsService.processAsync(parameter);
    setTimeout(function() {
        try{
            var analystResult = findMTSPPathsService.lastResult;
            ok(analystResult == null, "pathList");
            equal(serviceFailedEventArgsSystem.error.errorMsg,"参数centers 不是有效的JSON 字符串对象","serviceFailedEventArgsSystem.error.errorMsg");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

//参数错误
function initFindMTSPPathService_RegisterListener() {
    findMTSPPathsService = new SuperMap.REST.FindMTSPPathsService(GlobeParameter.networkAnalystURL, {eventListeners:{'processFailed':FindMTSPPathServiceFailed}});
    return findMTSPPathsService;
}

function FindMTSPPathServiceFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem=serviceFailedEventArgs;
}

asyncTest("TestFindPathService_fail",function(){
    var findMTSPPathsService = initFindMTSPPathService_RegisterListener(),
        url = GlobeParameter.networkAnalystURL,
        centerArray = [new SuperMap.Geometry.Point(3000,-3000), new SuperMap.Geometry.Point(3500,-2000)],
        nodeArray = [new SuperMap.Geometry.Point(5600, -3600),
            new SuperMap.Geometry.Point(5000, -4600),
            new SuperMap.Geometry.Point(6000,-4600)
        ],
        findMTSPPathsService, parameter, analystParameter, resultSetting;
    resultSetting = new SuperMap.REST.TransportationAnalystResultSetting({
        returnEdgeFeatures: true,
        returnEdgeGeometry: true,
        returnEdgeIDs: true,
        returnNodeFeatures: true,
        returnNodeGeometry: true,
        returnNodeIDs: true,
        returnPathGuides: true,
        returnRoutes: true
    });
    analystParameter = new SuperMap.REST.TransportationAnalystParameter({
        resultSetting: resultSetting,
        weightFieldName: "TurnCost1"
    });
    parameter = new SuperMap.REST.FindMTSPPathsParameters({
        isAnalyzeById: false,
        centers: centerArray,
        nodes: nodeArray,
        parameter: analystParameter,
        hasLeastTotalCost:true,
        
    });
    ok(findMTSPPathsService instanceof SuperMap.REST.FindMTSPPathsService, "this service is FintMTSPPathService");
    findMTSPPathsService.processAsync(parameter);
    setTimeout(function() {
        try{
            var analystResult = findMTSPPathsService.lastResult;
            ok(analystResult == null, "pathList");
			ok(serviceFailedEventArgsSystem.error.errorMsg !== null, "serviceFailedEventArgsSystem.error.errorMsg:" + serviceFailedEventArgsSystem.error.errorMsg);
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

asyncTest("TestFindMTSPPathsService_Parameters_null",function(){
    var url = GlobeParameter.networkAnalystURL;  
    findMTSPPathsService = new SuperMap.REST.FindMTSPPathsService(url);
    ok(findMTSPPathsService instanceof SuperMap.REST.FindMTSPPathsService, "this service is FintMTSPPathService");
    findMTSPPathsService.processAsync();
    setTimeout(function() {
        try{
            var analystResult = findMTSPPathsService.lastResult;
            ok(analystResult== null, "analystResult");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

asyncTest("TestFindMTSPPathsService_AnalyzeById_null",function(){
    var url = GlobeParameter.networkAnalystURL,
        centerArray = [new SuperMap.Geometry.Point(3000,-3000), new SuperMap.Geometry.Point(3500,-2000)],
        nodeArray = [new SuperMap.Geometry.Point(5600, -3600),
            new SuperMap.Geometry.Point(5000, -4600),
            new SuperMap.Geometry.Point(6000,-4600)
        ],
        findMTSPPathsService, parameter, analystParameter, resultSetting;
    resultSetting = new SuperMap.REST.TransportationAnalystResultSetting({
        returnEdgeFeatures: true,
        returnEdgeGeometry: true,
        returnEdgeIDs: true,
        returnNodeFeatures: true,
        returnNodeGeometry: true,
        returnNodeIDs: true,
        returnPathGuides: true,
        returnRoutes: true
    });
    analystParameter = new SuperMap.REST.TransportationAnalystParameter({
        resultSetting: resultSetting,
        weightFieldName: "length"
    });
    parameter = new SuperMap.REST.FindMTSPPathsParameters({
        isAnalyzeById: "AnalyzeById",
        centers: centerArray,
        nodes: nodeArray,
        parameter: analystParameter,
        hasLeastTotalCost:true,
        
    });     
    findMTSPPathsService = new SuperMap.REST.FindMTSPPathsService(url);
    ok(findMTSPPathsService instanceof SuperMap.REST.FindMTSPPathsService, "this service is FintMTSPPathService");
    findMTSPPathsService.processAsync(parameter);
    setTimeout(function() {
        try{
            var analystResult = findMTSPPathsService.lastResult;
            ok(analystResult == null, "analystResult");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});