require('../../../src/Core/iServer/FindTSPPathsService');

var serviceFailedEventArgsSystem = null;
var serviceSucceedEventArgsSystem = null;

//服务初始化时注册事件监听函数
var url = GlobeParameter.networkAnalystURL;
var options = {
    eventListeners: {
        'processFailed': findTSPPathServiceFailed,
        'processCompleted':findTSPPathServiceCompleted
    }
};
function initFindTSPPathService() {
    return new SuperMap.REST.FindTSPPathsService(url, options);
}
function findTSPPathServiceCompleted(serviceSucceedEventArgs){
    serviceSucceedEventArgsSystem = serviceSucceedEventArgs;
}
function findTSPPathServiceFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}


describe('testFindTSPPathsService_processAsync',function(){
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //测试正常情况
    it('basicTest',function(done){
        var nodeArray = [new SuperMap.Geometry.Point(5627.7550668827, -3627.4849836293),
            new SuperMap.Geometry.Point(5018.1469160422, -4638.5424045354),
            new SuperMap.Geometry.Point(6133.2837773358,-4645.9766502774)
        ];
        var resultSetting = new TransportationAnalystResultSetting({
            returnEdgeFeatures: true,
            returnEdgeGeometry: true,
            returnEdgeIDs: true,
            returnNodeFeatures: true,
            returnNodeGeometry: true,
            returnNodeIDs: true,
            returnPathGuides: true,
            returnRoutes: true
        });
        var analystParameter = new TransportationAnalystParameter({
            resultSetting: resultSetting,
            weightFieldName: "length"
        });
        var parameter = new FindTSPPathsParameters({
            isAnalyzeById: false,
            nodes: nodeArray,
            endNodeAssigned: false,
            parameter: analystParameter
        });
        var findTSPPathsService = initFindTSPPathService();
        findTSPPathsService.processAsync(parameter);

        setTimeout(function(){
            try{
                var analystResult = serviceSucceedEventArgsSystem.result;
                expect(analystResult.tspPathList != null).toBeTruthy();
                expect(analystResult.tspPathList[0].edgeFeatures != null).toBeTruthy();
                expect(analystResult.tspPathList[0].edgeIDs[0]).toEqual(2886);
                expect(analystResult.tspPathList[0].nodeFeatures != null).toBeTruthy();
                expect(analystResult.tspPathList[0].nodeIDs[0]).toEqual(3030);
                expect(analystResult.tspPathList[0].pathGuideItems != null).toBeTruthy();
                expect(analystResult.tspPathList[0].route != null).toBeTruthy();
                expect(analystResult.tspPathList[0].stopWeights[0]).toEqual(1204.9373071047896);
                expect(analystResult.tspPathList[0].stopIndexes[0]).toEqual(0);
                expect(analystResult.tspPathList[0].weight).toEqual(2606.134686918408);
                findTSPPathsService.destroy();
                expect(findTSPPathsService.EVENT_TYPES).toBeNull();
                expect(findTSPPathsService.events).toBeNull();
                parameter.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                findTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        },6000)
    });

    //id为空
    it('isAnalyzeById',function(done){
        var nodeArray = [new SuperMap.Geometry.Point(119.6100397551, -122.6278394459),
            new SuperMap.Geometry.Point(171.9035599945, -113.2491141857)
        ];
        var resultSetting = new TransportationAnalystResultSetting({
            returnEdgeFeatures: true,
            returnEdgeGeometry: true,
            returnEdgeIDs: true,
            returnNodeFeatures: true,
            returnNodeGeometry: true,
            returnNodeIDs: true,
            returnPathGuides: true,
            returnRoutes: true
        });
        var analystParameter = new TransportationAnalystParameter({
            resultSetting: resultSetting,
            weightFieldName: "length"
        });
        var parameter = new FindTSPPathsParameters({
            isAnalyzeById: true,
            nodes: nodeArray,
            endNodeAssigned: false,
            parameter: analystParameter
        });
        var findTSPPathsService = initFindTSPPathService();
        findTSPPathsService.processAsync(parameter);

        setTimeout(function(){
            try{
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                findTSPPathsService.destroy();
                expect(findTSPPathsService.EVENT_TYPES).toBeNull();
                expect(findTSPPathsService.events).toBeNull();
                parameter.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                findTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        },6000)
    });

    //参数错误
    it('parameterWrong',function(done){
        var nodeArray = [new SuperMap.Geometry.Point(119.6100397551, -122.6278394459),
            new SuperMap.Geometry.Point(171.9035599945, -113.2491141857)
        ];
        var resultSetting = new TransportationAnalystResultSetting({
            returnEdgeFeatures: false,
            returnEdgeGeometry: false,
            returnEdgeIDs: false,
            returnNodeFeatures: false,
            returnNodeGeometry: false,
            returnNodeIDs: false,
            returnPathGuides: false,
            returnRoutes: false
        });
        var analystParameter = new TransportationAnalystParameter({
            resultSetting: resultSetting,
            weightFieldName: "TurnCost1"
        });
        var parameter = new FindTSPPathsParameters({
            isAnalyzeById: false,
            nodes: nodeArray,
            endNodeAssigned: false,
            parameter: analystParameter
        });
        var findTSPPathsService = initFindTSPPathService();
        findTSPPathsService.processAsync(parameter);

        setTimeout(function(){
            try{
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                findTSPPathsService.destroy();
                expect(findTSPPathsService.EVENT_TYPES).toBeNull();
                expect(findTSPPathsService.events).toBeNull();
                parameter.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                findTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        },6000)
    });

    //参数为空
    it('parameterNull',function(done){
        var findTSPPathsService = initFindTSPPathService();
        findTSPPathsService.processAsync();

        setTimeout(function(){
            try{
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                findTSPPathsService.destroy();
                expect(findTSPPathsService.EVENT_TYPES).toBeNull();
                expect(findTSPPathsService.events).toBeNull();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                findTSPPathsService.destroy();
                done();
            }
        },6000)
    });

    //AnalyzeById_null
    it('parameterNull',function(done){
        var nodeArray = [new SuperMap.Geometry.Point(5627.7550668827, -3627.4849836293),
            new SuperMap.Geometry.Point(5018.1469160422, -4638.5424045354),
            new SuperMap.Geometry.Point(6133.2837773358,-4645.9766502774)
        ];
        var resultSetting = new TransportationAnalystResultSetting({
            returnEdgeFeatures: true,
            returnEdgeGeometry: true,
            returnEdgeIDs: true,
            returnNodeFeatures: true,
            returnNodeGeometry: true,
            returnNodeIDs: true,
            returnPathGuides: true,
            returnRoutes: true
        });
        var analystParameter = new TransportationAnalystParameter({
            resultSetting: resultSetting,
            weightFieldName: "length"
        });
        var parameter = new FindTSPPathsParameters({
            isAnalyzeById: "AnalyzeById",
            nodes: nodeArray,
            endNodeAssigned: false,
            parameter: analystParameter
        });
        var findTSPPathsService = initFindTSPPathService();
        findTSPPathsService.processAsync(parameter);

        setTimeout(function(){
            try{
                expect(serviceFailedEventArgsSystem).toEqual("tsppath");
                findTSPPathsService.destroy();
                expect(findTSPPathsService.EVENT_TYPES).toBeNull();
                expect(findTSPPathsService.events).toBeNull();
                parameter.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                findTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        },6000)
    })
});
