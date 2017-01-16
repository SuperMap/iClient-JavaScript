module("Vector");

test("TestVector_Constructor", function () {
    expect(4);
    var points = [
        new SuperMap.Geometry.Point(0, 29.4),
        new SuperMap.Geometry.Point(-50, 39.4)
    ];
    var line = new SuperMap.Geometry.LineString(points);
    var style = SuperMap.Feature.Vector.style.default;
    var lineVector = new SuperMap.Feature.Vector(line, null, style);
    ok(lineVector instanceof SuperMap.Feature.Vector, "lineVector instanceof SuperMap.Feature.Vector");
    equals(lineVector.geometry.components.length, 2, "Property:geometry");
    equals(lineVector.style, style, "Property:style");
    equals(lineVector.CLASS_NAME, "SuperMap.Feature.Vector", "CLASS_NAME");
    lineVector.destroy();
});

test("TestVector_destroy", function () {
    expect(5);
    var point = new SuperMap.Geometry.Point(0, 0);
    var style = SuperMap.Feature.Vector.style.select;
    var pointVector = new SuperMap.Feature.Vector(point, null, style);
    pointVector.layer = new SuperMap.Layer.Vector("vector");
    ok(pointVector.layer != null, "Property:layer  not null");
    ok(pointVector.geometry != null, "Property:geometry not null");
    ok(pointVector.style != null, "Property:style  not null");
    pointVector.destroy();
    ok(pointVector.layer === null, "Property:layer  not null");
    ok(pointVector.geometry === null, "Property:geometry null");
});
test("TestVector_clone", function () {
    expect(4);
    var point = new SuperMap.Geometry.Point(1, 1);
    var style = SuperMap.Feature.Vector.style.temporary;
    var pointVector = new SuperMap.Feature.Vector(point, null, style);
    var clone = pointVector.clone();
    ok(clone instanceof SuperMap.Feature.Vector, "clone instanceof SuperMap.Feature.Vector");
    equals(clone.geometry.x, pointVector.geometry.x, "Function:clone");
    equals(clone.geometry.y, pointVector.geometry.y, "Function:clone");
    equals(clone.style, pointVector.style, "Function:clone");
    pointVector.destroy();
    clone.destroy();
});

test("TestVector_onScreen", function () {
    expect(1);
    var rect = new SuperMap.Geometry.Rectangle(-10, -10, 10, 10);
    var style = SuperMap.Feature.Vector.style.temporary;
    var rectVector = new SuperMap.Feature.Vector(rect, null, style);
    var layer = new SuperMap.Layer.CustomVector("Layer", {isBaseLayer: true});
    var map = new SuperMap.Map({div: "qunit-fixture", layers: [layer], center: new SuperMap.LonLat(0, 0), zoom: 0});
    layer.map = map;
    rectVector.layer = layer;
    equals(rectVector.onScreen(true), true, "Function:onScreen");
    rectVector.destroy();
    layer.destroy();
    map.destroy();
});

test("TestVector_getVisibility", function () {
    expect(1);
    var line = new SuperMap.Geometry.LineString(-10, -10, 10, 10);
    var style = SuperMap.Feature.Vector.style.temporary;
    var lineVector = new SuperMap.Feature.Vector(line, null, style);
    var layer = new SuperMap.Layer.CustomVector("Layer", {isBaseLayer: true});
    lineVector.layer = layer;
    equals(lineVector.getVisibility(), true, "Function:getVisibility");
    lineVector.destroy();
    layer.destroy();

});

test("TestVector_createMarker", function () {
    expect(1);
    var line = new SuperMap.Geometry.LineString(-10, -10, 10, 10);
    var lineVector = new SuperMap.Feature.Vector(line, null, null);
    equals(lineVector.createMarker(), null, "Function:createMarker");
    lineVector.destroy();
});
test("TestVector_createPopup", function () {
    expect(1);
    var line = new SuperMap.Geometry.LineString(-10, -10, 10, 10);
    var lineVector = new SuperMap.Feature.Vector(line, null, null);
    equals(lineVector.createPopup(), null, "Function:createPopup");
    lineVector.destroy();
});
test("TestVector_atPoint", function () {
    expect(1);
    var line = new SuperMap.Geometry.LineString(-10, -10, 10, 10);
    var lineVector = new SuperMap.Feature.Vector(line, null, null);
    equals(lineVector.atPoint(new SuperMap.LonLat(-10, -10)), false, "Function:atPoint");
    lineVector.destroy();
});

test("TestVector_move", function () {
    expect(1);
    var point = new SuperMap.Geometry.Point(0, 0);
    var pointVector = new SuperMap.Feature.Vector(point, null, null);
    var baseLayer = new SuperMap.Layer.CustomVector("BaseLayer", {isBaseLayer: true});
    var map = new SuperMap.Map({div: "qunit-fixture", layers: [baseLayer], center: new SuperMap.LonLat(0, 0), zoom: 0});
    var layer = new SuperMap.Layer.Vector("Layer");
    layer.map = map;
    pointVector.layer = layer;
    equals(pointVector.move(new SuperMap.LonLat(4, 4)) === null, false, "Function:move");
    pointVector.destroy();
    map.destroy();
});

test("TestVector_toState", function () {
    expect(3);
    var point = new SuperMap.Geometry.Point(0, 0);
    var pointVector = new SuperMap.Feature.Vector(point, null, null);
    pointVector.state = SuperMap.State.UNKNOWN;
    pointVector.toState(SuperMap.State.DELETE);
    equals(pointVector.state, SuperMap.State.DELETE, "Function:toState");
    pointVector.toState(SuperMap.State.UPDATE);
    equals(pointVector.state, SuperMap.State.UPDATE, "Function:toState");
    pointVector.toState(SuperMap.State.INSERT);
    equals(pointVector.state, SuperMap.State.INSERT, "Function:toState");
    pointVector.destroy();
});