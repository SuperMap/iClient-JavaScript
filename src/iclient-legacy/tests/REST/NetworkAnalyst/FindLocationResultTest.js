module("FindLocationResult");
    
test("TestDefaultConstructor", function() {
    expect(2);
    var findLocationResult;
    findLocationResult = new SuperMap.REST.FindLocationResult();
    ok(findLocationResult.demandResults == null, "demandResults");
    ok(findLocationResult.supplyResults == null, "supplyResults");
});

test("TestConstructor", function() {
    expect(2);
    var demandResults = [new SuperMap.REST.DemandResult()],
        supplyResults = [new SuperMap.REST.SupplyResult()],
        findLocationResult;
    findLocationResult = new SuperMap.REST.FindLocationResult({
            demandResults: demandResults,
            supplyResults: supplyResults
        });
    equal(findLocationResult.demandResults, demandResults, "demandResults");
    equal(findLocationResult.supplyResults, supplyResults, "supplyResults");
});

test("TestDestructor", function() {
    expect(2);
    var demandResults = [new SuperMap.REST.DemandResult()],
        supplyResults = [new SuperMap.REST.SupplyResult()],
        findLocationResult;
    findLocationResult = new SuperMap.REST.FindLocationResult({
            demandResults: demandResults,
            supplyResults: supplyResults
        });
    findLocationResult.destroy();
    ok(findLocationResult.demandResults == null, "demandResults");
    ok(findLocationResult.supplyResults == null, "supplyResults");
});

test("TestDefaultConstructor_fromJson_null", function() {
    var findLocationResult;
    findLocationResult = new SuperMap.REST.FindLocationResult.fromJson();
    equal(findLocationResult.demandResults,null, "demandResults");
});