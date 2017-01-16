module("FindMTSPPathsParameters");

test("TestDefaultConstructor",function(){
    var findMTSPPathsParameters;
    findMTSPPathsParameters = new SuperMap.REST.FindMTSPPathsParameters();
    ok(findMTSPPathsParameters.centers == null, "centers");
    ok(findMTSPPathsParameters.isAnalyzeById == false, "isAnalyzeById");
    ok(findMTSPPathsParameters.hasLeastTotalCost == false, "hasLeastTotalCost");
    ok(findMTSPPathsParameters.nodes == null, "nodes");    
    ok(findMTSPPathsParameters.parameter instanceof SuperMap.REST.TransportationAnalystParameter, "parameter");
});

test("TestConstructor",function(){
    var findMTSPPathParameters, analystParameter, resultSetting,
        nodes = [1, 2, 3],
        barrierEdgeIDs = [1, 2, 3, 4],
        barrierNodeIDs = [3, 4],
        centers=[{x: 3,y: 4}, {x: 5,y: 6}];
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
    findMTSPPathParameters = new SuperMap.REST.FindMTSPPathsParameters({
        centers: centers,
        isAnalyzeById: true,
        hasLeastTotalCost: true,
        nodes: nodes,
        parameter: analystParameter
    });
    equal(findMTSPPathParameters.centers, centers, "centers");
    ok(findMTSPPathParameters.isAnalyzeById == true, "isAnalyzeById");
    ok(findMTSPPathParameters.hasLeastTotalCost == true, "hasLeastTotalCost");
    equal(findMTSPPathParameters.nodes, nodes, "nodes");    
    equal(findMTSPPathParameters.parameter, analystParameter, "parameter");
});

test("TestDestructor",function(){
    var findMTSPPathParameters, analystParameter, resultSetting,
        nodes = [1, 2, 3],
        barrierEdgeIDs = [1, 2, 3, 4],
        barrierNodeIDs = [3, 4],
        centers=[{x: 3,y: 4}, {x: 5,y: 6}];
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
    findMTSPPathParameters = new SuperMap.REST.FindMTSPPathsParameters({
        centers: centers,
        isAnalyzeById: true,
        hasLeastTotalCost: true,
        nodes: nodes,
        parameter: analystParameter
    });
    findMTSPPathParameters.destroy();
    ok(findMTSPPathParameters.centers == null, "centers");
    ok(findMTSPPathParameters.isAnalyzeById == null, "isAnalyzeById");
    ok(findMTSPPathParameters.endNodeAssigned == null, "hasLeastTotalCost");
    ok(findMTSPPathParameters.nodes == null, "nodes");    
    ok(findMTSPPathParameters.parameter == null, "parameter");
});