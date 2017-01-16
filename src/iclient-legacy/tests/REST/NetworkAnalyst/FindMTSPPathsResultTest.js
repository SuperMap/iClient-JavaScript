module("FindMTSPPathsResult");
    
test("TestDefaultConstructor", function() {
    expect(1);
    var findMTSPPathsResult;
    findMTSPPathsResult = new SuperMap.REST.FindMTSPPathsResult();
    equal(findMTSPPathsResult.pathList,null, "pathList");
});

test("TestConstructor", function() {
    expect(1);
    var pathList = [new SuperMap.REST.MTSPPath()];
    var findMTSPPathsResult;
    findMTSPPathsResult = new SuperMap.REST.FindMTSPPathsResult({pathList: pathList});
    equal(findMTSPPathsResult.pathList, pathList, "pathList");
});

test("TestDestructor", function() {
    expect(1);
    var pathList = [new SuperMap.REST.TSPPath()];
    var findMTSPPathsResult;
    findMTSPPathsResult = new SuperMap.REST.FindMTSPPathsResult({pathList: pathList});
    findMTSPPathsResult.destroy();
    ok(findMTSPPathsResult.pathList == null, "pathList");
});

test("TestDestructor_fromJson_null", function() {
    var findMTSPPathsResult = new SuperMap.REST.FindMTSPPathsResult.fromJson();
    equal(findMTSPPathsResult.pathList, null, "facilityPathList");
});