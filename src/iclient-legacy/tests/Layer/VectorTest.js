module("VectorLayer");
var name = "vector name";

function featureToArray(features) {
    var array = [];
    for(var feature in features) {
        if(features.hasOwnProperty(feature)){
            array.push(features[feature]);
        }
    }
    return array;
}

test("TestVector_constructorDefault", function () {
    var options = {renderers : ["Canvas2"]},
        layer = new SuperMap.Layer.Vector(name, options);
    var browser = SuperMap.Util.getBrowser();
    if(browser.name="msie"&&parseInt(browser.version)<=8){
        expect(3);
    }
    else{
        expect(5);
        equals(layer.useCanvas2, true, "layer use canvas renderer");         //测试服务器的浏览器为ie8
        ok(layer.renderer, "layer has a renderer when providing a renderes array")
    }
    ok(layer instanceof SuperMap.Layer.Vector, "layer instanceof SuperMap.Layer.Vector");
    equals(layer.name, name, "VectorLayer");
    equals(layer.CLASS_NAME, "SuperMap.Layer.Vector", "CLASS_NAME");
});

test("test_Layer_Vector_addFeatures", function () {
    expect(7);
    var layer = new SuperMap.Layer.Vector(name, {isBaseLayer: true});
    var point = new SuperMap.Geometry.Point(-111.04, 45.68);
    var pointFeature = new SuperMap.Feature.Vector(point);
    var pointFeatureId = pointFeature.id;
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
    
    layer.addFeatures([pointFeature]);    
    equals(layer.features[0].id, pointFeature.id, "测试单一feature添加是否成功。");
    
    var extent = layer.getDataExtent();
    equals(extent.toBBOX(), "-111.04,45.68,-111.04,45.68", "测试获取layer范围是否成功");
    
    layer.removeAllFeatures();
    layer.addFeatures([pointFeature, pointFeature2]);
    equals(layer.features[0].id, pointFeature.id, "测试数组feature添加是否成功。");
    equals(layer.features[1].id, pointFeature2.id, "测试数组feature添加是否成功。");
    
    layer.removeAllFeatures();
    //测试添加feature失败触发失败事件。
    var pointFeature3 = new SuperMap.Feature.Vector();
    layer.events.register('featuresadded', null, function(obj) {
        equals(obj.succeed, false, "测试添加不成功时候的标识");
        equals(obj.features[0].id, pointFeature3.id, "测试添加不成功的feature数组");
        layer.events.destroy();
    });
    layer.addFeatures(pointFeature3);
});

test("test_Layer_Vector_getFeaturesByAttribute", function () {
    expect(4);
    var layer = new SuperMap.Layer.Vector(name, {isBaseLayer: true});
    
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
    
    equals(layer.getFeaturesByAttribute("clazz", "1").length, 0, "测试在没有添加feature时候使用这个方法");
    
    layer.addFeatures([feature_1, feature_2, feature_3]);
    equals(layer.getFeaturesByAttribute("humpty", "dumpty")[0].id, feature_1.id, "测试在添加三个feature后，查找属性名为humpty属性值为dumpty的feature");
    
    equals(layer.getFeaturesByAttribute("clazz", 1).length, 2, "测试查找属性名为：clazz，属性值为数字1的feature数目");

    equals(layer.getFeaturesByAttribute("clazz", '1').length, 1, "测试查找属性名为：clazz，属性值为字符1的feature数目");
    
});

test("test_Layer_Vector_removeFeatures", function () {
    expect(8);

    var layer = new SuperMap.Layer.Vector(name);
    var features, log;

    var point1 = new SuperMap.Geometry.Point(-111.04, 45.68);
    var pointFeature1 = new SuperMap.Feature.Vector(point1);
    var point2 = new SuperMap.Geometry.Point(-111.14, 45.78);
    var pointFeature2 = new SuperMap.Feature.Vector(point2);

    // 1 test
    layer.addFeatures([pointFeature1, pointFeature2]);
    features = layer.removeFeatures([pointFeature1]);
    equals(layer.features[pointFeature1.id], undefined, "从feature对象中删除一个feature。");

    // 1 test
    layer.addFeatures([pointFeature1.clone(), pointFeature2.clone()]);    
    layerFeatures = featureToArray(layer.features);
    layer.selectedFeatures.push(layerFeatures[0]); 
    layer.removeFeatures(layerFeatures[0]);
    equals(layer.selectedFeatures.length, 0, "测试删除一个feature的同时从selectfeature中删除。");

    // 1 test
    features = layer.removeFeatures(layer.features);
    equals(featureToArray(layer.features).length, 0,
         "测试传入数据为layer.features时候删除全部feature");

    // 4 tests
    log = [];
    layer.addFeatures([pointFeature1, pointFeature2]);
    layer.events.register("featuresremoved", null, function(obj) {
        log.push(obj);
    });
    layer.removeFeatures(layer.features);
    equals(log.length, 1,
         "测试featuresremoved事件只被触发了一次");
    equals(log[0].features.length, 0,
         "测试在调用后删除失败的feature个数");
    equals(log[0].succeed, true,
         "测试在调用后返回的删除标识是否成功");
    layer.events.remove("featuresremoved");
    
    // 3 test    
    layer.events.register("featuresremoved", null, function(obj) {
        equals(obj.features[0].id, pointFeature1.id,
            "测试在调用后删除失败的feature");
        equals(obj.succeed, false,
            "测试在调用后返回的删除标识是否成功");    
        layer.events.remove("featuresremoved");
    });
    layer.removeFeatures(pointFeature1);
});

test("test_Layer_Vector_destroy", function () {
    expect(2);    

    var layer = new SuperMap.Layer.Vector('layer1');
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

test("test_Layer_Vector_clone", function () {
    expect(5);
    var original = new SuperMap.Layer.Vector(name, {dummyOption: "foo"});
    original.addFeatures([new SuperMap.Feature.Vector(new SuperMap.Geometry.Point(1,2), {foo: "bar"})]);
    var clone = original.clone();
    ok(clone instanceof SuperMap.Layer.Vector, "clone is an instance of SuperMap.Layer.Vector");
    ok(clone.name, original.name, "clone has the same name as the original");
    ok(featureToArray(clone.features)[0] != featureToArray(original.features)[0], "clone's feature does not equal the original's feature");
    equals(featureToArray(clone.features)[0].attributes.foo, featureToArray(original.features)[0].attributes.foo, 
        "clone's feature has the same attributes as the original's feature");
    equals(clone.dummyOption, original.dummyOption, "clone's dummyOption equals the original's dummy option");
});

test("test_Layer_Vector_getFeaturesBy", function () {
    expect(2);
    var layer = new SuperMap.Layer.Vector(name, {isBaseLayer: true});
    
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
    
    equals(layer.getFeatureBy("fid", "f_01"), null, "测试在没有添加feature时候使用这个方法");
    
    layer.addFeatures([feature_1, feature_3]);
    equals(layer.getFeatureBy("fid", "f_01").id, feature_1.id, "测试在添加三个feature后，查找属性名为fid属性值为f_01的feature");
});

