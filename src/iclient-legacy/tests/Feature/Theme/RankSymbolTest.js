module("Feature_Theme_RankSymbol");
test("testRankSymbol_constructor", function () {
    expect(7);
    var poi = [0, 0];
    var point1 = new SuperMap.Geometry.Point(poi[0], poi[1]);
    var feature = new SuperMap.Feature.Vector(point1, {
        attr1: 10
    });

    var themeLayer = new SuperMap.Layer.RankSymbol(name, "Circle", {isBaseLayer: true});
    themeLayer.addFeatures([feature]);
    var map = new SuperMap.Map({
        div: "map",
        layers: [themeLayer],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });

    var setting = {
        //必设参数
        codomain: [0, 40000], // 允许图形展示的值域范围，此范围外的数据将不制作图图形

        //圆最大半径 默认100
        maxR: 100,
        //圆最小半径 默认0
        minR: 0,
        // 圆形样式
        circleStyle: { fillOpacity: 0.8 },
        // 符号专题图填充颜色
        fillColor: "#FFA500",
        // 专题图hover 样式
        circleHoverStyle: { fillOpacity: 1 }
    };
    var theme = new SuperMap.Feature.Theme.RankSymbol(feature, themeLayer, ["attr1"], setting);

    equal(theme.CLASS_NAME, "SuperMap.Feature.Theme.RankSymbol","CLASS_NAME: SuperMap.Feature.Theme.Graph");
    equal(theme.shapeFactory.CLASS_NAME, "SuperMap.Feature.ShapeFactory","CLASS_NAME: SuperMap.Feature.ShapeFactory");
    equal(theme.lonlat.lon, poi[0], "theme.lonlat.lon");
    equal(theme.lonlat.lat, poi[1], "theme.lonlat.lat");
    same(theme.fields, ["attr1"], "fields");
    theme.destroy();
    theme = null;

    var theme = new SuperMap.Feature.Theme.RankSymbol(feature, themeLayer, ["attr1"], setting, new SuperMap.LonLat(4, 4));
    equal(theme.lonlat.lon, 4, "theme.lonlat.lon");
    equal(theme.lonlat.lat, 4, "theme.lonlat.lat");

    theme.destroy();
    themeLayer.destroy();
    map.destroy();
});

test("TestRankSymbol_destroy", function () {
    expect(1);
    var poi = [0, 0];
    var point1 = new SuperMap.Geometry.Point(poi[0], poi[1]);
    var feature = new SuperMap.Feature.Vector(point1, {
        attr1: 10,
        attr2: 15
    });

    var themeLayer = new SuperMap.Layer.RankSymbol(name, "Circle", {isBaseLayer: true});
    themeLayer.addFeatures([feature]);
    var map = new SuperMap.Map({
        div: "map",
        layers: [themeLayer],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });

    var setting = {
        //必设参数
        codomain: [0, 40000], // 允许图形展示的值域范围，此范围外的数据将不制作图图形

        //圆最大半径 默认100
        maxR: 100,
        //圆最小半径 默认0
        minR: 0,
        // 圆形样式
        circleStyle: { fillOpacity: 0.8 },
        // 符号专题图填充颜色
        fillColor: "#FFA500",
        // 专题图hover 样式
        circleHoverStyle: { fillOpacity: 1 }
    };
    var theme = new SuperMap.Feature.Theme.RankSymbol(feature, themeLayer, ["attr1"], setting);

    theme.destroy();

    equals(theme.setting,null,"this setting value after themelayer destory");

    themeLayer.destroy();
    map.destroy();
});

test("TestRankSymbol_initBaseParameter", function () {
    expect(11);
    var poi = [0, 0];
    var point1 = new SuperMap.Geometry.Point(poi[0], poi[1]);
    var feature = new SuperMap.Feature.Vector(point1, {
        attr1: 10,
        attr2: 15
    });

    var themeLayer = new SuperMap.Layer.RankSymbol(name, "Circle", {isBaseLayer: true});
    themeLayer.addFeatures([feature]);
    var map = new SuperMap.Map({
        div: "map",
        layers: [themeLayer],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });

    var setting = {
        //必设参数
        codomain: [0, 40000], // 允许图形展示的值域范围，此范围外的数据将不制作图图形
        //圆最大半径 默认100
        maxR: 100,
        //圆最小半径 默认0
        minR: 0,
        // 圆形样式
        circleStyle: { fillOpacity: 0.8 },
        // 符号专题图填充颜色
        fillColor: "#FFA500",
        // 专题图hover 样式
        circleHoverStyle: { fillOpacity: 1 }
    };
    var theme = new SuperMap.Feature.Theme.RankSymbol(feature, themeLayer, ["attr1"], setting);
    var result = theme.initBaseParameter();

    equals(theme.width,null,"theme.width");
    equals(theme.height,null,"theme.width");
    same(theme.DVBParameter,[0,0,0,0],"theme.dataViewBox");
    same(theme.DVBCenterPoint,[],"theme.DVBCenterPoint");
    equals(theme.DVBHeight,null,"theme.DVBHeight");
    same(theme.DVBCodomain,[0,40000],"theme.DVBCodomain");
    same(theme.origonPointOffset,[],"theme.origonPointOffset");
    equals(theme.XOffset,0,"theme.XOffset");
    equals(theme.YOffset,0,"theme.YOffset");
    equals(theme.dataValues,null,"theme.dataValues");
    ok(!result,"after theme.initBaseParameter()");

    theme.destroy();
    themeLayer.destroy();
    map.destroy();
});
