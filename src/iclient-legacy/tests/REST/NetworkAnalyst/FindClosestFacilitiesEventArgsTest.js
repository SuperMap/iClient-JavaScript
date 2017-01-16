module("FindClosestFacilitiesEventArgs");
    
test("TestDefaultConstructor", function() {
    expect(2);
    var findClosestFacilitiesEventArgs;
    findClosestFacilitiesEventArgs = new SuperMap.REST.FindClosestFacilitiesEventArgs();
    ok(findClosestFacilitiesEventArgs.result == null, "result");
    ok(findClosestFacilitiesEventArgs.originResult == null, "originResult");
});

test("TestConstructor", function() {
    expect(2);
    var facilityPathList = [new SuperMap.REST.ClosestFacilityPath()];
    var findClosestFacilityResult;
    findClosestFacilityResult = new SuperMap.REST.FindClosestFacilityResult({facilityPathList: facilityPathList});
    var findClosestFacilitiesEventArgs;
    var jsonObject = {};
    findClosestFacilitiesEventArgs = new SuperMap.REST.FindClosestFacilitiesEventArgs(findClosestFacilityResult, jsonObject);
    equal(findClosestFacilitiesEventArgs.result, findClosestFacilityResult, "result");
    equal(findClosestFacilitiesEventArgs.originResult, jsonObject, "originResult");
});

test("TestDestructor", function() {
    expect(2);
    var facilityPathList = [new SuperMap.REST.ClosestFacilityPath()];
    var findClosestFacilityResult;
    findClosestFacilityResult = new SuperMap.REST.FindClosestFacilityResult({facilityPathList: facilityPathList});
    var findClosestFacilitiesEventArgs;
    var jsonObject = {};
    findClosestFacilitiesEventArgs = new SuperMap.REST.FindClosestFacilitiesEventArgs(findClosestFacilityResult, jsonObject);
    findClosestFacilitiesEventArgs.destroy();
    ok(findClosestFacilitiesEventArgs.result == null, "result");
    ok(findClosestFacilitiesEventArgs.originResult == null, "originResult");
});