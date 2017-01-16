/**
 * Created by Administrator on 2016/5/6.
 */
module('ExtendProperty');

var ExtendProperty = new SuperMap.Plot.ExtendProperty();
var key = "color";
var value = "#f00";
ExtendProperty.addProperty(key, value);

test("testExtendProperty_Constructor", function () {
    var extendProperty = new SuperMap.Plot.ExtendProperty();
    equal(extendProperty.CLASS_NAME, "SuperMap.Plot.ExtendProperty", "Property:CLASS_NAME");
    ok(extendProperty.properties !== null, "extendProperty.properties");

    extendProperty.destroy();
});

test("testExtendProperty_Destroy", function () {
    var extendProperty = new SuperMap.Plot.ExtendProperty();
    equal(extendProperty.CLASS_NAME, "SuperMap.Plot.ExtendProperty", "Property:CLASS_NAME");

    extendProperty.destroy();
    ok(extendProperty !== null, "not null");
    ok(extendProperty.properties === null, "extendProperty.properties is null");
});

test("testDotSymbol_addProperty", function () {
    var getProperty = ExtendProperty.getPropertyValue(key);
    equal(getProperty, "#f00", "Function.addProperty");
});

test("testDotSymbol_deleteProperty", function () {
    var result = ExtendProperty.deleteProperty(key) ? true : false;
    equal(result, true, "Function.deleteProperty");
});

test("testDotSymbol_findProperty", function () {
    var findProperty = ExtendProperty.findProperty(key);
    equal(findProperty.key, "color", "Function.findProperty");
    equal(findProperty.value, "#f00", "Function.findProperty");
});

test("testDotSymbol_getPropertyValue", function () {
    var getPropertyValue = ExtendProperty.getPropertyValue(key);
    equal(getPropertyValue, "#f00", "Function.getPropertyValue");
});

test("testDotSymbol_getPropertyByIndex", function () {
    var getPropertyByIndex = ExtendProperty.getPropertyByIndex(0);
    equal(getPropertyByIndex.value, "#f00", "Function.getPropertyByIndex");
    equal(getPropertyByIndex.key, "color", "Function.getPropertyByIndex")
});

test("testDotSymbol_getPropertyCount", function () {
    var getPropertyCount = ExtendProperty.getPropertyCount();
    equal(getPropertyCount, 1, "Function.getPropertyCount");
});