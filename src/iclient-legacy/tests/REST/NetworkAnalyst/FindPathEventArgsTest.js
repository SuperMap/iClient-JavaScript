module("FindPathEventArgs");
    
test("TestDefaultConstructor", function() {
    expect(2);
    var findPathEventArgs;
    findPathEventArgs = new SuperMap.REST.FindPathEventArgs();
    ok(findPathEventArgs.result == null, "result");
    ok(findPathEventArgs.originResult == null, "originResult");
});

test("TestConstructor", function() {
    expect(2);
    var pathList = [new SuperMap.REST.Path()],
        findPathResult = new SuperMap.REST.FindPathResult({pathList: pathList}),
        jsonObject = {},
        findPathEventArgs = new SuperMap.REST.FindPathEventArgs(findPathResult, jsonObject);
    equal(findPathEventArgs.result, findPathResult, "result");
    equal(findPathEventArgs.originResult, jsonObject, "originResult");
});

test("TestDestructor", function() {
    expect(2);
    var pathList = [new SuperMap.REST.Path()],
        findPathResult = new SuperMap.REST.FindPathResult({pathList: pathList}),
        jsonObject = {},
        findPathEventArgs = new SuperMap.REST.FindPathEventArgs(findPathResult, jsonObject);
    findPathEventArgs.destroy();
    ok(findPathEventArgs.result == null, "result");
    ok(findPathEventArgs.originResult == null, "originResult");
});