module("DensityKernelAnalystResult");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(2);

    var densityKernelAnalystResult;
    densityKernelAnalystResult = new SuperMap.REST.DensityKernelAnalystResult();

    ok(densityKernelAnalystResult != null, "not null");
    equal(densityKernelAnalystResult.recordset, null, "densityKernelAnalystResult.recordset");
});

test("TestDefaultConstructor_custom", function () {
    expect(2);

    var densityKernelAnalystResult;
    densityKernelAnalystResult = new SuperMap.REST.DensityKernelAnalystResult({
        recordset: new SuperMap.REST.Recordset()
    });

    ok(densityKernelAnalystResult != null, "not null");
    ok(densityKernelAnalystResult.recordset != null, "densityKernelAnalystResult.recordset");
});

test("Test_fromJson", function () {
    var densityKernelAnalystResult;
    densityKernelAnalystResult = SuperMap.REST.DensityKernelAnalystResult.fromJson();
    ok(densityKernelAnalystResult == null, "not null");
});