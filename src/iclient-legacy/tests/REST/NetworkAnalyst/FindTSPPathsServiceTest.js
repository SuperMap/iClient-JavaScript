module("FindTSPPathsService");

var serviceFailedEventArgsSystem = null;

//服务初始化时注册事件监听函数
function initFindTSPPathService_RegisterListener() {
    findTSPPathService = new SuperMap.REST.FindTSPPathsService(GlobeParameter.networkAnalystURL, {eventListeners:{'processFailed':FindTSPPathServiceFailed}});
    return findTSPPathService;
}

function FindTSPPathServiceFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem=serviceFailedEventArgs;
}

//测试正常情况
asyncTest("TestFindTSPPathsService_Constructor",function(){
    var url = GlobeParameter.networkAnalystURL,
        nodeArray = [new SuperMap.Geometry.Point(5627.7550668827, -3627.4849836293),
            new SuperMap.Geometry.Point(5018.1469160422, -4638.5424045354),
            new SuperMap.Geometry.Point(6133.2837773358,-4645.9766502774)
        ],
        findTSPPathsService, parameter, analystParameter, resultSetting;
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
    parameter = new SuperMap.REST.FindTSPPathsParameters({
        isAnalyzeById: false,
        nodes: nodeArray,
        endNodeAssigned: false,
        parameter: analystParameter
    });     
    findTSPPathsService = new SuperMap.REST.FindTSPPathsService(url);
    ok(findTSPPathsService instanceof SuperMap.REST.FindTSPPathsService, "not null");
    findTSPPathsService.processAsync(parameter);
    setTimeout(function() {
        try{
            var analystResult = findTSPPathsService.lastResult;
            ok(analystResult.tspPathList != null, "tspPathList");
            ok(analystResult.tspPathList[0] instanceof SuperMap.REST.TSPPath, "tsppath");
            ok(analystResult.tspPathList[0].edgeFeatures != null, "tsppath.edgeFeatures");
            equal(analystResult.tspPathList[0].edgeIDs[0], 2886, "tsppath.edgeIDs");
            ok(analystResult.tspPathList[0].nodeFeatures != null, "tsppath.nodeFeatures");
            equal(analystResult.tspPathList[0].nodeIDs[0], 3030, "tsppath.nodeIDs");
            ok(analystResult.tspPathList[0].pathGuideItems != null, "tsppath.pathGuideItems");
            ok(analystResult.tspPathList[0].route != null, "tsppath.route");
            equal(analystResult.tspPathList[0].stopWeights[0], 1204.9373071047896, "tsppath.stopWeights");
            equal(analystResult.tspPathList[0].stopIndexes[0], 0, "tsppath.stopIndexes");
            equal(analystResult.tspPathList[0].weight, 2606.134686918408, "tsppath.weight");
            findTSPPathsService.destroy();
            equal(findTSPPathsService.EVENT_TYPES, null,"findTSPPathsService.EVENT_TYPES");
            equal(findTSPPathsService.events, null,"findTSPPathsService.events");
            equal(findTSPPathsService.lastResult, null,"findTSPPathsService.lastResult");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

//id为空
asyncTest("TestFindPathService_isAnalyzeById",function(){
    var findTSPPathsService=initFindTSPPathService_RegisterListener(),
        url = GlobeParameter.networkAnalystURL,
        nodeArray = [new SuperMap.Geometry.Point(119.6100397551, -122.6278394459),
            new SuperMap.Geometry.Point(171.9035599945, -113.2491141857)
        ],
        findTSPPathsService, parameter, analystParameter, resultSetting;
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
    parameter = new SuperMap.REST.FindTSPPathsParameters({
        isAnalyzeById: true,
        nodes: nodeArray,
        endNodeAssigned: false,
        parameter: analystParameter
    });
    ok(findTSPPathsService instanceof SuperMap.REST.FindTSPPathsService, "not null");
    findTSPPathsService.processAsync(parameter);
    setTimeout(function() {
        try{
            var analystResult = findTSPPathsService.lastResult;
            var edgeIDs = [8367],
                nodeIDs = [2, 3],
                stopWeights = [53];
            ok(analystResult == null, "pathList");
            equal(serviceFailedEventArgsSystem.error.errorMsg,"参数nodes 不是有效的JSON 字符串对象","serviceFailedEventArgsSystem.error.errorMsg");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

//参数错误
asyncTest("TestFindPathService_fail",function(){
    var findTSPPathsService=initFindTSPPathService_RegisterListener(),
        url = GlobeParameter.networkAnalystURL,
        nodeArray = [new SuperMap.Geometry.Point(119.6100397551, -122.6278394459),
            new SuperMap.Geometry.Point(171.9035599945, -113.2491141857)
        ],
        findTSPPathsService, parameter, analystParameter, resultSetting;
    resultSetting = new SuperMap.REST.TransportationAnalystResultSetting({
        returnEdgeFeatures: false,
        returnEdgeGeometry: false,
        returnEdgeIDs: false,
        returnNodeFeatures: false,
        returnNodeGeometry: false,
        returnNodeIDs: false,
        returnPathGuides: false,
        returnRoutes: false
    });
    analystParameter = new SuperMap.REST.TransportationAnalystParameter({
        resultSetting: resultSetting,
        weightFieldName: "TurnCost1"
    });
    parameter = new SuperMap.REST.FindTSPPathsParameters({
        isAnalyzeById: false,
        nodes: nodeArray,
        endNodeAssigned: false,
        parameter: analystParameter
    });
    ok(findTSPPathsService instanceof SuperMap.REST.FindTSPPathsService, "not null");
    findTSPPathsService.processAsync(parameter);
    setTimeout(function() {
        try{
            var analystResult = findTSPPathsService.lastResult;
            var edgeIDs = [8367],
                nodeIDs = [2, 3],
                stopWeights = [53];
			ok(serviceFailedEventArgsSystem.error.errorMsg,"serviceFailedEventArgsSystem.error.errorMsg:" + serviceFailedEventArgsSystem.error.errorMsg);
            ok(analystResult == null, "pathList");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

asyncTest("TestFindTSPPathsService_parameter_null",function(){
    var url = GlobeParameter.networkAnalystURL;
    var findTSPPathsService = new SuperMap.REST.FindTSPPathsService(url);
    ok(findTSPPathsService instanceof SuperMap.REST.FindTSPPathsService, "not null");
    findTSPPathsService.processAsync();
    setTimeout(function() {
        try{
            var analystResult = findTSPPathsService.lastResult;
            ok(analystResult == null, "analystResult");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

asyncTest("TestFindTSPPathsService_AnalyzeById_null",function(){
    var url = GlobeParameter.networkAnalystURL,
        nodeArray = [new SuperMap.Geometry.Point(5627.7550668827, -3627.4849836293),
            new SuperMap.Geometry.Point(5018.1469160422, -4638.5424045354),
            new SuperMap.Geometry.Point(6133.2837773358,-4645.9766502774)
        ],
        findTSPPathsService, parameter, analystParameter, resultSetting;
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
    parameter = new SuperMap.REST.FindTSPPathsParameters({
        isAnalyzeById: "AnalyzeById",
        nodes: nodeArray,
        endNodeAssigned: false,
        parameter: analystParameter
    });     
    findTSPPathsService = new SuperMap.REST.FindTSPPathsService(url);
    ok(findTSPPathsService instanceof SuperMap.REST.FindTSPPathsService, "not null");
    findTSPPathsService.processAsync(parameter);
    setTimeout(function() {
        try{
            var analystResult = findTSPPathsService.lastResult;
            ok(analystResult == null, "analystResult");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});