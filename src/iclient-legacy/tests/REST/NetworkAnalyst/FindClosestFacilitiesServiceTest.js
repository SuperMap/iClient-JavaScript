module("FindClosestFacilitiesService");

var serviceFailedEventArgsSystem = null;

function initFindClosestFacilitiesService() {
    return new SuperMap.REST.FindClosestFacilitiesService(GlobeParameter.networkAnalystURL, {eventListeners:{'processFailed': findClosestFacilitiesServiceFailed}});
}
function findClosestFacilitiesServiceFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}
asyncTest("TestFindClosestFacilitiesService_Constructor", function () {
    var facilityPoints = [new SuperMap.Geometry.Point(119.6100397551, -122.6278394459),
            new SuperMap.Geometry.Point(171.9035599945, -113.2491141857)
        ]
        eventPoint = new SuperMap.Geometry.Point(159.6100397551, -116.6278394459);
    expect(2);
    var analystParameter = new SuperMap.REST.TransportationAnalystParameter();
    var resultSetting = new SuperMap.REST.TransportationAnalystResultSetting();
    resultSetting.returnEdgeFeatures = true;
    resultSetting.returnEdgeGeometry = true;
    resultSetting.returnEdgeIDs = true;
    resultSetting.returnNodeFeatures = true;
    resultSetting.returnNodeGeometry = true;
    resultSetting.returnNodeIDs = true;
    resultSetting.returnPathGuides = true;
    resultSetting.returnRoutes = true
    analystParameter.resultSetting = resultSetting;

    var parameter = new SuperMap.REST.FindClosestFacilitiesParameters();
    parameter.isAnalyzeById = false;
    parameter.event = eventPoint;
    parameter.facilities = facilityPoints;
    parameter.expectFacilityCount = 2;
    parameter.parameter = analystParameter;

    var closestFacilitiesService = initFindClosestFacilitiesService();
    ok(closestFacilitiesService instanceof SuperMap.REST.FindClosestFacilitiesService, "not null")
    closestFacilitiesService.processAsync(parameter);

    setTimeout(function () {
        try {
            var result = closestFacilitiesService.lastResult;
            ok(result != null, "lastResult");
            start();
        } catch (exception) {
            start();
        }
    }, 10000)
});

asyncTest("TestFindClosestFacilitiesService_isAnalyzeById", function () {
    var transReSetting = new SuperMap.REST.TransportationAnalystResultSetting();
    with (transReSetting) {
        returnEdgeFeatures = true;
        returnEdgeIDs = true;
        returnNodeFeatures = true;
        returnNodeIDs = true;
    }

    var transAnaParams = new SuperMap.REST.TransportationAnalystParameter();
    transAnaParams.resultSetting = transReSetting;

    var facilitiesParams = new SuperMap.REST.FindClosestFacilitiesParameters();
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
    ok(closestFacilitiesService instanceof SuperMap.REST.FindClosestFacilitiesService, "not null");
    closestFacilitiesService.processAsync(facilitiesParams);

    setTimeout(function () {
        try {
            var result = closestFacilitiesService.lastResult;
            ok(result != null, "lastResult");
            start();
        } catch (exception) {
            start();
        }
    }, 10000)
});

//参数为空
asyncTest("TestFindClosestFacilitiesService_null", function () {
    var transReSetting = new SuperMap.REST.TransportationAnalystResultSetting();
    with (transReSetting) {
        returnEdgeFeatures = true;
        returnEdgeIDs = true;
        returnNodeFeatures = true;
        returnNodeIDs = true;
    }

    var transAnaParams = new SuperMap.REST.TransportationAnalystParameter();
    transAnaParams.resultSetting = transReSetting;

    var facilitiesParams = new SuperMap.REST.FindClosestFacilitiesParameters();
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
    ok(closestFacilitiesService instanceof SuperMap.REST.FindClosestFacilitiesService, "not null");
    closestFacilitiesService.processAsync();

    setTimeout(function () {
        try {
            var result = closestFacilitiesService.lastResult;
            equal(result, undefined, "lastResult");
            start();
        } catch (exception) {
            start();
        }
    }, 10000)
});

asyncTest("TestFindClosestFacilitiesService_destroy", function () {
    var transReSetting = new SuperMap.REST.TransportationAnalystResultSetting();
    with (transReSetting) {
        returnEdgeFeatures = true;
        returnEdgeIDs = true;
        returnNodeFeatures = true;
        returnNodeIDs = true;
    }

    var transAnaParams = new SuperMap.REST.TransportationAnalystParameter();
    transAnaParams.resultSetting = transReSetting;

    var facilitiesParams = new SuperMap.REST.FindClosestFacilitiesParameters();
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
    ok(closestFacilitiesService instanceof SuperMap.REST.FindClosestFacilitiesService, "not null")
    closestFacilitiesService.processAsync(facilitiesParams);

    setTimeout(function () {
        try {
            var result = closestFacilitiesService.lastResult;
            ok(result != null, "lastResult");
            
            closestFacilitiesService.destroy();
            equal(closestFacilitiesService.EVENT_TYPES, null,"closestFacilitiesService.EVENT_TYPES");
            equal(closestFacilitiesService.events, null,"closestFacilitiesService.events");
            equal(closestFacilitiesService.lastResult, null,"closestFacilitiesService.lastResult");
            start();
        } catch (exception) {
            start();
        }
    }, 10000)
});

asyncTest("TestFindClosestFacilitiesService_failed", function () {
    var transReSetting = new SuperMap.REST.TransportationAnalystResultSetting();
    with (transReSetting) {
        returnEdgeFeatures = true;
        returnEdgeIDs = true;
        returnNodeFeatures = true;
        returnNodeIDs = true;
    }

    var transAnaParams = new SuperMap.REST.TransportationAnalystParameter();
    transAnaParams.resultSetting = transReSetting;

    var facilitiesParams = new SuperMap.REST.FindClosestFacilitiesParameters();
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
    ok(closestFacilitiesService instanceof SuperMap.REST.FindClosestFacilitiesService, "not null")
    closestFacilitiesService.processAsync(facilitiesParams);

    setTimeout(function () {
        try {
            var analystResult = closestFacilitiesService.lastResult;
            equal(serviceFailedEventArgsSystem.error.errorMsg,"参数facilities 不是有效的JSON 字符串对象","serviceFailedEventArgsSystem.error.errorMsg");
            ok(analystResult == null, "closestFacilitiesService.lastResult");
            start();
        } catch (exception) {
            start();
        }
    }, 10000)
});

