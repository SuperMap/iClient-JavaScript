module("Feature_Theme");
test("testTheme_constructorDefault",function(){
    expect(2);
    var point1 = new SuperMap.Geometry.Point(-111.04, 45.68);
    var pointFeature1 = new SuperMap.Feature.Vector(point1);
    var point2 = new SuperMap.Geometry.Point(-111.14, 45.78);
    var pointFeature2 = new SuperMap.Feature.Vector(point2);

    var themeLayer = new SuperMap.Layer.Graph(name, "Bar", {isBaseLayer: true});
    themeLayer.addFeatures([pointFeature1, pointFeature2]);
    var map = new SuperMap.Map({
        div: "map",
        layers: [themeLayer],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });

    var theme = new SuperMap.Feature.Theme(pointFeature1, themeLayer);

    equal(theme.data, pointFeature1,"data");
    equal(theme.layer.id, themeLayer.id, "layer");


    theme.destroy();
    themeLayer.destroy();
    map.destroy();
});
test("testTheme_destroy",function(){
    expect(4);

    var point1 = new SuperMap.Geometry.Point(-111.04, 45.68);
    var pointFeature1 = new SuperMap.Feature.Vector(point1);
    var point2 = new SuperMap.Geometry.Point(-111.14, 45.78);
    var pointFeature2 = new SuperMap.Feature.Vector(point2);

    var themeLayer = new SuperMap.Layer.Graph(name, "Bar", {isBaseLayer: true});
    themeLayer.addFeatures([pointFeature1, pointFeature2]);
    var map = new SuperMap.Map({
        div: "map",
        layers: [themeLayer],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });

    var theme = new SuperMap.Feature.Theme(pointFeature1, themeLayer);

    equal(theme.data, pointFeature1,"data: SuperMap.Feature.Vector");
    equal(theme.layer.id, themeLayer.id, "layer: SuperMap.Layer.Theme");

    theme.destroy();

    equal(theme.data, null,"data: null");
    equal(theme.layer, null, "layer: null");
    themeLayer.destroy();
    map.destroy();
});
test("testTheme_getLocalXY",function(){
    expect("3");

    var point1 = new SuperMap.Geometry.Point(-111.04, 45.68);
    var pointFeature1 = new SuperMap.Feature.Vector(point1);
    var point2 = new SuperMap.Geometry.Point(-111.14, 45.78);
    var pointFeature2 = new SuperMap.Feature.Vector(point2);

    var themeLayer = new SuperMap.Layer.Graph(name, "Bar", {isBaseLayer: true});
    themeLayer.addFeatures([pointFeature1, pointFeature2]);
    var map = new SuperMap.Map({
        div: "map",
        layers: [themeLayer],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });

    var theme = new SuperMap.Feature.Theme(pointFeature1, themeLayer);

    var mapCenterXY = [250, 250]

    var lonLat = new SuperMap.LonLat(0, 0);
    var lonLatXY = theme.getLocalXY(lonLat);
    same(lonLatXY, mapCenterXY, "mapCenter");

    var point = new SuperMap.Geometry.Point(0, 0);
    var pointXY = theme.getLocalXY(point);
    same(pointXY, mapCenterXY, "mapCenter");

    var geoText = new SuperMap.Geometry.GeoText(0, 0, "x");
    var geoTextXY = theme.getLocalXY(geoText);
    same(geoTextXY, mapCenterXY, "mapCenter");

    theme.destroy();
    themeLayer.destroy();
    map.destroy();
});