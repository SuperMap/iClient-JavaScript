module("DatasetBufferAnalystParameters");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(8);

    var dsBufferAnalystParameters, resultSetting;
    dsBufferAnalystParameters = new SuperMap.REST.DatasetBufferAnalystParameters();
    //dsBufferAnalystParameters.filterQueryParameter = new SuperMap.REST.FilterParameter();
    resultSetting = new SuperMap.REST.DataReturnOption();
    
    ok(dsBufferAnalystParameters != null, "not null");
    //加上filterQueryParameter的断言，该类的测试不会运行
    //equal(dsBufferAnalystParameters.filterQueryParameter, not null, "dsBufferAnalystParameters.filterQueryParameter");
    ok(dsBufferAnalystParameters.resultSetting != null, "not null");
    equal(dsBufferAnalystParameters.isAttributeRetained, true, "dsBufferAnalystParameters.isAttributeRetained");
    equal(dsBufferAnalystParameters.isUnion, false, "dsBufferAnalystParameters.isUnion");
    
    dsBufferAnalystParameters.destroy();
    equal(dsBufferAnalystParameters.filterQueryParameter, null, "dsBufferAnalystParameters.filterQueryParameter");
    equal(dsBufferAnalystParameters.resultSetting, null, "dsBufferAnalystParameters.resultSetting");
    equal(dsBufferAnalystParameters.isAttributeRetained, null, "dsBufferAnalystParameters.isAttributeRetained");
    equal(dsBufferAnalystParameters.isUnion, null, "dsBufferAnalystParameters.isUnion");
});