module("ChartFeatureInfoSpecsResult");


test("TestDefaultConstructor", function () {
    var chartFeatureInfoSpecsResult = new SuperMap.REST.ChartFeatureInfoSpecsResult();
    ok(chartFeatureInfoSpecsResult != null, "not null");
    ok(chartFeatureInfoSpecsResult.chartFeatureInfoSpecs == null, "chartFeatureInfoSpecsResult.chartFeatureInfoSpecs");
});

test("TestConstructor_Destructor", function () {
    var chartAttributeSpec = new SuperMap.REST.ChartAttributeSpec({
        code:103,
        required:1
    });

    var chartAttributeSpec1 = new SuperMap.REST.ChartAttributeSpec({
        code:111,
        required:0
    });

    var chartFeatureInfoSpec = new SuperMap.REST.ChartFeatureInfoSpec({
        acronym:"ADMARE",
        code:1,
        localName:"行政区",
        name:"Administration Area (Named)",
        primitive:"A",
        attributeFields:[chartAttributeSpec, chartAttributeSpec1]
    });

    var chartFeatureInfoSpecsResult = new SuperMap.REST.ChartFeatureInfoSpecsResult({
        chartFeatureInfoSpecs:[chartFeatureInfoSpec]
    });

    ok(chartFeatureInfoSpecsResult != null, "not null");
    ok(chartFeatureInfoSpecsResult.chartFeatureInfoSpecs != null, "chartFeatureInfoSpecsResult.chartFeatureInfoSpecs");

    chartFeatureInfoSpecsResult.destroy();

    ok(chartFeatureInfoSpecsResult != null, "not null");
    ok(chartFeatureInfoSpecsResult.chartFeatureInfoSpecs == null, "chartFeatureInfoSpecsResult.chartFeatureInfoSpecs");
});


test("TestFromJson", function () {
    var chartAttributeSpec = new SuperMap.REST.ChartAttributeSpec({
        code:103,
        required:1
    });

    var chartAttributeSpec1 = new SuperMap.REST.ChartAttributeSpec({
        code:111,
        required:1
    });

    var json = [
        {
            acronym:"ADMARE",
            code:1,
            localName:"行政区",
            name:"Administration Area (Named)",
            primitive:"A",
            attributeFields:[chartAttributeSpec, chartAttributeSpec1]
        }
    ];

    var chartFeatureInfoSp = new SuperMap.REST.ChartFeatureInfoSpecsResult();
    var chartFeatureInfoSpecsResult = chartFeatureInfoSp.fromJson(json);

    ok(chartFeatureInfoSpecsResult != null, "not null");
    ok(chartFeatureInfoSpecsResult.chartFeatureInfoSpecs != null, "chartFeatureInfoSpecsResult.chartFeatureInfoSpecs");
});