module("FindPathParameters");

test("TestDefaultConstructor",function(){
    var findPathParameters;
    findPathParameters = new SuperMap.REST.FindPathParameters();
    ok(findPathParameters.isAnalyzeById == false, "isAnalyzeById");
    ok(findPathParameters.hasLeastEdgeCount == null, "hasLeastEdgeCount");
    ok(findPathParameters.nodes == null, "nodes");    
    ok(findPathParameters.parameter instanceof SuperMap.REST.TransportationAnalystParameter, "parameter");
});

test("TestConstructor",function(){
    var findPathParameters, analystParameter, resultSetting,
        nodes = [1, 2, 3],
        barrierEdgeIDs = [1, 2, 3, 4],
        barrierNodeIDs = [3, 4];
    resultSetting = new SuperMap.REST.TransportationAnalystResultSetting({
            returnEdgeFeatures: true,
            returnEdgeGeometry: true,
            returnEdgeIDs: true,
            returnNodeFeatures: true,
            returnNodeGeometry: true,
            returnNodeIDs: true,
            returnPathGuides: true,
            returnRoutes: true
        });
    analystParameter = new SuperMap.REST.TransportationAnalystParameter({
        barrierEdgeIDs: barrierEdgeIDs,
        barrierNodeIDs: barrierNodeIDs,
        weightFieldName: "smID",
        turnWeightField: "length",
        resultSetting: resultSetting
    });
    findPathParameters = new SuperMap.REST.FindPathParameters({
        isAnalyzeById: true,
        hasLeastEdgeCount: false,
        nodes: nodes,
        parameter: analystParameter
    });
    ok(findPathParameters.isAnalyzeById == true, "isAnalyzeById");
    ok(findPathParameters.hasLeastEdgeCount == false, "hasLeastEdgeCount");
    equal(findPathParameters.nodes, nodes, "nodes");    
    equal(findPathParameters.parameter, analystParameter, "parameter");
});

test("TestDestructor",function(){
    var findPathParameters, analystParameter, resultSetting,
        nodes = [1, 2, 3],
        barrierEdgeIDs = [1, 2, 3, 4],
        barrierNodeIDs = [3, 4];
    resultSetting = new SuperMap.REST.TransportationAnalystResultSetting({
            returnEdgeFeatures: true,
            returnEdgeGeometry: true,
            returnEdgeIDs: true,
            returnNodeFeatures: true,
            returnNodeGeometry: true,
            returnNodeIDs: true,
            returnPathGuides: true,
            returnRoutes: true
        });
    analystParameter = new SuperMap.REST.TransportationAnalystParameter({
        barrierEdgeIDs: barrierEdgeIDs,
        barrierNodeIDs: barrierNodeIDs,
        weightFieldName: "smID",
        turnWeightField: "length",
        resultSetting: resultSetting
    });
    findPathParameters = new SuperMap.REST.FindPathParameters({
        isAnalyzeById: true,
        hasLeastEdgeCount: false,
        nodes: nodes,
        parameter: analystParameter
    });
    findPathParameters.destroy();
    ok(findPathParameters.isAnalyzeById == null, "isAnalyzeById");
    ok(findPathParameters.hasLeastEdgeCount == null, "hasLeastEdgeCount");
    ok(findPathParameters.nodes == null, "nodes");    
    ok(findPathParameters.parameter == null, "parameter");
});