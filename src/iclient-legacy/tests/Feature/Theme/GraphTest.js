module("Feature_Theme_Graph");
test("testGraph_constructorDefault",function(){
    expect(7);
    var poi = [0, 0];
    var point1 = new SuperMap.Geometry.Point(poi[0], poi[1]);
    var feature = new SuperMap.Feature.Vector(point1, {
        attr1: 10,
        attr2: 15
    });

    var themeLayer = new SuperMap.Layer.Graph(name, "Bar", {isBaseLayer: true});
    themeLayer.addFeatures([feature]);
    var map = new SuperMap.Map({
        div: "map",
        layers: [themeLayer],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });

    var setting = {
        // width，height，codomain 分别表示图表宽、高、数据值域；此三项参数为必设参数
        width: 160,
        height: 100,
        codomain: [0, 30],
        barStyle: {  fillOpacity: 0.7  },
        barStyleByFields: [{ fillColor: "#FFB980" }, { fillColor: "#5AB1EF" }],
        barHoverStyle: {fillOpacity: 1 },
        xShapeBlank: [10, 10, 10],
        axisYTick: 2,
        axisYLabels: ["30", "15", "0"],
        axisXLabels: ["attr1", "attr2"],
        backgroundRadius: [5, 5, 5, 5]         // 背景框圆角参数
    };
    var theme = new SuperMap.Feature.Theme.Graph(feature, themeLayer, ["attr1", "attr2"], setting);

    equal(theme.CLASS_NAME, "SuperMap.Feature.Theme.Graph","CLASS_NAME: SuperMap.Feature.Theme.Graph");
    equal(theme.shapeFactory.CLASS_NAME, "SuperMap.Feature.ShapeFactory","CLASS_NAME: SuperMap.Feature.ShapeFactory");
    equal(theme.lonlat.lon, poi[0], "theme.lonlat.lon");
    equal(theme.lonlat.lat, poi[1], "theme.lonlat.lat");
    same(theme.fields, ["attr1", "attr2"], "fields");
    theme.destroy();
    theme = null;

    var theme = new SuperMap.Feature.Theme.Graph(feature, themeLayer, ["attr1", "attr2"], setting, new SuperMap.LonLat(4, 4));
    equal(theme.lonlat.lon, 4, "theme.lonlat.lon");
    equal(theme.lonlat.lat, 4, "theme.lonlat.lat");

    theme.destroy();
    themeLayer.destroy();
    map.destroy();
});
test("testGraph_destroy",function(){
    expect(26);
    var poi = [0, 0];
    var point1 = new SuperMap.Geometry.Point(poi[0], poi[1]);
    var feature = new SuperMap.Feature.Vector(point1, {
        attr1: 10,
        attr2: 15
    });

    var themeLayer = new SuperMap.Layer.Graph(name, "Bar", {isBaseLayer: true});
    themeLayer.addFeatures([feature]);
    var map = new SuperMap.Map({
        div: "map",
        layers: [themeLayer],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });

    var setting = {
        // width，height，codomain 分别表示图表宽、高、数据值域；此三项参数为必设参数
        width: 160,
        height: 100,
        codomain: [0, 30],
        barStyle: {  fillOpacity: 0.7  },
        barStyleByFields: [{ fillColor: "#FFB980" }, { fillColor: "#5AB1EF" }],
        barHoverStyle: {fillOpacity: 1 },
        xShapeBlank: [10, 10, 10],
        axisYTick: 2,
        axisYLabels: ["30", "15", "0"],
        axisXLabels: ["attr1", "attr2"],
        backgroundRadius: [5, 5, 5, 5]         // 背景框圆角参数
    };
    var theme = new SuperMap.Feature.Theme.Graph(feature, themeLayer, ["attr1", "attr2"], setting);

    equal(theme.CLASS_NAME, "SuperMap.Feature.Theme.Graph","CLASS_NAME");
    equal(theme.lonlat.lon, poi[0], "theme.lonlat.lon");
    equal(theme.lonlat.lat, poi[1], "theme.lonlat.lat");
    same(theme.fields, ["attr1", "attr2"], "fields");

    theme.destroy();

    equal(theme.lonlat, null, "theme.lonlat.lon");
    same(theme.fields, null, "fields");

    equal(theme.shapeFactory, null, "shapeFactory");
    equal(theme.shapeParameters, null, "shapeParameters");
    equal(theme.width, null, "width");
    equal(theme.height, null, "height");
    equal(theme.origonPoint, null, "origonPoint");
    equal(theme.chartBox, null, "chartBox");
    equal(theme.dataViewBox, null, "dataViewBox");
    equal(theme.chartBounds, null, "chartBounds");
    equal(theme.DVBParameter, null, "DVBParameter");
    equal(theme.DVBOrigonPoint, null, "DVBOrigonPoint");
    equal(theme.DVBCenterPoint, null, "DVBCenterPoint");
    equal(theme.DVBWidth, null, "DVBWidth");
    equal(theme.DVBHeight, null, "DVBHeight");
    equal(theme.DVBCodomain, null, "DVBCodomain");
    equal(theme.DVBUnitValue, null, "DVBUnitValue");
    equal(theme.origonPointOffset, null, "origonPointOffset");
    equal(theme.XOffset, null, "XOffset");
    equal(theme.YOffset, null, "YOffset");
    equal(theme.dataValues, null, "dataValues");
    equal(theme.setting, null, "setting");

    themeLayer.destroy();
    map.destroy();
});
test("testGraph_initBaseParameter",function(){
    expect("15");

    var poi = [0, 0];
    var point1 = new SuperMap.Geometry.Point(poi[0], poi[1]);
    var feature = new SuperMap.Feature.Vector(point1, {
        attr1: 10,
        attr2: 15
    });

    var themeLayer = new SuperMap.Layer.Graph(name, "Bar", {isBaseLayer: true});
    themeLayer.addFeatures([feature]);
    var map = new SuperMap.Map({
        div: "map",
        layers: [themeLayer],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });

    var setting = {
        // width，height，codomain 分别表示图表宽、高、数据值域；此三项参数为必设参数
        width: 160,
        height: 100,
        codomain: [0, 30],
        barStyle: {  fillOpacity: 0.7  },
        barStyleByFields: [{ fillColor: "#FFB980" }, { fillColor: "#5AB1EF" }],
        barHoverStyle: {fillOpacity: 1 },
        xShapeBlank: [10, 10, 10],
        axisYTick: 2,
        axisYLabels: ["30", "15", "0"],
        axisXLabels: ["attr1", "attr2"],
        backgroundRadius: [5, 5, 5, 5]         // 背景框圆角参数
    };
    var theme = new SuperMap.Feature.Theme.Graph(feature, themeLayer, ["attr1", "attr2"], setting);
    theme.initBaseParameter();

    equal(theme.width, 160, "width");
    equal(theme.height, 100, "height");
    same(theme.origonPoint, [170, 200], "origonPoint");
    same(theme.chartBox, [170, 300, 330, 200], "chartBox");
    same(theme.dataViewBox, [170, 300, 330, 200], "dataViewBox");
    same(theme.DVBParameter, [0, 0, 0, 0], "DVBParameter");
    same(theme.DVBOrigonPoint, [170, 200], "DVBOrigonPoint");
    same(theme.DVBCenterPoint, [250, 250], "DVBCenterPoint");
    equal(theme.DVBWidth, 160, "DVBWidth");
    equal(theme.DVBHeight, 100, "DVBHeight");
    same(theme.DVBCodomain, [0, 30], "DVBCodomain");
    same(theme.origonPointOffset, [0, 0], "origonPointOffset");
    equal(theme.XOffset, 0, "XOffset");
    equal(theme.YOffset, 0, "YOffset");
    same(theme.dataValues, [10, 15], "dataValues");

    theme.destroy();
    themeLayer.destroy();
    map.destroy();
});
test("testGraph_shapesConvertToRelativeCoordinate",function(){
    function equalsArray(array1, array2){
        if(array1.length !== array2.length){
            return false;
        }

        for(var i = 0, len = array1.length; i < len; i++){
            var arry1i = array1[i];
            var arry2i = array2[i];

            if(arry1i[0] !== arry2i[0]){
                return false;
            }
            if(arry1i[1] !== arry2i[1]){
                return false;
            }
        }
        return true;
    }

    expect("3");

    var poi = [0, 0];
    var point1 = new SuperMap.Geometry.Point(poi[0], poi[1]);
    var feature = new SuperMap.Feature.Vector(point1, {
        attr1: 10,
        attr2: 15
    });

    var themeLayer = new SuperMap.Layer.Graph(name, "Bar", {isBaseLayer: true});
    themeLayer.addFeatures([feature]);
    var map = new SuperMap.Map({
        div: "map",
        layers: [themeLayer],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });

    var setting = {
        // width，height，codomain 分别表示图表宽、高、数据值域；此三项参数为必设参数
        width: 160,
        height: 100,
        codomain: [0, 30],
        barStyle: {  fillOpacity: 0.7  },
        barStyleByFields: [{ fillColor: "#FFB980" }, { fillColor: "#5AB1EF" }],
        barHoverStyle: {fillOpacity: 1 },
        xShapeBlank: [10, 10, 10],
        axisYTick: 2,
        axisYLabels: ["30", "15", "0"],
        axisXLabels: ["attr1", "attr2"],
        backgroundRadius: [5, 5, 5, 5]         // 背景框圆角参数
    };
    var theme = new SuperMap.Feature.Theme.Graph(feature, themeLayer, ["attr1", "attr2"], setting);
    theme.initBaseParameter();

    // 点
    var pointSP = new SuperMap.Feature.ShapeParameters.Point(0, 0);
    var pointShape = theme.shapeFactory.createShape(pointSP);
    theme.shapes.push(pointShape);

    // 线
    var lineSP = new SuperMap.Feature.ShapeParameters.Line([
        [0, 0],
        [15, 15],
        [30, 0]
    ]);
    var LineShape =  theme.shapeFactory.createShape(lineSP);
    theme.shapes.push(LineShape);

    theme.shapesConvertToRelativeCoordinate();

    same(theme.shapes[0].style.x, -250, "x");
    same(theme.shapes[0].style.y, -250, "y");
    ok(equalsArray(theme.shapes[1].style.pointList, [
        [-250, -250],
        [-235, -235],
        [-220, -250]
    ]), "pointList");

    theme.destroy();
    themeLayer.destroy();
    map.destroy();
});
test("testSuperMap.Feature.Theme.getDataValues",function(){
    expect("3");

    var poi = [0, 0];
    var point1 = new SuperMap.Geometry.Point(poi[0], poi[1]);
    var feature = new SuperMap.Feature.Vector(point1, {
        attr1: 10,
        attr2: 15
    });

    var v = SuperMap.Feature.Theme.getDataValues(feature, ["attr1"], 2);
    equal(v[0].toString(), "10.00", "attr1");

    var v = SuperMap.Feature.Theme.getDataValues(feature, ["attr1", "attr2"]);
    equal(v[0].toString(), "10", "attr1");
    equal(v[1].toString(), "15", "attr1");
});