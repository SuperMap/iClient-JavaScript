﻿import {FindLocationService} from '../../../src/common/iServer/FindLocationService';
import {FindLocationParameters} from '../../../src/common/iServer/FindLocationParameters';
import {SupplyCenter} from '../../../src/common/iServer/SupplyCenter'
import {SupplyCenterType} from '../../../src/common/REST';

var url = GlobeParameter.networkAnalystURL;
//服务初始化时注册事件监听函数
var serviceFailedEventArgsSystem = null, serviceSucceedEventArgsSystem = null;
var initFindLocationService_RegisterListener = () => {
    return new FindLocationService(url, options);
};
var findLocationServiceCompleted = (serviceSucceedEventArgs) => {
    serviceSucceedEventArgsSystem = serviceSucceedEventArgs;
};
var findLocationServiceFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
};
var options = {
    eventListeners: {
        'processFailed': findLocationServiceFailed,
        'processCompleted': findLocationServiceCompleted
    }
};

describe('FindLocationService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('processAsync:default', (done) => {
        var expectedSupplyCenterCount = 1,
            turnWeightField = "TurnCost",
            weightName = "length";
        var supplyCenterType_OPTIONALCENTER = SupplyCenterType.OPTIONALCENTER;
        var supplyCenters = [
            new SupplyCenter({
                maxWeight: 500,
                nodeID: 139,
                resourceValue: 100,
                type: supplyCenterType_OPTIONALCENTER

            }),
            new SupplyCenter({
                maxWeight: 500,
                nodeID: 1358,
                resourceValue: 100,
                type: supplyCenterType_OPTIONALCENTER

            })];
        var parameter = new FindLocationParameters({
            expectedSupplyCenterCount: expectedSupplyCenterCount,
            isFromCenter: false,
            supplyCenters: supplyCenters,
            turnWeightField: turnWeightField,
            weightName: weightName
        });
        var findLocationService = initFindLocationService_RegisterListener();
        findLocationService.processAsync(parameter);
        setTimeout(() => {
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
    it('processAsync_isFromCenter:true', (done) => {
        var expectedSupplyCenterCount = 1;
        // var nodeDemandField = "Demand";
        var turnWeightField = "TurnCost";
        var weightName = "length";
        var supplyCenterType_OPTIONALCENTER = SupplyCenterType.OPTIONALCENTER;
        var supplyCenters = [
            new SupplyCenter({
                maxWeight: 500,
                nodeID: 139,
                resourceValue: 100,
                type: supplyCenterType_OPTIONALCENTER
            }),
            new SupplyCenter({
                maxWeight: 500,
                nodeID: 1358,
                resourceValue: 100,
                type: supplyCenterType_OPTIONALCENTER

            })];
        var parameter = new FindLocationParameters({
            expectedSupplyCenterCount: expectedSupplyCenterCount,
            isFromCenter: true,
            supplyCenters: supplyCenters,
            turnWeightField: turnWeightField,
            weightName: weightName
        });
        var findLocationService = initFindLocationService_RegisterListener();
        findLocationService.processAsync(parameter);
        setTimeout(() => {
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
    it('processAsync_parameterWrong', (done) => {
        var expectedSupplyCenterCount = 1,
            turnWeightField = "TurnCost1",
            weightName = "length";
        var supplyCenterType_OPTIONALCENTER = SupplyCenterType.OPTIONALCENTER;
        var supplyCenters = [
            new SupplyCenter({
                maxWeight: 500,
                nodeID: 139,
                resourceValue: 100,
                type: supplyCenterType_OPTIONALCENTER

            }),
            new SupplyCenter({
                maxWeight: 500,
                nodeID: 1358,
                resourceValue: 100,
                type: supplyCenterType_OPTIONALCENTER
            })];
        var parameter = new FindLocationParameters({
            expectedSupplyCenterCount: expectedSupplyCenterCount,
            isFromCenter: true,
            supplyCenters: supplyCenters,
            turnWeightField: turnWeightField,
            weightName: weightName
        });
        var findLocationService = initFindLocationService_RegisterListener();
        findLocationService.processAsync(parameter);
        setTimeout(() => {
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
    it('processAsync_parameterNull', (done) => {
        var findLocationService = initFindLocationService_RegisterListener();
        findLocationService.processAsync();
        setTimeout(() => {
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


