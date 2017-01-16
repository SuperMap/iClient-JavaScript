module("DrawFeature");
test("TestDrawFeature_constructor", function () {
    expect(7);
    var map = new SuperMap.Map("qunit-fixture");
    var vectorLayer = new SuperMap.Layer.Vector("Vector Layer");
    map.addLayer(vectorLayer);
    var drawPoint = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Point);
    map.addControl(drawPoint);
    drawPoint.activate();
    var EVENT_TYPES = [
        "featureadded",
        "beforefeatureadded",
        "activate",
        "deactivate"
    ];
    ok(drawPoint != null, "params not null");
    equal(drawPoint.snap, null, "params.snap");
    ok(drawPoint.layer != null, "params.layer");
    deepEqual(drawPoint.EVENT_TYPES, EVENT_TYPES, "params.EVENT_TYPES");
    equal(drawPoint.multi, false, "params.multi");
    ok(drawPoint.handlerOptions != null, "params.handlerOptions");
    equal(drawPoint.style, null, "params.style");
    map.destroy();
});

test("TestDrawFeature_drawFeature", function () {
    expect(12);
    var layer = new SuperMap.Layer.CustomVector("baseLayer", {isBaseLayer: true});
    var map = new SuperMap.Map({
        div: "qunit-fixture",
        layers: [layer],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });
    var vectorLayer = new SuperMap.Layer.Vector("Vector Layer");
    map.addLayer(vectorLayer);
    var drawFeature = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Point);
    map.addControl(drawFeature);
    drawFeature.activate();
    equal(drawFeature.layer.features.length, 0, "绘制feature前图层上的要素为空");
    //添加point类型要素
    var point = new SuperMap.Geometry.Point(50, 100);
    drawFeature.drawFeature(point);
    equal(drawFeature.layer.features.length, 1, "function:drawFeature_point");
    equal(drawFeature.layer.features[0].geometry.x, point.x, "function:drawFeature_point");
    equal(drawFeature.layer.features[0].geometry.y, point.y, "function:drawFeature_point");
    //添加pixel类型要素
    var pixel = new SuperMap.Pixel(-111.04, 45.68);
    drawFeature.drawFeature(pixel);
    var geometry = map.getLonLatFromViewPortPx(pixel);
    equal(drawFeature.layer.features.length, 2, "function:drawFeature_pixel");
    equal(drawFeature.layer.features[1].geometry.x, geometry.lon, "function:drawFeature_pixel");
    equal(drawFeature.layer.features[1].geometry.y, geometry.lat, "function:drawFeature_pixel");
    //添加bounds类型要素
    var bounds = new SuperMap.Bounds([20, 30, 40, 50]);
    drawFeature.drawFeature(bounds);
    var geometry1 = map.getLonLatFromViewPortPx(new SuperMap.Pixel(bounds.left, bounds.bottom));
    var geometry2 = map.getLonLatFromViewPortPx(new SuperMap.Pixel(bounds.right, bounds.top));
    equal(drawFeature.layer.features.length, 3, "function:drawFeature_bounds");
    equal(drawFeature.layer.features[2].geometry.x, geometry1.lon, "function:drawFeature_bounds");
    equal(drawFeature.layer.features[2].geometry.y, geometry1.lat, "function:drawFeature_bounds");
    equal(drawFeature.layer.features[2].geometry.width, geometry2.lon - geometry1.lon, "function:drawFeature_bounds");
    equal(drawFeature.layer.features[2].geometry.height, geometry2.lat - geometry1.lat, "function:drawFeature_bounds");
    map.destroy();
});
