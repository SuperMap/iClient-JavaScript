module("FindServiceAreasResult");
    
test("TestDefaultConstructor", function() {
    expect(1);
    var findServiceAreasResult;
    findServiceAreasResult = new SuperMap.REST.FindServiceAreasResult();
    ok(findServiceAreasResult.serviceAreaList == null, "serviceAreaList");
});

test("TestConstructor", function() {
    expect(1);
    var serviceAreaList = [new SuperMap.REST.ServiceArea()];
    var findServiceAreasResult;
    findServiceAreasResult = new SuperMap.REST.FindServiceAreasResult({serviceAreaList: serviceAreaList});
    equal(findServiceAreasResult.serviceAreaList, serviceAreaList, "serviceAreaList");
});

test("TestDestructor", function() {
    expect(1);
    var serviceAreaList = [new SuperMap.REST.ServiceArea()];
    var findServiceAreasResult;
    findServiceAreasResult = new SuperMap.REST.FindServiceAreasResult({serviceAreaList: serviceAreaList});
    findServiceAreasResult.destroy();
    ok(findServiceAreasResult.serviceAreaList == null, "serviceAreaList");
});

test("TestDestructor_fromJson", function() {
    var findServiceAreasResult;
    findServiceAreasResult = SuperMap.REST.FindServiceAreasResult.fromJson();
    ok(findServiceAreasResult == null, "findServiceAreasResult");
});