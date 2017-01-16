module("ChartQueryFilterParameter")

test("TestDefaultConstructor", function () {
    var chartQueryFilterParameter = new SuperMap.REST.ChartQueryFilterParameter();
    ok(chartQueryFilterParameter != null, "not null");
    ok(chartQueryFilterParameter.isQueryPoint == null, "chartQueryFilterParameter.isQueryPoint");
    ok(chartQueryFilterParameter.isQueryLine == null, "chartQueryFilterParameter.isQueryLine");
    ok(chartQueryFilterParameter.isQueryRegion == null, "chartQueryFilterParameter.isQueryRegion");
    ok(chartQueryFilterParameter.attributeFilter == null, "chartQueryFilterParameter.attributeFilter");
    ok(chartQueryFilterParameter.chartFeatureInfoSpecCode == null, "chartQueryFilterParameter.chartFeatureInfoSpecCode");
});


test("TestConstructor_Destructor", function () {
    var chartQueryFilterParameter = new SuperMap.REST.ChartQueryFilterParameter({
        isQueryPoint:false,
        isQueryLine:false,
        isQueryRegion:true,
        attributeFilter:"SMID>10",
        chartFeatureInfoSpecCode:2
    });

    ok(!chartQueryFilterParameter.isQueryPoint, "chartQueryFilterParameter.isQueryPoint");
    ok(!chartQueryFilterParameter.isQueryLine, "chartQueryFilterParameter.isQueryLine");
    ok(chartQueryFilterParameter.isQueryRegion, "chartQueryFilterParameter.isQueryRegion");
    equal(chartQueryFilterParameter.attributeFilter, "SMID>10", "chartQueryFilterParameter.attributeFilter");
    equal(chartQueryFilterParameter.chartFeatureInfoSpecCode, 2, "chartQueryFilterParameter.chartFeatureInfoSpecCode");

    chartQueryFilterParameter.destroy();

    ok(chartQueryFilterParameter != null, "not null");
    ok(chartQueryFilterParameter.isQueryPoint == null, "chartQueryFilterParameter.isQueryPoint");
    ok(chartQueryFilterParameter.isQueryLine == null, "chartQueryFilterParameter.isQueryLine");
    ok(chartQueryFilterParameter.isQueryRegion == null, "chartQueryFilterParameter.isQueryRegion");
    ok(chartQueryFilterParameter.attributeFilter == null, "chartQueryFilterParameter.attributeFilter");
    ok(chartQueryFilterParameter.chartFeatureInfoSpecCode == null, "chartQueryFilterParameter.chartFeatureInfoSpecCode");
});

test("TestToJson", function () {
    var chartQueryFilterParameter = new SuperMap.REST.ChartQueryFilterParameter({
        isQueryPoint:false,
        isQueryLine:false,
        isQueryRegion:true,
        attributeFilter:"SMID>10",
        chartFeatureInfoSpecCode:2
    });
    var jsonStr = chartQueryFilterParameter.toJson();
    var jsonObj = JSON.parse(jsonStr)

    ok(jsonObj != null, "jsonObj !null");
    equal(chartQueryFilterParameter.attributeFilter, jsonObj.attributeFilter, "jsonObj.attributeFilter");
    equal(chartQueryFilterParameter.chartFeatureInfoSpecCode, jsonObj.chartFeatureInfoSpecCode, "jsonObj.chartFeatureInfoSpecCode");
    ok(!jsonObj.isQueryPoint, "jsonObj.isQueryPoint");
    ok(jsonObj.isQueryRegion, "jsonObj.isQueryRegion");
    ok(jsonObj.CLASS_NANME == undefined, "jsonObj.class_name");
    ok(jsonObj.initialize == undefined, "jsonObj.initialize");
});
