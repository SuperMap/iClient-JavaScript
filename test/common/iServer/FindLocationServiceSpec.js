require('../../../src/common/iServer/FindLocationService');

var serviceFailedEventArgsSystem = null;
var serviceSucceedEventArgsSystem = null;
//服务初始化时注册事件监听函数
var url = GlobeParameter.networkAnalystURL;
var options = {
    eventListeners: {
        'processFailed': findLocationServiceFailed,
        'processCompleted': findLocationServiceCompleted
    }
};
function initFindLocationService_RegisterListener() {
    return new SuperMap.FindLocationService(url, options);
}
function findLocationServiceCompleted(serviceSucceedEventArgs) {
    serviceSucceedEventArgsSystem = serviceSucceedEventArgs;
}
function findLocationServiceFailed(serviceFailedEventArgs) {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}

describe('testFindLocationService_processAsync', function () {
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('basicTest', function (done) {
        var expectedSupplyCenterCount = 1,
//        nodeDemandField = "Demand",
            turnWeightField = "TurnCost",
            weightName = "length";
        var supplyCenterType_OPTIONALCENTER = SuperMap.SupplyCenterType.OPTIONALCENTER;
        var supplyCenters = [
            new SuperMap.SupplyCenter({
                maxWeight: 500,
                nodeID: 139,
                resourceValue: 100,
                type: supplyCenterType_OPTIONALCENTER

            }),
            new SuperMap.SupplyCenter({
                maxWeight: 500,
                nodeID: 1358,
                resourceValue: 100,
                type: supplyCenterType_OPTIONALCENTER

            })];
        var parameter = new SuperMap.FindLocationParameters({
            expectedSupplyCenterCount: expectedSupplyCenterCount,
            isFromCenter: false,
//            nodeDemandField: nodeDemandField,
            supplyCenters: supplyCenters,
            turnWeightField: turnWeightField,
            weightName: weightName
        });
        findLocationService = initFindLocationService_RegisterListener();
        findLocationService.processAsync(parameter);

        setTimeout(function () {
            try {
                var analystResult = serviceSucceedEventArgsSystem.result;
                expect(analystResult.demandResults).not.toBeNull();
                expect(analystResult.demandResults.type).toEqual("FeatureCollection");
                expect(analystResult.demandResults.features).not.toBeNull();
                expect(analystResult.demandResults.features[0].type).toEqual("Feature");
                expect(analystResult.demandResults.features[0].geometry).not.toBeNull();
                expect(analystResult.demandResults.features[0].geometry.type).toEqual("Point");
                expect(analystResult.demandResults.features[0].geometry.coordinates.length).toEqual(2);
                expect(analystResult.demandResults.features[0].properties.actualResourceValue).toEqual(470);
                expect(analystResult.demandResults.features[0].properties.demandID).toEqual(885);
                expect(analystResult.demandResults.features[0].properties.isEdge).toBeFalsy();
                expect(analystResult.demandResults.features[0].properties.supplyCenter.nodeID).toEqual(1358);

                expect(analystResult.supplyResults).not.toBeNull();
                expect(analystResult.supplyResults.type).toEqual("FeatureCollection");
                expect(analystResult.supplyResults.features).not.toBeNull();
                expect(analystResult.supplyResults.features[0].type).toEqual("Feature");
                expect(analystResult.supplyResults.features[0].geometry).not.toBeNull();
                expect(analystResult.supplyResults.features[0].geometry.type).toEqual("Point");
                expect(analystResult.supplyResults.features[0].geometry.coordinates.length).toEqual(2);
                expect(analystResult.supplyResults.features[0].properties.actualResourceValue).toEqual(0);
                expect(analystResult.supplyResults.features[0].properties.averageWeight).toEqual(289.6734693877551);
                expect(analystResult.supplyResults.features[0].properties.demandCount).toEqual(49);
                expect(analystResult.supplyResults.features[0].properties.maxWeight).toEqual(500);
                expect(analystResult.supplyResults.features[0].properties.nodeID).toEqual(1358);
                expect(analystResult.supplyResults.features[0].properties.totalWeights).toEqual(14194);
                expect(analystResult.supplyResults.features[0].properties.type).toEqual("OPTIONALCENTER");
                findLocationService.destroy();
                expect(findLocationService.EVENT_TYPES).toBeNull();
                expect(findLocationService.events).toBeNull();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindLocationService_" + exception.name + ":" + exception.message);
                findLocationService.destroy();
                parameter.destroy();
                done();
            }
        }, 2000);
    });

    //isFromCenter为true的情况
    it('isFromCenter', function (done) {
        var expectedSupplyCenterCount = 1;
        // var nodeDemandField = "Demand";
        var turnWeightField = "TurnCost";
        var weightName = "length";
        var supplyCenterType_OPTIONALCENTER = SuperMap.SupplyCenterType.OPTIONALCENTER;
        var supplyCenters = [
            new SuperMap.SupplyCenter({
                maxWeight: 500,
                nodeID: 139,
                resourceValue: 100,
                type: supplyCenterType_OPTIONALCENTER

            }),
            new SuperMap.SupplyCenter({
                maxWeight: 500,
                nodeID: 1358,
                resourceValue: 100,
                type: supplyCenterType_OPTIONALCENTER

            })];
        var parameter = new SuperMap.FindLocationParameters({
            expectedSupplyCenterCount: expectedSupplyCenterCount,
            isFromCenter: true,
            // nodeDemandField: nodeDemandField,
            supplyCenters: supplyCenters,
            turnWeightField: turnWeightField,
            weightName: weightName
        });
        findLocationService = initFindLocationService_RegisterListener();
        findLocationService.processAsync(parameter);

        setTimeout(function () {
            try {
                var analystResult = serviceSucceedEventArgsSystem.result;
                expect(analystResult.demandResults).not.toBeNull();
                expect(analystResult.demandResults.type).toEqual("FeatureCollection");
                expect(analystResult.demandResults.features).not.toBeNull();
                expect(analystResult.demandResults.features[0].type).toEqual("Feature");
                expect(analystResult.demandResults.features[0].geometry).not.toBeNull();
                expect(analystResult.demandResults.features[0].geometry.type).toEqual("Point");
                expect(analystResult.demandResults.features[0].geometry.coordinates.length).toEqual(2);
                expect(analystResult.demandResults.features[0].properties.actualResourceValue).toEqual(470);
                expect(analystResult.demandResults.features[0].properties.demandID).toEqual(885);
                expect(analystResult.demandResults.features[0].properties.isEdge).toBeFalsy();
                expect(analystResult.demandResults.features[0].properties.supplyCenter.nodeID).toEqual(1358);

                expect(analystResult.supplyResults).not.toBeNull();
                expect(analystResult.supplyResults.type).toEqual("FeatureCollection");
                expect(analystResult.supplyResults.features).not.toBeNull();
                expect(analystResult.supplyResults.features[0].type).toEqual("Feature");
                expect(analystResult.supplyResults.features[0].geometry).not.toBeNull();
                expect(analystResult.supplyResults.features[0].geometry.type).toEqual("Point");
                expect(analystResult.supplyResults.features[0].geometry.coordinates.length).toEqual(2);
                expect(analystResult.supplyResults.features[0].properties.actualResourceValue).toEqual(0);
                expect(analystResult.supplyResults.features[0].properties.averageWeight).toEqual(289.6734693877551);
                expect(analystResult.supplyResults.features[0].properties.demandCount).toEqual(49);
                expect(analystResult.supplyResults.features[0].properties.maxWeight).toEqual(500);
                expect(analystResult.supplyResults.features[0].properties.nodeID).toEqual(1358);
                expect(analystResult.supplyResults.features[0].properties.totalWeights).toEqual(14194);
                expect(analystResult.supplyResults.features[0].properties.type).toEqual("OPTIONALCENTER");

                findLocationService.destroy();
                expect(findLocationService.EVENT_TYPES).toBeNull();
                expect(findLocationService.events).toBeNull();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindLocationService_" + exception.name + ":" + exception.message);
                findLocationService.destroy();
                parameter.destroy();
                done();
            }
        }, 2000)
    });

    //参数错误
    it('parameterWrong', function (done) {
        var expectedSupplyCenterCount = 1,
//        nodeDemandField = "Demand",
            turnWeightField = "TurnCost1",
            weightName = "length";
        var supplyCenterType_OPTIONALCENTER = SuperMap.SupplyCenterType.OPTIONALCENTER;
        var supplyCenters = [
            new SuperMap.SupplyCenter({
                maxWeight: 500,
                nodeID: 139,
                resourceValue: 100,
                type: supplyCenterType_OPTIONALCENTER

            }),
            new SuperMap.SupplyCenter({
                maxWeight: 500,
                nodeID: 1358,
                resourceValue: 100,
                type: supplyCenterType_OPTIONALCENTER

            })];
        var parameter = new SuperMap.FindLocationParameters({
            expectedSupplyCenterCount: expectedSupplyCenterCount,
            isFromCenter: true,
//            nodeDemandField: nodeDemandField,
            supplyCenters: supplyCenters,
            turnWeightField: turnWeightField,
            weightName: weightName
        });
        var findLocationService = initFindLocationService_RegisterListener();
        findLocationService.processAsync(parameter);

        setTimeout(function () {
            try {
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                findLocationService.destroy();
                expect(findLocationService.EVENT_TYPES).toBeNull();
                expect(findLocationService.events).toBeNull();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindLocationService_" + exception.name + ":" + exception.message);
                findLocationService.destroy();
                parameter.destroy();
                done();
            }
        }, 2000)
    });

    //参数为空
    it('parameterNull', function (done) {
        var findLocationService = initFindLocationService_RegisterListener();
        findLocationService.processAsync();

        setTimeout(function () {
            try {
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                findLocationService.destroy();
                expect(findLocationService.EVENT_TYPES).toBeNull();
                expect(findLocationService.events).toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindLocationService_" + exception.name + ":" + exception.message);
                findLocationService.destroy();
                done();
            }
        })
    })
});


