module("FindServiceAreasEventArgs");
    
test("TestDefaultConstructor", function() {
    expect(2);
    var findServiceAreasEventArgs;
    findServiceAreasEventArgs = new SuperMap.REST.FindServiceAreasEventArgs();
    ok(findServiceAreasEventArgs.result == null, "result");
    ok(findServiceAreasEventArgs.originResult == null, "originResult");
});

test("TestConstructor", function() {
    expect(2);
    var serviceAreaList = [new SuperMap.REST.ServiceArea()],
        findServiceAreasResult = new SuperMap.REST.FindServiceAreasResult({serviceAreaList: serviceAreaList}),
        jsonObject = {},
        findServiceAreasEventArgs = new SuperMap.REST.FindServiceAreasEventArgs(findServiceAreasResult, jsonObject);
    equal(findServiceAreasEventArgs.result, findServiceAreasResult, "result");
    equal(findServiceAreasEventArgs.originResult, jsonObject, "originResult");
});

test("TestDestructor", function() {
    expect(2);
    var serviceAreaList = [new SuperMap.REST.ServiceArea()],
        findServiceAreasResult = new SuperMap.REST.FindServiceAreasResult({serviceAreaList: serviceAreaList}),
        jsonObject = {},
        findServiceAreasEventArgs = new SuperMap.REST.FindServiceAreasEventArgs(findServiceAreasResult, jsonObject);
    findServiceAreasEventArgs.destroy();
    ok(findServiceAreasEventArgs.result == null, "result");
    ok(findServiceAreasEventArgs.originResult == null, "originResult");
});