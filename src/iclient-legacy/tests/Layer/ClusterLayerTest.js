module("ClusterLayer");
var name = "cluster name";

function featureToArray(features) {
    var array = [];
    for(var feature in features) {
        if(features.hasOwnProperty(feature)){
            array.push(features[feature]);
        }
    }
    return array;
}

test("TestClusterLayer_constructorDefault", function () {
    expect(5);
    var options = {distance : 60},
        layer = new SuperMap.Layer.ClusterLayer(name, options);
    ok(layer instanceof SuperMap.Layer.ClusterLayer, "layer instanceof SuperMap.Layer.ClusterLayer");
    equals(layer.name, name, "ClusterLayer");
    equals(layer.CLASS_NAME, "SuperMap.Layer.ClusterLayer", "CLASS_NAME");
    equals(layer.distance, 60, "layer set distance");
    ok(layer.renderer, "layer has a renderer when providing a renderes array")
});

test("test_Layer_ClusterLayer_addFeatures", function () {
    expect(2);
    var layer = new SuperMap.Layer.ClusterLayer(name, {isBaseLayer: true});
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
//    layer.events.register('featuresadded', null, function(obj) {
//        equals(obj.succeed, true, "测试添加成功时候的标识");
//        layer.events.remove("featuresadded");
//    });

    layer.addFeatures([pointFeature,pointFeature2]);
    ok(!!layer.pointMap, "测试添加聚合点数组是否成功");
    ok(!!layer.toDrawFeatures, "测试添加聚合点数组是否成功");

    map.destroy();
});

test("test_Layer_ClusterLayer_destroy", function () {
    expect(2);    

    var layer = new SuperMap.Layer.ClusterLayer('layer1');
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

test("test_Layer_ClusterLayer_getFeaturesByBounds", function () {
    expect(1);

    var layer = new SuperMap.Layer.ClusterLayer('layer1');
    var layer2 = new SuperMap.Layer.CloudLayer();
    var map = new SuperMap.Map('map');
    map.addLayers([layer2,layer]);
    map.setCenter(new SuperMap.LonLat(0, 0), 2);
    var point = new SuperMap.Geometry.Point(-111.04, 45.68);
    var pointFeature = new SuperMap.Feature.Vector(point);
    var pointFeatureId = pointFeature.id;
    var point2 = new SuperMap.Geometry.Point(-100.04, 45.68);
    var pointFeature2 = new SuperMap.Feature.Vector(point2);

    layer.addFeatures([pointFeature,pointFeature2]);
    var features = layer.getFeaturesByBounds(new SuperMap.Bounds(-120,40,0,50));

    ok(features&&features.length>0, "layer.getFeaturesByBounds return features succed");

    map.destroy();
});

test("test_Layer_ClusterLayer_clearCluster", function () {
    expect(2);

    var layer2 = new SuperMap.Layer.CloudLayer();
    var layer = new SuperMap.Layer.ClusterLayer('layer1');
    var map = new SuperMap.Map('map');
    map.addLayers([layer2,layer]);
    map.setCenter(new SuperMap.LonLat(0, 0), 2);
    var point = new SuperMap.Geometry.Point(-111.04, 45.68);
    var pointFeature = new SuperMap.Feature.Vector(point);
    var pointFeatureId = pointFeature.id;
    var point2 = new SuperMap.Geometry.Point(-100.04, 45.68);
    var pointFeature2 = new SuperMap.Feature.Vector(point2);

    layer.addFeatures([pointFeature,pointFeature2]);
    layer.clearCluster();

    ok(!layer.toDrawFeatures, "layer.clearCluster 运行成功");
    ok(!layer.openedPoints||(layer.openedPoints.length==0), "layer.clearCluster 运行成功");

    map.destroy();
});

test("test_Layer_ClusterLayer_destroyCluster", function () {
    expect(2);

    var layer2 = new SuperMap.Layer.CloudLayer();
    var layer = new SuperMap.Layer.ClusterLayer('layer1');
    var map = new SuperMap.Map('map');
    map.addLayers([layer2,layer]);
    map.setCenter(new SuperMap.LonLat(0, 0), 2);
    var point = new SuperMap.Geometry.Point(-111.04, 45.68);
    var pointFeature = new SuperMap.Feature.Vector(point);
    var pointFeatureId = pointFeature.id;
    var point2 = new SuperMap.Geometry.Point(-100.04, 45.68);
    var pointFeature2 = new SuperMap.Feature.Vector(point2);

    layer.addFeatures([pointFeature,pointFeature2]);
    layer.destroyCluster();

    ok(!layer.clusterPoints, "layer.destroyCluster 运行成功");
    ok(!layer.pointMap, "layer.destroyCluster 运行成功");

    map.destroy();
});