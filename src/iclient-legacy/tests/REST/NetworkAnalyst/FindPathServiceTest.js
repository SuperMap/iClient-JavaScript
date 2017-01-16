module("FindPathService");

var serviceFailedEventArgsSystem = null;

//服务初始化时注册事件监听函数
function initFindPathService_RegisterListener() {
    findPathService = new SuperMap.REST.FindPathService(GlobeParameter.networkAnalystURL, {eventListeners:{'processFailed':FindPathServiceFailed}});
    return findPathService;
}

function FindPathServiceFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem=serviceFailedEventArgs;
}

asyncTest("TestFindPathService_Constructor",function(){
    var url = GlobeParameter.networkAnalystURL,
        nodeArray = [new SuperMap.Geometry.Point(119.6100397551, -122.6278394459),
            new SuperMap.Geometry.Point(171.9035599945, -113.2491141857)
        ],
        findPathService, findPathService, parameter, analystParameter, resultSetting;
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
    parameter = new SuperMap.REST.FindPathParameters({
        isAnalyzeById: false,
        nodes: nodeArray,
        hasLeastEdgeCount: false,
        parameter: analystParameter
    });     
    findPathService = new SuperMap.REST.FindPathService(url);
    ok(findPathService instanceof SuperMap.REST.FindPathService, "not null");
    findPathService.processAsync(parameter);
    setTimeout(function() {
        try{
            var analystResult = findPathService.lastResult;
            var edgeIDs = [8367],
                nodeIDs = [2, 3],
                stopWeights = [53];
            ok(analystResult.pathList != null, "pathList");
            ok(analystResult.pathList[0] instanceof SuperMap.REST.Path, "path");
            ok(analystResult.pathList[0].edgeFeatures != null, "path.edgeFeatures");
            equal(analystResult.pathList[0].edgeIDs[0], 8367, "path.edgeIDs");
            ok(analystResult.pathList[0].nodeFeatures != null, "path.nodeFeatures");
            equal(analystResult.pathList[0].nodeIDs[0], 2, "path.nodeIDs");
            ok(analystResult.pathList[0].pathGuideItems != null, "path.pathGuideItems");
            ok(analystResult.pathList[0].route != null, "path.route");
            equal(analystResult.pathList[0].stopWeights[0], 53, "path.stopWeights");
            equal(analystResult.pathList[0].weight, 53, "path.weight");


            findPathService.destroy();
            equal(findPathService.EVENT_TYPES, null,"findPathService.EVENT_TYPES");
            equal(findPathService.events, null,"findPathService.events");
            equal(findPathService.lastResult, null,"findPathService.lastResult");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

//设置返回信息的有效性
asyncTest("TestFindPathService_Return",function(){
    var url = GlobeParameter.networkAnalystURL,
        nodeArray = [new SuperMap.Geometry.Point(119.6100397551, -122.6278394459),
            new SuperMap.Geometry.Point(171.9035599945, -113.2491141857)
        ],
        findPathService, findPathService, parameter, analystParameter, resultSetting;
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
        weightFieldName: "length"
    });
    parameter = new SuperMap.REST.FindPathParameters({
        isAnalyzeById: false,
        nodes: nodeArray,
        hasLeastEdgeCount: true,
        parameter: analystParameter
    });     
    findPathService = new SuperMap.REST.FindPathService(url);
    ok(findPathService instanceof SuperMap.REST.FindPathService, "not null");


    findPathService.processAsync(parameter);
    setTimeout(function() {
        try{
            var analystResult = findPathService.lastResult;
            var edgeIDs = [8367],
                nodeIDs = [2, 3],
                stopWeights = [53];
            ok(analystResult.pathList != null, "pathList");
            ok(analystResult.pathList[0] instanceof SuperMap.REST.Path, "path");
            ok(analystResult.pathList[0].edgeFeatures == null, "path.edgeFeatures");
            equal(analystResult.pathList[0].edgeIDs[0], null, "path.edgeIDs");
            ok(analystResult.pathList[0].nodeFeatures == null, "path.nodeFeatures");
            equal(analystResult.pathList[0].nodeIDs[0], null, "nodeIDs");
            ok(analystResult.pathList[0].pathGuideItems == null, "path.pathGuideItems");
            ok(analystResult.pathList[0].route == null, "path.route");
            equal(analystResult.pathList[0].stopWeights[0], 53, "path.stopWeights");
            equal(analystResult.pathList[0].weight, 53, "path.weight");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

//id为空
asyncTest("TestFindPathService_isAnalyzeById",function(){
    var findPathService = initFindPathService_RegisterListener();
    var url = GlobeParameter.networkAnalystURL,
        nodeArray = [new SuperMap.Geometry.Point(119.6100397551, -122.6278394459),
            new SuperMap.Geometry.Point(171.9035599945, -113.2491141857)
        ],
        findPathService, findPathService, parameter, analystParameter, resultSetting;
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
        weightFieldName: "length"
    });
    parameter = new SuperMap.REST.FindPathParameters({
        isAnalyzeById: true,
        nodes: nodeArray,
        hasLeastEdgeCount: true,
        parameter: analystParameter
    });     
    ok(findPathService instanceof SuperMap.REST.FindPathService, "not null");


    findPathService.processAsync(parameter);
    setTimeout(function() {
        try{
            var analystResult = findPathService.lastResult;
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
    var findPathService = initFindPathService_RegisterListener();
    var url = GlobeParameter.networkAnalystURL,
        nodeArray = [new SuperMap.Geometry.Point(119.6100397551, -122.6278394459),
            new SuperMap.Geometry.Point(171.9035599945, -113.2491141857)
        ],
        findPathService, findPathService, parameter, analystParameter, resultSetting;
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
    parameter = new SuperMap.REST.FindPathParameters({
        isAnalyzeById: false,
        nodes: nodeArray,
        hasLeastEdgeCount: true,
        parameter: analystParameter
    });     
    ok(findPathService instanceof SuperMap.REST.FindPathService, "not null");

    findPathService.processAsync(parameter);
    setTimeout(function() {
        try{
            var analystResult = findPathService.lastResult;
            var edgeIDs = [8367],
                nodeIDs = [2, 3],
                stopWeights = [53];
			ok(serviceFailedEventArgsSystem.error.errorMsg !== null,"serviceFailedEventArgsSystem.error.errorMsg:" + serviceFailedEventArgsSystem.error.errorMsg);
            ok(analystResult == null, "pathList");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

asyncTest("TestFindPathService_parameter_null",function(){
    var url = GlobeParameter.networkAnalystURL;  
    findPathService = new SuperMap.REST.FindPathService(url);
    ok(findPathService instanceof SuperMap.REST.FindPathService, "not null");
    findPathService.processAsync();
    setTimeout(function() {
        try{
            var analystResult = findPathService.lastResult;
            ok(analystResult == null, "analystResult");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

asyncTest("TestFindPathService_AnalyzeById_null",function(){
    var url = GlobeParameter.networkAnalystURL,
        nodeArray = [new SuperMap.Geometry.Point(119.6100397551, -122.6278394459),
            new SuperMap.Geometry.Point(171.9035599945, -113.2491141857)
        ],
        findPathService, findPathService, parameter, analystParameter, resultSetting;
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
    parameter = new SuperMap.REST.FindPathParameters({
        isAnalyzeById: "AnalyzeById",
        nodes: nodeArray,
        hasLeastEdgeCount: false,
        parameter: analystParameter
    });     
    findPathService = new SuperMap.REST.FindPathService(url);
    ok(findPathService instanceof SuperMap.REST.FindPathService, "not null");
    findPathService.processAsync(parameter);
    setTimeout(function() {
        try{
            var analystResult = findPathService.lastResult;
            ok(analystResult == null, "pathList");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});
