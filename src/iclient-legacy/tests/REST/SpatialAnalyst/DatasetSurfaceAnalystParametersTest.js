module("DatasetSurfaceAnalystParameters");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(7);

    var datasetSurfaceAnalystParameters;
    datasetSurfaceAnalystParameters = new SuperMap.REST.DatasetSurfaceAnalystParameters ();

    ok(datasetSurfaceAnalystParameters != null, "not null");
    equal(datasetSurfaceAnalystParameters.dataset, null, "dsBufferAnalystParameters.dataset");
    ok(datasetSurfaceAnalystParameters.filterQueryParameter != null, "datasetSurfaceAnalystParameters.filterQueryParameter");
    equal(datasetSurfaceAnalystParameters.zValueFieldName, null, "datasetSurfaceAnalystParameters.zValueFieldName");
    
    datasetSurfaceAnalystParameters.destroy();
    equal(datasetSurfaceAnalystParameters.dataset, null, "dsBufferAnalystParameters.dataset");
    equal(datasetSurfaceAnalystParameters.filterQueryParameter, null, "dsBufferAnalystParameters.filterQueryParameter");
    equal(datasetSurfaceAnalystParameters.zValueFieldName , null, "dsBufferAnalystParameters.zValueFieldName ");
    
});