module("FindTSPPathsEventArgs");
    
test("TestDefaultConstructor", function() {
    expect(2);
    var findTSPPathsEventArgs;
    findTSPPathsEventArgs = new SuperMap.REST.FindTSPPathsEventArgs();
    ok(findTSPPathsEventArgs.result == null, "result");
    ok(findTSPPathsEventArgs.originResult == null, "originResult");
});

test("TestConstructor", function() {
    expect(2);
    var tspPathList = [new SuperMap.REST.TSPPath()],
        findTSPPathsResult = new SuperMap.REST.FindTSPPathsResult({tspPathList: tspPathList}),
        jsonObject = {},
        findTSPPathsEventArgs = new SuperMap.REST.FindTSPPathsEventArgs(findTSPPathsResult, jsonObject);
    equal(findTSPPathsEventArgs.result, findTSPPathsResult, "result");
    equal(findTSPPathsEventArgs.originResult, jsonObject, "originResult");
});

test("TestDestructor", function() {
    expect(2);
    var tspPathList = [new SuperMap.REST.TSPPath()],
        findTSPPathsResult = new SuperMap.REST.FindTSPPathsResult({tspPathList: tspPathList}),
        jsonObject = {},
        findTSPPathsEventArgs = new SuperMap.REST.FindTSPPathsEventArgs(findTSPPathsResult, jsonObject);
    findTSPPathsEventArgs.destroy();
    ok(findTSPPathsEventArgs.result == null, "result");
    ok(findTSPPathsEventArgs.originResult == null, "originResult");
});