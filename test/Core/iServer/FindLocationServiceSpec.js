require('../../../src/Core/iServer/FindLocationService');

var serviceFailedEventArgsSystem = null;
var serviceSucceedEventArgsSystem = null;
//服务初始化时注册事件监听函数
var url = "http://localhost:8090/iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun";
var options = {
    eventListeners: {
        'processFailed': findLocationServiceFailed,
        'processCompleted':findLocationServiceCompleted
    }
};
function initFindLocationService_RegisterListener() {
    return new SuperMap.REST.FindLocationService(url, options);
}
function findLocationServiceCompleted(serviceSucceedEventArgs){
    serviceSucceedEventArgsSystem = serviceSucceedEventArgs;
}
function findLocationServiceFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}

describe('testFindLocationService_processAsync',function(){
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('basicTest',function(done){
        var expectedSupplyCenterCount = 1,
//        nodeDemandField = "Demand",
            turnWeightField = "TurnCost",
            weightName = "length";
        var supplyCenterType_OPTIONALCENTER = SupplyCenterType.OPTIONALCENTER;
        var supplyCenters=[
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
                isFromCenter : false,
//            nodeDemandField: nodeDemandField,
                supplyCenters: supplyCenters,
                turnWeightField: turnWeightField,
                weightName: weightName
            });
        findLocationService = initFindLocationService_RegisterListener();
        findLocationService.processAsync(parameter);

        setTimeout(function(){
            try{
                var analystResult = serviceSucceedEventArgsSystem.result;
                expect(analystResult.demandResults).not.toBeNull();
                expect(analystResult.demandResults[0].actualResourceValue).toEqual(470);
                expect(analystResult.demandResults[0].demandID).toEqual(885);
                expect(analystResult.demandResults[0].fieldNames).not.toBeNull();
                expect(analystResult.demandResults[0].fieldValues).not.toBeNull();
                expect(analystResult.demandResults[0].geometry).not.toBeNull();
                expect(analystResult.demandResults[0].isEdge).toBeFalsy();
                expect(analystResult.demandResults[0].supplyCenter.nodeID).toEqual(1358);
                expect(analystResult.supplyResults).not.toBeNull();
                expect(analystResult.supplyResults[0].actualResourceValue).toEqual(0);
                expect(analystResult.supplyResults[0].averageWeight).toEqual(289.6734693877551);
                expect(analystResult.supplyResults[0].demandCount).toEqual(49);
                expect(analystResult.supplyResults[0].fieldNames).not.toBeNull();
                expect(analystResult.supplyResults[0].fieldValues).not.toBeNull();
                expect(analystResult.supplyResults[0].geometry).not.toBeNull();
                expect(analystResult.supplyResults[0].maxWeight).toEqual(500);
                expect(analystResult.supplyResults[0].nodeID).toEqual(1358);
                //本机运行正常，服务器运行出错
                //ok(analystResult.supplyResults[0].resourceValue == 100.0, "supplyResult.resourceValue");
                expect(analystResult.supplyResults[0].totalWeights).toEqual(14194);
                expect(analystResult.supplyResults[0].type).toEqual("OPTIONALCENTER");
                findLocationService.destroy();
                expect(findLocationService.EVENT_TYPES).toBeNull();
                expect(findLocationService.events).toBeNull();
                parameter.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                findLocationService.destroy();
                parameter.destroy();
                done();
            }
        },6000);
    });

    //isFromCenter为true的情况
    it('isFromCenter',function(done){
        var expectedSupplyCenterCount = 1;
        // var nodeDemandField = "Demand";
        var turnWeightField = "TurnCost";
        var weightName = "length";
        var supplyCenterType_OPTIONALCENTER = SupplyCenterType.OPTIONALCENTER;
        var supplyCenters=[
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
            isFromCenter : true,
            // nodeDemandField: nodeDemandField,
            supplyCenters: supplyCenters,
            turnWeightField: turnWeightField,
            weightName: weightName
        });
        findLocationService = initFindLocationService_RegisterListener();
        findLocationService.processAsync(parameter);

        setTimeout(function(){
            try{
                var analystResult = serviceSucceedEventArgsSystem.result;
                expect(serviceSucceedEventArgsSystem.result.demandResults).not.toBeNull();
                expect(analystResult.demandResults[0].actualResourceValue).toEqual(470);
                expect(analystResult.demandResults[0].demandID).toEqual(885);
                expect(analystResult.demandResults[0].fieldNames).not.toBeNull();
                expect(analystResult.demandResults[0].fieldValues).not.toBeNull();
                expect(analystResult.demandResults[0].geometry).not.toBeNull();
                expect(analystResult.demandResults[0].isEdge).toBeFalsy();
                expect(analystResult.demandResults[0].supplyCenter.nodeID).toEqual(1358);
                expect(analystResult.supplyResults).not.toBeNull();
                expect(analystResult.supplyResults[0].actualResourceValue).toEqual(0);
                expect(analystResult.supplyResults[0].averageWeight).toEqual(289.6734693877551);
                expect(analystResult.supplyResults[0].demandCount).toEqual(49);
                expect(analystResult.supplyResults[0].fieldNames).not.toBeNull();
                expect(analystResult.supplyResults[0].fieldValues).not.toBeNull();
                expect(analystResult.supplyResults[0].geometry).not.toBeNull();
                expect(analystResult.supplyResults[0].maxWeight).toEqual(500);
                expect(analystResult.supplyResults[0].nodeID).toEqual(1358);
                //本机运行正常，服务器运行出错
                //ok(analystResult.supplyResults[0].resourceValue == 100.0, "supplyResult.resourceValue");
                expect(analystResult.supplyResults[0].totalWeights).toEqual(14194);
                expect(analystResult.supplyResults[0].type).toEqual("OPTIONALCENTER");
                findLocationService.destroy();
                expect(findLocationService.EVENT_TYPES).toBeNull();
                expect(findLocationService.events).toBeNull();
                parameter.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                findLocationService.destroy();
                parameter.destroy();
                done();
            }
        },6000)
    });

    //参数错误
    it('parameterWrong',function(done){
        var expectedSupplyCenterCount = 1,
//        nodeDemandField = "Demand",
            turnWeightField = "TurnCost1",
            weightName = "length";
        var supplyCenterType_OPTIONALCENTER = SupplyCenterType.OPTIONALCENTER;
        var supplyCenters=[
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
                isFromCenter : true,
//            nodeDemandField: nodeDemandField,
                supplyCenters: supplyCenters,
                turnWeightField: turnWeightField,
                weightName: weightName
            });
        var findLocationService = initFindLocationService_RegisterListener();
        findLocationService.processAsync(parameter);

        setTimeout(function(){
            try{
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                findLocationService.destroy();
                expect(findLocationService.EVENT_TYPES).toBeNull();
                expect(findLocationService.events).toBeNull();
                parameter.destroy();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                findLocationService.destroy();
                parameter.destroy();
                done();
            }
        },6000)
    });

    //参数为空
    it('parameterNull',function(done){
        var findLocationService = initFindLocationService_RegisterListener();
        findLocationService.processAsync();

        setTimeout(function(){
            try{
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                findLocationService.destroy();
                expect(findLocationService.EVENT_TYPES).toBeNull();
                expect(findLocationService.events).toBeNull();
                done();
            }catch (exception){
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                findLocationService.destroy();
                done();
            }
        })
    })
});


