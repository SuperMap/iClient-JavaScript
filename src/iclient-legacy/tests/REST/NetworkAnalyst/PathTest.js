module("Path");

test("TestDefaultConstructor",function(){
    expect(8);
    var path = new SuperMap.REST.Path();
    ok(path.edgeFeatures == null, "edgeFeatures");
    ok(path.edgeIDs == null, "edgeIDs");
    ok(path.nodeFeatures == null, "nodeFeatures");    
    ok(path.nodeIDs == null, "nodeIDs");    
    ok(path.pathGuideItems == null, "pathGuideItems");    
    ok(path.route == null, "route");  
    ok(path.stopWeights == null, "stopWeights");  
    ok(path.weight == null, "weight");  
});

test("TestConstructor",function(){
    expect(8);
    var edgeIDs = [1, 2, 3],
        nodeIDs = [4, 5, 6],
        stopWeights = ["length"],
        weight = 10;
    var path = new SuperMap.REST.Path({
        edgeIDs: edgeIDs,
        nodeIDs: nodeIDs,
        stopWeights: stopWeights,
        weight: weight
    });
    ok(path.edgeFeatures == null, "edgeFeatures");
    equal(path.edgeIDs, edgeIDs, "edgeIDs");
    ok(path.nodeFeatures == null, "nodeFeatures");    
    equal(path.nodeIDs, nodeIDs, "nodeIDs");    
    ok(path.pathGuideItems == null, "pathGuideItems");    
    ok(path.route == null, "route");  
    ok(path.stopWeights, stopWeights, "stopWeights");  
    ok(path.weight, weight, "weight");    
});

test("TestDestructor",function(){
    expect(8);
    var path = new SuperMap.REST.Path({
        edgeIDs: [1, 2, 3],
        nodeIDs: [1, 2, 3],
        stopWeights: ["length"],
        weight:10
    });
    
    path.destroy();
    ok(path.edgeFeatures == null, "edgeFeatures");
    ok(path.edgeIDs == null, "edgeIDs");
    ok(path.nodeFeatures == null, "nodeFeatures");    
    ok(path.nodeIDs == null, "nodeIDs");    
    ok(path.pathGuideItems == null, "pathGuideItems");    
    ok(path.route == null, "route");  
    ok(path.stopWeights == null, "stopWeights");  
    ok(path.weight == null, "weight"); 
});

test("Test_fromJson",function(){
    var path = SuperMap.REST.Path.fromJson();
    ok(path == null, "path");
});