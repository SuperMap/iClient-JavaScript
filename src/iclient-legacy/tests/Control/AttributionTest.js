/**
 * Created with JetBrains WebStorm.
 * User: CC
 * Date: 15-3-16
 * Time: 下午5:01
 * To change this template use File | Settings | File Templates.
 */
module("Attribution");
test("testAttribution_attribution",function(){
    expect(2);
    var map = new SuperMap.Map("map");
    var layer = new SuperMap.Layer.CloudLayer();
    var attribution = new SuperMap.Control.Attribution();
    layer.attribution="Data by超图云" ;
    map.addLayer(layer);
    equals(attribution.separator,", ", "Property:separator");
    equals(attribution.template,"${layers}","Property:template")
    map.destroy();
});
test("testAttribution_destroy",function(){
  expect(2);
    var map = new SuperMap.Map("map");
    var layer= new SuperMap.Layer.CloudLayer();
    var attribution = new SuperMap.Control.Attribution({   separator:"/"});
    layer.attribution="Data by <a style='white-space: nowrap' target='_blank' href='http://www.supermapcloud.com/'>超图云</a>";
    map.addLayer(layer);
    map.addControl(attribution);
    equals(attribution.separator,"/","Function:destroy");
    attribution.destroy();
    equals(attribution.map,null,"Function:destroy");
    map.destroy();
});
test("testAttribution_draw",function(){
    expect(2);
    var map = new SuperMap.Map("map",{ allOverlays:true});
    var layer= new SuperMap.Layer.CloudLayer();
    var layer1=new SuperMap.Layer.CloudLayer();
    var attribution = new SuperMap.Control.Attribution({
        separator:"/"
    });
    layer.attribution="CloudLayer";
    layer1.attribution="DataByCloudLayer";
    map.addLayers([layer,layer1]);
    map.addControl(attribution);
    var att= attribution.draw();
    equals(att.innerHTML,"CloudLayer/DataByCloudLayer","Function:draw");
    equals(att.className,"smControlAttribution smControlNoSelect","Function:draw") ;
    map.destroy();
});


