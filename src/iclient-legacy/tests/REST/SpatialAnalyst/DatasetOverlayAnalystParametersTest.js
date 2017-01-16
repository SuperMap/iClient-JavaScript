module("DatasetOverlayAnalystParameters");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(19);

    var dsOverlayAnalystParameters, resultSetting;
    dsOverlayAnalystParameters = new SuperMap.REST.DatasetOverlayAnalystParameters();
    resultSetting = new SuperMap.REST.DataReturnOption();
    
    ok(dsOverlayAnalystParameters != null, "not null");

    equal(dsOverlayAnalystParameters.sourceDataset , null, "dsOverlayAnalystParameters.sourceDataset");
    ok(dsOverlayAnalystParameters.sourceDatasetFilter != null, "dsOverlayAnalystParameters.sourceDatasetFilter");
    equal(dsOverlayAnalystParameters.operateDataset, null, "dsOverlayAnalystParameters.operateDataset");
    ok(dsOverlayAnalystParameters.operateDatasetFilter != null, "dsOverlayAnalystParameters.operateDatasetFilter");

    ok(dsOverlayAnalystParameters.operateRegions != null, "dsOverlayAnalystParameters.operateRegions");
    ok(dsOverlayAnalystParameters.sourceDatasetFields != null, "dsOverlayAnalystParameters.sourceDatasetFields");
    ok(dsOverlayAnalystParameters.operateDatasetFields != null, "dsOverlayAnalystParameters.operateDatasetFields");
    ok(dsOverlayAnalystParameters.resultSetting != null, "not null");

    equal(dsOverlayAnalystParameters.tolerance, 0, "dsOverlayAnalystParameters.tolerance");
    
    dsOverlayAnalystParameters.destroy();
    equal(dsOverlayAnalystParameters.sourceDataset , null, "dsOverlayAnalystParameters.sourceDataset");
    equal(dsOverlayAnalystParameters.sourceDatasetFilter, null, "dsOverlayAnalystParameters.sourceDatasetFilter");
    equal(dsOverlayAnalystParameters.operateDataset, null, "dsOverlayAnalystParameters.operateDataset");
    equal(dsOverlayAnalystParameters.operateDatasetFilter, null, "dsOverlayAnalystParameters.operateDatasetFilter");

    equal(dsOverlayAnalystParameters.operateRegions, null, "dsOverlayAnalystParameters.operateRegions");
    equal(dsOverlayAnalystParameters.sourceDatasetFields, null, "dsOverlayAnalystParameters.sourceDatasetFields");
    equal(dsOverlayAnalystParameters.operateDatasetFields, null, "dsOverlayAnalystParameters.operateDatasetFields");
    equal(dsOverlayAnalystParameters.resultSetting, null, "dsOverlayAnalystParameters.resultSetting");
    equal(dsOverlayAnalystParameters.tolerance, null, "dsOverlayAnalystParameters.tolerance");
});

test("TestDefaultConstructor_custom", function () {
    expect(19);

    var points= [new SuperMap.Geometry.Point(330000, 4470000),
                 new SuperMap.Geometry.Point(350000, 4470000),
                 new SuperMap.Geometry.Point(350000, 4450000),
                 new SuperMap.Geometry.Point(330000, 4450000),
                 new SuperMap.Geometry.Point(330000, 4470000)];
    var region = new SuperMap.Geometry.Polygon(new SuperMap.Geometry.LinearRing(points));
    var dsOverlayAnalystParameters;
    dsOverlayAnalystParameters = new SuperMap.REST.DatasetOverlayAnalystParameters({
        operateDataset: "operateDataset",
        operateDatasetFields: ["operateDatasetFields"],
        operateDatasetFilter: new SuperMap.REST.FilterParameter({
            name: "name",
            fields: ["fields"],
            attributeFilter: "attributeFilter"
        }),
        operateRegions: [region],
        sourceDataset: "sourceDataset",
        sourceDatasetFields: ["sourceDatasetFields"],
        sourceDatasetFilter: new SuperMap.REST.FilterParameter(),
        resultSetting: new SuperMap.REST.DataReturnOption(),
        tolerance: 10
    });

    ok(dsOverlayAnalystParameters != null, "not null");

    equal(dsOverlayAnalystParameters.sourceDataset , "sourceDataset", "dsOverlayAnalystParameters.sourceDataset");
    ok(dsOverlayAnalystParameters.sourceDatasetFilter != null, "dsOverlayAnalystParameters.sourceDatasetFilter");
    equal(dsOverlayAnalystParameters.operateDataset, "operateDataset", "dsOverlayAnalystParameters.operateDataset");
    ok(dsOverlayAnalystParameters.operateDatasetFilter != null, "dsOverlayAnalystParameters.operateDatasetFilter");

    ok(dsOverlayAnalystParameters.operateRegions != null, "dsOverlayAnalystParameters.operateRegions");
    ok(dsOverlayAnalystParameters.sourceDatasetFields != null, "dsOverlayAnalystParameters.sourceDatasetFields");
    ok(dsOverlayAnalystParameters.operateDatasetFields != null, "dsOverlayAnalystParameters.operateDatasetFields");
    ok(dsOverlayAnalystParameters.resultSetting != null, "dsOverlayAnalystParameters.resultSetting");
    
    equal(dsOverlayAnalystParameters.tolerance, 10, "dsOverlayAnalystParameters.tolerance");
    
    dsOverlayAnalystParameters.destroy();
    equal(dsOverlayAnalystParameters.sourceDataset , null, "dsOverlayAnalystParameters.sourceDataset");
    equal(dsOverlayAnalystParameters.sourceDatasetFilter, null, "dsOverlayAnalystParameters.sourceDatasetFilter");
    equal(dsOverlayAnalystParameters.operateDataset, null, "dsOverlayAnalystParameters.operateDataset");
    equal(dsOverlayAnalystParameters.operateDatasetFilter, null, "dsOverlayAnalystParameters.operateDatasetFilter");

    equal(dsOverlayAnalystParameters.operateRegions, null, "dsOverlayAnalystParameters.operateRegions");
    equal(dsOverlayAnalystParameters.sourceDatasetFields, null, "dsOverlayAnalystParameters.sourceDatasetFields");
    equal(dsOverlayAnalystParameters.operateDatasetFields, null, "dsOverlayAnalystParameters.operateDatasetFields");

    equal(dsOverlayAnalystParameters.resultSetting, null, "dsOverlayAnalystParameters.resultSetting");
    equal(dsOverlayAnalystParameters.tolerance, null, "dsOverlayAnalystParameters.tolerance");
});