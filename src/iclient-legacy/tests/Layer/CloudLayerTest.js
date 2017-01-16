module("CloudLayer");

test("TestCloudLayer_constructorDefault",function () {
    expect(8);
    var name = "CloudLayer",
        url = "http://t2.supermapcloud.com/FileService/image?map=${mapName}&type=${type}&x=${x}&y=${y}&z=${z}",
        mapName = "quanguo",
        maxExtent = new SuperMap.Bounds(-2.00375083427892E7,-2.00375083427892E7,2.00375083427892E7,2.00375083427892E7),
        resolutions =[ 19567.8792410051, 9783.93962050254, 4891.96981025127, 2445.98490512563,
            1222.99245256282, 611.496226281409, 305.748113140704, 152.874056570352,
            76.4370282851761, 38.218514142588, 19.109257071294, 9.55462853564701,
            4.77731426782351, 2.38865713391175, 1.19432856695588, 0.597164283477938],
        layer = new SuperMap.Layer.CloudLayer();
    ok(layer instanceof SuperMap.Layer.CloudLayer, "layer instanceof SuperMap.Layer.CloudLayer");
    equals(layer.name, name, "name");
    equals(layer.CLASS_NAME, "SuperMap.Layer.CloudLayer", "CLASS_NAME");
    equals(layer.url, url, "url");
    equals(layer.scales, null, "scales");
    deepEqual(layer.resolutions, resolutions, "resolutions");
    deepEqual(layer.maxExtent, maxExtent, "maxExtent");
    equals(layer.mapName, mapName, "mapName");
});

test("TestCloudLayer_destroy",function () {
    expect(11);
    var layer = new SuperMap.Layer.CloudLayer();
    layer.destroy();    
    ok(layer.url == null, "url");
    ok(layer.name == null, "name");
    ok(layer.mapName == null, "mapName");
    //SuperMap.Layer的destroy方法    
    ok(layer.format == null, "format");
    ok(layer.dpi == null, "dpi");
    ok(layer.viewBounds == null, "viewBounds");
    ok(layer.viewer == null, "viewer");
    ok(layer.scale == null, "scale");
    ok(layer.tileSize == null, "tileSize");
    ok(layer.tileOriginCorner == null, "tileOriginCorner");
    ok(layer.isBaseLayer == null, "isBaseLayer");
});

test("TestCloudLayer_getTileUrl",function () {
    expect(1);
    //测试getTileUrl方法，构造用于测试的xyz值，测试返回值与预期值是否相等。（预期值为手动构造的）。
    var map = new SuperMap.Map("map"),
		layer = new SuperMap.Layer.CloudLayer(),
        xyz = {x: 0, y: 0, z: -3};
	map.addLayer(layer);
    var tileUrl = 'http://t2.supermapcloud.com/FileService/image?map=' + layer.mapName + "&type=" + layer.type + "&x=0&y=0&z=0";
    equals(layer.getTileUrl(xyz), tileUrl, "tileUrl");
});

test("TestCloudLayer_clone",function () {
    expect(8);
    var layer, layer_clone;
    layer = new SuperMap.Layer.CloudLayer(); 
    layer_clone = layer.clone();
    ok(layer_clone instanceof SuperMap.Layer.CloudLayer, "layer instanceof SuperMap.Layer.CloudLayer");
    equals(layer.name, layer_clone.name, "name");
    equals(layer.url, layer_clone.url, "url");
    equals(layer.format, layer_clone.format, "format");
    equals(layer.mapName, layer_clone.mapName, "mapName");
    equals(layer.isBaseLayer, layer_clone.isBaseLayer, "isBaseLayer");
    deepEqual(layer.tileSize, layer_clone.tileSize, "tileSize");
    equals(layer.tileOriginCorner, layer_clone.tileOriginCorner, "tileOriginCorner");
});
