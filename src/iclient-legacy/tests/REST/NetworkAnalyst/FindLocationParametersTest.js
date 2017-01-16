module("FindLocationParameters");

test("TestDefaultConstructor",function(){
    var findLocationParameters;
    findLocationParameters = new SuperMap.REST.FindLocationParameters();
    ok(findLocationParameters.expectedSupplyCenterCount == null, "expectedSupplyCenterCount");
    ok(findLocationParameters.isFromCenter == false, "isFromCenter");
//    ok(findLocationParameters.nodeDemandField == null, "nodeDemandField");
    ok(findLocationParameters.supplyCenters == null, "supplyCenters");
    ok(findLocationParameters.turnWeightField == null, "turnWeightField");    
    ok(findLocationParameters.weightName == null, "weightName");
});

test("TestConstructor",function(){
    var expectedSupplyCenterCount = 1, 
//        nodeDemandField = "a",
        turnWeightField = "b",
        weightName = "c",
        maxWeight = 5,
        nodeID = 6,
        resourceValue = 10,
        supplyCenters = [], type, findLocationParameters;
    type = SuperMap.REST.SupplyCenterType.FIXEDCENTER;
    supplyCenters = [new SuperMap.REST.SupplyCenter({
        maxWeight: maxWeight,
        nodeID: nodeID,
        resourceValue: resourceValue,
        type: type
    })];
    findLocationParameters = new SuperMap.REST.FindLocationParameters({
        expectedSupplyCenterCount: expectedSupplyCenterCount,
        isFromCenter : true,
//        nodeDemandField: nodeDemandField,
        supplyCenters: supplyCenters,
        turnWeightField: turnWeightField,
        weightName: weightName
    });
    equal(findLocationParameters.expectedSupplyCenterCount, expectedSupplyCenterCount, "expectedSupplyCenterCount");
    ok(findLocationParameters.isFromCenter == true, "isFromCenter");
//    equal(findLocationParameters.nodeDemandField, nodeDemandField, "nodeDemandField");
    equal(findLocationParameters.supplyCenters, supplyCenters, "supplyCenters");
    equal(findLocationParameters.turnWeightField, turnWeightField, "turnWeightField");
    equal(findLocationParameters.weightName, weightName, "weightName");
});

test("TestDestructor",function(){
    var expectedSupplyCenterCount = 1, 
//        nodeDemandField = "a",
        turnWeightField = "b",
        weightName = "c",
        maxWeight = 5,
        nodeID = 6,
        resourceValue = 10,
        supplyCenters = [], type, findLocationParameters;
    type = SuperMap.REST.SupplyCenterType.FIXEDCENTER;
    supplyCenters = [new SuperMap.REST.SupplyCenter({
        maxWeight: maxWeight,
        nodeID: nodeID,
        resourceValue: resourceValue,
        type: type
    })];
    findLocationParameters = new SuperMap.REST.FindLocationParameters({
        expectedSupplyCenterCount: expectedSupplyCenterCount,
        isFromCenter : true,
//        nodeDemandField: nodeDemandField,
        supplyCenters: supplyCenters,
        turnWeightField: turnWeightField,
        weightName: weightName
    });
    findLocationParameters.destroy();
    ok(findLocationParameters.expectedSupplyCenterCount == null, "expectedSupplyCenterCount");
    ok(findLocationParameters.isFromCenter == null, "isFromCenter");
//    ok(findLocationParameters.nodeDemandField == null, "nodeDemandField");
    ok(findLocationParameters.supplyCenters == null, "supplyCenters");
    ok(findLocationParameters.turnWeightField == null, "turnWeightField");
    ok(findLocationParameters.weightName == null, "weightName");
});