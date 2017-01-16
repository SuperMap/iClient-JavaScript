module("FindLocationEventArgs");
    
test("TestDefaultConstructor", function() {
    expect(2);
    var findLocationEventArgs;
    findLocationEventArgs = new SuperMap.REST.FindLocationEventArgs();
    ok(findLocationEventArgs.result == null, "result");
    ok(findLocationEventArgs.originResult == null, "originResult");
});

test("TestConstructor", function() {
    expect(2);
    var demandResults = [new SuperMap.REST.DemandResult()],
        supplyResults = [new SuperMap.REST.SupplyResult()],
        findLocationResult = new SuperMap.REST.FindLocationResult({
            demandResults: demandResults,
            supplyResults: supplyResults
        }),
        jsonObject = {},
        findLocationEventArgs = new SuperMap.REST.FindLocationEventArgs(findLocationResult, jsonObject);
    equal(findLocationEventArgs.result, findLocationResult, "result");
    equal(findLocationEventArgs.originResult, jsonObject, "originResult");
});

test("TestDestructor", function() {
    expect(2);
    var demandResults = [new SuperMap.REST.DemandResult()],
        supplyResults = [new SuperMap.REST.SupplyResult()],
        findLocationResult = new SuperMap.REST.FindLocationResult({
            demandResults: demandResults,
            supplyResults: supplyResults
        }),
        jsonObject = {},
        findLocationEventArgs = new SuperMap.REST.FindLocationEventArgs(findLocationResult, jsonObject);
    findLocationEventArgs.destroy();
    ok(findLocationEventArgs.result == null, "result");
    ok(findLocationEventArgs.originResult == null, "originResult");
});