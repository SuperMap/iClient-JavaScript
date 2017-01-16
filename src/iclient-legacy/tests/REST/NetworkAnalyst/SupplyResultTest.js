module("SupplyResult");

test("TestDefaultConstructor",function(){
    expect(8);
    var supplyResult = new SuperMap.REST.SupplyResult();
    ok(supplyResult.actualResourceValue == null, "actualResourceValue");
    ok(supplyResult.averageWeight == null, "averageWeight");
    ok(supplyResult.demandCount == null, "demandCount");    
    ok(supplyResult.maxWeight == null, "maxWeight");      
    ok(supplyResult.nodeID == null, "nodeID");  
    ok(supplyResult.resourceValue == null, "resourceValue");
    ok(supplyResult.totalWeights == null, "totalWeights");
    ok(supplyResult.type == null, "type");
});

test("TestConstructor",function(){
    expect(8);
    var actualResourceValue = 1,
        averageWeight = 2,
        demandCount = 3,
        maxWeight = 5,
        nodeID = 7,
        resourceValue = 8,
        totalWeights = 9;
    var supplyResult = new SuperMap.REST.SupplyResult({
        actualResourceValue: actualResourceValue,
        averageWeight: averageWeight,
        demandCount: demandCount,
        maxWeight: maxWeight,
        nodeID: nodeID,
        resourceValue: resourceValue,
        totalWeights: totalWeights
    });
    equal(supplyResult.actualResourceValue, actualResourceValue, "actualResourceValue");
    equal(supplyResult.averageWeight, averageWeight, "averageWeight");
    equal(supplyResult.demandCount, demandCount, "demandCount");
    equal(supplyResult.maxWeight, maxWeight, "maxWeight");
    equal(supplyResult.nodeID, nodeID, "nodeID");
    equal(supplyResult.resourceValue, resourceValue, "resourceValue");
    equal(supplyResult.totalWeights, totalWeights, "totalWeights");
    ok(supplyResult.type == null, "type"); 
});

test("TestDestructor",function(){
    expect(8);
    var actualResourceValue = 1,
        averageWeight = 2,
        demandCount = 3,
        maxWeight = 5,
        nodeID = 7,
        resourceValue = 8,
        totalWeights = 9;
    var supplyResult = new SuperMap.REST.SupplyResult({
        actualResourceValue: actualResourceValue,
        averageWeight: averageWeight,
        demandCount: demandCount,
        maxWeight: maxWeight,
        nodeID: nodeID,
        resourceValue: resourceValue,
        totalWeights: totalWeights
    });
    
    supplyResult.destroy();
    ok(supplyResult.actualResourceValue == null, "actualResourceValue");
    ok(supplyResult.averageWeight == null, "averageWeight");
    ok(supplyResult.demandCount == null, "demandCount");    
    ok(supplyResult.maxWeight == null, "maxWeight");       
    ok(supplyResult.nodeID == null, "nodeID");  
    ok(supplyResult.resourceValue == null, "resourceValue"); 
    ok(supplyResult.totalWeights == null, "totalWeights"); 
    ok(supplyResult.type == null, "type"); 
});

test("Test_fromJson",function(){
    var supplyResult = SuperMap.REST.SupplyResult.fromJson();
    ok(supplyResult == null, "supplyResult");
});