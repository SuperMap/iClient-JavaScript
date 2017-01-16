module("GeometryThiessenAnalystParameters");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(9);

    var geoThiessenAnalystParameters = new SuperMap.REST.GeometryThiessenAnalystParameters();

    ok(geoThiessenAnalystParameters != null, "not null");
    equal(geoThiessenAnalystParameters.createResultDataset, false, "geoThiessenAnalystParameters.createResultDataset");
    equal(geoThiessenAnalystParameters.resultDatasetName, null, "geoThiessenAnalystParameters.resultDatasetName");
	equal(geoThiessenAnalystParameters.resultDatasourceName, null, "geoThiessenAnalystParameters.resultDatasourceName");
	equal(geoThiessenAnalystParameters.returnResultRegion, true, "geoThiessenAnalystParameters.returnResultRegion");
	equal(geoThiessenAnalystParameters.clipRegion, null, "geoThiessenAnalystParameters.clipRegion");
	equal(geoThiessenAnalystParameters.points, null, "geoThiessenAnalystParameters.points");
    
	
    geoThiessenAnalystParameters.destroy();
    equal(geoThiessenAnalystParameters.createResultDataset, null, "geoThiessenAnalystParameters.createResultDataset");
    equal(geoThiessenAnalystParameters.returnResultRegion, null, "geoThiessenAnalystParameters.returnResultRegion");
});

test("Test_custom_Constructor", function () {
    expect(13);
	var clipRegion = new SuperMap.Geometry.Polygon();
	var points = [new SuperMap.Geometry.Point(10,10),new SuperMap.Geometry.Point(20,20)];
    var geoThiessenAnalystParameters = new SuperMap.REST.GeometryThiessenAnalystParameters({
		clipRegion: clipRegion,
		points: points,
		createResultDataset: true,
		resultDatasetName: 'newDataset',
		resultDatasourceName: 'World',
		returnResultRegion: true
	}
	);
    
    ok(geoThiessenAnalystParameters != null, "not null");
	
    equal(geoThiessenAnalystParameters.createResultDataset, true, "geoThiessenAnalystParameters.createResultDataset");
    equal(geoThiessenAnalystParameters.resultDatasetName, 'newDataset', "geoThiessenAnalystParameters.resultDatasetName");
	equal(geoThiessenAnalystParameters.resultDatasourceName, 'World', "geoThiessenAnalystParameters.resultDatasourceName");
	equal(geoThiessenAnalystParameters.returnResultRegion, true, "geoThiessenAnalystParameters.returnResultRegion");
	ok(geoThiessenAnalystParameters.clipRegion != null, "geoThiessenAnalystParameters.clipRegion");
	equal(geoThiessenAnalystParameters.points.length, 2, "geoThiessenAnalystParameters.points");
	
	geoThiessenAnalystParameters.destroy();
	equal(geoThiessenAnalystParameters.createResultDataset, null, "geoThiessenAnalystParameters.createResultDataset");
    equal(geoThiessenAnalystParameters.resultDatasetName, null, "geoThiessenAnalystParameters.resultDatasetName");
	equal(geoThiessenAnalystParameters.resultDatasourceName, null, "geoThiessenAnalystParameters.resultDatasourceName");
	equal(geoThiessenAnalystParameters.returnResultRegion, null, "geoThiessenAnalystParameters.returnResultRegion");
	equal(geoThiessenAnalystParameters.clipRegion , null, "geoThiessenAnalystParameters.clipRegion");
	equal(geoThiessenAnalystParameters.points, null, "geoThiessenAnalystParameters.points");
});