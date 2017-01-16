module("FindServiceAreasService");

var serviceFailedEventArgsSystem = null;

//服务初始化时注册事件监听函数
function initFindServiceAreasService_RegisterListener() {
    findServiceAreasService = new SuperMap.REST.FindServiceAreasService(GlobeParameter.networkAnalystURL, {eventListeners:{'processFailed':FindServiceAreasServiceFailed}});
    return findServiceAreasService;
}

function FindServiceAreasServiceFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}

asyncTest("TestFindServiceAreasService_Constructor",function(){
    var url = GlobeParameter.networkAnalystURL,
        centerArray = [new SuperMap.Geometry.Point(119.6100397551, -122.6278394459),
            new SuperMap.Geometry.Point(171.9035599945, -113.2491141857)
        ],
        weightArray = [1, 2],
        findServiceAreasService, parameter, analystParameter, resultSetting;
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
    parameter = new SuperMap.REST.FindServiceAreasParameters({
        isAnalyzeById: false,
        centers: centerArray,
        weights: weightArray,
        isCenterMutuallyExclusive: false,
        isFromCenter: false,
        parameter: analystParameter
    });     
    findServiceAreasService = new SuperMap.REST.FindServiceAreasService(url);
    ok(findServiceAreasService instanceof SuperMap.REST.FindServiceAreasService, "not null");
    findServiceAreasService.processAsync(parameter);
    setTimeout(function() {
        try{
            var analystResult = findServiceAreasService.lastResult;
            var edgeIDs = [8366],
                nodeIDs = [2, 3];
            ok(analystResult.serviceAreaList != null, "serviceAreaList");
            ok(analystResult.serviceAreaList[0] instanceof SuperMap.REST.ServiceArea, "serviceArea");
            ok(analystResult.serviceAreaList[0].edgeFeatures != null, "serviceArea.edgeFeatures");
            equal(analystResult.serviceAreaList[0].edgeIDs[0], 8366, "serviceArea.edgeIDs");
            ok(analystResult.serviceAreaList[0].nodeFeatures != null, "serviceArea.nodeFeatures");
            equal(analystResult.serviceAreaList[0].nodeIDs[0], 2, "serviceArea.nodeIDs");
            ok(analystResult.serviceAreaList[0].routes != null, "serviceArea.routes");
            ok(analystResult.serviceAreaList[0].serviceRegion != null, "serviceArea.serviceRegion");


            findServiceAreasService.destroy();
            equal(findServiceAreasService.EVENT_TYPES, null,"findServiceAreasService.EVENT_TYPES");
            equal(findServiceAreasService.events, null,"findServiceAreasService.events");
            equal(findServiceAreasService.lastResult, null,"findServiceAreasService.lastResult");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

//设置返回信息的有效性
asyncTest("TestFindServiceAreasService_Return",function(){
    var url = GlobeParameter.networkAnalystURL,
        centerArray = [new SuperMap.Geometry.Point(119.6100397551, -122.6278394459),
            new SuperMap.Geometry.Point(171.9035599945, -113.2491141857)
        ],
        weightArray = [1, 2],
        findServiceAreasService, parameter, analystParameter, resultSetting;
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
    parameter = new SuperMap.REST.FindServiceAreasParameters({
        isAnalyzeById: false,
        centers: centerArray,
        weights: weightArray,
        isCenterMutuallyExclusive: false,
        isFromCenter: false,
        parameter: analystParameter
    });     
    findServiceAreasService = new SuperMap.REST.FindServiceAreasService(url);
    ok(findServiceAreasService instanceof SuperMap.REST.FindServiceAreasService, "not null");


    findServiceAreasService.processAsync(parameter);
    setTimeout(function() {
        try{
            var analystResult = findServiceAreasService.lastResult;
            var edgeIDs = [8366],
                nodeIDs = [2, 3];
            ok(analystResult.serviceAreaList != null, "serviceAreaList ");
            ok(analystResult.serviceAreaList[0] instanceof SuperMap.REST.ServiceArea, "serviceArea");
            ok(analystResult.serviceAreaList[0].edgeFeatures == null, "serviceArea.edgeFeatures");
            equal(analystResult.serviceAreaList[0].edgeIDs[0], undefined, "serviceArea.edgeIDs");
            ok(analystResult.serviceAreaList[0].nodeFeatures == null, "serviceArea.nodeFeatures");
            equal(analystResult.serviceAreaList[0].nodeIDs[0], undefined, "serviceArea.nodeIDs");
            ok(analystResult.serviceAreaList[0].routes == null, "serviceArea.routes");
            ok(analystResult.serviceAreaList[0].serviceRegion != null, "serviceArea.serviceRegion");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

//id为空
asyncTest("TestFindServiceAreasService_isAnalyzeById",function(){
    var findServiceAreasService = initFindServiceAreasService_RegisterListener();
    var url = GlobeParameter.networkAnalystURL,
        centerArray = [new SuperMap.Geometry.Point(119.6100397551, -122.6278394459),
            new SuperMap.Geometry.Point(171.9035599945, -113.2491141857)
        ],
        weightArray = [1, 2],
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
    parameter = new SuperMap.REST.FindServiceAreasParameters({
        isAnalyzeById: true,
        centers: centerArray,
        weights: weightArray,
        isCenterMutuallyExclusive: false,
        isFromCenter: false,
        parameter: analystParameter
    });      
    ok(findServiceAreasService instanceof SuperMap.REST.FindServiceAreasService, "not null");


    findServiceAreasService.processAsync(parameter);
    setTimeout(function() {
        try{
            var analystResult = findServiceAreasService.lastResult;
            var edgeIDs = [8367],
                nodeIDs = [2, 3];
            ok(analystResult == null, "serviceAreaList");
            equal(serviceFailedEventArgsSystem.error.errorMsg,"参数centers 不是有效的JSON 字符串对象","serviceFailedEventArgsSystem.error.errorMsg");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

//参数错误
asyncTest("TestFindServiceAreasService_fail",function(){
    var findServiceAreasService = initFindServiceAreasService_RegisterListener();
    var url = GlobeParameter.networkAnalystURL,
        centerArray = [new SuperMap.Geometry.Point(119.6100397551, -122.6278394459),
            new SuperMap.Geometry.Point(171.9035599945, -113.2491141857)
        ],
        weightArray = [1, 2],
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
    parameter = new SuperMap.REST.FindServiceAreasParameters({
        isAnalyzeById: false,
        centers: centerArray,
        weights: weightArray,
        isCenterMutuallyExclusive: false,
        isFromCenter: false,
        parameter: analystParameter
    });      
    ok(findServiceAreasService instanceof SuperMap.REST.FindServiceAreasService, "not null");

    findServiceAreasService.processAsync(parameter);
    setTimeout(function() {
        try{
            var analystResult = findServiceAreasService.lastResult;
            var edgeIDs = [8367],
                nodeIDs = [2, 3];
            ok(serviceFailedEventArgsSystem.error.errorMsg !== null, "serviceFailedEventArgsSystem.error.errorMsg:" + serviceFailedEventArgsSystem.error.errorMsg);
            ok(analystResult == null, "serviceAreaList");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

asyncTest("TestFindServiceAreasService_parameter_null",function(){
    var url = GlobeParameter.networkAnalystURL;
    var findServiceAreasService = new SuperMap.REST.FindServiceAreasService(url);
    ok(findServiceAreasService instanceof SuperMap.REST.FindServiceAreasService, "not null");
    findServiceAreasService.processAsync();
    setTimeout(function() {
        try{
            var analystResult = findServiceAreasService.lastResult;
            ok(analystResult == null, "analystResult");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

asyncTest("TestFindServiceAreasService_AnalyzeById_null",function(){
    var url = GlobeParameter.networkAnalystURL,
        centerArray = [new SuperMap.Geometry.Point(119.6100397551, -122.6278394459),
            new SuperMap.Geometry.Point(171.9035599945, -113.2491141857)
        ],
        weightArray = [1, 2],
        findServiceAreasService, parameter, analystParameter, resultSetting;
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
    parameter = new SuperMap.REST.FindServiceAreasParameters({
        isAnalyzeById: "AnalyzeById",
        centers: centerArray,
        weights: weightArray,
        isCenterMutuallyExclusive: false,
        isFromCenter: false,
        parameter: analystParameter
    });     
    findServiceAreasService = new SuperMap.REST.FindServiceAreasService(url);
    ok(findServiceAreasService instanceof SuperMap.REST.FindServiceAreasService, "not null");
    findServiceAreasService.processAsync(parameter);
    setTimeout(function() {
        try{
            var analystResult = findServiceAreasService.lastResult;
            ok(analystResult == null, "analystResult");
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },6000)
});

