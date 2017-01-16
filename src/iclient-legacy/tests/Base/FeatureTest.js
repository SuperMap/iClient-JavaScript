module("Feature");

test("TestFeature_Constructor", function () {
    expect(2);
    var layerVector = new SuperMap.Layer.Vector("vector");
    var lonLat = new SuperMap.LonLat(0, 0);
    var feature = new SuperMap.Feature(layerVector, lonLat, null);
    ok(feature instanceof SuperMap.Feature, "feature instanceof SuperMap.Feature");
    equals(feature.CLASS_NAME, "SuperMap.Feature", "CLASS_NAME");
    layerVector.destroy();
    feature.destroy();
});

test("TestFeature_destroy", function () {
    expect(2);
    var lonLat = new SuperMap.LonLat(0, 0);
    var feature = new SuperMap.Feature(null, lonLat, null);
    equals(feature.lonlat, lonLat, "Property.lonlat");
    feature.destroy();
    equals(feature.lonlat, null, "Property.lonlat");
});
test("TestFeature_onScreen", function () {
    expect(1);
    var layer = new SuperMap.Layer.CustomVector("Layer", {isBaseLayer: true});
    var map = new SuperMap.Map({div: "qunit-fixture", layers: [layer], center: new SuperMap.LonLat(0, 0), zoom: 0});
    var lonLat = new SuperMap.LonLat(10, 10);
    var feature = new SuperMap.Feature(layer, lonLat, null);
    feature.layer = layer;
    equals(feature.onScreen(), true, "Function:onScreen");
    feature.destroy();
    map.destroy();
});
test("TestFeature_createMarker", function () {
    expect(4);
    var lonLat = new SuperMap.LonLat(10, 10);
    var feature = new SuperMap.Feature(null, lonLat, null);
    equals(feature.marker === null, true, "Function:createMarker");
    var marker = feature.createMarker();
    equals(marker === null, false, "Function:createMarker");
    equals(feature.marker === null, false, "Function:createMarker");
    equals(feature.marker.lonlat, lonLat, "Function:createMarker");
    feature.destroy();
});

test("TestFeature_destroyMarker", function () {
    expect(3);
    var lonLat = new SuperMap.LonLat(10, 10);
    var markIcon = new SuperMap.Icon("icon.png");
    var feature = new SuperMap.Feature(null, lonLat, {icon: markIcon});
    var marker = feature.createMarker();
    equals(marker === null, false, "Function:destroyMarker");
    equals(marker.icon === null, false, "Function:destroyMarker");
    feature.destroyMarker();
    equals(marker.icon == null, true, "Function:destroyMarker");
});

test("TestFeature_createPopup", function () {
    expect(1);
    var lonLat = new SuperMap.LonLat(10, 10);
    var markIcon = new SuperMap.Icon("icon.png");
    var feature = new SuperMap.Feature(null, lonLat, {icon: markIcon});
    feature.popupClass = SuperMap.Popup;
    var popup = feature.createPopup();
    equals(popup === null, false, "Function:createPopup");
    feature.destroy();
});
test("TestFeature_destroyPopup", function () {
    expect(2);
    var lonLat = new SuperMap.LonLat(10, 10);
    var markIcon = new SuperMap.Icon("icon.png");
    var feature = new SuperMap.Feature(null, lonLat, {icon: markIcon});
    feature.popupClass = SuperMap.Popup;
    feature.createPopup();
    equals(feature.popup === null, false, "Function:destroyPopup");
    feature.destroyPopup();
    equals(feature.popup === null, true, "Function:destroyPopup");
    feature.destroy();
});
