module("RootContainer");

test("RootContainer_constructorDefault", function () {
    expect(3);
    var name = "Container";
    var vectorLayer1 = new SuperMap.Layer.Vector("vector layer1");
    var vectorLayer2 = new SuperMap.Layer.Vector("vector layer2");
    var vectorLayer3 = new SuperMap.Layer.Vector("vector layer3");
    var layers = new Array();
    layers.push(vectorLayer1);
    layers.push(vectorLayer2);
    layers.push(vectorLayer3);
    var options = {layers: layers};
    var container = new SuperMap.Layer.Vector.RootContainer(name, options);
    ok(container instanceof SuperMap.Layer.Vector.RootContainer, "container  instanceof  SuperMap.Layer.Vector.RootContainer");
    equals(container.layers.length, 3, "Property:layers");
    equals(container.displayInLayerSwitcher, false, "Property:displayInLayerSwitcher");
});

test("test_RootContainer_getFeatureFromEvent", function () {
    expect(1);
    var vectorLayer = new SuperMap.Layer.Vector("vectorlayer");
    var geometry = new SuperMap.Geometry.Point(-115, 10);
    var style = {
        strokeColor: "#339933",
        strokeOpacity: 1,
        strokeWidth: 3,
        pointRadius: 6
    };
    var pointFeature = new SuperMap.Feature.Vector(geometry, null, style);
    pointFeature._featureId = 1;
    vectorLayer.addFeatures(pointFeature);
    var layers = new Array();
    layers.push(vectorLayer);
    var options = {layers: layers};
    var container = new SuperMap.Layer.Vector.RootContainer("Container", options);
    var option = {target: {feature: pointFeature, correspondingUseElement: pointFeature}};
    var event = new SuperMap.Events(
        this, null, this.EVENT_TYPES, true, option
    );
    var featureId = container.getFeatureFromEvent(event);
    equals(featureId, pointFeature._featureId, "function:getFeatureFromEvent，对获取的feature进行验证");
});

test("test_RootContainer_setMap", function () {
    expect(1);
    var vectorLayer1 = new SuperMap.Layer.Vector("vector layer1");
    var layers = new Array();
    var options = {layers: layers};
    var container = new SuperMap.Layer.Vector.RootContainer("Container", options);
    layers.push(vectorLayer1);
    var map = new SuperMap.Map("map1");
    container.setMap(map);
    equals(container.map.mapName, map.mapName, "function:setMap，验证map是否set成功");
});

test("test_RootContainer_removeMap", function () {
    expect(2);
    var vectorLayer1 = new SuperMap.Layer.Vector("vector layer1");
    var layers = new Array();
    var options = {layers: layers};
    var container = new SuperMap.Layer.Vector.RootContainer("Container", options);
    layers.push(vectorLayer1);
    var map = new SuperMap.Map("qunit-fixture");
    container.setMap(map);
    equals(container.map.mapName, map.mapName, "function:removeMap，验证map是否set成功");
    container.removeMap(map);
    equals(container.map.mapName, undefined, "function:removeMap，验证map是否remove成功");
});