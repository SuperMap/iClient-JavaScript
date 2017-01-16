module("ComputeWeightMatrixService");

var serviceFailedEventArgsSystem = null;

//服务初始化时注册事件监听函数
function initComputeWeightMatrixService_RegisterListener() {
    computeWeightMatrixService = new SuperMap.REST.ComputeWeightMatrixService(GlobeParameter.networkAnalystURL, {eventListeners:{'processFailed':ComputeWeightMatrixServiceFailed}});
    return computeWeightMatrixService;
}

function ComputeWeightMatrixServiceFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem=serviceFailedEventArgs;
}

asyncTest("TestComputeWeightMatrixService_Constructor",function(){
    var url = GlobeParameter.networkAnalystURL,
        nodeArray = [new SuperMap.Geometry.Point(119.6100397551, -122.6278394459),
            new SuperMap.Geometry.Point(171.9035599945, -113.2491141857)
        ],
        computeWeightMatrixService, parameter, analystParameter, resultSetting;
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
    parameter = new SuperMap.REST.ComputeWeightMatrixParameters({
        isAnalyzeById: false,
        nodes: nodeArray,
        parameter: analystParameter
    });     
    computeWeightMatrixService = new SuperMap.REST.ComputeWeightMatrixService(url);
    ok(computeWeightMatrixService instanceof SuperMap.REST.ComputeWeightMatrixService, "not null");
    computeWeightMatrixService.processAsync(parameter);
    setTimeout(function() {
        try{
            var analystResult = computeWeightMatrixService.lastResult;
            var edgeIDs = [8367],
                nodeIDs = [2, 3],
                stopWeights = [53];
            ok(analystResult.weightMatrix != null, "weightMatrix");
            ok(analystResult.weightMatrix[0][0] == 0 && analystResult.weightMatrix[0][1] == 53 && analystResult.weightMatrix[1][0] == 53 && analystResult.weightMatrix[1][1] == 0, "computeWeightMatrixService.lastResult");
            computeWeightMatrixService.destroy();
            equal(computeWeightMatrixService.EVENT_TYPES, null,"computeWeightMatrixService.EVENT_TYPES");
            equal(computeWeightMatrixService.events, null,"computeWeightMatrixService.events");
            equal(computeWeightMatrixService.lastResult, null,"computeWeightMatrixService.lastResult");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

//设置返回信息的有效性
asyncTest("TestComputeWeightMatrixService_Return",function(){
    var url = GlobeParameter.networkAnalystURL,
        nodeArray = [new SuperMap.Geometry.Point(119.6100397551, -122.6278394459),
            new SuperMap.Geometry.Point(171.9035599945, -113.2491141857)
        ],
        computeWeightMatrixService, parameter, analystParameter, resultSetting;
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
        parameter: analystParameter
    });     
    computeWeightMatrixService = new SuperMap.REST.ComputeWeightMatrixService(url);
    ok(computeWeightMatrixService instanceof SuperMap.REST.ComputeWeightMatrixService, "not null");


    computeWeightMatrixService.processAsync(parameter);
    setTimeout(function() {
        try{
            var analystResult = computeWeightMatrixService.lastResult;
            var edgeIDs = [8367],
                nodeIDs = [2, 3],
                stopWeights = [53];
            ok(analystResult.weightMatrix != null, "weightMatrix");
            ok(analystResult.weightMatrix[0][0] == 0 && analystResult.weightMatrix[0][1] == 53 && analystResult.weightMatrix[1][0] == 53 && analystResult.weightMatrix[1][1] == 0, "computeWeightMatrixService.lastResult");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

//id为空
asyncTest("TestComputeWeightMatrixService_isAnalyzeById",function(){
    var computeWeightMatrixService = initComputeWeightMatrixService_RegisterListener();
    var url = GlobeParameter.networkAnalystURL,
        nodeArray = [new SuperMap.Geometry.Point(119.6100397551, -122.6278394459),
            new SuperMap.Geometry.Point(171.9035599945, -113.2491141857)
        ],
        parameter, analystParameter, resultSetting;
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
    parameter = new SuperMap.REST.ComputeWeightMatrixParameters({
        isAnalyzeById: true,
        nodes: nodeArray,
        parameter: analystParameter
    });     
    ok(computeWeightMatrixService instanceof SuperMap.REST.ComputeWeightMatrixService, "not null");


    computeWeightMatrixService.processAsync(parameter);
    setTimeout(function() {
        try{
            var analystResult = computeWeightMatrixService.lastResult;
            var edgeIDs = [8367],
                nodeIDs = [2, 3],
                stopWeights = [53];
            ok(analystResult == null, "weightMatrix");
            equal(serviceFailedEventArgsSystem.error.errorMsg,"参数nodes 不是有效的JSON 字符串对象","serviceFailedEventArgsSystem.error.errorMsg");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

//参数错误
asyncTest("TestComputeWeightMatrixService_fail",function(){
    var computeWeightMatrixService = initComputeWeightMatrixService_RegisterListener();
    var url = GlobeParameter.networkAnalystURL,
        nodeArray = [new SuperMap.Geometry.Point(119.6100397551, -122.6278394459),
            new SuperMap.Geometry.Point(171.9035599945, -113.2491141857)
        ],
        parameter, analystParameter, resultSetting;
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
        parameter: analystParameter
    });     
    ok(computeWeightMatrixService instanceof SuperMap.REST.ComputeWeightMatrixService, "not null");

    computeWeightMatrixService.processAsync(parameter);
    setTimeout(function() {
        try{
            var analystResult = computeWeightMatrixService.lastResult;
            var edgeIDs = [8367],
                nodeIDs = [2, 3],
                stopWeights = [53];
            ok(serviceFailedEventArgsSystem.error.errorMsg !== null, "serviceFailedEventArgsSystem.error.errorMsg:" + serviceFailedEventArgsSystem.error.errorMsg);
            ok(analystResult == null, "weightMatrix");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

//测试参数为空时的健壮性
asyncTest("TestComputeWeightMatrixService_Constructor",function(){
    var url = GlobeParameter.networkAnalystURL,    
        computeWeightMatrixService = new SuperMap.REST.ComputeWeightMatrixService(url);
    computeWeightMatrixService.processAsync();
    setTimeout(function() {
        try{
            var analystResult = computeWeightMatrixService.lastResult;
            ok(serviceFailedEventArgsSystem.error.errorMsg !== null, "serviceFailedEventArgsSystem.error.errorMsg:" + serviceFailedEventArgsSystem.error.errorMsg);
            ok(analystResult == null, "weightMatrix");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

//isAnalyzeById 不合法时的健壮性
asyncTest("TestComputeWeightMatrixService_Constructor",function(){
    var url = GlobeParameter.networkAnalystURL,
        nodeArray = [new SuperMap.Geometry.Point(119.6100397551, -122.6278394459),
            new SuperMap.Geometry.Point(171.9035599945, -113.2491141857)
        ],
        computeWeightMatrixService, parameter, analystParameter, resultSetting;
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
    parameter = new SuperMap.REST.ComputeWeightMatrixParameters({
        isAnalyzeById: 2,
        nodes: nodeArray,
        parameter: analystParameter
    });     
    computeWeightMatrixService = new SuperMap.REST.ComputeWeightMatrixService(url);
    ok(computeWeightMatrixService instanceof SuperMap.REST.ComputeWeightMatrixService, "not null");
    computeWeightMatrixService.processAsync(parameter);
    setTimeout(function() {
        try{
            var analystResult = computeWeightMatrixService.lastResult;
            ok(serviceFailedEventArgsSystem.error.errorMsg !== null, "serviceFailedEventArgsSystem.error.errorMsg:" + serviceFailedEventArgsSystem.error.errorMsg);
            equal(analystResult, null, "weightMatrix");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});
