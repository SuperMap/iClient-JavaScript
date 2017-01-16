module("InterpolationAnalystParameters");

//测试使用默认参数值的有效性
test("TestInterpolationAnalystParameters_constructorDefault",function(){
    expect(14);
    var interpolationAnalystParameters = new SuperMap.REST.InterpolationAnalystParameters();
    ok(interpolationAnalystParameters!=null,"params not null");
    equal(interpolationAnalystParameters.bounds, null, "params.bounds");
    equal(interpolationAnalystParameters.searchRadius, 0, "params.searchRadius");
    equal(interpolationAnalystParameters.zValueFieldName, null, "params.zValueFieldName");
    equal(interpolationAnalystParameters.zValueScale, 1, "params.zValueScale");
    equal(interpolationAnalystParameters.resolution, null, "params.resolution");
    equal(interpolationAnalystParameters.filterQueryParameter, null, "params.filterQueryParameter");
    equal(interpolationAnalystParameters.outputDatasetName, null, "params.outputDatasetName");
    equal(interpolationAnalystParameters.outputDatasourceName, null, "params.outputDatasourceName");
    equal(interpolationAnalystParameters.pixelFormat, "BIT16", "params.pixelFormat");
    equal(interpolationAnalystParameters.dataset, null, "params.dataset");
    equal(interpolationAnalystParameters.inputPoints, null, "params.inputPoints");
    equal(interpolationAnalystParameters.InterpolationAnalystType, "dataset", "params.InterpolationAnalystType");
    equal(interpolationAnalystParameters.clipParam, null, "params.clipParam");
});

test("TestInterpolationAnalystParameters_constructor_destroy", function () {
    expect(12);

    var dsOverlayAnalystParameters = new SuperMap.REST.InterpolationAnalystParameters({
        dataset: "SamplesP@China400",
        searchRadius: "100000",
        pixelFormat: SuperMap.REST.PixelFormat.BIT16,
        zValueFieldName: "AVG_TMP",
        resolution: 3000,
        filterQueryParameter: {
            attributeFilter: ""
        },
        outputDatasetName: "myDensity"
    });

    ok(dsOverlayAnalystParameters != null, "not null");
    ok(dsOverlayAnalystParameters.dataset != null, "not null");
    ok(dsOverlayAnalystParameters.searchRadius != null, "not null");
    ok(dsOverlayAnalystParameters.outputDatasetName != null, "not null");

    dsOverlayAnalystParameters.destroy();
    equal(dsOverlayAnalystParameters.bounds, null, "function:destroy");
    equal(dsOverlayAnalystParameters.searchRadius, null, "function:destroy");
    equal(dsOverlayAnalystParameters.zValueFieldName, null, "function:destroy");
    equal(dsOverlayAnalystParameters.zValueScale, null, "function:destroy");
    equal(dsOverlayAnalystParameters.resolution, null, "function:destroy");
    equal(dsOverlayAnalystParameters.filterQueryParameter, null, "function:destroy");
    equal(dsOverlayAnalystParameters.outputDatasetName, null, "function:destroy");
    equal(dsOverlayAnalystParameters.pixelFormat, null, "function:destroy");

});

