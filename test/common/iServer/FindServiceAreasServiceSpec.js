require('../../../src/common/iServer/FindServiceAreasService');

var serviceFailedEventArgsSystem = null;
var serviceSucceedEventArgsSystem = null;

//服务初始化时注册事件监听函数
var url = GlobeParameter.networkAnalystURL;;
var options = {
    eventListeners: {
        'processFailed': findServiceAreasServiceFailed,
        'processCompleted':findServiceAreasServiceCompleted
    }
};
function initFindServiceAreasService() {
    return new SuperMap.FindServiceAreasService(url, options);
}
function findServiceAreasServiceCompleted(serviceSucceedEventArgs){
    serviceSucceedEventArgsSystem = serviceSucceedEventArgs;
}
function findServiceAreasServiceFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}


describe('testFindServiceAreasService_processAsync',function(){
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
        var centerArray = [new SuperMap.Geometry.Point(119.6100397551, -122.6278394459),
            new SuperMap.Geometry.Point(171.9035599945, -113.2491141857)
        ];
        var weightArray = [1, 2];
        var resultSetting = new SuperMap.TransportationAnalystResultSetting({
            returnEdgeFeatures: true,
            returnEdgeGeometry: true,
            returnEdgeIDs: true,
            returnNodeFeatures: true,
            returnNodeGeometry: true,
            returnNodeIDs: true,
            returnPathGuides: true,
            returnRoutes: true
        });
        var analystParameter = new SuperMap.TransportationAnalystParameter({
            resultSetting: resultSetting,
            weightFieldName: "length"
        });
        var parameter = new SuperMap.FindServiceAreasParameters({
            isAnalyzeById: false,
            centers: centerArray,
            weights: weightArray,
            isCenterMutuallyExclusive: false,
            isFromCenter: false,
            parameter: analystParameter
        });
        var findServiceAreasService = initFindServiceAreasService();
        findServiceAreasService.processAsync(parameter);

        setTimeout(function(){
            try{
                var analystResult = serviceSucceedEventArgsSystem.result;
                expect(analystResult.serviceAreaList != null).toBeTruthy();
                expect(analystResult.serviceAreaList[0].edgeFeatures != null).toBeTruthy();
                expect(analystResult.serviceAreaList[0].edgeIDs[0]).toEqual(8366);
                expect(analystResult.serviceAreaList[0].nodeFeatures != null).toBeTruthy();
                expect(analystResult.serviceAreaList[0].routes != null).toBeTruthy();
                expect(analystResult.serviceAreaList[0].serviceRegion != null).toBeTruthy();
                findServiceAreasService.destroy();
                expect(findServiceAreasService.EVENT_TYPES).toBeNull();
                expect(findServiceAreasService.events).toBeNull();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FindServiceAreasService_" + exception.name + ":" + exception.message);
                findServiceAreasService.destroy();
                done();
            }
        },2000)
    });

    //设置返回信息的有效性
    it('returnInformationInvalid',function(done){
        var centerArray = [new SuperMap.Geometry.Point(119.6100397551, -122.6278394459),
            new SuperMap.Geometry.Point(171.9035599945, -113.2491141857)
        ];
        var weightArray = [1, 2];
        var resultSetting = new SuperMap.TransportationAnalystResultSetting({
            returnEdgeFeatures: false,
            returnEdgeGeometry: false,
            returnEdgeIDs: false,
            returnNodeFeatures: false,
            returnNodeGeometry: false,
            returnNodeIDs: false,
            returnPathGuides: false,
            returnRoutes: false
        });
        var analystParameter = new SuperMap.TransportationAnalystParameter({
            resultSetting: resultSetting,
            weightFieldName: "length"
        });
        var parameter = new SuperMap.FindServiceAreasParameters({
            isAnalyzeById: false,
            centers: centerArray,
            weights: weightArray,
            isCenterMutuallyExclusive: false,
            isFromCenter: false,
            parameter: analystParameter
        });
        var findServiceAreasService = initFindServiceAreasService();
        findServiceAreasService.processAsync(parameter);

        setTimeout(function(){
            try{
                var analystResult = serviceSucceedEventArgsSystem.result;
                expect(analystResult.serviceAreaList).not.toBeNull();
                expect(analystResult.serviceAreaList[0].edgeFeatures).toBeNull();
                expect(analystResult.serviceAreaList[0].edgeIDs.length).toEqual(0);
                expect(analystResult.serviceAreaList[0].nodeFeatures).toBeNull();
                expect(analystResult.serviceAreaList[0].nodeIDs.length).toEqual(0);
                expect(analystResult.serviceAreaList[0].routes).toBeNull();
                expect(analystResult.serviceAreaList[0].serviceRegion).not.toBeNull();
                findServiceAreasService.destroy();
                expect(findServiceAreasService.EVENT_TYPES).toBeNull();
                expect(findServiceAreasService.events).toBeNull();
                parameter.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FindServiceAreasService_" + exception.name + ":" + exception.message);
                findServiceAreasService.destroy();
                parameter.destroy();
                done();
            }
        },2000)
    });

    //id为空
    it('isAnalystById',function(done){
        var centerArray = [new SuperMap.Geometry.Point(119.6100397551, -122.6278394459),
            new SuperMap.Geometry.Point(171.9035599945, -113.2491141857)
        ];
        var weightArray = [1, 2];
        var resultSetting = new SuperMap.TransportationAnalystResultSetting({
            returnEdgeFeatures: false,
            returnEdgeGeometry: false,
            returnEdgeIDs: false,
            returnNodeFeatures: false,
            returnNodeGeometry: false,
            returnNodeIDs: false,
            returnPathGuides: false,
            returnRoutes: false
        });
        var analystParameter = new SuperMap.TransportationAnalystParameter({
            resultSetting: resultSetting,
            weightFieldName: "length"
        });
        var parameter = new SuperMap.FindServiceAreasParameters({
            isAnalyzeById: true,
            centers: centerArray,
            weights: weightArray,
            isCenterMutuallyExclusive: false,
            isFromCenter: false,
            parameter: analystParameter
        });
        var findServiceAreasService = initFindServiceAreasService();
        findServiceAreasService.processAsync(parameter);

        setTimeout(function(){
            try{
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                findServiceAreasService.destroy();
                expect(findServiceAreasService.EVENT_TYPES).toBeNull();
                expect(findServiceAreasService.events).toBeNull();
                parameter.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FindServiceAreasService_" + exception.name + ":" + exception.message);
                findServiceAreasService.destroy();
                parameter.destroy();
                done();
            }
        },2000)
    });

    //参数错误
    it('paramsWrong',function(done){
        var centerArray = [new SuperMap.Geometry.Point(119.6100397551, -122.6278394459),
            new SuperMap.Geometry.Point(171.9035599945, -113.2491141857)
        ];
        var weightArray = [1, 2];
        var resultSetting = new SuperMap.TransportationAnalystResultSetting({
            returnEdgeFeatures: false,
            returnEdgeGeometry: false,
            returnEdgeIDs: false,
            returnNodeFeatures: false,
            returnNodeGeometry: false,
            returnNodeIDs: false,
            returnPathGuides: false,
            returnRoutes: false
        });
        var analystParameter = new SuperMap.TransportationAnalystParameter({
            resultSetting: resultSetting,
            weightFieldName: "TurnCost1"
        });
        var parameter = new SuperMap.FindServiceAreasParameters({
            isAnalyzeById: false,
            centers: centerArray,
            weights: weightArray,
            isCenterMutuallyExclusive: false,
            isFromCenter: false,
            parameter: analystParameter
        });
        var findServiceAreasService = initFindServiceAreasService();
        findServiceAreasService.processAsync(parameter);

        setTimeout(function(){
            try{
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                findServiceAreasService.destroy();
                expect(findServiceAreasService.EVENT_TYPES).toBeNull();
                expect(findServiceAreasService.events).toBeNull();
                parameter.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FindServiceAreasService_" + exception.name + ":" + exception.message);
                findServiceAreasService.destroy();
                parameter.destroy();
                done();
            }
        },2000)
    });

    //参数为空
    it('parameterNull',function(done){
        var findServiceAreasService = initFindServiceAreasService();
        findServiceAreasService.processAsync();

        setTimeout(function(){
            try{
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                findServiceAreasService.destroy();
                expect(findServiceAreasService.EVENT_TYPES).toBeNull();
                expect(findServiceAreasService.events).toBeNull();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FindServiceAreasService_" + exception.name + ":" + exception.message);
                findServiceAreasService.destroy();
                done();
            }
        },2000)
    });

    //AnalyzeById_null
    it('AnalyzeById_null',function(done){
        var centerArray = [new SuperMap.Geometry.Point(119.6100397551, -122.6278394459),
            new SuperMap.Geometry.Point(171.9035599945, -113.2491141857)
        ];
        var weightArray = [1, 2];
        var resultSetting = new SuperMap.TransportationAnalystResultSetting({
            returnEdgeFeatures: true,
            returnEdgeGeometry: true,
            returnEdgeIDs: true,
            returnNodeFeatures: true,
            returnNodeGeometry: true,
            returnNodeIDs: true,
            returnPathGuides: true,
            returnRoutes: true
        });
        var analystParameter = new SuperMap.TransportationAnalystParameter({
            resultSetting: resultSetting,
            weightFieldName: "length"
        });
        var parameter = new SuperMap.FindServiceAreasParameters({
            isAnalyzeById: "AnalyzeById",
            centers: centerArray,
            weights: weightArray,
            isCenterMutuallyExclusive: false,
            isFromCenter: false,
            parameter: analystParameter
        });
        var findServiceAreasService = initFindServiceAreasService();
        findServiceAreasService.processAsync(parameter);

        setTimeout(function(){
            try{
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                findServiceAreasService.destroy();
                expect(findServiceAreasService.EVENT_TYPES).toBeNull();
                expect(findServiceAreasService.events).toBeNull();
                parameter.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FindServiceAreasService_" + exception.name + ":" + exception.message);
                findServiceAreasService.destroy();
                parameter.destroy();
                done();
            }
        },2000)
    })
});
