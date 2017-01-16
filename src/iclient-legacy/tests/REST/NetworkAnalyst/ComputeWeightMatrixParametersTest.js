module("ComputeWeightMatrixParameters");

test("TestDefaultConstructor",function(){
    var computeWeightMatrixParameters;
    computeWeightMatrixParameters = new SuperMap.REST.ComputeWeightMatrixParameters();
    ok(computeWeightMatrixParameters.isAnalyzeById == false, "isAnalyzeById");
    ok(computeWeightMatrixParameters.nodes == null, "nodes");    
    ok(computeWeightMatrixParameters.parameter instanceof SuperMap.REST.TransportationAnalystParameter, "parameter");
});

test("TestConstructor",function(){
    var computeWeightMatrixParameters, analystParameter, resultSetting,
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
    computeWeightMatrixParameters = new SuperMap.REST.ComputeWeightMatrixParameters({
        isAnalyzeById: true,
        nodes: nodes,
        parameter: analystParameter
    });
    ok(computeWeightMatrixParameters.isAnalyzeById == true, "isAnalyzeById");
    equal(computeWeightMatrixParameters.nodes, nodes, "nodes");    
    equal(computeWeightMatrixParameters.parameter, analystParameter, "parameter");
});

test("TestDestructor",function(){
    var computeWeightMatrixParameters, analystParameter, resultSetting,
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
    computeWeightMatrixParameters = new SuperMap.REST.ComputeWeightMatrixParameters({
        isAnalyzeById: true,
        nodes: nodes,
        parameter: analystParameter
    });
    computeWeightMatrixParameters.destroy();
    ok(computeWeightMatrixParameters.isAnalyzeById == null, "isAnalyzeById");
    ok(computeWeightMatrixParameters.nodes == null, "nodes");    
    ok(computeWeightMatrixParameters.parameter == null, "parameter");
});