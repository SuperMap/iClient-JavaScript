module("DatasetThiessenAnalystParameters");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(10);

    var dsThiessenAnalystParameters = new SuperMap.REST.DatasetThiessenAnalystParameters();

    ok(dsThiessenAnalystParameters != null, "not null");
    equal(dsThiessenAnalystParameters.createResultDataset, false, "dsThiessenAnalystParameters.createResultDataset");
    equal(dsThiessenAnalystParameters.resultDatasetName, null, "dsThiessenAnalystParameters.resultDatasetName");
	equal(dsThiessenAnalystParameters.resultDatasourceName, null, "dsThiessenAnalystParameters.resultDatasourceName");
	equal(dsThiessenAnalystParameters.returnResultRegion, true, "dsThiessenAnalystParameters.returnResultRegion");
	equal(dsThiessenAnalystParameters.clipRegion, null, "dsThiessenAnalystParameters.clipRegion");
	equal(dsThiessenAnalystParameters.dataset, null, "dsThiessenAnalystParameters.dataset");
	equal(dsThiessenAnalystParameters.filterQueryParameter, null, "dsThiessenAnalystParameters.filterQueryParameter");

    dsThiessenAnalystParameters.destroy();
    equal(dsThiessenAnalystParameters.createResultDataset, null, "dsThiessenAnalystParameters.createResultDataset");
    equal(dsThiessenAnalystParameters.returnResultRegion, null, "dsThiessenAnalystParameters.returnResultRegion");
});

test("Test_custom_Constructor", function () {
    expect(15);
	var clipRegion = new SuperMap.Geometry.Polygon();
	var filter = new SuperMap.REST.FilterParameter();
    var dsThiessenAnalystParameters = new SuperMap.REST.DatasetThiessenAnalystParameters({
		clipRegion: clipRegion,
		filterQueryParameter: filter,
		createResultDataset: true,
		resultDatasetName: 'newDataset',
		resultDatasourceName: 'World',
		returnResultRegion: true,
		dataset: "Countries@World"
	}
	);
    
    ok(dsThiessenAnalystParameters != null, "not null");
	
    equal(dsThiessenAnalystParameters.createResultDataset, true, "dsThiessenAnalystParameters.createResultDataset");
    equal(dsThiessenAnalystParameters.resultDatasetName, 'newDataset', "dsThiessenAnalystParameters.resultDatasetName");
	equal(dsThiessenAnalystParameters.resultDatasourceName, 'World', "dsThiessenAnalystParameters.resultDatasourceName");
	equal(dsThiessenAnalystParameters.returnResultRegion, true, "dsThiessenAnalystParameters.returnResultRegion");
	ok(dsThiessenAnalystParameters.clipRegion != null, "dsThiessenAnalystParameters.clipRegion");
	ok(dsThiessenAnalystParameters.filterQueryParameter != null, "dsThiessenAnalystParameters.filterQueryParameter");
	equal(dsThiessenAnalystParameters.dataset, "Countries@World", "dsThiessenAnalystParameters.dataset");
	
	dsThiessenAnalystParameters.destroy()
    equal(dsThiessenAnalystParameters.createResultDataset, null, "dsThiessenAnalystParameters.createResultDataset");
    equal(dsThiessenAnalystParameters.resultDatasetName, null, "dsThiessenAnalystParameters.resultDatasetName");
	equal(dsThiessenAnalystParameters.resultDatasourceName, null, "dsThiessenAnalystParameters.resultDatasourceName");
	equal(dsThiessenAnalystParameters.returnResultRegion, null, "dsThiessenAnalystParameters.returnResultRegion");
	equal(dsThiessenAnalystParameters.clipRegion, null, "dsThiessenAnalystParameters.clipRegion");
	equal(dsThiessenAnalystParameters.filterQueryParameter, null, "dsThiessenAnalystParameters.filterQueryParameter");
	equal(dsThiessenAnalystParameters.dataset, "Countries@World", "dsThiessenAnalystParameters.dataset");
});