module("ChartAttributeSpec");

test("TestDefaultConstructor", function () {
    var chartAttributeSpec = new SuperMap.REST.ChartAttributeSpec();
    ok(chartAttributeSpec != null, "not null");
    ok(chartAttributeSpec.code == null, "chartAttributeSpec.code");
    ok(chartAttributeSpec.required == null, "chartAttributeSpec.required");
});

test("TestConstructor_Destructor", function () {
    var chartAttributeSpec = new SuperMap.REST.ChartAttributeSpec({
        code:103,
        required:1
    });
    ok(chartAttributeSpec != null, "not null");
    equal(chartAttributeSpec.code, 103, "chartAttributeSpec.code");
    equal(chartAttributeSpec.required, 1, "chartAttributeSpec.required");

    chartAttributeSpec.destroy();

    ok(chartAttributeSpec != null, "not null");
    ok(chartAttributeSpec.code == null, "chartAttributeSpec.code");
    ok(chartAttributeSpec.required == null, "chartAttributeSpec.required");
});


test("TestFromJson", function () {
    var json = {code:103, required:1};
    var chartAttr = new SuperMap.REST.ChartAttributeSpec();
    var chartAttributeSpec = chartAttr.fromJson(json);
    ok(chartAttributeSpec != null, "not null");
    equal(chartAttributeSpec.code, 103, "chartAttributeSpec.code");
    equal(chartAttributeSpec.required, 1, "chartAttributeSpec.required");
});