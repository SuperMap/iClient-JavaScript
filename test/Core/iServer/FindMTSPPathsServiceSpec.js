require('../../../src/Core/iServer/FindMTSPPathsService');

var serviceFailedEventArgsSystem = null;
var serviceSucceedEventArgsSystem = null;

//服务初始化时注册事件监听函数
var url = GlobeParameter.networkAnalystURL;;
var options = {
    eventListeners: {
        'processFailed': findMTSPathsServiceFailed,
        'processCompleted':findMTSPathsServiceCompleted
    }
};
function initFindMTSPathsService() {
    return new SuperMap.REST.FindMTSPPathsService(url, options);
}
function findMTSPathsServiceCompleted(serviceSucceedEventArgs){
    serviceSucceedEventArgsSystem = serviceSucceedEventArgs;
}
function findMTSPathsServiceFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}


describe('testFindMTSPPathsService_processAsync',function(){
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
        var centerArray = [new SuperMap.Geometry.Point(3000,-3000), new SuperMap.Geometry.Point(3500,-2000)],
            nodeArray = [new SuperMap.Geometry.Point(5600, -3600),
                new SuperMap.Geometry.Point(5000, -4600),
                new SuperMap.Geometry.Point(6000,-4600)
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
        var parameter = new FindMTSPPathsParameters({
            isAnalyzeById: false,
            centers: centerArray,
            nodes: nodeArray,
            parameter: analystParameter,
            hasLeastTotalCost:false

        });
        var findMTSPPathsService = initFindMTSPathsService();
        findMTSPPathsService.processAsync(parameter);

        setTimeout(function(){
            try{
                var analystResult = serviceSucceedEventArgsSystem.result;
                expect(analystResult.pathList).not.toBeNull();
                expect(analystResult.pathList[0].edgeFeatures).not.toBeNull();
                expect(analystResult.pathList[0].edgeIDs[0]).toEqual(4664);
                expect(analystResult.pathList[0].nodeFeatures).not.toBeNull();
                expect(analystResult.pathList[0].nodeIDs[0]).toEqual(2128);
                expect(analystResult.pathList[0].pathGuideItems).not.toBeNull();
                expect(analystResult.pathList[0].route).not.toBeNull();
                expect(analystResult.pathList[0].stopWeights[0]).toEqual(3960.6991409433713);
                expect(analystResult.pathList[0].stopIndexes[0]).toEqual(2);
                expect(analystResult.pathList[0].weight).toEqual(7921.398281886743);
                findMTSPPathsService.destroy();
                expect(findMTSPPathsService.EVENT_TYPES).toBeNull();
                expect(findMTSPPathsService.events).toBeNull();
                parameter.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                findMTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        },6000)
    });

    //测试hasLeastTotalCost为true
    it('hasLeastTotalCost:true',function(done){
        var centerArray = [new SuperMap.Geometry.Point(3000,-3000), new SuperMap.Geometry.Point(3500,-2000)];
        var nodeArray = [new SuperMap.Geometry.Point(5600, -3600),
            new SuperMap.Geometry.Point(5000, -4600),
            new SuperMap.Geometry.Point(6000,-4600)
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
        var parameter = new FindMTSPPathsParameters({
            isAnalyzeById: false,
            centers: centerArray,
            nodes: nodeArray,
            parameter: analystParameter,
            hasLeastTotalCost:true

        });
        var findMTSPPathsService = initFindMTSPathsService();
        findMTSPPathsService.processAsync(parameter);

        setTimeout(function(){
            try{
                var analystResult = serviceSucceedEventArgsSystem.result;
                expect(analystResult.pathList).not.toBeNull();
                expect(analystResult.pathList[0].edgeFeatures).not.toBeNull();
                expect(analystResult.pathList[0].edgeIDs[0]).toEqual(4664);
                expect(analystResult.pathList[0].nodeFeatures).not.toBeNull();
                expect(analystResult.pathList[0].nodeIDs[0]).toEqual(2128);
                //expect(analystResult.pathList[0].pathGuideItems).not.toBeNull();
                expect(analystResult.pathList[0].route).not.toBeNull();
                expect(analystResult.pathList[0].stopWeights[0]).toEqual(3255.101675323638);
                expect(analystResult.pathList[0].stopIndexes[0]).toEqual(1);
                expect(analystResult.pathList[0].weight).toEqual(8782.556125048039);
                findMTSPPathsService.destroy();
                expect(findMTSPPathsService.EVENT_TYPES).toBeNull();
                expect(findMTSPPathsService.events).toBeNull();
                parameter.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                findMTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        },6000);
    });

    //测试传入参数为id
    it('isAnalyzeById',function(done){
        var centerArray = [2,5,7];
        var nodeArray = [1,6,21];
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
        var parameter = new FindMTSPPathsParameters({
            isAnalyzeById: true,
            centers: centerArray,
            nodes: nodeArray,
            parameter: analystParameter,
            hasLeastTotalCost:true

        });
        var findMTSPPathsService = initFindMTSPathsService();
        findMTSPPathsService.processAsync(parameter);

        setTimeout(function(){
            try{
                var analystResult = serviceSucceedEventArgsSystem.result;
                expect(analystResult.pathList).not.toBeNull();
                expect(analystResult.pathList[0].edgeFeatures).not.toBeNull();
                expect(analystResult.pathList[0].edgeIDs[0]).toEqual(8366);
                expect(analystResult.pathList[0].nodeFeatures).not.toBeNull();
                expect(analystResult.pathList[0].nodeIDs[0]).toEqual(2);
                //expect(analystResult.pathList[0].pathGuideItems).not.toBeNull();
                expect(analystResult.pathList[0].route).not.toBeNull();
                expect(analystResult.pathList[0].stopWeights[0]).toEqual(125.0);
                expect(analystResult.pathList[0].stopIndexes[0]).toEqual(0);
                expect(analystResult.pathList[0].weight).toEqual(250.0);
                findMTSPPathsService.destroy();
                expect(findMTSPPathsService.EVENT_TYPES).toBeNull();
                expect(findMTSPPathsService.events).toBeNull();
                parameter.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                findMTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        },6000)
    });

    //测试传入参数为id，但是传入为空
    it('isAnalyzeById but null',function(done){
        var centerArray = [new SuperMap.Geometry.Point(3000,-3000), new SuperMap.Geometry.Point(3500,-2000)];
        var nodeArray = [new SuperMap.Geometry.Point(5600, -3600),
            new SuperMap.Geometry.Point(5000, -4600),
            new SuperMap.Geometry.Point(6000,-4600)
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
        var parameter = new FindMTSPPathsParameters({
            isAnalyzeById: true,
            centers: centerArray,
            nodes: nodeArray,
            parameter: analystParameter,
            hasLeastTotalCost:true

        });
        var findMTSPPathsService = initFindMTSPathsService();
        findMTSPPathsService.processAsync(parameter);

        setTimeout(function(){
            try{
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.formatErrorMsg).not.toBeNull();
                findMTSPPathsService.destroy();
                expect(findMTSPPathsService.EVENT_TYPES).toBeNull();
                expect(findMTSPPathsService.events).toBeNull();
                parameter.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                findMTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        },6000)
    });

    //参数错误
    it('parameterWrong',function(done){
        var centerArray = [new SuperMap.Geometry.Point(3000,-3000), new SuperMap.Geometry.Point(3500,-2000)];
        var nodeArray = [new SuperMap.Geometry.Point(5600, -3600),
            new SuperMap.Geometry.Point(5000, -4600),
            new SuperMap.Geometry.Point(6000,-4600)
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
            weightFieldName: "TurnCost1"
        });
        var parameter = new FindMTSPPathsParameters({
            isAnalyzeById: false,
            centers: centerArray,
            nodes: nodeArray,
            parameter: analystParameter,
            hasLeastTotalCost:true

        });
        var findMTSPPathsService = initFindMTSPathsService();
        findMTSPPathsService.processAsync(parameter);

        setTimeout(function(){
            try{
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                findMTSPPathsService.destroy();
                expect(findMTSPPathsService.EVENT_TYPES).toBeNull();
                expect(findMTSPPathsService.events).toBeNull();
                parameter.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                findMTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        },6000)
    });

    //参数为空
    it('parameterWrong',function(done){
        var findMTSPPathsService = initFindMTSPathsService();
        findMTSPPathsService.processAsync();

        setTimeout(function(){
            try{
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                findMTSPPathsService.destroy();
                expect(findMTSPPathsService.EVENT_TYPES).toBeNull();
                expect(findMTSPPathsService.events).toBeNull();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                findMTSPPathsService.destroy();
                done();
            }
        },6000)
    });

    //错误的isAnalyzeById
    it('AnalyzeById_null',function(done){
        var centerArray = [new SuperMap.Geometry.Point(3000,-3000), new SuperMap.Geometry.Point(3500,-2000)],
            nodeArray = [new SuperMap.Geometry.Point(5600, -3600),
                new SuperMap.Geometry.Point(5000, -4600),
                new SuperMap.Geometry.Point(6000,-4600)
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
        var parameter = new FindMTSPPathsParameters({
            isAnalyzeById: "AnalyzeById",
            centers: centerArray,
            nodes: nodeArray,
            parameter: analystParameter,
            hasLeastTotalCost:true

        });
        var findMTSPPathsService = initFindMTSPathsService();
        findMTSPPathsService.processAsync(parameter);

        setTimeout(function(){
            try{
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                findMTSPPathsService.destroy();
                expect(findMTSPPathsService.EVENT_TYPES).toBeNull();
                expect(findMTSPPathsService.events).toBeNull();
                parameter.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                findMTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        },6000)
    })
});


