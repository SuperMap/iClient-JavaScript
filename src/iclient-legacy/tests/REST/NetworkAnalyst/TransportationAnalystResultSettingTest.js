module("TransportationAnalystResultSetting");

test("TestDefaultConstructor", function(){
    var resultSetting = new SuperMap.REST.TransportationAnalystResultSetting();
    ok(resultSetting.returnEdgeFeatures == false, "returnEdgeFeatures");
    ok(resultSetting.returnEdgeGeometry == false, "returnEdgeGeometry");
    ok(resultSetting.returnEdgeIDs == false, "returnEdgeIDs");
    ok(resultSetting.returnNodeFeatures == false, "returnNodeFeatures");
    ok(resultSetting.returnNodeGeometry == false, "returnNodeGeometry");
    ok(resultSetting.returnNodeIDs == false, "returnNodeIDs");
    ok(resultSetting.returnPathGuides == false, "returnPathGuides");
    ok(resultSetting.returnRoutes == false, "returnRoutes");
});

test("TestConstructor", function(){
    var resultSetting = new SuperMap.REST.TransportationAnalystResultSetting({
        returnEdgeFeatures: true,
        returnEdgeGeometry: true,
        returnEdgeIDs: true,
        returnNodeFeatures: true,
        returnNodeGeometry: true,
        returnNodeIDs: true,
        returnPathGuides: true,
        returnRoutes: true
    });
    ok(resultSetting.returnEdgeFeatures == true    , "returnEdgeFeatures");
    ok(resultSetting.returnEdgeGeometry == true, "returnEdgeGeometry");
    ok(resultSetting.returnEdgeIDs == true, "returnEdgeIDs");
    ok(resultSetting.returnNodeFeatures == true, "returnNodeFeatures");
    ok(resultSetting.returnNodeGeometry == true, "returnNodeGeometry");
    ok(resultSetting.returnNodeIDs == true, "returnNodeIDs");
    ok(resultSetting.returnPathGuides == true, "returnPathGuides");
    ok(resultSetting.returnRoutes == true, "returnRoutes");
});

test("TestDestructor", function(){
    var resultSetting = new SuperMap.REST.TransportationAnalystResultSetting({
        returnEdgeFeatures: true,
        returnEdgeGeometry: true,
        returnEdgeIDs: true,
        returnNodeFeatures: true
    });
    resultSetting.destroy();
    ok(resultSetting.returnEdgeFeatures == null    , "returnEdgeFeatures");
    ok(resultSetting.returnEdgeGeometry == null, "returnEdgeGeometry");
    ok(resultSetting.returnEdgeIDs == null, "returnEdgeIDs");
    ok(resultSetting.returnNodeFeatures == null, "returnNodeFeatures");
    ok(resultSetting.returnNodeGeometry == null, "returnNodeGeometry");
    ok(resultSetting.returnNodeIDs == null, "returnNodeIDs");
    ok(resultSetting.returnPathGuides == null, "returnPathGuides");
    ok(resultSetting.returnRoutes == null, "returnRoutes");
});