module("ThemeLabelLayer");
var name = "themeLabel name";

function featureToArray(features) {
    var array = [];
    for(var feature in features) {
        if(features.hasOwnProperty(feature)){
            array.push(features[feature]);
        }
    }
    return array;
}

test("test_Layer_ThemeLabel_constructor", function () {
    var options = {renderers : ["Canvas2"]},
        layer = new SuperMap.Layer.ThemeLabel(name, options);
    var browser = SuperMap.Util.getBrowser();
    if(browser.name="msie"&&parseInt(browser.version)<=8){
        expect(3);
    }
    else{
        expect(5);
        equals(layer.useCanvas2, true, "layer use canvas renderer");         //测试服务器的浏览器为ie8
        ok(layer.renderer, "layer has a renderer when providing a renderes array")
    }
    ok(layer instanceof SuperMap.Layer.ThemeLabel, "layer instanceof SuperMap.Layer.ThemeLabel");
    equals(layer.name, name, "ThemeLabel");
    equals(layer.CLASS_NAME, "SuperMap.Layer.ThemeLabel", "CLASS_NAME");

    layer.destroy();
});

test("test_Layer_ThemeLabel_addFeatures", function () {
    expect(11);
    var layer = new SuperMap.Layer.ThemeLabel(name, {isBaseLayer: true});

    var geotext = new SuperMap.Geometry.GeoText(-111.04, 45.68, "ThemeLabel_Test_addFeatures");
    var geotextFeature = new SuperMap.Feature.Vector(geotext);
    var geotext2 = new SuperMap.Geometry.GeoText(100.04, -45.68, "ThemeLabel_Test_addFeatures");
    var geotextFeature2 = new SuperMap.Feature.Vector(geotext2);

    var geotext3 = new SuperMap.Geometry.GeoText(-111.04, 45.68, "ThemeLabel_Test_addFeatures");
    var geotextFeature3 = new SuperMap.Feature.Vector(geotext3);

    var map = new SuperMap.Map({
        div: "map",
        layers: [layer],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });

    //测试触发成功事件。
    layer.events.register('featuresadded', null, function(obj) {
        equals(obj.succeed, true, "测试添加成功时候的标识");
        layer.events.remove("featuresadded");
    });
    layer.addFeatures([geotextFeature]);
    equals(layer.labelFeatures[0].id, geotextFeature.id, "测试单一标签要素添加是否成功。");

    //测试removeAllFeatures()。
    layer.removeAllFeatures();
    equals(layer.labelFeatures.length, 0, "测试调用 removeAllFeatures 方法后，layer.labelFeatures 的长度是否为0。");
    equals(layer.features.length, 0, "测试调用 removeAllFeatures 方法后，layer.features 的长度是否为0。");

    // 测试添加多个标签要素是否成功
    layer.addFeatures([geotextFeature, geotextFeature2, geotextFeature3]);
    ok(layer.labelFeatures.length == 3 && layer.features.length > 0 , " 测试添加多个标签要素是否成功");
    ok( layer.labelFeatures[0].geometry.CLASS_NAME  == "SuperMap.Geometry.GeoText",  " 测试 labelFeatures 中要素的 geometry 是 SuperMap.Geometry.GeoText");
    ok( layer.features[0].geometry.CLASS_NAME  == "SuperMap.Geometry.Polygon",  " 测试 labelFeatures 中要素的 geometry 是 SuperMap.Geometry.Polygon");

    layer.removeAllFeatures();
    layer.addFeatures([geotextFeature, geotextFeature2]);
    ok(layer.labelFeatures.length == 2 &&  layer.features.length == 2, " 测试isOverLap为true时，不产生压盖的两个标签是否同时被添绘制。");

    layer.removeAllFeatures();
    layer.addFeatures([geotextFeature, geotextFeature3]);
    ok( layer.labelFeatures.length == 2 &&  layer.features.length == 1  && layer.features[0].id == geotextFeature.id,  " 测试isOverLap为true时，产生压盖的两个标签是否同只绘制第一个。");

    layer.removeAllFeatures();
    layer.isOverLap = false;
    layer.addFeatures([geotextFeature, geotextFeature3]);
    ok( layer.labelFeatures.length == 2 &&  layer.features.length == 2 && layer.features[0].id == geotextFeature.id && layer.features[1].id == geotextFeature3.id ,  " 测试isOverLap为false时，产生压盖的两个标签是否同时被添绘制。");

    layer.removeAllFeatures();
    layer.isOverLap = true;
    var point = new SuperMap.Geometry.Point(-111.04, 45.68);
    var pointFeature = new SuperMap.Feature.Vector(point);
    layer.addFeatures([pointFeature, geotextFeature]);
    ok( layer.labelFeatures.length == 1 &&  layer.features.length == 1 ,  " 测试添加非标签要素时，要素是否被过滤掉。");

    layer.destroy();
    map.destroy();
});

test("test_Layer_ThemeLabel_getFeaturesByAttribute", function () {
    expect(4);
    var layer = new SuperMap.Layer.ThemeLabel(name, {isBaseLayer: true});

    var map = new SuperMap.Map({
        div: "map",
        layers: [layer],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });

    // feature_1
    var geometry_1 = new SuperMap.Geometry.GeoText(-28.63, 53.64,  "ThemeLabel_Test_getFeaturesByAttribute");
    var attributes_1 = {
        humpty: 'dumpty',
        clazz: 1
    };
    var feature_1 = new SuperMap.Feature.Vector(geometry_1, attributes_1);
    feature_1.fid = 'f_01'; // to identify later

    // feature_2
    var geometry_2 = new SuperMap.Geometry.GeoText(-27.48, 53.05, "ThemeLabel_Test_getFeaturesByAttribute");
    var attributes_2 = {
        // this feature has attribute humpty === undefined
        clazz: '1'
    };
    var feature_2 = new SuperMap.Feature.Vector(geometry_2, attributes_2);
    feature_2.fid = 'f_02'; // to identify later

    // feature_3
    var geometry_3 = new SuperMap.Geometry.GeoText(-33.74, 50.3, "ThemeLabel_Test_getFeaturesByAttribute");
    var attributes_3 = {
        humpty: 'foobar',
        clazz: 1
    };
    var feature_3 = new SuperMap.Feature.Vector(geometry_3, attributes_3);
    feature_3.fid = 'f_03'; // to identify later

    equals(layer.getFeaturesByAttribute("clazz", "1").length, 0, "测试在没有添加标签要素时候使用这个方法");

    layer.addFeatures([feature_1, feature_2, feature_3]);

    equals(layer.getFeaturesByAttribute("humpty", "dumpty")[0].id, feature_1.id, "测试在添加三个标签要素后，查找属性名为humpty属性值为dumpty的标签要素");

    equals(layer.getFeaturesByAttribute("clazz", 1).length, 2, "测试查找属性名为：clazz，属性值为数字1的标签要素数目");

    equals(layer.getFeaturesByAttribute("clazz", '1').length, 1, "测试查找属性名为：clazz，属性值为字符1的标签要素数目");

    layer.destroy();
    map.destroy();
});

test("test_Layer_ThemeLabel_removeFeatures", function () {
    expect(9);

    var layer = new SuperMap.Layer.ThemeLabel(name, {isBaseLayer: true});
    var map = new SuperMap.Map({
        div: "map",
        layers: [layer],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });
    var log;

    var geotext1 = new SuperMap.Geometry.GeoText(-111.04, 45.68, "ThemeLabel_Test_removeFeatures");
    var geotextFeature1 = new SuperMap.Feature.Vector(geotext1);
    var geotext2 = new SuperMap.Geometry.GeoText(-111.14, 45.78, "ThemeLabel_Test_removeFeatures");
    var geotextFeature2 = new SuperMap.Feature.Vector(geotext2);

    layer.addFeatures([geotextFeature1, geotextFeature2]);
    layer.removeFeatures([geotextFeature1]);
    ok(layer.labelFeatures.length == 1, "测试是否从 labelFeature 对象中删除了一个标签要素。");
    equals(layer.labelFeatures[geotextFeature1.id], undefined, "测试从 labelFeature 对象中删除的一个标签要素是否是指定的标签要素。");

    layer.addFeatures([geotextFeature1.clone(), geotextFeature2.clone()]);
    layerFeatures = featureToArray(layer.labelFeatures);
    layer.selectedFeatures.push(layerFeatures[0]);
    layer.removeFeatures(layerFeatures[0]);
    equals(layer.selectedFeatures.length, 0, "测试删除一个 feature（标签要素） 的同时从selectfeature中删除。");

   layer.removeFeatures(layer.labelFeatures);
    equals(featureToArray(layer.features).length, 0,  "测试传入数据为layer.labelFeatures时候删除全部labelFeatures");

    log = [];
    layer.addFeatures([geotextFeature1, geotextFeature2]);
    layer.events.register("featuresremoved", null, function(obj) {
        log.push(obj);
    });
    layer.removeFeatures(layer.labelFeatures);
    equals(log.length, 1, "测试featuresremoved事件只被触发了一次");
    equals(log[0].features.length, 0, "测试在调用后删除失败的feature个数");
    equals(log[0].succeed, true, "测试在调用后返回的删除标识是否成功");
    layer.events.remove("featuresremoved");

    layer.events.register("featuresremoved", null, function(obj) {
        equals(obj.features[0].id, geotextFeature1.id,"测试在调用后删除失败的feature");
        equals(obj.succeed, false, "测试在调用后返回的删除标识是否成功");
        layer.events.remove("featuresremoved");
    });
    layer.removeFeatures(geotextFeature1);

    layer.destroy();
    map.destroy()
});

test("test_Layer_Vector_destroy", function () {
    expect(2);

    var layer = new SuperMap.Layer.ThemeLabel('layer1');
    var map = new SuperMap.Map('map');
    map.addLayer(layer);
    layer.destroy();
    equals(layer.map, null, "layer.map is null after destroy");

    try {
        layer.destroy();
        layer.destroy();
        ok(true, "layer.destroy called twice without any issues");
    } catch(err) {
        fail("calling layer.destroy twice triggers exception: " + err + " in " + err.fileName + " line " + err.lineNumber);
    }
    map.destroy();
});

test("test_Layer_ThemeLabel_clone", function () {
    expect(5);
    var original = new SuperMap.Layer.ThemeLabel(name, {dummyOption: "foo", isBaseLayer:true});
    var map = new SuperMap.Map({
        div: "map",
        layers: [original],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });
    original.addFeatures([new SuperMap.Feature.Vector(new SuperMap.Geometry.GeoText(1,2,"test_clone"), {foo: "bar"})]);
    var clone = original.clone();
    ok(clone instanceof SuperMap.Layer.ThemeLabel, "clone is an instance of SuperMap.Layer.ThemeLabel");
    ok(clone.name, original.name, "clone has the same name as the original");
    ok(featureToArray(clone.labelFeatures)[0] != featureToArray(original.labelFeatures)[0], "clone's labelFeatures equal the original's labelFeatures");
    equals(featureToArray(clone.labelFeatures)[0].attributes.foo, featureToArray(original.labelFeatures)[0].attributes.foo,
        "clone's feature has the same attributes as the original's feature");
    equals(clone.dummyOption, original.dummyOption, "clone's dummyOption equals the original's dummy option");
    original.destroy();
    clone.destroy();
    map.destroy()
});

test("test_Layer_ThemeLabel_getFeaturesBy", function () {
    expect(2);
    var layer = new SuperMap.Layer.Vector(name, {isBaseLayer: true});
    var map = new SuperMap.Map({
        div: "map",
        layers: [layer],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });

    // feature_1
    var geometry_1 = new SuperMap.Geometry.GeoText(-28.63, 53.64, "ThemeLabel_Test_getFeaturesBy");
    var attributes_1 = {
        humpty: 'dumpty',
        clazz: 1
    };
    var feature_1 = new SuperMap.Feature.Vector(geometry_1, attributes_1);
    feature_1.fid = 'f_01'; // to identify later

    // feature_3
    var geometry_3 = new SuperMap.Geometry.GeoText(-33.74, 50.3, "ThemeLabel_Test_getFeaturesBy");
    var attributes_3 = {
        humpty: 'foobar',
        clazz: 1
    };
    var feature_3 = new SuperMap.Feature.Vector(geometry_3, attributes_3);
    feature_3.fid = 'f_03'; // to identify later

    equals(layer.getFeatureBy("fid", "f_01"), null, "测试在没有添加标签要素时候使用这个方法");

    layer.addFeatures([feature_1, feature_3]);
    equals(layer.getFeatureBy("fid", "f_01").id, feature_1.id, "测试在添加两个标签要素后，查找属性名为fid属性值为f_01的标签要素");

    layer.destroy();
    map.destroy();
});

