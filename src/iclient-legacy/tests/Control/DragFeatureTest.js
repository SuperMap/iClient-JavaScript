/**
 * Created with JetBrains WebStorm.
 * User: CC
 * Date: 15-3-31
 * Time: 下午2:54
 * To change this template use File | Settings | File Templates.
 */
 module('DragFeature');
test("testDragFeature_Constructor",function(){
    expect(2);
    var map = new SuperMap.Map("map");
    var vectorLayer = new SuperMap.Layer.Vector("vector layer");
    map.addLayers([vectorLayer]);
    var dragFeature = new SuperMap.Control.DragFeature(vectorLayer);
    map.addControl(dragFeature);
    ok(!dragFeature.documentDrag,"Property:documentDrag");
    equals(dragFeature.geometryTypes,null,"Property:geometryTypes");
    dragFeature.activate();
    map.destroy();
});
test("testDragFeature_activate",function(){
    expect(1);
    var map = new SuperMap.Map('map');
    var vectorLayer= new SuperMap.Layer.Vector('vectorLayer');
    map.addLayers([vectorLayer]) ;
    var dragFeature= new SuperMap.Control.DragFeature(vectorLayer);
    map.addControl(dragFeature);
    var act=dragFeature.activate();
    ok(act,"Function:activate");
    map.destroy();
});
test("testDragFeature_deactivate",function(){
    expect(1);
    var map = new SuperMap.Map('map');
    var vectorLayer= new SuperMap.Layer.Vector('vectorLayer');
    map.addLayers([vectorLayer]) ;
    var dragFeature= new SuperMap.Control.DragFeature(vectorLayer);
    map.addControl(dragFeature);
    dragFeature.activate();
    var deact= dragFeature.deactivate();
    ok(deact,"Function:activate");
    map.destroy();
});
test("testDragFeature_destroy",function(){
    expect(2);
    var map = new SuperMap.Map("map");
    var vectorLayer = new SuperMap.Layer.Vector("vector layer");
    map.addLayers([vectorLayer]);
    var dragFeature = new SuperMap.Control.DragFeature(vectorLayer);
    dragFeature.documentDrag=true;
    map.addControl(dragFeature);
    ok(dragFeature.documentDrag,"Property:documentDrag");
    dragFeature.destroy();
    equals(dragFeature.documentDrag,null,"Function:destroy")
    map.destroy();
});

