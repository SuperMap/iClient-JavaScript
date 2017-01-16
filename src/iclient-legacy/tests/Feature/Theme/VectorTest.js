module("Feature_Theme_Vector");
test("testTheme_Vector_constructor",function(){
    expect(10);
    var themeLayer = new SuperMap.Layer.CustomVector("Theme",{isBaseLayer: true});
    var map = new SuperMap.Map({
        div: "map",
        layers: [themeLayer],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });

    var style = {
        fill: true,
        fillColor: "#FF0000",
        stroke: true,
        strokeColor:"#339933",
        strokeOpacity:1,
        strokeWidth:2,
        pointRadius:6
    };
    var options = {
        nodesClipPixel: 2,
        isHoverAble: true,
        isMultiHover: true,
        isClickAble: true,
        highlightStyle: {
            stroke: true,
            strokeWidth: 4,
            fillColor: "#ffff00"
        }
    };
    var tfVector, geometry, feature;


    var point = new SuperMap.Geometry.Point(11, 45);
    var point2 = new SuperMap.Geometry.Point(10,20);
    var points =[
        new SuperMap.Geometry.Point(10, 0),
        new SuperMap.Geometry.Point(10, 6),
        new SuperMap.Geometry.Point(10, 1)
    ]
    var points2 =[
        new SuperMap.Geometry.Point(21, 33),
        new SuperMap.Geometry.Point(35, 42),
        new SuperMap.Geometry.Point(40, 11)
    ]

    // LinearRing
    geometry = new SuperMap.Geometry.LinearRing(points);
    feature = new SuperMap.Feature.Vector(geometry,null,style);
    tfVector = new SuperMap.Feature.Theme.Vector(feature, themeLayer, style, options);
    equal(tfVector.shapes[0].refDataID, feature.id, "refDataID");

    // LineString
    geometry = new SuperMap.Geometry.LineString(points);
    feature = new SuperMap.Feature.Vector(geometry,null,style);
    tfVector = new SuperMap.Feature.Theme.Vector(feature, themeLayer, style, options);
    equal(tfVector.shapes[0].refDataID, feature.id, "refDataID");

    // MultiPoint
    geometry = new SuperMap.Geometry.MultiPoint([point, point2]);
    feature = new SuperMap.Feature.Vector(geometry,null,style);
    tfVector = new SuperMap.Feature.Theme.Vector(feature, themeLayer, style, options);
    equal(tfVector.shapes[0].refDataID, feature.id, "refDataID");

     // MultiLineString
    geometry = new SuperMap.Geometry.MultiLineString([
        new SuperMap.Geometry.LineString(points),
        new SuperMap.Geometry.LineString(points2)
    ]);
    feature = new SuperMap.Feature.Vector(geometry,null,style);
    tfVector = new SuperMap.Feature.Theme.Vector(feature, themeLayer, style, options);
    equal(tfVector.shapes[0].refDataID, feature.id, "refDataID");

    // MultiPolygon
    geometry = new SuperMap.Geometry.MultiPolygon([
        new SuperMap.Geometry.Polygon([new SuperMap.Geometry.LinearRing(points)]),
        new SuperMap.Geometry.Polygon([new SuperMap.Geometry.LinearRing(points2)])
    ]);
    feature = new SuperMap.Feature.Vector(geometry,null,style);
    tfVector = new SuperMap.Feature.Theme.Vector(feature, themeLayer, style, options);
    equal(tfVector.shapes[0].refDataID, feature.id, "refDataID");

    // Polygon
    geometry = new SuperMap.Geometry.Polygon([new SuperMap.Geometry.LinearRing(points)]);
    feature = new SuperMap.Feature.Vector(geometry,null,style);
    tfVector = new SuperMap.Feature.Theme.Vector(feature, themeLayer, style, options);
    equal(tfVector.shapes[0].refDataID, feature.id, "refDataID");

    // Point
    geometry = point;
    feature = new SuperMap.Feature.Vector(geometry,null,style);
    tfVector = new SuperMap.Feature.Theme.Vector(feature, themeLayer, style, options);
    equal(tfVector.shapes[0].refDataID, feature.id, "refDataID");

    // Rectangle
    geometry = new SuperMap.Geometry.Rectangle(-20, 32, 10, 20);
    feature = new SuperMap.Feature.Vector(geometry,null,style);
    tfVector = new SuperMap.Feature.Theme.Vector(feature, themeLayer, style, options);
    equal(tfVector.shapes[0].refDataID, feature.id, "refDataID");

    // GeoText
    geometry = new SuperMap.Geometry.GeoText(20, 32, "text");
    feature = new SuperMap.Feature.Vector(geometry,null,style);
    tfVector = new SuperMap.Feature.Theme.Vector(feature, themeLayer, style, options);
    equal(tfVector.shapes[0].refDataID, feature.id, "refDataID");

    equal(tfVector.CLASS_NAME, "SuperMap.Feature.Theme.Vector", "SuperMap.Feature.Theme.Vector");

    tfVector.destroy();
    themeLayer.destroy();
    map.destroy();
});
test("testTheme_Vector_destroy",function(){
    expect(9);
    var themeLayer = new SuperMap.Layer.CustomVector("Theme",{isBaseLayer: true});
    var map = new SuperMap.Map({
        div: "map",
        layers: [themeLayer],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });

    var style = {
        fill: true,
        fillColor: "#FF0000",
        stroke: true,
        strokeColor:"#339933",
        strokeOpacity:1,
        strokeWidth:2,
        pointRadius:6
    };
    var options = {
        nodesClipPixel: 2,
        isHoverAble: true,
        isMultiHover: true,
        isClickAble: true,
        highlightStyle: {
            stroke: true,
            strokeWidth: 4,
            fillColor: "#ffff00"
        }
    };
    var tfVector, geometry, feature;

    // Point
    geometry = new SuperMap.Geometry.Point(11, 45);;
    feature = new SuperMap.Feature.Vector(geometry,null,style);
    tfVector = new SuperMap.Feature.Theme.Vector(feature, themeLayer, style, options);
    equal(tfVector.shapes[0].refDataID, feature.id, "refDataID");

    tfVector.destroy();;

    equal(tfVector.style, null, "style");
    equal(tfVector.dataBounds, null, "dataBounds");
    equal(tfVector.nodesClipPixel, null, "nodesClipPixel");
    equal(tfVector.isHoverAble, null, "isHoverAble");
    equal(tfVector.isMultiHover, null, "isMultiHover");
    equal(tfVector.isClickAble, null, "isClickAble");
    equal(tfVector.highlightStyle, null, "highlightStyle");
    equal(tfVector.shapeOptions, null, "shapeOptions");

    themeLayer.destroy();
    map.destroy();
});
test("testTheme_Vector_getShapesCount",function(){
    expect(1);
    var themeLayer = new SuperMap.Layer.CustomVector("Theme",{isBaseLayer: true});
    var map = new SuperMap.Map({
        div: "map",
        layers: [themeLayer],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });

    var style = {
        fill: true,
        fillColor: "#FF0000",
        stroke: true,
        strokeColor:"#339933",
        strokeOpacity:1,
        strokeWidth:2,
        pointRadius:6
    };
    var options = {
        nodesClipPixel: 2,
        isHoverAble: true,
        isMultiHover: true,
        isClickAble: true,
        highlightStyle: {
            stroke: true,
            strokeWidth: 4,
            fillColor: "#ffff00"
        }
    };
    var tfVector, geometry, feature;

    // Point
    geometry = new SuperMap.Geometry.Point(11, 45);;
    feature = new SuperMap.Feature.Vector(geometry,null,style);
    tfVector = new SuperMap.Feature.Theme.Vector(feature, themeLayer, style, options);

    equal(tfVector.getShapesCount(), 1, "getShapesCount")

    themeLayer.destroy();
    map.destroy();
});
