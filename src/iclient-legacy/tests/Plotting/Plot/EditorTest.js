//module("Editor");
//
//var editor_map, editor_plottingLayer, editor_plottingEdit, editor_plotting;
//function init(sucess) {
//    editor_map = new SuperMap.Map("map");
//    var baseLayer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
//    baseLayer.events.on({"layerInitialized": addLayer});
//    editor_plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
//    editor_plottingEdit = new SuperMap.Control.PlottingEdit(editor_plottingLayer);
//    function addLayer() {
//        editor_map.addLayers([baseLayer, editor_plottingLayer]);
//        editor_map.addControl(editor_plottingEdit);
//        editor_map.setCenter(new SuperMap.LonLat(0, 0), 0);
//        editor_plotting = SuperMap.Plotting.getInstance(editor_map, GlobeParameter.plotUrl);
//        editor_plotting.setMap(editor_map);
//        //标绘标号
//        var Points = [];
//        Points.push(new SuperMap.Geometry.Point(40, 0));
//        Points.push(new SuperMap.Geometry.Point(40, 80));
//        editor_plottingLayer.createSymbolWC(0, 24, Points, sucess);
//    }
//}
//
//test("testEditor_Constructor",function () {
//    var map = new SuperMap.Map("map");
//    //var baseLayer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
//    //baseLayer.events.on({"layerInitialized": addLayer});
//    var plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
//    var plottingEdit = new SuperMap.Control.PlottingEdit(plottingLayer);
//    var editor = new SuperMap.Plot.Editor(map, {activeLayer:plottingLayer, plottingEdit:plottingEdit});
//    equal(editor.CLASS_NAME, "SuperMap.Plot.Editor", "Property.CLASS_NAME");
//    ok(editor !== null, "not null");
//    ok(editor.map !== null, "editor.map not null");
//    ok(editor.activeLayer !== null, "editor.activeLayer not null");
//    ok(editor.plottingEdit !== null, "editor.plottingEdit not null");
//
//    //editor.destroy();
//});
//
//test("testEditor_Destroy",function () {
//    var map = new SuperMap.Map("map");
//    //var baseLayer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
//    //baseLayer.events.on({"layerInitialized": addLayer});
//    var plottingLayer = new SuperMap.Layer.PlottingLayer("PlottingLayer", GlobeParameter.plotUrl);
//    var plottingEdit = new SuperMap.Control.PlottingEdit(plottingLayer);
//
//    var editor = new SuperMap.Plot.Editor(map, {activeLayer:4, plottingEdit:plottingEdit});
//    equal(editor.CLASS_NAME, "SuperMap.Plot.Editor", "Property.CLASS_NAME");
//    ok(editor !== null, "not null");
//
//    editor.destroy();
//    ok(editor !== null, "not null");
//    ok(editor.map === null, "editor.map is null");
//    ok(editor.activeLayer === null, "editor.activeLayer is null");
//    ok(editor.plottingEdit === null, "editor.plottingEdit is null");
//});
//
//asyncTest("testEditor_copy",function(){
//    init(success);
//    function success(feature) {
//        setTimeout(function () {
//            //var editor = editor_plotting.getEditor();
//            var editor = new SuperMap.Plot.Editor(editor_map, {activeLayer:editor_plottingLayer, plottingEdit:editor_plottingEdit});
//            var features = editor.activeLayer.features;
//            editor.activeLayer.selectedFeatures.push(features[0]);
//            editor.copy();
//            equal(editor.pasteGeoAry.length === 1, true, "Function:copy");
//            start();
//        }, 400);
//    }
//});
//
//asyncTest("testEditor_copyFeature",function(){
//    init(success);
//    function success(feature) {
//        setTimeout(function () {
//            //var editor = editor_plotting.getEditor();
//            var editor = new SuperMap.Plot.Editor(editor_map, {activeLayer:editor_plottingLayer, plottingEdit:editor_plottingEdit});
//            editor.copyFeatures(editor.activeLayer.features);
//            equal(editor.pasteGeoAry.length > 0, true, "Function:copy");
//            start();
//        }, 400);
//    }
//});
//
//asyncTest("testEditor_paste",function(){
//    init(success);
//    function success(feature) {
//        setTimeout(function () {
//            //var editor = editor_plotting.getEditor();
//            var editor = new SuperMap.Plot.Editor(editor_map, {activeLayer:editor_plottingLayer, plottingEdit:editor_plottingEdit});
//            var features = editor.activeLayer.features;
//            editor.activeLayer.selectedFeatures.push(features[0]);
//            editor.cut();
//            equal(editor.pasteGeoAry.length > 0, true, "Function:copy");
//            editor.paste();
//            start();
//        }, 400);
//    }
//});
//
//asyncTest("testEditor_cut",function(){
//    init(success);
//    function success(feature) {
//        setTimeout(function () {
//            var editor = new SuperMap.Plot.Editor(editor_map, {activeLayer:editor_plottingLayer, plottingEdit:editor_plottingEdit});
//            //var editor = editor_plotting.getEditor();
//            editor.map = editor_plotting.map;
//            var features = editor.activeLayer.features;
//            var lengthOld = features.length;
//            editor.activeLayer.selectedFeatures.push(features[0]);
//            editor.copy();
//            editor.paste();
//            ok(editor.activeLayer.features.length > lengthOld, "Function:paste");
//            start();
//        }, 400);
//    }
//});
//
