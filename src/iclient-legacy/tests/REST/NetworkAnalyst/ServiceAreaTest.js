module("ServiceArea");

test("TestDefaultConstructor",function(){
    expect(6);
    var serviceArea = new SuperMap.REST.ServiceArea();
    ok(serviceArea.edgeFeatures == null, "edgeFeatures");
    ok(serviceArea.edgeIDs == null, "edgeIDs");
    ok(serviceArea.nodeFeatures == null, "nodeFeatures");    
    ok(serviceArea.nodeIDs == null, "nodeIDs");      
    ok(serviceArea.routes == null, "routes");  
    ok(serviceArea.serviceRegion == null, "serviceRegion");
});

test("TestConstructor",function(){
    expect(6);
    var edgeIDs = [1, 2, 3],
        nodeIDs = [4, 5, 6];
    var serviceArea = new SuperMap.REST.ServiceArea({
        edgeIDs: edgeIDs,
        nodeIDs: nodeIDs
    });
    ok(serviceArea.edgeFeatures == null, "edgeFeatures");
    equal(serviceArea.edgeIDs, edgeIDs, "edgeIDs");
    ok(serviceArea.nodeFeatures == null, "nodeFeatures");    
    equal(serviceArea.nodeIDs, nodeIDs, "nodeIDs");    
    ok(serviceArea.routes == null, "routes");  
    ok(serviceArea.serviceRegion == null, "serviceRegion");    
});

test("TestDestructor",function(){
    expect(6);
    var serviceArea = new SuperMap.REST.ServiceArea({
        edgeIDs: [1, 2, 3],
        nodeIDs: [1, 2, 3]
    });
    
    serviceArea.destroy();
    ok(serviceArea.edgeFeatures == null, "edgeFeatures");
    ok(serviceArea.edgeIDs == null, "edgeIDs");
    ok(serviceArea.nodeFeatures == null, "nodeFeatures");    
    ok(serviceArea.nodeIDs == null, "nodeIDs");       
    ok(serviceArea.routes == null, "routes");  
    ok(serviceArea.serviceRegion == null, "serviceRegion"); 
});

test("Test_fromJson",function(){
    var serviceArea = SuperMap.REST.ServiceArea.fromJson();
    ok(serviceArea == null, "serviceArea");
});