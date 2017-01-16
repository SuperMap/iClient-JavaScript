module("Property");

test("testProperty_Constructor", function () {
    var property = new SuperMap.Plot.Property(1, 1);
    equal(property.CLASS_NAME, "SuperMap.Plot.Property", "Property:CLASS_NAME");
    ok(property.key !== null, "property.key");
    ok(property.value !== null, "property.value");

    property.destroy();
});

test("testProperty_Destroy", function () {
    var property = new SuperMap.Plot.Property(1, 1);
    equal(property.CLASS_NAME, "SuperMap.Plot.Property", "Property:CLASS_NAME");

    property.destroy();
    ok(property !== null, "not null");
    ok(property.key === null, "property.key is null");
    ok(property.value === null, "property.value is null");
});

test("testProperty_set_get", function () {
    var property = new SuperMap.Plot.Property();

    property.setKey("SuperMap");
    var getkey = property.getKey();
    equal(getkey, "SuperMap", "Property:setKey");

    property.setValue("superMap_super");
    var getValue = property.getValue();
    equal(getValue, "superMap_super", "Property:setValue");

    property.destroy();
});