require('../../../src/Core/iServer/FindClosestFacilitiesService');

var serviceFailedEventArgsSystem = null;
var serviceSucceedEventArgsSystem = null;
var url = GlobeParameter.networkAnalystURL;
var options = {
    eventListeners: {
        'processFailed': findClosestFacilitiesServiceFailed,
        'processCompleted':findClosestFacilitiesServiceCompleted
    }
};
function initFindClosestFacilitiesService() {
    return new SuperMap.REST.FindClosestFacilitiesService(url, options);
}
function findClosestFacilitiesServiceCompleted(serviceSucceedEventArgs){
    serviceSucceedEventArgsSystem = serviceSucceedEventArgs;
}
function findClosestFacilitiesServiceFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}

describe('testFindClosestFacilitiesService_processAsync',function(){
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('return:True',function(done){
        var facilityPoints = [new SuperMap.Geometry.Point(119.6100397551, -122.6278394459),
            new SuperMap.Geometry.Point(171.9035599945, -113.2491141857)
        ];
        var eventPoint = new SuperMap.Geometry.Point(159.6100397551, -116.6278394459);
        var analystParameter = new TransportationAnalystParameter();
        var resultSetting = new TransportationAnalystResultSetting();
        resultSetting.returnEdgeFeatures = true;
        resultSetting.returnEdgeGeometry = true;
        resultSetting.returnEdgeIDs = true;
        resultSetting.returnNodeFeatures = true;
        resultSetting.returnNodeGeometry = true;
        resultSetting.returnNodeIDs = true;
        resultSetting.returnPathGuides = true;
        resultSetting.returnRoutes = true;
        analystParameter.resultSetting = resultSetting;
        var parameter = new FindClosestFacilitiesParameters();
        parameter.isAnalyzeById = false;
        parameter.event = eventPoint;
        parameter.facilities = facilityPoints;
        parameter.expectFacilityCount = 2;
        parameter.parameter = analystParameter;
        var closestFacilitiesService = initFindClosestFacilitiesService();
        closestFacilitiesService.processAsync(parameter);

        setTimeout(function(){
            try{
                var analystResult = serviceSucceedEventArgsSystem.result;
                expect(closestFacilitiesService).not.toBeNull();
                expect(analystResult.facilityPathList).not.toBeNull();
                expect(analystResult.facilityPathList[0].edgeFeatures).not.toBeNull();
                expect(analystResult.facilityPathList[0].edgeFeatures[0].geometry).not.toBeNull();
                expect(analystResult.facilityPathList[0].edgeIDs).not.toBeNull();
                expect(analystResult.facilityPathList[0].nodeFeatures).not.toBeNull();
                expect(analystResult.facilityPathList[0].nodeIDs).not.toBeNull();
                expect(analystResult.facilityPathList[0].pathGuideItems).not.toBeNull();
                expect(analystResult.facilityPathList[0].route).not.toBeNull();
                expect(serviceSucceedEventArgsSystem).not.toBeNull();
                closestFacilitiesService.destroy();
                parameter.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                closestFacilitiesService.destroy();
                parameter.destroy();
                done();
            }
        },6000);
    });

    // isAnalyzeById
    it('isAnalyzeById',function(done){
        var transReSetting = new TransportationAnalystResultSetting();
        with (transReSetting) {
            returnEdgeFeatures = true;
            returnEdgeIDs = true;
            returnNodeFeatures = true;
            returnNodeIDs = true;
        }
        var transAnaParams = new TransportationAnalystParameter();
        transAnaParams.resultSetting = transReSetting;
        var facilitiesParams = new FindClosestFacilitiesParameters();
        with (facilitiesParams) {
            event = 4602;
            facilities = [4529, 4530];
            isAnalyzeById = true;
            expectFacilityCount = 2;
            fromEvent = true;
            maxWeight = 30;
            parameter = transAnaParams
        }
        var closestFacilitiesService = initFindClosestFacilitiesService();
        closestFacilitiesService.processAsync(facilitiesParams);

        setTimeout(function(){
            try{
                expect(serviceSucceedEventArgsSystem).not.toBeNull();
                closestFacilitiesService.destroy();
                expect(closestFacilitiesService.EVENT_TYPES).toBeNull();
                expect(closestFacilitiesService.events).toBeNull();
                facilitiesParams.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                closestFacilitiesService.destroy();
                facilitiesParams.destroy();
                done();
            }
        },6000)
    });

    //参数为空
    it('parameterNull',function(done){
        var transReSetting = new TransportationAnalystResultSetting();
        with (transReSetting) {
            returnEdgeFeatures = true;
            returnEdgeIDs = true;
            returnNodeFeatures = true;
            returnNodeIDs = true;
        }
        var transAnaParams = new TransportationAnalystParameter();
        transAnaParams.resultSetting = transReSetting;
        var facilitiesParams = new FindClosestFacilitiesParameters();
        with (facilitiesParams) {
            event = 4602;
            facilities = [4529, 4530];
            isAnalyzeById = true;
            expectFacilityCount = 2;
            fromEvent = true;
            maxWeight = 30;
            parameter = transAnaParams
        }
        var closestFacilitiesService = initFindClosestFacilitiesService();
        closestFacilitiesService.processAsync();

        setTimeout(function(){
            try{
                expect(serviceSucceedEventArgsSystem.result.facilityPathList).toBeNull();
                closestFacilitiesService.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                closestFacilitiesService.destroy();
                done();
            }
        },6000);
    });

    it('failedEvent',function(done){
        var transReSetting = new TransportationAnalystResultSetting();
        with (transReSetting) {
            returnEdgeFeatures = true;
            returnEdgeIDs = true;
            returnNodeFeatures = true;
            returnNodeIDs = true;
        }

        var transAnaParams = new TransportationAnalystParameter();
        transAnaParams.resultSetting = transReSetting;

        var facilitiesParams = new FindClosestFacilitiesParameters();
        with (facilitiesParams) {
            event = 4602;
            facilities = "facil”";
            isAnalyzeById = true;
            expectFacilityCount = 2;
            fromEvent = true;
            maxWeight = 30;
            parameter = transAnaParams
        }
        var closestFacilitiesService = initFindClosestFacilitiesService();
        closestFacilitiesService.processAsync(facilitiesParams);

        setTimeout(function(){
            try{
                expect(serviceSucceedEventArgsSystem.result.facilityPathList).toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                closestFacilitiesService.destroy();
                facilitiesParams.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                closestFacilitiesService.destroy();
                facilitiesParams.destroy();
                done();
            }
        },6000)
    })
});



