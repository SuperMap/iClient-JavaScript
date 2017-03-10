require('../../../src/Core/iServer/FindPathService');

var serviceFailedEventArgsSystem = null;
var serviceSucceedEventArgsSystem = null;

//服务初始化时注册事件监听函数
var url = GlobeParameter.networkAnalystURL;
var options = {
    eventListeners: {
        'processFailed': findPathServiceFailed,
        'processCompleted':findPathServiceCompleted
    }
};
function initFindPathService() {
    return new SuperMap.REST.FindPathService(url, options);
}
function findPathServiceCompleted(serviceSucceedEventArgs){
    serviceSucceedEventArgsSystem = serviceSucceedEventArgs;
}
function findPathServiceFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}


describe('testFindPathService_processAsync',function(){
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //基本测试
    it('basicTest',function(done){
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
        var parameter = new FindPathParameters({
            isAnalyzeById: false,
            nodes: nodeArray,
            hasLeastEdgeCount: false,
            parameter: analystParameter
        });
        var findPathService = initFindPathService();
        findPathService.processAsync(parameter);

        setTimeout(function(){
            try{
                var analystResult = serviceSucceedEventArgsSystem.result;
                expect(analystResult.pathList).not.toBeNull();
                expect(analystResult.pathList[0].edgeFeatures).not.toBeNull();
                expect(analystResult.pathList[0].edgeIDs[0]).toEqual(8367);
                expect(analystResult.pathList[0].nodeFeatures).not.toBeNull();
                expect(analystResult.pathList[0].nodeIDs[0]).toEqual(2);
                expect(analystResult.pathList[0].pathGuideItems).not.toBeNull();
                expect(analystResult.pathList[0].route).not.toBeNull();
                expect(analystResult.pathList[0].stopWeights[0]).toEqual(53);
                expect(analystResult.pathList[0].weight).toEqual(53);
                findPathService.destroy();
                expect(findPathService.EVENT_TYPES).toBeNull();
                expect(findPathService.events).toBeNull();
                parameter.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                findPathService.destroy();
                parameter.destroy();
                done();
            }
        },6000);
    });

    //设置返回信息的有效性
    it('return',function(done){
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
            weightFieldName: "length"
        });
        var parameter = new FindPathParameters({
            isAnalyzeById: false,
            nodes: nodeArray,
            hasLeastEdgeCount: true,
            parameter: analystParameter
        });
        var findPathService = initFindPathService();
        findPathService.processAsync(parameter);

        setTimeout(function(){
            try{
                var analystResult = serviceSucceedEventArgsSystem.result;
                expect(analystResult.pathList != null).toBeTruthy();
                expect(analystResult.pathList[0].edgeFeatures == null).toBeTruthy();
                expect(analystResult.pathList[0].edgeIDs[0] == null).toBeTruthy();
                expect(analystResult.pathList[0].nodeFeatures == null).toBeTruthy();
                expect(analystResult.pathList[0].nodeIDs[0] == null).toBeTruthy();
                expect(analystResult.pathList[0].pathGuideItems == null).toBeTruthy();
                expect(analystResult.pathList[0].route == null).toBeTruthy();
                expect(analystResult.pathList[0].nodeFeatures == null).toBeTruthy();
                expect(analystResult.pathList[0].stopWeights[0]).toEqual(53);
                expect(analystResult.pathList[0].weight).toEqual(53);
                findPathService.destroy();
                expect(findPathService.EVENT_TYPES).toBeNull();
                expect(findPathService.events).toBeNull();
                parameter.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                findPathService.destroy();
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
            weightFieldName: "length"
        });
        var parameter = new FindPathParameters({
            isAnalyzeById: true,
            nodes: nodeArray,
            hasLeastEdgeCount: true,
            parameter: analystParameter
        });
        var findPathService = initFindPathService();
        findPathService.processAsync(parameter);

        setTimeout(function(){
            try{
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                findPathService.destroy();
                expect(findPathService.EVENT_TYPES).toBeNull();
                expect(findPathService.events).toBeNull();
                parameter.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                findPathService.destroy();
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
        var parameter = new FindPathParameters({
            isAnalyzeById: false,
            nodes: nodeArray,
            hasLeastEdgeCount: true,
            parameter: analystParameter
        });
        var findPathService = initFindPathService();
        findPathService.processAsync(parameter);

        setTimeout(function(){
            try{
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                findPathService.destroy();
                expect(findPathService.EVENT_TYPES).toBeNull();
                expect(findPathService.events).toBeNull();
                parameter.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                findPathService.destroy();
                parameter.destroy();
                done();
            }
        },6000)
    });

    //参数为空
    it('parameterNull',function(done){
        var findPathService = initFindPathService();
        findPathService.processAsync();

        setTimeout(function(){
            try{
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                findPathService.destroy();
                expect(findPathService.EVENT_TYPES).toBeNull();
                expect(findPathService.events).toBeNull();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                findPathService.destroy();
                done();
            }
        },6000)
    });

    //AnalyzeById_null
    it('AnalyzeById_null',function(done){
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
        var parameter = new FindPathParameters({
            isAnalyzeById: "AnalyzeById",
            nodes: nodeArray,
            hasLeastEdgeCount: false,
            parameter: analystParameter
        });
        var findPathService = initFindPathService();
        findPathService.processAsync(parameter);

        setTimeout(function(){
            try{
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg!==null).toBeTruthy();
                findPathService.destroy();
                expect(findPathService.EVENT_TYPES).toBeNull();
                expect(findPathService.events).toBeNull();
                parameter.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                findPathService.destroy();
                parameter.destroy();
                done();
            }
        },6000)
    });
});

