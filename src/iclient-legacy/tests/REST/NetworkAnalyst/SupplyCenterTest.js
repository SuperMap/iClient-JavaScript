module("SupplyCenter");

test("TestDefaultConstructor",function(){
    expect(4);
    var supplyCenter = new SuperMap.REST.SupplyCenter();
    ok(supplyCenter.maxWeight == null, "maxWeight");
    ok(supplyCenter.nodeID == null, "nodeID");
    ok(supplyCenter.resourceValue == null, "resourceValue");    
    ok(supplyCenter.type == null, "type");
});

test("TestConstructor",function(){
    expect(4);
    var maxWeight = 5,
        nodeID = 4,
        resourceValue = 2;
    var supplyCenter = new SuperMap.REST.SupplyCenter({
        maxWeight: maxWeight,
        nodeID: nodeID,
        resourceValue: resourceValue
    });
    equal(supplyCenter.maxWeight, maxWeight, "maxWeight");   
    equal(supplyCenter.nodeID, nodeID, "nodeID");
    equal(supplyCenter.resourceValue, resourceValue, "resourceValue");     
    ok(supplyCenter.type == null, "type");
});

test("TestDestructor",function(){
    expect(4);
    var supplyCenter = new SuperMap.REST.SupplyCenter({
        maxWeight: 5,
        nodeID: 4,
        resourceValue: 2
    });
    
    supplyCenter.destroy();
    ok(supplyCenter.maxWeight == null, "edgeFeatures");
    ok(supplyCenter.nodeID == null, "edgeIDs");
    ok(supplyCenter.resourceValue == null, "nodeFeatures");         
    ok(supplyCenter.type == null, "routes");  
});

test("Test_fromJson",function(){
    var supplyCenter = SuperMap.REST.SupplyCenter.fromJson();
    ok(supplyCenter == null, "supplyCenter");
});