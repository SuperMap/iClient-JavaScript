module("ModifyFeature");

//数据
var yu_url = "http://localhost:8090/iserver/services/map-china400/rest/maps/China";

test("testModifyFeature_constructor",7,function(){
    var vectorLayer = new SuperMap.Layer.Vector();
    var modifyFeature = new SuperMap.Control.ModifyFeature(vectorLayer);
    ok(modifyFeature.layer instanceof SuperMap.Layer.Vector,"this layer is vector");
    equals(modifyFeature.virtualStyle.fillOpacity,0.3,"the fillOpacity of virtualStyle");
    equals(modifyFeature.virtualStyle.strokeOpacity,0.3,"the strokeOpacity of virtualStyle");
    equals(modifyFeature.deleteCodes[0],46,"deleteCodes 0");
    equals(modifyFeature.deleteCodes[1],68,"deleteCodes 1");
    equals(modifyFeature.mode,1,"SuperMap.Control.ModifyFeature.RESHAPE");
    equals(modifyFeature.CLASS_NAME,"SuperMap.Control.ModifyFeature","CLASS NAME");
    vectorLayer.destroy();
    modifyFeature.destroy();
});

test("testModifyFeature_destroy",1,function(){
    var vectorLayer = new SuperMap.Layer.Vector();
    var modifyFeature = new SuperMap.Control.ModifyFeature(vectorLayer);
    modifyFeature.destroy();
    equals(modifyFeature.layer,null,"the layer is null");
    vectorLayer.destroy();
});

test("testModifyFeature_activate",1,function(){
    var map = new SuperMap.Map('map');
    var vectorLayer = new SuperMap.Layer.Vector();
    var modifyFeature = new SuperMap.Control.ModifyFeature(vectorLayer);
    map.addControl(modifyFeature);
    ok(modifyFeature.activate(),"activate is true");
    vectorLayer.destroy();
});

test("testModifyFeature_deactivate",2,function(){
    var map = new SuperMap.Map('map');
    var vectorLayer = new SuperMap.Layer.Vector();
    var modifyFeature = new SuperMap.Control.ModifyFeature(vectorLayer);
    map.addLayer(vectorLayer);
    map.addControl(modifyFeature);
    //情况一
    var value = modifyFeature.deactivate();
    ok(!value,"deactivate is false");
    //情况二
    modifyFeature.active = true;
    value = modifyFeature.deactivate();
    ok(value,"deactivate is true");
    vectorLayer.destroy();
    modifyFeature.destroy();
    map.destroy();
});

test("testModifyFeature_beforeSelectFeature",1,function(){
    var map = new SuperMap.Map('map');
    var vectorLayer = new SuperMap.Layer.Vector();
    var modifyFeature = new SuperMap.Control.ModifyFeature(vectorLayer);
    map.addLayer(vectorLayer);
    map.addControl(modifyFeature);
    modifyFeature.activate();
    var geometry = new SuperMap.Geometry.Point(1,1);
    var feature = new SuperMap.Feature.Vector(geometry);
    vectorLayer.addFeatures(feature);
    var result = modifyFeature.beforeSelectFeature(feature);
    equals(result,undefined,"undefined");
    map.destroy();
    vectorLayer.destroy();
    geometry.destroy();
    feature.destroy();
    modifyFeature.destroy();
    map.destroy();
});

test("testModifyFeature_selectFeature",2,function(){
    var map = new SuperMap.Map('map');
    var vectorLayer = new SuperMap.Layer.Vector();
    var modifyFeature = new SuperMap.Control.ModifyFeature(vectorLayer);
    map.addLayer(vectorLayer);
    map.addControl(modifyFeature);
    modifyFeature.activate();
    var geometry = new SuperMap.Geometry.Point(1,1);
    var feature = new SuperMap.Feature.Vector(geometry);
    vectorLayer.addFeatures(feature);
    modifyFeature.selectFeature(feature);
    equals(modifyFeature.feature instanceof SuperMap.Feature.Vector,true,"modifyFeature feature");
    equals(modifyFeature.modified,false,"modifyFeature modified");
    map.destroy();
    vectorLayer.destroy();
    geometry.destroy();
    feature.destroy();
    modifyFeature.destroy();
    map.destroy();
});

test("testModifyFeature_unselectFeature",4,function(){
    var map = new SuperMap.Map('map');
    var vectorLayer = new SuperMap.Layer.Vector();
    var modifyFeature = new SuperMap.Control.ModifyFeature(vectorLayer);
    map.addLayer(vectorLayer);
    map.addControl(modifyFeature);
    modifyFeature.activate();
    var geometry = new SuperMap.Geometry.Point(1,1);
    var feature = new SuperMap.Feature.Vector(geometry);
    vectorLayer.addFeatures(feature);
    modifyFeature.unselectFeature(feature);
    equals(modifyFeature.vertices.length,0,"the vertices length");
    equals(modifyFeature.virtualVertices.length,0,"the virtualVertices length");
    equals(modifyFeature.feature,null,"the feature is null");
    ok(!modifyFeature.modified,"the modified is false");
    map.destroy();
    vectorLayer.destroy();
    geometry.destroy();
    feature.destroy();
    modifyFeature.destroy();
    map.destroy();
});

test("testModifyFeature_dragStart", 7,function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url,null,{maxResolution:"auto"});
    layer.events.on({"layerInitialized":addLayer});
    function addLayer(){
        map.addLayer(layer);
        map.setCenter(new SuperMap.LonLat(0,0),1);
    }
    var vectorLayer = new SuperMap.Layer.Vector();
    var modifyFeature = new SuperMap.Control.ModifyFeature(vectorLayer);
    map.addLayer(vectorLayer);
    map.addControl(modifyFeature);
    modifyFeature.activate();
    var geometry = new SuperMap.Geometry.Point(1,1);
    var feature = new SuperMap.Feature.Vector(geometry);
    vectorLayer.addFeatures(feature);
    var px = new SuperMap.Pixel(10,10);
    modifyFeature.dragStart(feature,px);
    equals(modifyFeature.dragControl.lastPixel.x,10,"the lastPixel x");
    equals(modifyFeature.dragControl.lastPixel.y,10,"the lastPixel y");
    ok(modifyFeature.dragControl.handlers.drag.started,"started");
    equals(modifyFeature.dragControl.handlers.drag.start.x,10,"the drag.start x");
    equals(modifyFeature.dragControl.handlers.drag.start.y,10,"the drag.start y");
    equals(modifyFeature.dragControl.handlers.drag.last.x,10,"the drag.last x");
    equals(modifyFeature.dragControl.handlers.drag.last.y,10,"the drag.last y");
    map.destroy();
    vectorLayer.destroy();
    geometry.destroy();
    feature.destroy();
    modifyFeature.destroy();
    map.destroy();
});

test("testModifyFeature_dragVertex",3, function () {
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url,null,{maxResolution:"auto"});
    layer.events.on({"layerInitialized":addLayer});
    function addLayer(){
        map.addLayer(layer);
        map.setCenter(new SuperMap.LonLat(0,0),1);
    }
    var vectorLayer = new SuperMap.Layer.Vector();
    var modifyFeature = new SuperMap.Control.ModifyFeature(vectorLayer);
    map.addLayer(vectorLayer);
    map.addControl(modifyFeature);
    var geometry = new SuperMap.Geometry.Point(1,1);
    var feature = new SuperMap.Feature.Vector(geometry);
    vectorLayer.addFeatures(feature);
    var px = new SuperMap.Pixel(10,10);
    modifyFeature.selectFeature(feature);
    modifyFeature.dragVertex(feature,px);
    ok(modifyFeature.modified,"the modified is true");
    //情况1 Point
    ok(modifyFeature.feature instanceof SuperMap.Feature.Vector,"the feature is instanceof Vector");
    //情况2
    var geometry = new SuperMap.Geometry.LineString([new SuperMap.Geometry.Point(1,1),new SuperMap.Geometry.Point(2,2)]);
    feature = new SuperMap.Feature.Vector(geometry);
    vectorLayer.addFeatures(feature);
    modifyFeature.selectFeature(feature);
    modifyFeature.dragVertex(feature,px);
    equals(modifyFeature.virtualVertices.length,0,"the vertices length");
    map.destroy();
    vectorLayer.destroy();
    geometry.destroy();
    feature.destroy();
    modifyFeature.destroy();
    map.destroy();
});

test("testModifyFeature_collectVertices",2,function(){
    var map = new SuperMap.Map('map');
    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("China",yu_url,null,{maxResolution:"auto"});
    layer.events.on({"layerInitialized":addLayer});
    function addLayer(){
        map.addLayer(layer);
        map.setCenter(new SuperMap.LonLat(0,0),1);
    }
    var vectorLayer = new SuperMap.Layer.Vector();
    var modifyFeature = new SuperMap.Control.ModifyFeature(vectorLayer);
    map.addLayer(vectorLayer);
    map.addControl(modifyFeature);
    var geometry = new SuperMap.Geometry.Point(1,1);
    var feature = new SuperMap.Feature.Vector(geometry);
    vectorLayer.addFeatures(feature);
    var px = new SuperMap.Pixel(10,10);
    modifyFeature.selectFeature(feature);
    modifyFeature.dragVertex(feature,px);
    modifyFeature.collectVertices();
    equals(modifyFeature.vertices.length,1,"the vertices length");
    equals(modifyFeature.virtualVertices.length,0,"the virtualVertices length");
    map.destroy();
    vectorLayer.destroy();
    geometry.destroy();
    feature.destroy();
    modifyFeature.destroy();
    map.destroy();
});

test("testModifyFeature_setMap",1,function(){
    var map = new SuperMap.Map('map');
    var vetorLayer = new SuperMap.Layer.Vector();
    var modifyFeature = new SuperMap.Control.ModifyFeature(vetorLayer);
    modifyFeature.setMap(map);
    ok(modifyFeature.map instanceof SuperMap.Map,"this Map");
    vetorLayer.destroy();
    modifyFeature.destroy();
    map.destroy();
});

