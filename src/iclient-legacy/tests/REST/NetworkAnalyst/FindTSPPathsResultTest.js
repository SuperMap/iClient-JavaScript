module("FindTSPPathsResult");
    
test("TestDefaultConstructor", function() {
    expect(1);
    var findTSPPathsResult;
    findTSPPathsResult = new SuperMap.REST.FindTSPPathsResult();
    ok(findTSPPathsResult.tspPathList == null, "tspPathList");
});

test("TestConstructor", function() {
    expect(1);
    var tspPathList = [new SuperMap.REST.TSPPath()];
    var findTSPPathsResult;
    findTSPPathsResult = new SuperMap.REST.FindTSPPathsResult({tspPathList: tspPathList});
    equal(findTSPPathsResult.tspPathList, tspPathList, "tspPathList");
});

test("TestDestructor", function() {
    expect(1);
    var tspPathList = [new SuperMap.REST.TSPPath()];
    var findTSPPathsResult;
    findTSPPathsResult = new SuperMap.REST.FindTSPPathsResult({tspPathList: tspPathList});
    findTSPPathsResult.destroy();
    ok(findTSPPathsResult.tspPathList == null, "tspPathList");
});

test("TestDestructor_fromJson", function() {
    var findTSPPathsResult;
    findTSPPathsResult = SuperMap.REST.FindTSPPathsResult.fromJson();
    ok(findTSPPathsResult == null, "findTSPPathsResult");
});