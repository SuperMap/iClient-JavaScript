module("SimpleCachedLayer");
test("TestSimpleCachedLayer_constructorDefault", function () {
    expect(14);
    var name = "SimpleCachedLayer",
        url = "http://localhost:8090/iserver/output/cache",
        layerName = "World Map",
        urlTemplate = "${layerName}_${w}x${h}/${scale}/${x}/${y}.${format}",
        options = {
            scales: [1/500000000, 1/250000000, 1/125000000, 1/62500000
            , 1/31250000, 1/15625000],
            resolutions: [1.4966072995194117, 0.7483036497597059, 0.37415182487985293, 0.18707591243992647,
            0.09353795621996323, 0.04676897810998162]
        },
        map = new SuperMap.Map('map'),
        layer = new SuperMap.Layer.SimpleCachedLayer(name, url, layerName, options); 
    map.addLayer(layer);
    ok(layer instanceof SuperMap.Layer.SimpleCachedLayer, "layer instanceof SuperMap.Layer.SimpleCachedLayer");
    equals(layer.name, name, "name");
    equals(layer.CLASS_NAME, "SuperMap.Layer.SimpleCachedLayer", "CLASS_NAME");
    equals(layer.url, url, "url");
    equals(layer.viewBounds, null, "viewBounds");
    equals(layer.viewer, null, "viewer");
    equals(layer.scale, null, "scale");
    equals(layer.dpi, null, "dpi");
    equals(layer.tileOriginCorner, "tl", "tileOriginCorner");
    deepEqual(layer.scales, options.scales, "scales");
    deepEqual(layer.resolutions, options.resolutions, "resolutions");
    deepEqual(layer.tileSize, new SuperMap.Size(256, 256), "tileSize");
    equals(layer.layerName, layerName, "layerName");
    equals(layer.urlTemplate, urlTemplate, "urlTemplate");
    map.destroy();
});
test("TestSimpleCachedLayer_getTileUrl", function () {
    expect(1);
    //测试getTileUrl方法，构造用于测试的xyz值，测试返回值与预期值是否相等。（预期值为手动构造的）。
    var name = "World",
        url = "http://localhost:8090/iserver/output/cache",
        layerName = "World Map",
        options = {
            scales: [1/500000000, 1/250000000, 1/125000000, 1/62500000
            , 1/31250000, 1/15625000],
            resolutions: [1.4966072995194117, 0.7483036497597059, 0.37415182487985293, 0.18707591243992647,
            0.09353795621996323, 0.04676897810998162]
        },
		map = new SuperMap.Map("map"),
        layer = new SuperMap.Layer.SimpleCachedLayer(name, url, layerName, options);
	map.addLayer(layer);
    var xyz = {x: 0, y: 0, z: 0},
        tileUrl = url + "/" + layerName + "_" + layer.tileSize.w + "x" + layer.tileSize.h + "/" 
            + Math.round(1/options.scales[xyz.z]) + "/" + xyz.x + "/" + xyz.y + "." + layer.format;
    equals(layer.getTileUrl(xyz), tileUrl, "tileUrl");
});
test("TestSimpleCachedLayer_destroy",function () {
    expect(13);
    var name = "World",
        url = "http://localhost:8090/iserver/output/cache",
        layerName = "World Map",
        options = {
            scales: [1/500000000, 1/250000000, 1/125000000, 1/62500000
            , 1/31250000, 1/15625000],
            resolutions: [1.4966072995194117, 0.7483036497597059, 0.37415182487985293, 0.18707591243992647,
            0.09353795621996323, 0.04676897810998162]
        },
        layer = new SuperMap.Layer.SimpleCachedLayer(name, url, layerName, options); 
    ok(layer instanceof SuperMap.Layer.SimpleCachedLayer, "layer instanceof SuperMap.Layer.SimpleCachedLayer");
    layer.destroy();
    //SuperMap.Layer的destroy方法
    ok(layer.format == null, "format");
    ok(layer.dpi == null, "dpi");
    ok(layer.viewBounds == null, "viewBounds");
    ok(layer.viewer == null, "viewer");
    ok(layer.scale == null, "scale");
    ok(layer.tileSize == null, "tileSize");
    ok(layer.tileOriginCorner == null, "tileOriginCorner");
    ok(layer.isBaseLayer == null, "isBaseLayer");
    //SuperMap.Layer的destroy方法
    ok(layer.url == null, "url");
    ok(layer.name == null, "name");
    //SuperMap.Layer.SimpleCachedLayer的destroy方法
    ok(layer.layerName == null, "layerName");
    ok(layer.urlTemplate == null, "urlTemplate");
});
test("TestSimpleCachedLayer_clone",function () {
    expect(8);
    var name = "World",
        url = "http://localhost:8090/iserver/output/cache",
        layerName = "World Map",
        options = {
            scales: [1/500000000, 1/250000000, 1/125000000, 1/62500000
            , 1/31250000, 1/15625000],
            resolutions: [1.4966072995194117, 0.7483036497597059, 0.37415182487985293, 0.18707591243992647,
            0.09353795621996323, 0.04676897810998162]
        },
        layer, layer_clone;
    layer = new SuperMap.Layer.SimpleCachedLayer(name, url, layerName, options); 
    layer_clone = layer.clone();
    ok(layer_clone instanceof SuperMap.Layer.SimpleCachedLayer, "layer instanceof SuperMap.Layer.SimpleCachedLayer");
    equals(layer.name, layer_clone.name, "name");
    equals(layer.url, layer_clone.url, "url");
    equals(layer.format, layer_clone.format, "format");
    equals(layer.layerName, layer_clone.layerName, "layerName");
    equals(layer.isBaseLayer, layer_clone.isBaseLayer, "isBaseLayer");
    deepEqual(layer.tileSize, layer_clone.tileSize, "tileSize");
    equals(layer.tileOriginCorner, layer_clone.tileOriginCorner, "tileOriginCorner");
});
test("TestSimpleCachedLayer_initResolutionsMap", function () {
    expect(3);
    var name = "SimpleCachedLayer",
        url = "http://localhost:8090/iserver/output/cache",
        layerName = "World Map",
        urlTemplate = "${layerName}_${w}x${h}/${scale}/${x}/${y}.${format}",
        options = {
            scales: [1/500000000, 1/250000000, 1/125000000, 1/62500000
            , 1/31250000, 1/15625000],
            resolutions: [1.4966072995194117, 0.7483036497597059, 0.37415182487985293, 0.18707591243992647,
            0.09353795621996323, 0.04676897810998162]
        },
        map = new SuperMap.Map('map', options),
        layer = new SuperMap.Layer.SimpleCachedLayer(name, url, layerName, {}); 
    map.addLayer(layer);
    ok(layer instanceof SuperMap.Layer.SimpleCachedLayer, "layer instanceof SuperMap.Layer.SimpleCachedLayer");
    deepEqual(layer.scales, options.scales, "scales");
    deepEqual(layer.resolutions, options.resolutions, "resolutions");
    map.destroy();
});
test("TestSimpleCachedLayer_getXYZ", function () {
    expect(1);
    var name = "SimpleCachedLayer",
        url = "http://localhost:8090/iserver/output/cache",
        layerName = "World Map",
        urlTemplate = "${layerName}_${w}x${h}/${scale}/${x}/${y}.${format}",
        options = {
            scales: [1/500000000, 1/250000000, 1/125000000, 1/62500000
            , 1/31250000, 1/15625000],
            resolutions: [1.4966072995194117, 0.7483036497597059, 0.37415182487985293, 0.18707591243992647,
            0.09353795621996323, 0.04676897810998162]
        },
        map = new SuperMap.Map('map'),
        layer = new SuperMap.Layer.SimpleCachedLayer(name, url, layerName, options); 
    map.addLayer(layer);
    map.setCenter(new SuperMap.LonLat(0, 0), 0);
    deepEqual(layer.getXYZ(new SuperMap.Bounds(-180, -90, 180, 90)), {x:0, y:0, z:0}, "getXYZ")
    map.destroy();
});

test("TestSimpleCachedLayer_UrlIsArray", function () {
    //测试getTileUrl方法，构造用于测试的xyz值，测试返回值与预期值是否相等。（预期值为手动构造的）。
    var name = "World",
        url = ["http://localhost:8090/iserver/output/cache","http://localhost:8090/iserver/output/cache"]
        layerName = "World Map",
        options = {
            scales: [1/500000000, 1/250000000, 1/125000000, 1/62500000
            , 1/31250000, 1/15625000],
            resolutions: [1.4966072995194117, 0.7483036497597059, 0.37415182487985293, 0.18707591243992647,
            0.09353795621996323, 0.04676897810998162]
        };
		var map = new SuperMap.Map("map");
        var layer = new SuperMap.Layer.SimpleCachedLayer(name, url, layerName, options);
		var xyz = {x: 0, y: 0, z: 0};
	map.addLayer(layer);       
    equals(layer.getTileUrl(xyz), "http://localhost:8090/iserver/output/cache/World Map_256x256/500000000/0/0.png", "tileUrl");
});
