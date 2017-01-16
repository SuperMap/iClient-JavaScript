module("ChartFeatureInfoSpec");

test("TestDefaultConstructor", function () {
    var chartFeatureInfoSpec = new SuperMap.REST.ChartFeatureInfoSpec();
    ok(chartFeatureInfoSpec != null, "not null");
    ok(chartFeatureInfoSpec.acronym == null, "chartFeatureInfoSpec.acronym");
    ok(chartFeatureInfoSpec.code == null, "chartFeatureInfoSpec.code");
    ok(chartFeatureInfoSpec.localName == null, "chartFeatureInfoSpec.localName");
    ok(chartFeatureInfoSpec.name == null, "chartFeatureInfoSpec.name");
    ok(chartFeatureInfoSpec.primitive == null, "chartFeatureInfoSpec.primitive");
    ok(chartFeatureInfoSpec.attributeFields == null, "chartFeatureInfoSpec.attributeFields");
});

test("TestConstructor_Destructor", function () {
    var chartAttributeSpec = new SuperMap.REST.ChartAttributeSpec({
        code:103,
        required:1
    });

    var chartAttributeSpec1 = new SuperMap.REST.ChartAttributeSpec({
        code:111,
        required:2
    });

    var chartFeatureInfoSpec = new SuperMap.REST.ChartFeatureInfoSpec({
        acronym:"ADMARE",
        code:1,
        localName:"行政区",
        name:"Administration Area (Named)",
        primitive:"A",
        attributeFields:[chartAttributeSpec, chartAttributeSpec1]
    });

    ok(chartFeatureInfoSpec != null, "not null");
    equal(chartFeatureInfoSpec.acronym, "ADMARE", "chartFeatureInfoSpec.acronym");
    equal(chartFeatureInfoSpec.code, 1, "chartFeatureInfoSpec.code");
    equal(chartFeatureInfoSpec.localName, "行政区", "chartFeatureInfoSpec.localName");
    equal(chartFeatureInfoSpec.name, "Administration Area (Named)", "chartFeatureInfoSpec.name");
    equal(chartFeatureInfoSpec.primitive, "A", "chartFeatureInfoSpec.primitive");
    ok(chartFeatureInfoSpec.attributeFields != null, "chartFeatureInfoSpec.attributeFields");

    chartFeatureInfoSpec.destroy();

    ok(chartFeatureInfoSpec != null, "not null");
    ok(chartFeatureInfoSpec.acronym == null, "chartFeatureInfoSpec.acronym");
    ok(chartFeatureInfoSpec.code == null, "chartFeatureInfoSpec.code");
    ok(chartFeatureInfoSpec.localName == null, "chartFeatureInfoSpec.localName");
    ok(chartFeatureInfoSpec.name == null, "chartFeatureInfoSpec.name");
    ok(chartFeatureInfoSpec.primitive == null, "chartFeatureInfoSpec.primitive");
    ok(chartFeatureInfoSpec.attributeFields == null, "chartFeatureInfoSpec.attributeFields");
});


test("TestFromJson", function () {
    var chartAttributeSpec = new SuperMap.REST.ChartAttributeSpec({
        code:103,
        required:1
    });

    var chartAttributeSpec1 = new SuperMap.REST.ChartAttributeSpec({
        code:111,
        required:2
    });

    var json = {
        acronym:"ADMARE",
        code:1,
        localName:"行政区",
        name:"Administration Area (Named)",
        primitive:"A",
        attributeFields:[chartAttributeSpec, chartAttributeSpec1]
    };

    var chartFea = new SuperMap.REST.ChartFeatureInfoSpec();
    var chartFeatureInfoSpec = chartFea.fromJson(json);

    ok(chartFeatureInfoSpec != null, "not null");
    equal(chartFeatureInfoSpec.acronym, "ADMARE", "chartFeatureInfoSpec.acronym");
    equal(chartFeatureInfoSpec.code, 1, "chartFeatureInfoSpec.code");
    equal(chartFeatureInfoSpec.localName, "行政区", "chartFeatureInfoSpec.localName");
    equal(chartFeatureInfoSpec.name, "Administration Area (Named)", "chartFeatureInfoSpec.name");
    equal(chartFeatureInfoSpec.primitive, "A", "chartFeatureInfoSpec.primitive");
    ok(chartFeatureInfoSpec.attributeFields != null, "chartFeatureInfoSpec.attributeFields");
});