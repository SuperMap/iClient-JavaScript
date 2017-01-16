module("FindClosestFacilitiesParameters");

test("TestDefaultConstructor",function(){
    var findClosestFacilitiesParameters;
    findClosestFacilitiesParameters = new SuperMap.REST.FindClosestFacilitiesParameters();
    ok(findClosestFacilitiesParameters.event == null, "event");
    ok(findClosestFacilitiesParameters.expectFacilityCount == 1, "expectFacilityCount");
    ok(findClosestFacilitiesParameters.facilities == null, "facilities");    
    ok(findClosestFacilitiesParameters.fromEvent == false, "fromEvent");    
    ok(findClosestFacilitiesParameters.isAnalyzeById == false, "isAnalyzeById");    
    ok(findClosestFacilitiesParameters.maxWeight == 0, "maxWeight");    
    ok(findClosestFacilitiesParameters.parameter instanceof SuperMap.REST.TransportationAnalystParameter, "parameter");
});

test("TestConstructor",function(){
    var analystParameter, resultSetting,
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

    var findClosestFacilitiesParameters;
    findClosestFacilitiesParameters = new SuperMap.REST.FindClosestFacilitiesParameters({
        event: 1,
        expectFacilityCount: 2,
        facilities: [1,2],
        fromEvent: true,
        isAnalyzeById: true,
        maxWeight: 10,
        parameter: analystParameter
    });
    ok(findClosestFacilitiesParameters.event == 1, "event");
    ok(findClosestFacilitiesParameters.expectFacilityCount == 2, "expectFacilityCount");
    ok(findClosestFacilitiesParameters.facilities instanceof Array, "facilities");    
    ok(findClosestFacilitiesParameters.fromEvent == true, "fromEvent");    
    ok(findClosestFacilitiesParameters.isAnalyzeById == true, "isAnalyzeById");    
    ok(findClosestFacilitiesParameters.maxWeight == 10, "maxWeight");    
    equal(findClosestFacilitiesParameters.parameter, analystParameter, "parameter");
});

test("TestDestructor",function(){
    var analystParameter, resultSetting,
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

    var findClosestFacilitiesParameters;
    findClosestFacilitiesParameters = new SuperMap.REST.FindClosestFacilitiesParameters({
        event: 1,
        expectFacilityCount: 2,
        facilities: [1,2],
        fromEvent: true,
        isAnalyzeById: true,
        maxWeight: 10,
        parameter: analystParameter
    });
    
    findClosestFacilitiesParameters.destroy();
    ok(findClosestFacilitiesParameters.event == null, "event");
    ok(findClosestFacilitiesParameters.expectFacilityCount == null, "expectFacilityCount");
    ok(findClosestFacilitiesParameters.facilities == null, "facilities");    
    ok(findClosestFacilitiesParameters.fromEvent == null, "fromEvent");    
    ok(findClosestFacilitiesParameters.isAnalyzeById == null, "isAnalyzeById");    
    ok(findClosestFacilitiesParameters.maxWeight == null, "maxWeight");    
    ok(findClosestFacilitiesParameters.parameter == null, "parameter");
});