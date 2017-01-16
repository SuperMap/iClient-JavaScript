module("CustomVectorLayer");
var name = "CustomVector layer";

test("TestCustomVector_constructor",function () {
    expect(6);
    var themeLayer = new SuperMap.Layer.CustomVector(name);

    ok(themeLayer instanceof SuperMap.Layer.Theme, "layer instanceof SuperMap.Layer.CustomVector");
    equals(themeLayer.name, name , "the name of test");
    equals(themeLayer.CLASS_NAME, "SuperMap.Layer.CustomVector", "CLASS_NAME");
    equals(themeLayer.features.length,0, "default_features");
    equals(themeLayer.isBaseLayer,false, "default_isBaseLayer");
    equals(themeLayer.isClickAble,true, "default_isClickAble");
    themeLayer.destroy();
});

asyncTest("TestCustomVector_addFeatures", function () {
    var themeLayer = new SuperMap.Layer.CustomVector(name, {isBaseLayer: true});
    var point = new SuperMap.Geometry.Point(-111.04, 45.68);
    var pointFeature = new SuperMap.Feature.Vector(point);
    var point2 = new SuperMap.Geometry.Point(-100.04, 45.68);
    var pointFeature2 = new SuperMap.Feature.Vector(point2);

    setTimeout(function () {
        try{
            themeLayer.addFeatures([pointFeature]);
            equals(themeLayer.features[0].id, pointFeature.id, "测试单一feature添加是否成功。");

            themeLayer.removeAllFeatures();
            themeLayer.addFeatures([pointFeature, pointFeature2]);
            equals(themeLayer.features[0].id, pointFeature.id, "测试数组feature添加是否成功。");
            equals(themeLayer.features[1].id, pointFeature2.id, "测试数组feature添加是否成功。");
            start();
        }
        catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    }, 2000)
});

test("TestCustomVector_getFeaturesByAttribute", function () {
    expect(4);
    var themeLayer = new SuperMap.Layer.CustomVector(name, {isBaseLayer: true});

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

    equals(themeLayer.getFeaturesByAttribute("clazz", "1").length, 0, "测试在没有添加feature时候使用这个方法");

    themeLayer.addFeatures([feature_1, feature_2, feature_3]);
    equals(themeLayer.getFeaturesByAttribute("humpty", "dumpty")[0].id, feature_1.id, "测试在添加三个feature后，查找属性名为humpty属性值为dumpty的feature");

    equals(themeLayer.getFeaturesByAttribute("clazz", 1).length, 2, "测试查找属性名为：clazz，属性值为数字1的feature数目");

    equals(themeLayer.getFeaturesByAttribute("clazz", '1').length, 1, "测试查找属性名为：clazz，属性值为字符1的feature数目");

});

test("TestCustomVector_getFeaturesBy", function () {
    expect(2);
    var layer = new SuperMap.Layer.CustomVector(name, {isBaseLayer: true});

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

test("TestCustomVector_removeFeatures", function () {
    expect(2);

    var themeLayer = new SuperMap.Layer.CustomVector(name);
    var features;

    var point1 = new SuperMap.Geometry.Point(-111.04, 45.68);
    var pointFeature1 = new SuperMap.Feature.Vector(point1);
    var point2 = new SuperMap.Geometry.Point(-111.14, 45.78);
    var pointFeature2 = new SuperMap.Feature.Vector(point2);

    // 1 test
    themeLayer.addFeatures([pointFeature1, pointFeature2]);
    themeLayer.removeFeatures([pointFeature1]);
    equals(themeLayer.features.length, 1, "从feature对象中删除一个feature。");

    // 1 test
    features = themeLayer.removeFeatures(themeLayer.features);
    equals(themeLayer.features.length,0,
        "测试传入数据为layer.features时候删除全部feature");
    themeLayer.destroy();
});

test("TestCustomVector_getFeaturesBy", function () {
    expect(2);
    var themeLayer = new SuperMap.Layer.CustomVector(name, {isBaseLayer: true});

    // feature_1
    var geometry_1 = new SuperMap.Geometry.Point(-28.63, 153.64);
    var attributes_1 = {
        humpty: 'dumpty',
        clazz: 1
    };
    var feature_1 = new SuperMap.Feature.Vector(geometry_1, attributes_1);
    feature_1.fid = 'f_01'; // to identify later

    // feature_2
    var geometry_2 = new SuperMap.Geometry.Point(-33.74, 150.3);
    var attributes_2 = {
        humpty: 'foobar',
        clazz: 1
    };

    var feature_2 = new SuperMap.Feature.Vector(geometry_2, attributes_2);
    feature_2.fid = 'f_02'; // to identify later

    equals(themeLayer.getFeatureBy("fid", "f_01"), null, "测试在没有添加feature时候使用这个方法");

    themeLayer.addFeatures([feature_1, feature_2]);
    equals(themeLayer.getFeatureBy("fid", "f_01").id, feature_1.id, "测试在添加2个feature后，查找属性名为fid属性值为f_01的feature");
});

test("TestCustomVector_getFeaturesById", function () {
    expect(2);

    var themeLayer = new SuperMap.Layer.CustomVector(name);

    var point1 = new SuperMap.Geometry.Point(-111.04, 45.68);
    var pointFeature1 = new SuperMap.Feature.Vector(point1);
    var point2 = new SuperMap.Geometry.Point(-111.14, 45.78);
    var pointFeature2 = new SuperMap.Feature.Vector(point2);

    equals(themeLayer.getFeatureById(pointFeature1.id),null,"测试在没有添加feature时候使用这个方法");

    themeLayer.addFeatures([pointFeature1, pointFeature2]);
    equals(themeLayer.getFeatureById(pointFeature1.id),pointFeature1,"测试在添加2个feature后，查找属性名为id值为1的feature");
});

test("TestCustomVector_getFeatures", function () {
    expect(2);

    var themeLayer = new SuperMap.Layer.CustomVector(name);
    var point1 = new SuperMap.Geometry.Point(-111.04, 45.68);
    var pointFeature1 = new SuperMap.Feature.Vector(point1);
    var point2 = new SuperMap.Geometry.Point(-111.14, 45.78);
    var pointFeature2 = new SuperMap.Feature.Vector(point2);

    equals(themeLayer.getFeatures().length,0,"测试在没有添加feature时候使用这个方法");

    themeLayer.addFeatures([pointFeature1, pointFeature2]);
    equals(themeLayer.getFeatures().length,2,"测试在添加2个feature后，使用这个方法");
});

test("TestCustomVector_destroy", function () {
    expect(6);

    var themeLayer = new SuperMap.Layer.CustomVector(name);
    var point1 = new SuperMap.Geometry.Point(-111.04, 45.68);
    var pointFeature = new SuperMap.Feature.Vector(point1);

    themeLayer.addFeatures([pointFeature]);
    themeLayer.destroy();
    //SuperMap.Layer.CustomVector的destroy方法
    ok(themeLayer.name == null,"themeLayer使用destroy方法后，name为null");
    ok(themeLayer.isClickAble == null,"isClickAble");
    ok(themeLayer.maxCacheCount == null,"maxCacheCount");
    ok(themeLayer.nodesClipPixel == null,"nodesClipPixel");
    ok(themeLayer.style == null,"style");
    ok(themeLayer.features == null,"features");
});

test("TestCustomVector_setOpacity",function(){
    expect(1);

    var themeLayer = new SuperMap.Layer.CustomVector(name,{isBaseLayer:true});
    var point1 = new SuperMap.Geometry.Point(-111.04, 45.68);
    var pointFeature = new SuperMap.Feature.Vector(point1);

    themeLayer.addFeatures(pointFeature);
    themeLayer.setOpacity(0.6);
    equals(themeLayer.div.style.opacity,"0.6","测试themelayer图层的不透明度是否成功");
    themeLayer.destroy();
});

test("TestCustomVector_setMaxCacheCount",function () {
    expect(2);

    var arr=[];

    var themeLayer = new SuperMap.Layer.CustomVector(name,{isBaseLayer: true});
    for(var i=0;i<31;i++){
        var point = new SuperMap.Geometry.Point(-111.04, 30);
        point.y+=0.01*i;
        var pointFeature = new SuperMap.Feature.Vector(point);
        arr.push(pointFeature);
    }
    var map = new SuperMap.Map({
        div: "map",
        layers: [themeLayer],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });

    themeLayer.addFeatures(arr);
    equals(themeLayer.cacheFields.length,31,"不设置最大缓存数时，测试的最大缓存数");
    themeLayer.clearCache();

    themeLayer.setMaxCacheCount(3);
    themeLayer.addFeatures(arr);
    equals(themeLayer.cacheFields.length,3,"设置最大缓存数为3时，测试的最大缓存数");
    themeLayer.destroy();
    map.destroy();
});

test("TestCustomVector_nodesClipPixel",function () {
    expect(2);

    var themeLayer = new SuperMap.Layer.CustomVector(name,{isBaseLayer: true});
    var polygon_data=[ [-0.5,0],[0,0],[0, 0], [0.1,0.1],[0.8,0],[1.2,0.5],[1.4,0],[1.6,0.5],[10.9,0] ];
    var points=[];
    for(var i= 0,len=polygon_data.length;i<len;i++){
        var point = new SuperMap.Geometry.Point(polygon_data[i][0],polygon_data[i][1]);
        points.push(point);
    }
    var linearRing=new SuperMap.Geometry.LinearRing(points);
    var line_feature=new SuperMap.Feature.Vector(linearRing);
    var map = new SuperMap.Map({
        div: "map",
        layers: [themeLayer],
        center: new SuperMap.LonLat(0, 0),
        zoom: 0
    });
    themeLayer.addFeatures([line_feature]);
    var cacheFea = themeLayer.cache[themeLayer.cacheFields[0]];
    ok(cacheFea.shapes[0].style.pointList.length < linearRing.components.length,"测试是否默认使用抽稀");
    themeLayer.cache={};
    themeLayer.cacheFields=[];

    themeLayer.nodesClipPixel=1;
    themeLayer.addFeatures([line_feature]);
    var cacheFea2 = themeLayer.cache[themeLayer.cacheFields[0]];
    ok(cacheFea2.shapes[0].style.pointList.length < linearRing.components.length,"测试是否使用设置为1后的抽稀");

    themeLayer.destroy();
    map.destroy();
});
