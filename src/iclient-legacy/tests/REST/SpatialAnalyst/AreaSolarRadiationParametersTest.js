module("AreaSolarRadiationParameters");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(17);

    var AreaSolarRadiationParameters = new SuperMap.REST.AreaSolarRadiationParameters({
        dataset: "JingjinTerrain@Jingjin",
        targetDatasourceName: "Jingjin",
        totalGridName: "areaSolarRadiation_Result",
        diffuseDatasetGridName: "areaSolarRadiation_ResultA",
        durationDatasetGridName: "areaSolarRadiation_ResultB",
        directDatasetGridName: "areaSolarRadiation_ResultC",
        latitude: 39,
        timeMode: "WITHINDAY",
        dayStart: "1",
        dayEnd: "2",
        hourStart: "12",
        hourEnd: "13",
        transmittance: 0.5,
        hourInterval: 1,
        dayInterval: 5,
        deleteExistResultDataset: true
    });

    ok(AreaSolarRadiationParameters != null, "not null");
    ok(AreaSolarRadiationParameters.dataset != null, "not null");
    ok(AreaSolarRadiationParameters.targetDatasourceName != null, "not null");
    ok(AreaSolarRadiationParameters.totalGridName != null, "not null");
    ok(AreaSolarRadiationParameters.diffuseDatasetGridName != null, "not null");
    ok(AreaSolarRadiationParameters.durationDatasetGridName != null, "not null");
    ok(AreaSolarRadiationParameters.directDatasetGridName != null, "not null");
    ok(AreaSolarRadiationParameters.latitude != null, "not null");
    ok(AreaSolarRadiationParameters.timeMode != null, "not null");
    ok(AreaSolarRadiationParameters.dayStart != null, "not null");
    ok(AreaSolarRadiationParameters.dayEnd != null, "not null");
    ok(AreaSolarRadiationParameters.hourStart != null, "not null");
    ok(AreaSolarRadiationParameters.hourEnd != null, "not null");
    ok(AreaSolarRadiationParameters.transmittance != null, "not null");
    ok(AreaSolarRadiationParameters.hourInterval != null, "not null");
    ok(AreaSolarRadiationParameters.dayInterval != null, "not null");
    ok(AreaSolarRadiationParameters.deleteExistResultDataset != null, "not null");

    AreaSolarRadiationParameters.destroy();
});