module("FindMTSPPathsEventArgs");
    
test("TestDefaultConstructor", function() {
    expect(2);
    var findMTSPPathsEventArgs;
    findMTSPPathsEventArgs = new SuperMap.REST.FindMTSPPathsEventArgs();
    equal(findMTSPPathsEventArgs.result, null, "result");
    equal(findMTSPPathsEventArgs.originResult, null, "originResult");
});

test("TestConstructor", function() {
    expect(2);
    var tspPathList = [new SuperMap.REST.TSPPath()],
        findMTSPPathsResult = new SuperMap.REST.FindMTSPPathsResult({tspPathList: tspPathList}),
        jsonObject = {},
        findMTSPPathsEventArgs = new SuperMap.REST.FindMTSPPathsEventArgs(findMTSPPathsResult, jsonObject);
    equal(findMTSPPathsEventArgs.result, findMTSPPathsResult, "result");
    equal(findMTSPPathsEventArgs.originResult, jsonObject, "originResult");
});

test("TestDestructor", function() {
    expect(2);
    var tspPathList = [new SuperMap.REST.TSPPath()],
        findMTSPPathsResult = new SuperMap.REST.FindMTSPPathsResult({tspPathList: tspPathList}),
        jsonObject = {},
        findMTSPPathsEventArgs = new SuperMap.REST.FindMTSPPathsEventArgs(findMTSPPathsResult, jsonObject);
    findMTSPPathsEventArgs.destroy();
    ok(findMTSPPathsEventArgs.result == null, "result");
    ok(findMTSPPathsEventArgs.originResult == null, "originResult");
});