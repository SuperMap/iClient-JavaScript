module('PlottingLayer');

var libID = 421;
var code = 10100;
var inputPoints =[new SuperMap.Geometry.Point(20, 30), new SuperMap.Geometry.Point(20, 35)];
var locationPoints = [new SuperMap.Geometry.Point(100, 200), new SuperMap.Geometry.Point(100, 230)];
var map,layer,plottingLayer;
test("testPlottingLayer_Constructor", function () {
    expect(4);
    var name = "PlottingLayer";
    map = new SuperMap.Map('map');
    plottinglayer = new SuperMap.Layer.PlottingLayer(name, GlobeParameter.plotUrl);
    map.addLayer(plottinglayer);
    ok(plottinglayer instanceof SuperMap.Layer.PlottingLayer, "layer instanceof SuperMap.Layer.PlottingLayer");
    equal(plottinglayer.name, name, "name");
    equal(plottinglayer.CLASS_NAME, "SuperMap.Layer.PlottingLayer", "CLASS_NAME");
    equal(plottinglayer.description, null, "description");
});

asyncTest("testPlottingLayer_drawFeature", function () {
    var map, layer, plottingLayer,plottingEdit;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);

    plottingEdit = new SuperMap.Control.PlottingEdit(plottingLayer);
    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        map.addControls([plottingEdit]);
    }
    setTimeout(function () {
        try {
            var geometry = new SuperMap.Geometry.Point(-115, 10);
            var style1 = {
                strokeColor: "#ffffff"
            };
            var pointFeature = new SuperMap.Feature.Vector(geometry, null, style1);
            plottinglayer.drawFeature(pointFeature);
            equal(pointFeature.style, style1, "function:drawFeature,测试与矢量要素的样式一致");            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:" + excepion.message);
            start();
            map.destroy();
            layer.destroy();
            plottingLayer.destroy();
            plottingEdit.destroy();
        }
    }, 1000);
});

asyncTest("testPlottingLayer_createSymbol", function () {
    expect(1);
    var  feature;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
    plottingLayer.events.on({"symbolcreated": createSymbolSuccess});

    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        plottingLayer.createSymbol(libID, code,locationPoints);
    }

    function createSymbolSuccess(evt) {
        feature = evt.feature;
    }

    setTimeout(function () {
        try {
            equal(feature.CLASS_NAME, "SuperMap.Feature.Vector", "创建标号的CLASS_NAME等于SuperMap.Feature.Vector");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:" + excepion.message)
            start();
            map.destroy();
            layer.destroy();
            plottingLayer.destroy();
        }
    }, 1000);
});

asyncTest("testPlottingLayer_createSymbolWC", function () {
    expect(1);
    var  feature;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
    plottingLayer.events.on({"symbolcreated": createSymbolWCSuccess});

    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        plottingLayer.createSymbolWC(libID, code,inputPoints);
    }

    function createSymbolWCSuccess(evt) {
        feature = evt.feature;
    }

    setTimeout(function () {
        try {
            equal(feature.CLASS_NAME, "SuperMap.Feature.Vector", "创建标号的CLASS_NAME等于SuperMap.Feature.Vector");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:" + excepion.message)
            start();
            map.destroy();
            layer.destroy();
            plottingLayer.destroy();
        }
    }, 1500);
});

asyncTest("testPlottingLayer_createText", function () {
    expect(1);
    var feature;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
    plottingLayer.events.on({"symbolcreated": createTextSuccess});

    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        var locationPoints = new SuperMap.Geometry.Point(20, 30);
        plottingLayer.createText("createText", locationPoints, {});
    }

    function createTextSuccess(evt) {
        feature = evt.feature;
    }

    setTimeout(function () {
        try {
            equal(feature.CLASS_NAME, "SuperMap.Feature.Vector", "equal className");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:" + excepion.message)
            start();
            map.destroy();
            layer.destroy();
            plottingLayer.destroy();
        }
    }, 2000);
});

asyncTest("testPlottingLayer_createTextWC", function () {
    expect(2);
    var  feature;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    layer.events.on({"layerInitialized": addLayer});
    plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
    plottingLayer.events.on({"symbolcreated": createTextWCSuccess});

    function addLayer() {
        map.addLayers([layer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        var locationPoints = new SuperMap.Geometry.Point(20, 30);
        plottingLayer.createTextWC("createTextWC", locationPoints, {});
    }

    function createTextWCSuccess(evt) {
        feature = evt.feature;
    }

    setTimeout(function () {
        try {
            equal(feature.CLASS_NAME, "SuperMap.Feature.Vector", "equal className");
            equal(feature.geometry.textContent, "createTextWC", "equal textContent");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:" + excepion.message)
            start();
            map.destroy();
            layer.destroy();
            plottingLayer.destroy();
        }
    }, 3000);
});


test("testPlottingLayer_removeFeatureByID", function () {
    expect(1);
    var features;
    var name = "PlottingLayer";
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    plottingLayer = new SuperMap.Layer.PlottingLayer(name,  GlobeParameter.plotUrl);
    map.addLayers([layer, plottingLayer]);
    var point1 = new SuperMap.Geometry.Point(-111.04, 45.68);
    var pointFeature1 = new SuperMap.Feature.Vector(point1);
    plottingLayer.addFeatures(pointFeature1);
    id = pointFeature1.id;
    features = plottingLayer.removeFeatureByID(id);
    equal(features, undefined, "根据ID删除指定的feature。");
});


test("testPlottingLayer_getFeatureAt", function () {
    expect(1);
    var map, layer;
    var name = "PlottingLayer";
    var serverUrl = GlobeParameter.plotUrl;
    var url = GlobeParameter.WorldURL;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", url, null, {maxResolution: "auto"});
    var plottingLayer = new SuperMap.Layer.PlottingLayer(name, GlobeParameter.plotUrl);
    map.addLayers([layer, plottingLayer]);
    var point1 = new SuperMap.Geometry.Point(11, 22);
    var pointFeature1 = new SuperMap.Feature.Vector(point1);
    plottingLayer.addFeatures(pointFeature1);
    featureTest = plottingLayer.getFeatureAt(0);
    ok(featureTest, pointFeature1[0], "获取图层上指定索引的feature。");
    plottingLayer.destroy();
});


test("testPlottingLayer_removeFeatureAt", function () {
    expect(1);
    var map, layer;
    var name = "PlottingLayer";
    var serverUrl = GlobeParameter.plotUrl;
    var url = GlobeParameter.WorldURL;
    map = new SuperMap.Map("map");
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", url, null, {maxResolution: "auto"});
    var plottingLayer = new SuperMap.Layer.PlottingLayer(name, GlobeParameter.plotUrl);
    map.addLayers([layer, plottingLayer]);
    var pointFeatures = [];
    var points = [[11, 22], [22, 11]];
    for (i = 0; i < points.length; i++) {
        var point = new SuperMap.Geometry.Point(points[i][0], points[i][1]);
        var pointFeature = new SuperMap.Feature.Vector(point, {
            FEATUREID: points[i][0],
            TIME: points[i][1]
        });
        pointFeatures.push(pointFeature);
    }
    plottingLayer.addFeatures(pointFeatures);
    featureTest = plottingLayer.removeFeatureAt(0);
    equal(featureTest, undefined, "删除图层上指定索引的feature。");
});

