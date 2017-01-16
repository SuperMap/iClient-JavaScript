module("Comparison");

test("TestComparison_defaultConstructor", function () {
    expect(2);
    var comparison = new SuperMap.Filter.Comparison();
    ok(comparison instanceof SuperMap.Filter.Comparison, "comparison instanceof SuperMap.Filter.Comparison");
    equals(comparison.CLASS_NAME, "SuperMap.Filter.Comparison", "CLASS_NAME of SuperMap.Filter.Comparison");
    comparison.destroy();
});

test("TestComparison_constructor", function () {
    expect(5);
    var comparison = new SuperMap.Filter.Comparison({
        type: SuperMap.Filter.Comparison.EQUAL_TO,
        property: "CAPITAL",
        value: "beijing"
    });
    ok(comparison instanceof SuperMap.Filter.Comparison, "comparison instanceof SuperMap.Filter.Comparison");
    equals(comparison.type, SuperMap.Filter.Comparison.EQUAL_TO, "Property:type");
    equals(comparison.property, "CAPITAL", "Property:property");
    equals(comparison.value, "beijing", "Property:value");
    equals(comparison.CLASS_NAME, "SuperMap.Filter.Comparison", "CLASS_NAME of SuperMap.Filter.Comparison");
    comparison.destroy();
});

test("TestComparison_evaluateEqualTo", function () {
    expect(1);
    var comparison = new SuperMap.Filter.Comparison({
        type: SuperMap.Filter.Comparison.EQUAL_TO,
        property: "CITY",
        value: "chengdu"
    });
    var point = new SuperMap.Geometry.Point(104.04, 30.68);
    var pointFeature = new SuperMap.Feature.Vector(point);
    pointFeature.attributes = {"CITY": "chengdu"};
    equals(comparison.evaluate(pointFeature), true, "Function:evaluate");
    comparison.destroy();
});

test("TestComparison_evaluateNotEqualTo", function () {
    expect(1);
    var comparison = new SuperMap.Filter.Comparison({
        type: SuperMap.Filter.Comparison.NOT_EQUAL_TO,
        property: "CITY",
        value: "beijing"
    });
    var point = new SuperMap.Geometry.Point(104.04, 30.68);
    var pointFeature = new SuperMap.Feature.Vector(point);
    pointFeature.attributes = {"CITY": "chengdu"};
    equals(comparison.evaluate(pointFeature), true, "Function:evaluate");
    comparison.destroy();
});
test("TestComparison_evaluateLessThan", function () {
    expect(1);
    var comparison = new SuperMap.Filter.Comparison({
        type: SuperMap.Filter.Comparison.LESS_THAN,
        property: "Pop",
        value: 1000000
    });
    var point = new SuperMap.Geometry.Point(104.04, 30.68);
    var pointFeature = new SuperMap.Feature.Vector(point);
    pointFeature.attributes = {"Pop": 400000};
    equals(comparison.evaluate(pointFeature), true, "Function:evaluate");
    comparison.destroy();
});

test("TestComparison_evaluateGreaterThan", function () {
    expect(1);
    var comparison = new SuperMap.Filter.Comparison({
        type: SuperMap.Filter.Comparison.GREATER_THAN,
        property: "GDP",
        value: 100
    });
    var point = new SuperMap.Geometry.Point(104.04, 30.68);
    var pointFeature = new SuperMap.Feature.Vector(point);
    pointFeature.attributes = {"GDP": 2000};
    equals(comparison.evaluate(pointFeature), true, "Function:evaluate");
    comparison.destroy();
});

test("TestComparison_evaluateBetween", function () {
    expect(1);
    var comparison = new SuperMap.Filter.Comparison({
        type: SuperMap.Filter.Comparison.BETWEEN,
        property: "GDP",
        lowerBoundary: 1000,
        upperBoundary: 2000
    });
    var point = new SuperMap.Geometry.Point(104.04, 30.68);
    var pointFeature = new SuperMap.Feature.Vector(point);
    pointFeature.attributes = {"GDP": 1500};
    equals(comparison.evaluate(pointFeature), true, "Function:evaluate");
    comparison.destroy();
});
test("TestComparison_evaluateLike", function () {
    expect(1);
    var comparison = new SuperMap.Filter.Comparison({
        type: SuperMap.Filter.Comparison.LIKE,
        property: "NAME",
        value: "China Bank"
    });
    var point = new SuperMap.Geometry.Point(104.04, 30.68);
    var pointFeature = new SuperMap.Feature.Vector(point);
    pointFeature.attributes = {"NAME": "China Bank"};
    equals(comparison.evaluate(pointFeature), true, "Function:evaluate");
    comparison.destroy();
});

test("TestComparison_value2regex", function () {
    expect(2);
    var comparison = new SuperMap.Filter.Comparison({value: "China!"});
    equals(comparison.value2regex(), "China\\", "Function:value2regex");
    comparison = new SuperMap.Filter.Comparison({value: "China@"});
    equals(comparison.value2regex("@"), "China.*", "Function:value2regex");
    comparison.destroy();
});

test("TestComparison_regex2value", function () {
    expect(3);
    var comparison = new SuperMap.Filter.Comparison({value: "China!"});
    equals(comparison.regex2value(), "China!!", "Function:regex2value");
    comparison = new SuperMap.Filter.Comparison({value: "\\\China"});
    equals(comparison.regex2value(), "\\China", "Function:regex2value");
    comparison = new SuperMap.Filter.Comparison({value: ".*China"});
    equals(comparison.regex2value(), "*China", "Function:regex2value");
    comparison.destroy();
});
test("TestComparison_clone", function () {
    expect(1);
    var comparison = new SuperMap.Filter.Comparison({value: "China"});
    equals(comparison.clone().value, comparison.value, "Function:clone");
    comparison.destroy();
});
