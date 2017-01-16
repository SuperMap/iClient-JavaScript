module("Elements");

test("TestElements_constructor", function () {
    expect(3);

    var elementsLayer = new SuperMap.Layer.Elements("elementsLayer");

    ok(elementsLayer instanceof SuperMap.Layer.Elements, "layer instanceof SuperMap.Layer.Elements");
    equals(elementsLayer.name, "elementsLayer", "the name of elements");
    equals(elementsLayer.CLASS_NAME, "SuperMap.Layer.Elements", "CLASS_NAME of SuperMap.Layer.Elements");
    elementsLayer.destroy();
});

test("TestElements_getDiv", function () {
    expect(3);

    var elementsLayer = new SuperMap.Layer.Elements("elementsLayer"),
        map = new SuperMap.Map("map");
    map.addLayer(elementsLayer);
    var elementsDiv = elementsLayer.getDiv();
    equals(elementsDiv.className, "smLayerDiv", "className of  the value elementsLayer.getDiv() return");
    equals(elementsDiv.style.width, "100%", "elementsDiv.style.width");
    equals(elementsDiv.style.height, "100%", "elementsDiv.style.height");
    elementsLayer.destroy();
});
test("TestElements_destroy", function () {
    expect(2);

    var elementsLayer = new SuperMap.Layer.Elements("elementsLayer");
    elementsLayer.destroy();
    ok(elementsLayer.name == null, "name");
    ok(elementsLayer.getDiv() == null, "getDiv");

});