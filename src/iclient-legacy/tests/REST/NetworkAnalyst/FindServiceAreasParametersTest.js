module("FindServiceAreasParameters");

test("TestDefaultConstructor",function(){
    var findServiceAreasParameters;
    findServiceAreasParameters = new SuperMap.REST.FindServiceAreasParameters();
    ok(findServiceAreasParameters.isAnalyzeById == false, "isAnalyzeById");
    ok(findServiceAreasParameters.isCenterMutuallyExclusive == false, "isCenterMutuallyExclusive");
    ok(findServiceAreasParameters.isFromCenter == false, "isFromCenter");
    ok(findServiceAreasParameters.centers == null, "centers");
    ok(findServiceAreasParameters.weights == null, "weights");    
    ok(findServiceAreasParameters.parameter instanceof SuperMap.REST.TransportationAnalystParameter, "parameter");
});

test("TestConstructor",function(){
    var findServiceAreasParameters, analystParameter, resultSetting,
        centers = [1, 2, 3],
        weights = [4, 5, 6],
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
    findServiceAreasParameters = new SuperMap.REST.FindServiceAreasParameters({
        isAnalyzeById: true,
        isCenterMutuallyExclusive: true,
        isFromCenter : true,
        centers: centers,
        weights: weights,
        parameter: analystParameter
    });
    ok(findServiceAreasParameters.isAnalyzeById == true, "isAnalyzeById");
    ok(findServiceAreasParameters.isCenterMutuallyExclusive == true, "isCenterMutuallyExclusive");
    ok(findServiceAreasParameters.isFromCenter == true, "isFromCenter");
    equal(findServiceAreasParameters.centers, centers, "centers");
    equal(findServiceAreasParameters.weights, weights, "weights");
    equal(findServiceAreasParameters.parameter, analystParameter, "parameter");
});

test("TestDestructor",function(){
    var findServiceAreasParameters, analystParameter, resultSetting,
        centers = [1, 2, 3],
        weights = [4, 5, 6],
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
    findServiceAreasParameters = new SuperMap.REST.FindServiceAreasParameters({
        isAnalyzeById: true,
        isCenterMutuallyExclusive: true,
        isFromCenter : true,
        centers: centers,
        weights: weights,
        parameter: analystParameter
    });
    findServiceAreasParameters.destroy();
    ok(findServiceAreasParameters.isAnalyzeById == null, "isAnalyzeById");
    ok(findServiceAreasParameters.isCenterMutuallyExclusive == null, "isCenterMutuallyExclusive");
    ok(findServiceAreasParameters.isFromCenter == null, "isFromCenter");
    ok(findServiceAreasParameters.centers == null, "centers");
    ok(findServiceAreasParameters.weights == null, "weights");
    ok(findServiceAreasParameters.parameter == null, "parameter");
});