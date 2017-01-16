module("MTSPPath");

test("TestDefaultConstructor",function(){
    expect(10);
    var path = new SuperMap.REST.MTSPPath();
    ok(path.center==null,"center");
    ok(path.edgeFeatures == null, "edgeFeatures");
    ok(path.edgeIDs == null, "edgeIDs");
    ok(path.nodeFeatures == null, "nodeFeatures");    
    ok(path.nodeIDs == null, "nodeIDs");    
    ok(path.pathGuideItems == null, "pathGuideItems");    
    ok(path.route == null, "route");  
    ok(path.stopWeights == null, "stopWeights");  
    ok(path.stopIndexes==null,"stopIndexes");
    ok(path.weight == null, "weight");  
});

test("TestConstructor",function(){
    expect(10);
    var edgeIDs = [1, 2, 3],
        nodeIDs = [4, 5, 6],
        stopWeights = ["length"],
        stopIndexes=[5, 6, 4],
        weight = 10,
        center=
        {
            x: 3,
            y: 4,
        };
    var path = new SuperMap.REST.MTSPPath({
        edgeIDs: edgeIDs,
        nodeIDs: nodeIDs,
        stopWeights: stopWeights,
        stopIndexes: stopIndexes,
        weight: weight,
        center: center,
    });
    equal(path.center,center,"center");
    ok(path.edgeFeatures == null, "edgeFeatures");
    equal(path.edgeIDs, edgeIDs, "edgeIDs");
    ok(path.nodeFeatures == null, "nodeFeatures");    
    equal(path.nodeIDs, nodeIDs, "nodeIDs");    
    ok(path.pathGuideItems == null, "pathGuideItems");    
    ok(path.route == null, "route");  
    ok(path.stopWeights, stopWeights, "stopWeights");  
    equal(path.stopIndexes, stopIndexes, "stopIndexes"); 
    ok(path.weight, weight, "weight");    
});

test("TestDestructor",function(){
    expect(10);
    var path = new SuperMap.REST.MTSPPath({
        edgeIDs: [1, 2, 3],
        nodeIDs: [1, 2, 3],
        stopWeights: ["length"],
        stopIndexes:[5, 6, 4],
        weight:10,
        center:
        {
            x: 3,
            y: 4,
        }
    });
    
    path.destroy();
    ok(path.center == null, "center");
    ok(path.edgeFeatures == null, "edgeFeatures");
    ok(path.edgeIDs == null, "edgeIDs");
    ok(path.nodeFeatures == null, "nodeFeatures");    
    ok(path.nodeIDs == null, "nodeIDs");    
    ok(path.pathGuideItems == null, "pathGuideItems");    
    ok(path.route == null, "route");  
    ok(path.stopWeights == null, "stopWeights");  
    ok(path.stopIndexes == null, "stopIndexes"); 
    ok(path.weight == null, "weight"); 
});

test("Test_fromJson",function(){
    var path = SuperMap.REST.MTSPPath.fromJson();
    
    ok(path == null, "path");
});