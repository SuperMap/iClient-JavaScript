module("Snap");
test("testSnap_constructor", 7, function () {
    var snapLayers = [new SuperMap.Layer.Vector("vector Layer"),
        new SuperMap.Layer.Vector("vector Layer1")];
    var pointTolerance = 10, lineTolerance = 10, options = {maxTolerance: 100};
    var snap = new SuperMap.Snap(snapLayers, pointTolerance, lineTolerance, options);
    equal(snap.snapLayers.length, 2, "params.snapLayers");
    equal(snap.maxTolerance, 100, "params.maxTolerance");
    equal(snap.pointTolerance, 10, "params.pointTolerance");
    equal(snap.lineTolerance, 10, "params.lineTolerance");
    equal(snap.keydown, false, "params.keydown");
    equal(snap.eventType[0], ["snapping"], "params.eventType");
    equal(snap.events.eventTypes.length, 1, "params.events");
    snap.destroy();
});
test("testSnap_on", 2, function () {
    var snapLayers = [new SuperMap.Layer.Vector("vector Layer"),
        new SuperMap.Layer.Vector("vector Layer1")];
    var pointTolerance = 10, lineTolerance = 10, options = {maxTolerance: 100};
    var snap = new SuperMap.Snap(snapLayers, pointTolerance, lineTolerance, options);
    equal(snap.active, false, "打开捕捉功能之前active的状态为false");
    snap.on();
    equal(snap.active, true, "function:on");
    snap.destroy();
});
test("testSnap_off", 1, function () {
    var snapLayers = [new SuperMap.Layer.Vector("vector Layer"),
        new SuperMap.Layer.Vector("vector Layer1")];
    var pointTolerance = 10, lineTolerance = 10, options = {maxTolerance: 100};
    var snap = new SuperMap.Snap(snapLayers, pointTolerance, lineTolerance, options);
    snap.on();
    snap.off();
    equal(snap.active, false, "function:off");
    snap.destroy();
});
test("testSnap_switchSnap", 2, function () {
    var snapLayers = [new SuperMap.Layer.Vector("vector Layer"),
        new SuperMap.Layer.Vector("vector Layer1")];
    var pointTolerance = 10, lineTolerance = 10, options = {maxTolerance: 100};
    var snap = new SuperMap.Snap(snapLayers, pointTolerance, lineTolerance, options);
    snap.switchSnap();
    equal(snap.active, true, "function:off");
    snap.switchSnap();
    equal(snap.active, false, "function:off");
    snap.destroy();
});
test("testSnap_setPointTolerance", 3, function () {
    var snapLayers = [new SuperMap.Layer.Vector("vector Layer"),
        new SuperMap.Layer.Vector("vector Layer1")];
    var pointTolerance = 10, lineTolerance = 10, options = {maxTolerance: 100};
    var snap = new SuperMap.Snap(snapLayers, pointTolerance, lineTolerance, options);
    snap.on();
    snap.setPointTolerance(2);
    equal(snap.pointTolerance, 2, "function:setPointTolerance");
    snap.setPointTolerance(200);
    equal(snap.pointTolerance, 100, "function:setPointTolerance");
    snap.setPointTolerance("Infinity");
    equal(snap.pointTolerance, 100, "function:setPointTolerance");
    snap.destroy();
});
test("testSnap_setLineTolerance", 3, function () {
    var snapLayers = [new SuperMap.Layer.Vector("vector Layer"),
        new SuperMap.Layer.Vector("vector Layer1")];
    var pointTolerance = 10, lineTolerance = 10, options = {maxTolerance: 100};
    var snap = new SuperMap.Snap(snapLayers, pointTolerance, lineTolerance, options);
    snap.on();
    snap.setLineTolerance(2);
    equal(snap.lineTolerance, 2, "function:setLineTolerance");
    snap.setLineTolerance(200);
    equal(snap.lineTolerance, 100, "function:setLineTolerance");
    snap.setLineTolerance("Infinity");
    equal(snap.lineTolerance, 100, "function:setLineTolerance");
    snap.destroy();
});
test("testSnap_setMaxTolerance", 2, function () {
    var snapLayers = [new SuperMap.Layer.Vector("vector Layer"),
        new SuperMap.Layer.Vector("vector Layer1")];
    var pointTolerance = 10, lineTolerance = 10, options = {maxTolerance: 100};
    var snap = new SuperMap.Snap(snapLayers, pointTolerance, lineTolerance, options);
    snap.on();
    snap.setMaxTolerance(200);
    equal(snap.maxTolerance, 200, "function:setMaxTolerance");
    snap.setMaxTolerance("maxTolerance");
    equal(snap.maxTolerance, 500, "function:setMaxTolerance");
    snap.destroy();
});
test("testSnap_setOptions", 1, function () {
    var snapLayers = [new SuperMap.Layer.Vector("vector Layer"),
        new SuperMap.Layer.Vector("vector Layer1" )];
    var pointTolerance = 10, lineTolerance = 10, options = {maxTolerance: 100};
    var snap = new SuperMap.Snap(snapLayers, pointTolerance, lineTolerance, options);
    snap.on();
    var options1 = {maxTolerance: 200};
    snap.setOptions(options1);
    equal(snap.maxTolerance, 200, "function:setOptions");
    snap.destroy();
});
test("testSnap_beginSnap", 1, function () {
    var map = new SuperMap.Map('qunit-fixture');
    var snapLayers = [new SuperMap.Layer.Vector("vector Layer"),
        new SuperMap.Layer.Vector("vector Layer1")];
    map.addLayers(snapLayers);
    var pointTolerance = 10, lineTolerance = 10, options = {maxTolerance: 100};
    var snap = new SuperMap.Snap(snapLayers, pointTolerance, lineTolerance, options);
    snap.on();
    var lonLat = new SuperMap.LonLat(0.0, 0.0);
    equal(snap.beginSnap(lonLat), lonLat, "function:beginSnap");
    map.destroy();
    snap.destroy();
});
test("testSnap_snapPoint", 2, function () {
    var map = new SuperMap.Map('qunit-fixture');
    var snapLayers = [new SuperMap.Layer.Vector("vector Layer" ),
        new SuperMap.Layer.Vector("vector Layer1" )];
    map.addLayers(snapLayers);
    var pointTolerance = 10, lineTolerance = 10, options = {maxTolerance: 100};
    var snap = new SuperMap.Snap(snapLayers, pointTolerance, lineTolerance, options);
    snap.on();
    var point1 = new SuperMap.Geometry.Point(0, 10);
    var point2 = new SuperMap.Geometry.Point(10, 10);
    var point3 = new SuperMap.Geometry.Point(10, 20);
    var point4 = new SuperMap.Geometry.Point(0, 20);
    var points = [point1, point2, point3, point4];
    var linearRing = new SuperMap.Geometry.LinearRing(points);
    var geometry = new SuperMap.Geometry.Polygon([linearRing]);
    var geoPoint = new SuperMap.Geometry.Point(0, 1000), geoPoint1 = new SuperMap.Geometry.Point(0, 8);
    equal(snap.snapPoint(geometry, geoPoint).id, geoPoint.id, "function:snapPoint");
    equal(snap.snapPoint(geometry, geoPoint1).id, geometry.id, "function:snapPoint");
    map.destroy();
    snap.destroy();
});
test("testSnap_snapLine", 3, function () {
    var map = new SuperMap.Map('qunit-fixture');
    var snapLayers = [new SuperMap.Layer.Vector("vector Layer"),
        new SuperMap.Layer.Vector("vector Layer1")];
    map.addLayers(snapLayers);
    var pointTolerance = 10, lineTolerance = 10, options = {maxTolerance: 100};
    var snap = new SuperMap.Snap(snapLayers, pointTolerance, lineTolerance, options);
    snap.on();
    var point1 = new SuperMap.Geometry.Point(0, 10);
    var point2 = new SuperMap.Geometry.Point(10, 10);
    var point3 = new SuperMap.Geometry.Point(10, 20);
    var point4 = new SuperMap.Geometry.Point(0, 20);
    var points = [point1, point2, point3, point4];
    var linearRing = new SuperMap.Geometry.LinearRing(points);
    var geometry = new SuperMap.Geometry.Polygon([linearRing]);
    var geoPoint = new SuperMap.Geometry.Point(0, 1000), geoPoint1 = new SuperMap.Geometry.Point(0, 8);
    equal(snap.snapLine(geometry, geoPoint).id, geoPoint.id, "function:snapLine");
    equal(snap.snapLine(geometry, geoPoint1).x, point1.x, "function:snapLine");
    equal(snap.snapLine(geometry, geoPoint1).y, point1.y, "function:snapLine");
    map.destroy();
    snap.destroy();
});
test("testSnap_snapPolygon", 3, function () {
    var map = new SuperMap.Map('qunit-fixture');
    var snapLayers = [new SuperMap.Layer.Vector("vector Layer"),
        new SuperMap.Layer.Vector("vector Layer1")];
    map.addLayers(snapLayers);
    var pointTolerance = 10, lineTolerance = 10, options = {maxTolerance: 100};
    var snap = new SuperMap.Snap(snapLayers, pointTolerance, lineTolerance, options);
    snap.on();
    var point1 = new SuperMap.Geometry.Point(0, 10);
    var point2 = new SuperMap.Geometry.Point(10, 10);
    var point3 = new SuperMap.Geometry.Point(10, 20);
    var point4 = new SuperMap.Geometry.Point(0, 20);
    var points = [point1, point2, point3, point4];
    var linearRing = new SuperMap.Geometry.LinearRing(points);
    var geometry = new SuperMap.Geometry.Polygon([linearRing]);
    var geoPoint = new SuperMap.Geometry.Point(0, 1000), geoPoint1 = new SuperMap.Geometry.Point(0, 8);
    equal(snap.snapPolygon(geometry, geoPoint).id, geoPoint.id, "function:snapPolygon");
    equal(snap.snapPolygon(geometry, geoPoint1).x, point1.x, "function:snapPolygon");
    equal(snap.snapPolygon(geometry, geoPoint1).y, point1.y, "function:snapPolygon");
    map.destroy();
    snap.destroy();
});
test("testSnap_getResolution", 1, function () {
    var map = new SuperMap.Map('qunit-fixture');
    var snapLayers = [new SuperMap.Layer.Vector("vector Layer"),
        new SuperMap.Layer.Vector("vector Layer1")];
    map.addLayers(snapLayers);
    var pointTolerance = 10, lineTolerance = 10, options = {maxTolerance: 100};
    var snap = new SuperMap.Snap(snapLayers, pointTolerance, lineTolerance, options);
    snap.on();
    equal(snap.getResolution(), map.layers[0].maxResolution, "function:getResolution");
    map.destroy();
    snap.destroy();
});
test("testSnap_destroy", 4, function () {
    var snapLayers = [new SuperMap.Layer.Vector("vector Layer"),
        new SuperMap.Layer.Vector("vector Layer1")];
    var pointTolerance = 10, lineTolerance = 10, options = {maxTolerance: 100};
    var snap = new SuperMap.Snap(snapLayers, pointTolerance, lineTolerance, options);
    snap.on();
    snap.destroy();
    equal(snap.active, false, "function:destroy");
    equal(snap.snapLayers.length, 0, "function:destroy");
    equal(snap.pointTolerance, 0, "function:destroy");
    equal(snap.lineTolerance, 0, "function:destroy");
    snap.destroy();
});