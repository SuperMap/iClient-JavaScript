module("ChartQueryParameters")

test("TestDefaultConstructor", function () {
    var chartQueryParameters = new SuperMap.REST.ChartQueryParameters();
    ok(chartQueryParameters != null, "not null");
    ok(chartQueryParameters.queryMode == null, "chartQueryParameters.queryMode");
    ok(chartQueryParameters.bounds == null, "chartQueryParameters.bounds");
    ok(chartQueryParameters.chartLayerNames == null, "chartQueryParameters.chartLayerNames");
    ok(chartQueryParameters.chartQueryFilterParameters == null, "chartQueryParameters.chartQueryFilterParameters");
    ok(chartQueryParameters.returnContent, "chartQueryParameters.returnContent");
});


test("TestConstructor_Destructor", function () {
    var testBound = new SuperMap.Bounds(60.77, -32.63, 61.33, -32.32);
    var nameArray = ["GB4X0000_52000"];
    var chartQueryFilterParameter = new SuperMap.REST.ChartQueryFilterParameter({
        isQueryPoint:true,
        isQueryLine:true,
        isQueryRegion:true,
        attributeFilter:"SMID>10",
        chartFeatureInfoSpecCode:1
    });

    var chartQueryParameters = new SuperMap.REST.ChartQueryParameters({
        queryMode:"ChartAttributeQuery",
        bounds:testBound,
        chartLayerNames:nameArray,
        chartQueryFilterParameters:[chartQueryFilterParameter]
    });

    ok(chartQueryParameters != null, "not null");
    ok(chartQueryParameters.chartQueryFilterParameters != null, "chartQueryParameters.chartQueryFilterParameters");
    ok(chartQueryParameters.returnContent, "chartQueryParameters.returnContent");
    equal(chartQueryParameters.queryMode, "ChartAttributeQuery", "chartQueryParameters.queryMode");
    equal(chartQueryParameters.bounds, testBound, "chartQueryParameters.bounds");
    equal(chartQueryParameters.chartLayerNames, nameArray, "chartQueryParameters.chartLayerNames");

    chartQueryParameters.destroy();

    ok(chartQueryParameters != null, "not null");
    ok(chartQueryParameters.queryMode == null, "chartQueryParameters.queryMode");
    ok(chartQueryParameters.bounds == null, "chartQueryParameters.bounds");
    ok(chartQueryParameters.chartLayerNames == null, "chartQueryParameters.chartLayerNames");
    ok(chartQueryParameters.chartQueryFilterParameters == null, "chartQueryParameters.chartQueryFilterParameters");
    ok(chartQueryParameters.returnContent, "chartQueryParameters.returnContent");

});

test("TestGetVariablesJson", function () {
    var testBound = new SuperMap.Bounds(60.77, -32.63, 61.33, -32.32);
    var nameArray = ["GB4X0000_52000"];
    var chartQueryFilterParameter = new SuperMap.REST.ChartQueryFilterParameter({
        isQueryPoint:true,
        isQueryLine:true,
        isQueryRegion:true,
        attributeFilter:"SMID>10",
        chartFeatureInfoSpecCode:1
    });

    var chartQueryParameters = new SuperMap.REST.ChartQueryParameters({
        queryMode:"ChartBoundsQuery",
        bounds:testBound,
        chartLayerNames:nameArray,
        chartQueryFilterParameters:[chartQueryFilterParameter]
    });

    var jsonStr = chartQueryParameters.getVariablesJson();
    var jsonObj = JSON.parse(jsonStr);
    ok(jsonObj != null, "jsonObj !null");
    equal(chartQueryParameters.queryMode, jsonObj.queryMode, "jsonObj.queryMode");
    equal(chartQueryParameters.bounds.left, jsonObj.bounds.leftBottom.x, "jsonObj.bounds");
    equal(chartQueryParameters.chartLayerNames[0], jsonObj.chartLayerNames[0], "jsonObj.chartLayerNames");
    equal(chartQueryParameters.chartQueryFilterParameters[0].attributeFilter, jsonObj.chartQueryParameters.chartQueryParams[0].attributeFilter, "jsonObj.chartQueryFilterParameters");
    ok(jsonObj.CLASS_NANME == undefined, "jsonObj.class_name");
    ok(jsonObj.initialize == undefined, "jsonObj.initialize");

});
