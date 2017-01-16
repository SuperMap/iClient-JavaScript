module("TerrainCurvatureCalculationResult");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(2);

    var terrainCurvatureCalculationResult;
    terrainCurvatureCalculationResult = new SuperMap.REST.TerrainCurvatureCalculationResult();

    ok(terrainCurvatureCalculationResult != null, "not null");
    equal(terrainCurvatureCalculationResult.recordset, null, "terrainCurvatureCalculationResult.recordset");
});

test("TestDefaultConstructor_custom", function () {
    expect(2);

    var terrainCurvatureCalculationResult;
    terrainCurvatureCalculationResult = new SuperMap.REST.TerrainCurvatureCalculationResult({
        recordset: new SuperMap.REST.Recordset()
    });

    ok(terrainCurvatureCalculationResult != null, "not null");
    ok(terrainCurvatureCalculationResult.recordset != null, "terrainCurvatureCalculationResult.recordset");
});

test("Test_fromJson", function () {
    var terrainCurvatureCalculationResult;
    terrainCurvatureCalculationResult = SuperMap.REST.TerrainCurvatureCalculationResult.fromJson();
    ok(terrainCurvatureCalculationResult == null, "not null");
});