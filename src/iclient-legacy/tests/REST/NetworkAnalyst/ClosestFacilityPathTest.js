module("ClosestFacilityPath");

test("TestDefaultConstructor",function(){
    expect(10);
    var closestFacilityPath = new SuperMap.REST.ClosestFacilityPath();
    ok(closestFacilityPath.facility == null, "facility");
    ok(closestFacilityPath.facilityIndex == null, "facilityIndex");
    ok(closestFacilityPath.edgeFeatures == null, "edgeFeatures");
    ok(closestFacilityPath.edgeIDs == null, "edgeIDs");
    ok(closestFacilityPath.nodeFeatures == null, "nodeFeatures");    
    ok(closestFacilityPath.nodeIDs == null, "nodeIDs");    
    ok(closestFacilityPath.pathGuideItems == null, "pathGuideItems");    
    ok(closestFacilityPath.route == null, "route");  
    ok(closestFacilityPath.stopWeights == null, "stopWeights");  
    ok(closestFacilityPath.weight == null, "weight");  
});

test("TestConstructor",function(){
    expect(10);
    var facility = new SuperMap.Geometry.Point(2,2),
        edgeIDs = [1, 2, 3],
        nodeIDs = [4, 5, 6],
        stopWeights = ["length"],
        weight = 10;
    var closestFacilityPath = new SuperMap.REST.ClosestFacilityPath({
        facility: facility,
        facilityIndex: 2,
        edgeIDs: edgeIDs,
        nodeIDs: nodeIDs,
        pathGuideItems: new Array(),
        stopWeights: stopWeights,
        weight: weight
    });
    equal(closestFacilityPath.facility, facility, "facility");
    ok(closestFacilityPath.facilityIndex == 2, "facilityIndex");
    ok(closestFacilityPath.edgeFeatures == null, "edgeFeatures");
    equal(closestFacilityPath.edgeIDs, edgeIDs, "edgeIDs");
    ok(closestFacilityPath.nodeFeatures == null, "nodeFeatures");    
    equal(closestFacilityPath.nodeIDs, nodeIDs, "nodeIDs");
    ok(closestFacilityPath.pathGuideItems != null, "pathGuideItems");    
    ok(closestFacilityPath.route == null, "route");  
    equal(closestFacilityPath.stopWeights, stopWeights, "stopWeights");
    equal(closestFacilityPath.weight, weight, "weight"); 
});

test("TestDestructor",function(){
    expect(10);
    var facility = new SuperMap.Geometry.Point(2,2),
        edgeIDs = [1, 2, 3],
        nodeIDs = [4, 5, 6],
        stopWeights = ["length"],
        weight = 10;
    var closestFacilityPath = new SuperMap.REST.ClosestFacilityPath({
        facility: facility,
        facilityIndex: 2,
        edgeIDs: edgeIDs,
        nodeIDs: nodeIDs,
        pathGuideItems: new Array(),
        stopWeights: stopWeights,
        weight: weight
    });

    closestFacilityPath.destroy();
    ok(closestFacilityPath.facility == null, "facility");
    ok(closestFacilityPath.facilityIndex == null, "facilityIndex");
    ok(closestFacilityPath.edgeFeatures == null, "edgeFeatures");
    ok(closestFacilityPath.edgeIDs == null, "edgeIDs");
    ok(closestFacilityPath.nodeFeatures == null, "nodeFeatures");    
    ok(closestFacilityPath.nodeIDs == null, "nodeIDs");    
    ok(closestFacilityPath.pathGuideItems == null, "pathGuideItems");    
    ok(closestFacilityPath.route == null, "route");  
    ok(closestFacilityPath.stopWeights == null, "stopWeights");  
    ok(closestFacilityPath.weight == null, "weight");     
});

//测试jsonObject为null时的健壮性
test("TestFromJson",function(){
    var jsonObject;
    var closestFacilityPath = SuperMap.REST.ClosestFacilityPath.fromJson(jsonObject);
    ok(closestFacilityPath == null, "closestFacilityPath");
    jsonObject = {"facilityPathList":[{"weight":187.0178940118988,"edgeFeatures":null,"nodeIDs":[],"facility":{},"route":null,"stopWeights":[187.0178940118988],"pathGuideItems":null,"nodeFeatures":null,"edgeIDs":[],"facilityIndex":0}]};
    closestFacilityPath = SuperMap.REST.ClosestFacilityPath.fromJson(jsonObject);
    equal(closestFacilityPath.weight, null, "weight");
});