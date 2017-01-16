module("AreaSolarRadiationResult");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(2);

    var areaSolarRadiationResult;
    areaSolarRadiationResult = new SuperMap.REST.AreaSolarRadiationResult();

    ok(areaSolarRadiationResult != null, "not null");
    equal(areaSolarRadiationResult.recordset, null, "areaSolarRadiationResult.recordset");
});

test("TestDefaultConstructor_custom", function () {
    expect(2);

    var areaSolarRadiationResult;
    areaSolarRadiationResult = new SuperMap.REST.AreaSolarRadiationResult({
        recordset: new SuperMap.REST.Recordset()
    });

    ok(areaSolarRadiationResult != null, "not null");
    ok(areaSolarRadiationResult.recordset != null, "areaSolarRadiationResult.recordset");
});

test("Test_fromJson", function () {
    var areaSolarRadiationResult;
    areaSolarRadiationResult = SuperMap.REST.AreaSolarRadiationResult.fromJson();
    ok(areaSolarRadiationResult == null, "not null");
});