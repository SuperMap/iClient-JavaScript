module("TerrainCurvatureCalculationParameters");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(6);

    var terrainCurvatureCalculationParameters = new SuperMap.REST.TerrainCurvatureCalculationParameters({
        dataset: "JingjinTerrain@Jingjin",
        zFactor: 1.0,
        averageCurvatureName: "CurvatureA",
        profileCurvatureName: "CurvatureB",
        planCurvatureName: "CurvatureC"
    });

    ok(terrainCurvatureCalculationParameters != null, "not null");
    ok(terrainCurvatureCalculationParameters.dataset != null, "not null");
    ok(terrainCurvatureCalculationParameters.zFactor != null, "not null");
    ok(terrainCurvatureCalculationParameters.averageCurvatureName != null, "not null");
    ok(terrainCurvatureCalculationParameters.profileCurvatureName != null, "not null");
    ok(terrainCurvatureCalculationParameters.planCurvatureName != null, "not null");

    terrainCurvatureCalculationParameters.destroy();
});