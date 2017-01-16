module("GeoTextStrategy");
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

test("Test_GeoText_constructorDefault", function () {
    var strategy = new SuperMap.Strategy.GeoText(),
        options = {strategies : [strategy]},
        layer = new SuperMap.Layer.Vector(name, options);
    expect(4);
    ok(layer.strategies, "layer has strategies when providing a strategy array")
    ok(strategy instanceof SuperMap.Strategy.GeoText, "strategy instanceof SuperMap.Strategy.GeoText");
    equals(layer.name, name, "ThemeLabel");
    equals(strategy.CLASS_NAME, "SuperMap.Strategy.GeoText", "CLASS_NAME");

    layer.destroy();
});

test("testGeoText_clone",function(){
    expect(1);
    var geoText = new SuperMap.Strategy.GeoText();
    equal(geoText.clone().length,geoText.length,"clone");
});

test("test_Layer_Vector_addFeatures_with_Strategy_GeoText", function () {
    expect(10);
    var strategy = new SuperMap.Strategy.GeoText(),
        options = {strategies : [strategy], isBaseLayer: true},
        layer = new SuperMap.Layer.Vector(name, options);

    var geotext = new SuperMap.Geometry.GeoText(-111.04, 45.68, "Label");
    var geotextFeature = new SuperMap.Feature.Vector(geotext);
    var geotext2 = new SuperMap.Geometry.GeoText(100.04, -45.68, "Label");
    var geotextFeature2 = new SuperMap.Feature.Vector(geotext2);

    var geotext3 = new SuperMap.Geometry.GeoText(-111.04, 45.68, "Label");
    var geotextFeature3 = new SuperMap.Feature.Vector(geotext3);

    var point = new SuperMap.Geometry.Point(-111.04, 45.68);
    var pointFeature = new SuperMap.Feature.Vector(point);
    var point2 = new SuperMap.Geometry.Point(-100.04, 45.68);
    var pointFeature2 = new SuperMap.Feature.Vector(point2);

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
    equals(layer.features[0].id, geotextFeature.id, "测试单一标签要素添加是否成功。");

    //测试removeAllFeatures()。
    layer.removeAllFeatures();
    equals(layer.features.length, 0, "测试调用 removeAllFeatures 方法后，layer.features 的长度是否为0。");

    // 测试添加多个标签要素是否成功
    layer.addFeatures([geotextFeature, geotextFeature2, geotextFeature3, pointFeature, pointFeature2]);
    ok( layer.features.length == 5, " 测试同时添加多个标签要素和矢量要素是否成功");
    ok( layer.features[0].geometry.CLASS_NAME  == "SuperMap.Geometry.GeoText",  " 测试 features 中要素的 geometry 是 SuperMap.Geometry.GeoText");
    ok( layer.features[3].geometry.CLASS_NAME  == "SuperMap.Geometry.Point",  " 测试 features 中要素的 geometry 是 SuperMap.Geometry.Point");

    layer.removeAllFeatures();
    layer.addFeatures([geotextFeature, geotextFeature2]);
    ok(layer.features.length == 2 &&  strategy.viewLabels.length == 2, " 测试isOverLay为true时，不产生压盖的两个标签是否同时被添绘制。");

    layer.removeAllFeatures();
    layer.addFeatures([geotextFeature, geotextFeature3]);
    ok( layer.features.length == 2 &&  strategy.viewLabels.length == 1  && strategy.viewLabels[0].id == geotextFeature.id,  " 测试isOverLay为true时，产生压盖的两个标签是否同只绘制第一个。");

    layer.removeAllFeatures();
    strategy.isOverLay = false;
    layer.addFeatures([geotextFeature, geotextFeature3]);
    ok( layer.features.length == 2 &&  strategy.viewLabels.length == 2 && strategy.viewLabels[0].id == geotextFeature.id && strategy.viewLabels[1].id == geotextFeature3.id ,  " 测试isOverLay为false时，产生压盖的两个标签是否同时被添绘制。");

    layer.removeAllFeatures();
    strategy.isOverLay = true;
    layer.addFeatures([geotextFeature, pointFeature]);
    ok( layer.features.length == 2 &&  strategy.viewLabels.length == 1 ,  " 测试添加相同坐标的标签要素和矢量要素时，标签要素不被过滤掉。");

    layer.destroy();
    map.destroy();
});

test("test_Layer_Vector_getFeaturesByAttribute_with_Strategy_GeoText", function () {
    expect(4);
    var strategy = new SuperMap.Strategy.GeoText(),
        options = {strategies : [strategy], isBaseLayer: true},
        layer = new SuperMap.Layer.Vector(name, options);

    var map = new SuperMap.Map({
        div: "map",
        layers: [layer],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });

    // feature_1
    var geometry_1 = new SuperMap.Geometry.GeoText(-28.63, 53.64,  "Label");
    var attributes_1 = {
        humpty: 'dumpty',
        clazz: 1
    };
    var feature_1 = new SuperMap.Feature.Vector(geometry_1, attributes_1);
    feature_1.fid = 'f_01'; // to identify later

    // feature_2
    var geometry_2 = new SuperMap.Geometry.GeoText(-27.48, 53.05, "Label");
    var attributes_2 = {
        // this feature has attribute humpty === undefined
        clazz: '1'
    };
    var feature_2 = new SuperMap.Feature.Vector(geometry_2, attributes_2);
    feature_2.fid = 'f_02'; // to identify later

    // feature_3
    var geometry_3 = new SuperMap.Geometry.Point(-33.74, 50.3);
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

test("test_Layer_Vector_removeFeatures_with_Strategy_GeoText", function () {
    expect(9);

      var strategy = new SuperMap.Strategy.GeoText(),
        options = {strategies : [strategy], isBaseLayer: true},
        layer = new SuperMap.Layer.Vector(name, options);

    var map = new SuperMap.Map({
        div: "map",
        layers: [layer],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });
    var log;

    var geotext1 = new SuperMap.Geometry.GeoText(-111.04, 45.68, "Label");
    var geotextFeature1 = new SuperMap.Feature.Vector(geotext1);
    var geotext2 = new SuperMap.Geometry.GeoText(-111.14, 45.78, "Label");
    var geotextFeature2 = new SuperMap.Feature.Vector(geotext2);

    layer.addFeatures([geotextFeature1, geotextFeature2]);
    layer.removeFeatures([geotextFeature1]);
    ok(layer.features.length == 1, "测试是否从图层中删除了一个标签要素。");
    equals(layer.features[geotextFeature1.id], undefined, "测试从图层中删除的一个标签要素是否是指定的标签要素。");

    layer.addFeatures([geotextFeature1.clone(), geotextFeature2.clone()]);
    var features = featureToArray(layer.features);
    layer.selectedFeatures.push(features[0]);
    layer.removeFeatures(features[0]);
    equals(layer.selectedFeatures.length, 0, "测试删除一个 feature（标签要素） 的同时从selectfeature中删除。");

    layer.removeFeatures(layer.features);
    equals(featureToArray(layer.features).length, 0,  "测试传入数据为 layer.features 时候删除图层中的全部要素");

    log = [];
    layer.addFeatures([geotextFeature1, geotextFeature2]);
    layer.events.register("featuresremoved", null, function(obj) {
        log.push(obj);
    });
    layer.removeFeatures(layer.features);
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
    map.destroy();
});

 test("test_Layer_Vector_destroy_with_Strategy_GeoText", function () {
     expect(3);

     var strategy = new SuperMap.Strategy.GeoText(),
         options = {strategies : [strategy], isBaseLayer: true},
         layer = new SuperMap.Layer.Vector("layer1", options);

     var map = new SuperMap.Map('map');
     map.addLayer(layer);
     layer.destroy();
     equals(layer.map, null, "layer.map is null after destroy");
     equals(layer.strategies, null, "layer.strategies is null after destroy");

     try {
         layer.destroy();
         layer.destroy();
         ok(true, "layer.destroy called twice without any issues");
     } catch(err) {
         fail("calling layer.destroy twice triggers exception: " + err + " in " + err.fileName + " line " + err.lineNumber);
     }
     map.destroy();
 });

test("test_Layer_Vector_clone_with_Strategy_GeoText", function () {
    expect(6);
    var strategy = new SuperMap.Strategy.GeoText(),
        options = {dummyOption: "foo",strategies : [strategy], isBaseLayer: true},
        original = new SuperMap.Layer.Vector(name, options);
    var map = new SuperMap.Map({
        div: "map",
        layers: [original],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });
    original.addFeatures([new SuperMap.Feature.Vector(new SuperMap.Geometry.GeoText(1,2,"test_clone"), {foo: "bar"})]);
    var clone = original.clone();
    ok(clone instanceof SuperMap.Layer.Vector, "clone is an instance of SuperMap.Layer.Vector");
    ok(clone.name, original.name, "clone has the same name as the original");
    ok(featureToArray(clone.features)[0] != featureToArray(original.features)[0], "clone's features equal the original's features");
    equals(featureToArray(clone.features)[0].attributes.foo, featureToArray(original.features)[0].attributes.foo,
        "clone's feature has the same attributes as the original's feature");
    equals(clone.dummyOption, original.dummyOption, "clone's dummyOption equals the original's dummy option");
    equals(clone.strategies.length, original.strategies.length, "clone's strategies equals the original's strategies");

    original.destroy();
    clone.destroy();
    map.destroy();
});

test("test_Layer_Vector_getFeaturesBy_with_Strategy_GeoText", function () {
    expect(2);
    var strategy = new SuperMap.Strategy.GeoText(),
        options = {strategies : [strategy], isBaseLayer: true},
        layer = new SuperMap.Layer.Vector(name, options);

    var map = new SuperMap.Map({
        div: "map",
        layers: [layer],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });

    // feature_1
    var geometry_1 = new SuperMap.Geometry.GeoText(-28.63, 53.64, "Label");
    var attributes_1 = {
        humpty: 'dumpty',
        clazz: 1
    };
    var feature_1 = new SuperMap.Feature.Vector(geometry_1, attributes_1);
    feature_1.fid = 'f_01'; // to identify later

    // feature_3
    var geometry_3 = new SuperMap.Geometry.GeoText(-33.74, 50.3, "Label");
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

