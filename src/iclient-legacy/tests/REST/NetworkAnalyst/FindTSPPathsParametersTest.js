module("FindTSPPathsParameters");

test("TestDefaultConstructor",function(){
    var findTSPPathsParameters;
    findTSPPathsParameters = new SuperMap.REST.FindTSPPathsParameters();
    ok(findTSPPathsParameters.isAnalyzeById == false, "isAnalyzeById");
    ok(findTSPPathsParameters.endNodeAssigned == false, "endNodeAssigned");
    ok(findTSPPathsParameters.nodes == null, "nodes");    
    ok(findTSPPathsParameters.parameter instanceof SuperMap.REST.TransportationAnalystParameter, "parameter");
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
    findPathParameters = new SuperMap.REST.FindTSPPathsParameters({
        isAnalyzeById: true,
        endNodeAssigned: false,
        nodes: nodes,
        parameter: analystParameter
    });
    ok(findPathParameters.isAnalyzeById == true, "isAnalyzeById");
    ok(findPathParameters.endNodeAssigned == false, "endNodeAssigned");
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
    findPathParameters = new SuperMap.REST.FindTSPPathsParameters({
        isAnalyzeById: true,
        endNodeAssigned: false,
        nodes: nodes,
        parameter: analystParameter
    });
    findPathParameters.destroy();
    ok(findPathParameters.isAnalyzeById == null, "isAnalyzeById");
    ok(findPathParameters.endNodeAssigned == null, "endNodeAssigned");
    ok(findPathParameters.nodes == null, "nodes");    
    ok(findPathParameters.parameter == null, "parameter");
});