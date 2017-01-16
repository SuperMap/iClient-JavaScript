/**
 * Created with JetBrains WebStorm.
 * User: CC
 * Date: 15-1-8
 * Time: 上午9:40
 * To change this template use File | Settings | File Templates.
 */
module("WCS");
test("wcs_constructorDefault",function(){
    expect(3);
    var url =  GlobeParameter.WCSURL;
    var layer= new SuperMap.Layer.WCS("WCSlayer",url);
    ok(layer. service=="WCS", "service");
    ok(layer. identifier==0, " identifier");
    equals(layer. version, "1.1.1", "测试请求的WCS服务的版本为1.1.1是否正确");
    layer.destroy();
});

test("wcs_clone",function(){
    expect(2);
    var url =GlobeParameter.WCSURL;
    var layer = new SuperMap.Layer.WCS("wcslayer",url);
    var layer2= layer.clone();
    ok(layer.service==layer2.service,"service") ;
    ok(layer.boundingbox==layer2.  boundingbox,"boundingbox") ;
    layer.destroy();
});
test("wcs_destroy",function(){
    expect(4);
    var url = GlobeParameter.WCSURL;
    var map = new SuperMap.Map("map");
    var layer= new SuperMap.Layer.WCS("wcslayer",url);
    map.addLayers([layer]);
    map.setCenter(new SuperMap.LonLat(0, 0), 2);
    layer.destroy();
    equals(layer.map, null,"layer.map is null after destroy");
    ok(layer.service ==null,"service");
    ok(layer.boundingbox == null,"boundingbox");
    ok(layer.version == null,"version");
    map.destroy();
});
