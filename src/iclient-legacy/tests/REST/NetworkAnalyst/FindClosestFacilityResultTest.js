module("FindClosestFacilityResult");
    
test("TestDefaultConstructor", function() {
    expect(1);
    var findClosestFacilityResult;
    findClosestFacilityResult = new SuperMap.REST.FindClosestFacilityResult();
    ok(findClosestFacilityResult.facilityPathList == null, "facilityPathList");
});

test("TestConstructor", function() {
    expect(1);
    var facilityPathList = [new SuperMap.REST.ClosestFacilityPath()];
    var findClosestFacilityResult;
    findClosestFacilityResult = new SuperMap.REST.FindClosestFacilityResult({facilityPathList: facilityPathList});
    equal(findClosestFacilityResult.facilityPathList, facilityPathList, "facilityPathList");
});

test("TestDestructor", function() {
    expect(1);
    var facilityPathList = [new SuperMap.REST.ClosestFacilityPath({weight: 10})];
    var findClosestFacilityResult;
    findClosestFacilityResult = new SuperMap.REST.FindClosestFacilityResult({facilityPathList: facilityPathList});
    findClosestFacilityResult.destroy();
    ok(findClosestFacilityResult.facilityPathList == null, "facilityPathList");
});

test("TestDestructor_fromJson_null", function() {
    var findClosestFacilityResult = new SuperMap.REST.FindClosestFacilityResult.fromJson();
    equal(findClosestFacilityResult.facilityPathList, null, "findClosestFacilityResult");
});