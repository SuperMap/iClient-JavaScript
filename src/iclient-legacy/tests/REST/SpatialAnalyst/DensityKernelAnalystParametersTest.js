module("DensityKernelAnalystParameters");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(8);

    var densityKernelAnalystParameters = new SuperMap.REST.DensityKernelAnalystParameters({
        dataset: "Railway@Changchun",
        bounds: new SuperMap.Bounds(3800, -3800, 8200, -2200),
        fieldName: "SmLength",
        resultGridDatasetResolution: 2,
        searchRadius: 50,
        targetDatasource: "Changchun",
        //结果数据集名称
        resultGridName: "KernelDensity_Result"
    });

    ok(densityKernelAnalystParameters != null, "not null");
    ok(densityKernelAnalystParameters.dataset != null, "not null");
    ok(densityKernelAnalystParameters.bounds != null, "not null");
    ok(densityKernelAnalystParameters.fieldName != null, "not null");
    ok(densityKernelAnalystParameters.resultGridDatasetResolution != null, "not null");
    ok(densityKernelAnalystParameters.searchRadius != null, "not null");
    ok(densityKernelAnalystParameters.targetDatasource != null, "not null");
    ok(densityKernelAnalystParameters.resultGridName != null, "not null");

    densityKernelAnalystParameters.destroy();
});