module("GraphLayer-ctl");
var name = "Graph layer";

test("TestGraph_constructor",function () {
    expect(5);
    var themeLayer = new SuperMap.Layer.Graph(name, "Bar");

    ok(themeLayer instanceof SuperMap.Layer.Graph, "layer instanceof SuperMap.Layer.Graph");
    equals(themeLayer.name, name , "the name of test");
    equals(themeLayer.CLASS_NAME, "SuperMap.Layer.Graph", "CLASS_NAME");
    equals(themeLayer.features.length, 0, "default_features");
    equals(themeLayer.isBaseLayer, false, "default_isBaseLayer");
    themeLayer.destroy();
});


test("TestGraph_addFeatures", function () {
    expect(3);
    var themeLayer = new SuperMap.Layer.Graph(name, "Bar");
    var point = new SuperMap.Geometry.Point(-111.04, 45.68);
    var pointFeature = new SuperMap.Feature.Vector(point);
    var point2 = new SuperMap.Geometry.Point(-100.04, 45.68);
    var pointFeature2 = new SuperMap.Feature.Vector(point2);
    themeLayer.addFeatures(pointFeature);
    equals(themeLayer.features[0].id, pointFeature.id, "测试单一feature添加是否成功。");

    themeLayer.removeAllFeatures();
    themeLayer.addFeatures([pointFeature, pointFeature2]);
    equals(themeLayer.features[0].id, pointFeature.id, "测试数组feature添加是否成功。");
    equals(themeLayer.features[1].id, pointFeature2.id, "测试数组feature添加是否成功。");
    themeLayer.destroy();
});


test("TestGraph_Clear", function () {
    expect(3);
    var themeLayer = new SuperMap.Layer.Graph(name, "Bar");
    var point = new SuperMap.Geometry.Point(-111.04, 45.68);
    var pointFeature = new SuperMap.Feature.Vector(point);
    var point2 = new SuperMap.Geometry.Point(-100.04, 45.68);
    var pointFeature2 = new SuperMap.Feature.Vector(point2);

    equals(themeLayer.features.length, 0, "测试数据添加前数组features长度是否为空。");
    themeLayer.addFeatures([pointFeature, pointFeature2]);
    equals(themeLayer.features.length, 2, "测试数据添加后数组features长度是否为 2。");
    themeLayer.clear();
    equals(themeLayer.features.length, 0, "测试 clear() 后数组features长度是否为 0。");
    themeLayer.destroy();
});


test("TestGraph_destroy", function () {
    expect(6);
    var themeLayer = new SuperMap.Layer.Graph(name, "Bar");
    var point = new SuperMap.Geometry.Point(-111.04, 45.68);
    var pointFeature = new SuperMap.Feature.Vector(point);
    var point2 = new SuperMap.Geometry.Point(-100.04, 45.68);
    var pointFeature2 = new SuperMap.Feature.Vector(point2);
    themeLayer.addFeatures([pointFeature, pointFeature2]);

    themeLayer.destroy();

    equals(themeLayer.chartsType, null, "测试 destroy 后 chartsType 为 null");
    equals(themeLayer.chartsSetting, null, "测试 destroy 后 chartsSetting 为 null");
    equals(themeLayer.themeFields, null, "测试 destroy 后 themeFields 为 null");
    equals(themeLayer.charts, null, "测试 destroy 后 charts 为 null");
    equals(themeLayer.cache, null, "测试 destroy 后 cache 为 null");
    equals(themeLayer.features, null, "测试 destroy 后 cache 为 null");
});


test("TestGraph_getFeaturesBy", function () {
    expect(2);
    var themeLayer = new SuperMap.Layer.Graph(name, "Bar");

    // feature_1
    var geometry_1 = new SuperMap.Geometry.Point(-28.63, 153.64);
    var attributes_1 = {
        humpty: 'dumpty',
        clazz: 1
    };
    var feature_1 = new SuperMap.Feature.Vector(geometry_1, attributes_1);
    feature_1.fid = 'f_01'; // to identify later

    // feature_3
    var geometry_3 = new SuperMap.Geometry.Point(-33.74, 150.3);
    var attributes_3 = {
        humpty: 'foobar',
        clazz: 1
    };

    var feature_3 = new SuperMap.Feature.Vector(geometry_3, attributes_3);
    feature_3.fid = 'f_03'; // to identify later

    equals(themeLayer.getFeatureBy("fid", "f_01"), null, "测试在没有添加feature时候使用这个方法");
    themeLayer.addFeatures([feature_1, feature_3]);
    equals(themeLayer.getFeatureBy("fid", "f_01").id, feature_1.id,"测试在添加三个feature后，查找属性名为fid属性值为f_01的feature");
});



test("TestGraph_getFeaturesById", function () {
    expect(2);

    var themeLayer = new SuperMap.Layer.Graph(name, "Bar");

    var point1 = new SuperMap.Geometry.Point(-111.04, 45.68);
    var pointFeature1 = new SuperMap.Feature.Vector(point1);
    var point2 = new SuperMap.Geometry.Point(-111.14, 45.78);
    var pointFeature2 = new SuperMap.Feature.Vector(point2);

    equals(themeLayer.getFeatureById(pointFeature1.id),null,
        "测试在没有添加feature时候使用这个方法");
    themeLayer.addFeatures([pointFeature1, pointFeature2]);
    equals(themeLayer.getFeatureById(pointFeature1.id),pointFeature1,
        "测试在添加2个feature后，查找属性名为id值为1的feature");
});


test("TestGraph_getFeaturesByAttribute", function () {
    expect(4);
    var themeLayer = new SuperMap.Layer.Graph(name, "Bar");

    // feature_1
    var geometry_1 = new SuperMap.Geometry.Point(-28.63, 153.64);
    var attributes_1 = {
        humpty: 'dumpty',
        clazz: 1
    };
    var feature_1 = new SuperMap.Feature.Vector(geometry_1, attributes_1);
    feature_1.fid = 'f_01'; // to identify later

    // feature_2
    var geometry_2 = new SuperMap.Geometry.Point(-27.48, 153.05);
    var attributes_2 = {
        // this feature has attribute humpty === undefined
        clazz: '1'
    };
    var feature_2 = new SuperMap.Feature.Vector(geometry_2, attributes_2);
    feature_2.fid = 'f_02'; // to identify later

    // feature_3
    var geometry_3 = new SuperMap.Geometry.Point(-33.74, 150.3);
    var attributes_3 = {
        humpty: 'foobar',
        clazz: 1
    };
    var feature_3 = new SuperMap.Feature.Vector(geometry_3, attributes_3);
    feature_3.fid = 'f_03'; // to identify later

    equals(themeLayer.getFeaturesByAttribute("clazz", "1").length, 0,
        "测试在没有添加feature时候使用这个方法");
    themeLayer.addFeatures([feature_1, feature_2, feature_3]);
    equals(themeLayer.getFeaturesByAttribute("humpty", "dumpty")[0].id, feature_1.id,
        "测试在添加三个feature后，查找属性名为humpty属性值为dumpty的feature");
    equals(themeLayer.getFeaturesByAttribute("clazz", 1).length, 2,
        "测试查找属性名为：clazz，属性值为数字1的feature数目");
    equals(themeLayer.getFeaturesByAttribute("clazz", '1').length, 1,
        "测试查找属性名为：clazz，属性值为字符1的feature数目");
});


test("TestGraph_redraw", function () {
    expect(2);

    var themeLayer = new SuperMap.Layer.Graph(name, "Bar");
    var point1 = new SuperMap.Geometry.Point(-111.04, 45.68);
    var pointFeature1 = new SuperMap.Feature.Vector(point1);
    var point2 = new SuperMap.Geometry.Point(-111.14, 45.78);
    var pointFeature2 = new SuperMap.Feature.Vector(point2);

    // 1 test
    themeLayer.addFeatures([pointFeature1, pointFeature2]);
    ok(!themeLayer.redraw(), "图层未添加到map，测试 redraw 返回值为 false");

    var themeLayer = new SuperMap.Layer.Graph(name, "Bar", {isBaseLayer: true});
    var map = new SuperMap.Map({
        div: "map",
        layers: [themeLayer],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });
    ok(themeLayer.redraw(), "图层添加到map，测试 redraw 返回值为 true");

    themeLayer.destroy();
    map.destroy();
});


test("TestGraph_removeAllFeatures", function () {
    expect(2);

    var themeLayer = new SuperMap.Layer.Graph(name, "Bar");

    var point1 = new SuperMap.Geometry.Point(-111.04, 45.68);
    var pointFeature1 = new SuperMap.Feature.Vector(point1);
    var point2 = new SuperMap.Geometry.Point(-111.14, 45.78);
    var pointFeature2 = new SuperMap.Feature.Vector(point2);

    // 1 test
    themeLayer.addFeatures([pointFeature1, pointFeature2]);
    equals(themeLayer.features.length,2,"测试removeAllFeatures前features长度为2");
    themeLayer.removeAllFeatures([pointFeature1]);
    equals(themeLayer.features.length,0,"测试removeAllFeatures后删除全部feature，features长度为0");

    themeLayer.destroy();
});


test("TestGraph_removeFeatures", function () {
    expect(2);

    var themeLayer = new SuperMap.Layer.Graph(name, "Bar");

    var point1 = new SuperMap.Geometry.Point(-111.04, 45.68);
    var pointFeature1 = new SuperMap.Feature.Vector(point1);
    var point2 = new SuperMap.Geometry.Point(-111.14, 45.78);
    var pointFeature2 = new SuperMap.Feature.Vector(point2);

    // 1 test
    themeLayer.addFeatures([pointFeature1, pointFeature2]);
    themeLayer.removeFeatures([pointFeature1]);
    equals(themeLayer.features.length, 1, "从feature对象中删除一个feature。");
    themeLayer.removeFeatures(themeLayer.features);
    // 1 test
    equals(themeLayer.features.length,0,"测试传入数据为layer.features时候删除全部feature");

    themeLayer.destroy();
});

test("TestGraph_setOpacity",function(){
    expect(1);

    var themeLayer = new SuperMap.Layer.Graph(name, "Bar");
    var point1 = new SuperMap.Geometry.Point(-111.04, 45.68);
    var pointFeature = new SuperMap.Feature.Vector(point1);

    themeLayer.addFeatures(pointFeature);
    themeLayer.setOpacity(0.6);
    equals(themeLayer.div.style.opacity,"0.6","测试themelayer图层的不透明度是否成功");
    themeLayer.destroy();
});


test("TestGraph_setChartsType",function(){
    expect(2);

    var themeLayer = new SuperMap.Layer.Graph(name, "Bar", {isBaseLayer: true});
    // feature_1
    var geometry_1 = new SuperMap.Geometry.Point(0, 0);
    var attributes_1 = {
        humpty: 10
    };
    var feature_1 = new SuperMap.Feature.Vector(geometry_1, attributes_1);

    var map = new SuperMap.Map({
        div: "map",
        layers: [themeLayer],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });

    themeLayer.themeFields = ["humpty"];
    themeLayer.chartsSetting.width = 100;
    themeLayer.chartsSetting.height = 50;
    themeLayer.chartsSetting.codomain = [0, 50];

    themeLayer.addFeatures([feature_1]);
    equals(themeLayer.chartsType, "Bar", "初始化时的图表类型 Bar");
    themeLayer.setChartsType("Pie");
    equals(themeLayer.chartsType, "Pie", "调用 setChartsType 将图表类型设为 Pie");
    themeLayer.destroy();
    map.destroy();
});


test("TestGraph_removeFeatures", function () {
    expect(2);

    var themeLayer = new SuperMap.Layer.Graph(name, "Bar");

    var point1 = new SuperMap.Geometry.Point(-111.04, 45.68);
    var pointFeature1 = new SuperMap.Feature.Vector(point1);
    var point2 = new SuperMap.Geometry.Point(-111.14, 45.78);
    var pointFeature2 = new SuperMap.Feature.Vector(point2);

    // 1 test
    themeLayer.addFeatures([pointFeature1, pointFeature2]);
    themeLayer.removeFeatures([pointFeature1]);
    equals(themeLayer.features.length, 1, "从feature对象中删除一个feature。");
    themeLayer.removeFeatures(themeLayer.features);
    // 1 test
    equals(themeLayer.features.length,0,"测试传入数据为layer.features时候删除全部feature");

    themeLayer.destroy();
});
/*
// 具体图表类型已移出产品库， chartsSetting 不可用
test("TestGraph_chartsSetting",function () {
    expect(13);

    var themeLayer = new SuperMap.Layer.Graph(name, "Bar", {isBaseLayer: true});
    // feature_1
    var geometry_1 = new SuperMap.Geometry.Point(0, 0);
    var attributes_1 = {
        humpty: 10
    };
    var feature_1 = new SuperMap.Feature.Vector(geometry_1, attributes_1);

    // feature_2
    var geometry_2 = new SuperMap.Geometry.Point(50,50);
    var attributes_2 = {
        humpty: 20
    };
    var feature_2 = new SuperMap.Feature.Vector(geometry_2, attributes_2);

    // feature_3
    var geometry_3 = new SuperMap.Geometry.Point(-50, -50);
    var attributes_3 = {
        humpty: 30
    };
    var feature_3 = new SuperMap.Feature.Vector(geometry_3, attributes_3);

    var map = new SuperMap.Map({
        div: "map",
        layers: [themeLayer],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });

    themeLayer.themeFields = ["humpty"];
    themeLayer.chartsSetting.width = 100;
    themeLayer.chartsSetting.height = 50;
    themeLayer.chartsSetting.codomain = [0, 50];

    themeLayer.addFeatures([feature_1,feature_2,feature_3]);

    equals(themeLayer.charts.length,3,"测试创建的图表长度是否为3");

    // 使用try查错
    var isAllSuccess = true;
    try{

        themeLayer.chartsSetting.YOffset = 100;
        themeLayer.chartsSetting.XOffset = 100;
        ok(themeLayer.redraw(), "配置修改后重绘是否成功");

        themeLayer.chartsSetting.YOffset = 0;
        themeLayer.chartsSetting.XOffset = 0;
        themeLayer.chartsSetting.useAxis = false;
        ok(themeLayer.redraw(), "配置修改后重绘是否成功");

        themeLayer.chartsSetting.useAxis = true;
        themeLayer.chartsSetting.decimalNumber = 2;
        themeLayer.chartsSetting.axisYTick = 4;
        themeLayer.chartsSetting.axisUseArrow = true;
        ok(themeLayer.redraw(), "配置修改后重绘是否成功");
        themeLayer.chartsSetting.axisUseArrow = false;
        themeLayer.chartsSetting.useXReferenceLine = true;
        ok(themeLayer.redraw(), "配置修改后重绘是否成功");
        themeLayer.chartsSetting.useXReferenceLine = false;
        themeLayer.chartsSetting.axisXBlank = [10, 5, 10];
        themeLayer.chartsSetting.axisYLabelsOffset = [-5, 0];
        themeLayer.chartsSetting.axisXLabelsOffset = [10, 5];
        themeLayer.chartsSetting.xReferenceLineStyle = {
            stroke: true,
            strokeWidth: 2,
            strokeColor: '#000F4F'
        };
        themeLayer.chartsSetting.axisStyle = {
            stroke: true,
            strokeWidth: 2,
            strokeColor: '#FF0000'
        };

        themeLayer.chartsSetting.axisYLabels = ["50", "25", "0"];
        themeLayer.chartsSetting.axisXLabels = ["NUM"];
        themeLayer.chartsSetting.axisYLabelsStyle = {
            labelRotation: 50,
            textAlign: "right",    // "left", "right", "center"。
            textBaseline: "middle",           // "top", "bottom", "middle",
            fillColor: "#FFF00F"
        };

        themeLayer.chartsSetting.axisXLabelsStyle = {
            fillColor: "#FFF00F"
        };
        ok(themeLayer.redraw(), "配置修改后重绘是否成功");

        themeLayer.chartsSetting.dataViewBoxParameter = [2,2,2,2];
        ok(themeLayer.redraw(), "配置修改后重绘是否成功");
        themeLayer.chartsSetting.useDefaultDVBParameter = false;
        ok(themeLayer.redraw(), "配置修改后重绘是否成功");
        themeLayer.chartsSetting.useDefaultDVBParameter = true;
        ok(themeLayer.redraw(), "配置修改后重绘是否成功");

        themeLayer.chartsSetting.useBackground = false;
        ok(themeLayer.redraw(), "配置修改后重绘是否成功");

        themeLayer.chartsSetting.useBackground = true;
        themeLayer.chartsSetting.backgroundStyle = {
            fillColor: "#000ff0"
        };
        themeLayer.chartsSetting.backgroundRadius = [5, 5, 5, 5];
        ok(themeLayer.redraw(), "配置修改后重绘是否成功");

        themeLayer.chartsSetting.dataHoverStyle = {
            stroke: true,
            fill: false,
            fillColor: "red",
            strokeLinecap: "round",   //“butt", "round", "square";
            strokeLineJoin: "round",   // "miter", "round", "bevel"; 默认为"round"。
            strokeColor: '#FF00FF',
            strokeDashstyle: "solid",  // dot, dash, dashot, longdash, longdashdot, solid         solid", "dashed", "dotted"
            strokeDashstyle: "solid",  // dot,dash,dashot,longdash,longdashdot,solid         solid", "dashed", "dotted"
            lineWidth: 4
        };

        themeLayer.chartsSetting.dataStyle = {
            stroke: true,
            fill: true,
            fillColor: "red",
            strokeLinecap: "round",   //“butt", "round", "square";
            strokeLineJoin: "round",   // "miter", "round", "bevel"; 默认为"round"。
            strokeColor: '#FF00FF',
            strokeDashstyle: "solid",  // dot, dash, dashot, longdash, longdashdot, solid         solid", "dashed", "dotted"
            strokeDashstyle: "solid",  // dot,dash,dashot,longdash,longdashdot,solid         solid", "dashed", "dotted"
            lineWidth: 2
        };

        themeLayer.chartsSetting.dataStyleByFields = [
            {
                fillColor: "yellow"
            },
            {
                fillColor: "blue"
            },
            {
                fillColor: "blue"
            }
        ];

        themeLayer.chartsSetting.dataStyleByCodomain = [
            {
                start: 15,
                end: 25,
                style:{
                    fillColor: "#00FF00"
                }
            }
        ];
        ok(themeLayer.redraw(), "配置修改后重绘是否成功");

    }catch(e){
        isAllSuccess = false;
    }

    ok(isAllSuccess, "测试配置项修改，重绘过程中是否完全通过");
    themeLayer.destroy();
    map.destroy();
});*/
