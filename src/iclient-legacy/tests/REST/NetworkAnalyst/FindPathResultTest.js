module("FindPathResult");
    
test("TestDefaultConstructor", function() {
    expect(1);
    var findPathResult;
    findPathResult = new SuperMap.REST.FindPathResult();
    ok(findPathResult.pathList == null, "pathList");
});

test("TestConstructor", function() {
    expect(1);
    var pathList = [new SuperMap.REST.Path()];
    var findPathResult;
    findPathResult = new SuperMap.REST.FindPathResult({pathList: pathList});
    equal(findPathResult.pathList, pathList, "pathList");
});

test("TestDestructor", function() {
    expect(1);
    var pathList = [new SuperMap.REST.Path()];
    var findPathResult;
    findPathResult = new SuperMap.REST.FindPathResult({pathList: pathList});
    findPathResult.destroy();
    ok(findPathResult.pathList == null, "pathList");
});

test("TestDestructor_fromJson", function() {
    var findPathResult;
    findPathResult = SuperMap.REST.FindPathResult.fromJson();
    ok(findPathResult == null, "findPathResult");
});