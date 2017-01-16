module("PlottingEdit");

test("testPlottingEdit_Constructor", function () {
    var plottinglayer = new SuperMap.Layer.PlottingLayer("Plotting Layer", GlobeParameter.plotUrl);
    var plottingEdit = new SuperMap.Control.PlottingEdit(plottinglayer);
    equal(plottingEdit.CLASS_NAME, "SuperMap.Control.PlottingEdit", "Property:CLASS_NAME");
    equal(plottingEdit.controlPointsStyle, null, "Property:controlPointsStyle");
    equal(plottingEdit.scalePointsStyle, null,"Property:controlPointsStyle");
    deepEqual(plottingEdit.defaultControlPointStyle.fillOpacity, 1,"Property:defaultStyle");
    equal(plottingEdit.controlPoints.length, 0, "Property:controlPoints");

    plottingEdit.destroy();
    plottinglayer.destroy();
});

test("testPlottingEdit_Destroy", function () {
    var plottinglayer = new SuperMap.Layer.PlottingLayer("Plotting Layer", GlobeParameter.plotUrl);
    var plottingEdit = new SuperMap.Control.PlottingEdit(plottinglayer);
    equal(plottingEdit.CLASS_NAME, "SuperMap.Control.PlottingEdit", "Property:CLASS_NAME");

    plottingEdit.destroy();
    equal(plottingEdit.controlPointsStyle, null, "Property:controlPointsStyle");
    equal(plottingEdit.scalePointsStyle, null,"Property:controlPointsStyle");
    deepEqual(plottingEdit.defaultControlPointStyle.fillOpacity, 1,"Property:defaultStyle");
    equal(plottingEdit.controlPoints.length, 0, "Property:controlPoints");
});

test("testPlottingEdit_activate",1, function () {
    var map = new SuperMap.Map('map');
    var plottingLayer = new SuperMap.Layer.PlottingLayer("Plotting Layer", GlobeParameter.plotUrl);
    var plottingEdit = new SuperMap.Control.PlottingEdit(plottingLayer);
    map.addControls([plottingEdit]);
    ok(plottingEdit.activate(),"PlottingEdit activate is true");
    map.destroy();
});

test("testPlottingEdit_deactivate", function () {
    var map = new SuperMap.Map('map');
    var plottingLayer = new SuperMap.Layer.PlottingLayer("Plotting Layer", GlobeParameter.plotUrl);
    var plottingEdit = new SuperMap.Control.PlottingEdit(plottingLayer);
    map.addControls([plottingEdit]);
    map.addLayers([plottingLayer]);
    ok(!plottingEdit.deactivate(),"PlottingEdit activate is false");
    map.destroy();
});

//var PlottingEdit  =null;
//test("testPlottingEdit_selectFeature",1, function () {
//    var map = new SuperMap.Map('map');
//    layer = new SuperMap.Layer.TiledDynamicRESTLayer('Layer', GlobeParameter.mapUrl, {maxResolution: "auto"});
//    layer.events.on({"layerInitialized": addLayer});
//    var PlottingLayer = new SuperMap.Layer.PlottingLayer('ploting Layer',{server:GlobeParameter.serverUrl});
//    PlottingEdit = new SuperMap.Control.PlottingEdit(PlottingLayer);
//
//    plotting = SuperMap.Plotting.getInstance(map,GlobeParameter.serverUrl);
//    plotting.setMap(map);
//    function addLayer(){
//        map.addLayers([layer, PlottingLayer]);
//        map.setCenter(new SuperMap.LonLat(0, 0), 0);
//        map.addControls([PlottingEdit]);
//        PlottingEdit.activate();
//        loadSymbol();
//    }
//   function loadSymbol(){
//       var geometry = new SuperMap.Geometry.Point(1,1);
//       var feature = new SuperMap.Feature.Vector(geometry);
//       PlottingLayer.addFeatures(feature);
//       PlottingEdit.selectFeature(feature);
//   }
//    equal(PlottingEdit.modified,false,"PlottingEdit modified");
//    map.destroy();
//});
//
//test("testPlottingEdit_unselectFeature",1, function () {
//     map = new SuperMap.Map('map');
//    layer = new SuperMap.Layer.TiledDynamicRESTLayer('Layer', GlobeParameter.mapUrl, {maxResolution: "auto"});
//    layer.events.on({"layerInitialized": addLayer});
//    var PlottingLayer = new SuperMap.Layer.PlottingLayer('ploting Layer',{server:GlobeParameter.serverUrl});
//    PlottingEdit = new SuperMap.Control.PlottingEdit(PlottingLayer);
//    plotting = SuperMap.Plotting.getInstance(map,GlobeParameter.serverUrl);
//    plotting.setMap(map);
//    function addLayer(){
//        map.addLayers([layer, PlottingLayer]);
//        map.setCenter(new SuperMap.LonLat(0, 0), 0);
//        map.addControls([PlottingEdit]);
//        PlottingEdit.activate();
//        loadSymbol();
//    }
//    function loadSymbol(){
//        var geometry = new SuperMap.Geometry.Point(1,1);
//        var feature = new SuperMap.Feature.Vector(geometry);
//        PlottingLayer.addFeatures(feature);
//        PlottingEdit.unselectFeature(feature);
//    }
//    equal(PlottingEdit.modified,false,"PlottingEdit modified");
//    map.destroy();
//});
//
//test("testPlottingEdit_beforeSelectFeature", function () {
//
//});
//
//test("testPlottingEdit_dragStart",7, function () {
//    var map = new SuperMap.Map('map');
//    var layer = new SuperMap.Layer.TiledDynamicRESTLayer("China",GlobeParameter.serverUrl,null,{maxResolution:"auto"});
//    layer.events.on({"layerInitialized":addLayer});
//    function addLayer(){
//        map.addLayer(layer);
//        map.setCenter(new SuperMap.LonLat(0,0),1);
//    }
//    var vectorLayer = new SuperMap.Layer.Vector();
//    var modifyFeature = new SuperMap.Control.ModifyFeature(vectorLayer);
//    map.addLayer(vectorLayer);
//    map.addControl(modifyFeature);
//    modifyFeature.activate();
//    var geometry = new SuperMap.Geometry.Point(1,1);
//    var feature = new SuperMap.Feature.Vector(geometry);
//    vectorLayer.addFeatures(feature);
//    var px = new SuperMap.Pixel(10,10);
//    modifyFeature.dragStart(feature,px);
//    equal(modifyFeature.dragControl.lastPixel.x,10,"the lastPixel x");
//    equal(modifyFeature.dragControl.lastPixel.y,10,"the lastPixel y");
//    ok(modifyFeature.dragControl.handlers.drag.started,"started");
//    equal(modifyFeature.dragControl.handlers.drag.start.x,10,"the drag.start x");
//    equal(modifyFeature.dragControl.handlers.drag.start.y,10,"the drag.start y");
//    equal(modifyFeature.dragControl.handlers.drag.last.x,10,"the drag.last x");
//    equal(modifyFeature.dragControl.handlers.drag.last.y,10,"the drag.last y");
//    map.destroy();
//});
//test("testPlottingEdit_dragControlPoint", function () {
//
//});
//test("testPlottingEdit_dragControlPointForDot", function () {
//
//});
//test("testPlottingEdit_dragControlPointForAlgo", function () {
//
//});
//test("testPlottingEdit_dragComplete", function () {
//
//
//});
//test("testPlottingEdit_setFeatureState", function () {
//
//});
//test("testPlottingEdit_resetControlPoints", function () {
//
//});
//test("testPlottingEdit_collectControlPoints", function () {
//
//});
test("testPlottingEdit_setMap",1, function () {
    var map = new SuperMap.Map('map');
    var plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer",GlobeParameter.plotUrl);
    var plottingEdit = new SuperMap.Control.PlottingEdit(plottingLayer);
    plottingEdit.setMap(map);
    ok(plottingEdit.map instanceof SuperMap.Map,"this Map");
    plottingLayer.destroy();
    plottingEdit.destroy();
    map.destroy();
});

//test("testPlottingEdit_clearSelectFeatures", function () {
//    map = new SuperMap.Map('map');
//    layer = new SuperMap.Layer.TiledDynamicRESTLayer('Layer', GlobeParameter.mapUrl, {maxResolution: "auto"});
//    layer.events.on({"layerInitialized": addLayer});
//    var PlottingLayer = new SuperMap.Layer.PlottingLayer('ploting Layer',{server:GlobeParameter.serverUrl});
//    PlottingEdit = new SuperMap.Control.PlottingEdit(PlottingLayer);
//    plotting = SuperMap.Plotting.getInstance(map,GlobeParameter.serverUrl);
//    plotting.setMap(map);
//    function addLayer(){
//        map.addLayers([layer, PlottingLayer]);
//        map.setCenter(new SuperMap.LonLat(0, 0), 0);
//        map.addControls([PlottingEdit]);
//        PlottingEdit.activate();
//        loadSymbol();
//    }
//    function loadSymbol(){
//        var geometry = new SuperMap.Geometry.Point(1,1);
//        var feature = new SuperMap.Feature.Vector(geometry);
//        PlottingLayer.addFeatures(feature);
//        PlottingEdit.selectFeature(feature);
//    }
//    equal(PlottingEdit.clearSelectFeatures(),undefined,"PlottingEdit modified");
//    map.destroy();
//});
//
//
//function plotSymbol(plottinglayer) {
//    var polygonPoints = [new SuperMap.Geometry.Point(0,30),new SuperMap.Geometry.Point(-15,0),new SuperMap.Geometry.Point(15,0),new SuperMap.Geometry.Point(40,60)];
//    plottinglayer.createSymbolWC(0,SuperMap.Plot.SymbolType.ARBITRARYPOLYGONSYMBOL,polygonPoints);
//}
//
//function addLayer() {
//    map.addLayers([layer, plottinglayer]);
//    map.setCenter(new SuperMap.LonLat(0, 0), 0);
//}