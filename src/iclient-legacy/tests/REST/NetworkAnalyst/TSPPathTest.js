module("TSPPath");

test("TestDefaultConstructor",function(){
    expect(9);
    var tsppath = new SuperMap.REST.TSPPath();
    ok(tsppath.edgeFeatures == null, "edgeFeatures");
    ok(tsppath.edgeIDs == null, "edgeIDs");
    ok(tsppath.nodeFeatures == null, "nodeFeatures");    
    ok(tsppath.nodeIDs == null, "nodeIDs");    
    ok(tsppath.pathGuideItems == null, "pathGuideItems");    
    ok(tsppath.route == null, "route");  
    ok(tsppath.stopWeights == null, "stopWeights");  
    ok(tsppath.stopIndexes==null,"stopIndexes");
    ok(tsppath.weight == null, "weight");  
});

test("TestConstructor",function(){
    expect(9);
    var edgeIDs = [1, 2, 3],
        nodeIDs = [4, 5, 6],
        stopWeights = ["length"],
        stopIndexes=[5, 6, 4],
        weight = 10;
    var tsppath = new SuperMap.REST.TSPPath({
        edgeIDs: edgeIDs,
        nodeIDs: nodeIDs,
        stopWeights: stopWeights,
        stopIndexes: stopIndexes,
        weight: weight
    });
    ok(tsppath.edgeFeatures == null, "edgeFeatures");
    equal(tsppath.edgeIDs, edgeIDs, "edgeIDs");
    ok(tsppath.nodeFeatures == null, "nodeFeatures");    
    equal(tsppath.nodeIDs, nodeIDs, "nodeIDs");    
    ok(tsppath.pathGuideItems == null, "pathGuideItems");    
    ok(tsppath.route == null, "route");  
    ok(tsppath.stopWeights, stopWeights, "stopWeights");  
    equal(tsppath.stopIndexes, stopIndexes, "stopIndexes"); 
    ok(tsppath.weight, weight, "weight");    
});

test("TestDestructor",function(){
    expect(9);
    var tsppath = new SuperMap.REST.TSPPath({
        edgeIDs: [1, 2, 3],
        nodeIDs: [1, 2, 3],
        stopWeights: ["length"],
        stopIndexes:[5, 6, 4],
        weight:10
    });
    
    tsppath.destroy();
    ok(tsppath.edgeFeatures == null, "edgeFeatures");
    ok(tsppath.edgeIDs == null, "edgeIDs");
    ok(tsppath.nodeFeatures == null, "nodeFeatures");    
    ok(tsppath.nodeIDs == null, "nodeIDs");    
    ok(tsppath.pathGuideItems == null, "pathGuideItems");    
    ok(tsppath.route == null, "route");  
    ok(tsppath.stopWeights == null, "stopWeights");  
    ok(tsppath.stopIndexes == null, "stopIndexes"); 
    ok(tsppath.weight == null, "weight"); 
});

test("Test_fromJson",function(){
    var tspPath = SuperMap.REST.TSPPath.fromJson();
    ok(tspPath == null, "tspPath");
});