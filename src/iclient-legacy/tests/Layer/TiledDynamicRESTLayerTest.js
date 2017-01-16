module("TiledDynamicRESTLayer");
   
test("TestTiledDynamicRESTLayer_constructorUrls", function () {
    urls = [GlobeParameter.mapServiceURL + "World Map1",GlobeParameter.mapServiceURL + "World Map2"];
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", urls, {transparent: true, cacheEnabled: true}, {maxResolution:"auto"});

    var s = "" + 1+1;
    equals(urls[1], layer.selectUrl(s,urls), "urls");
});

test("TestTiledDynamicRESTLayer_constructorDefault", function () {
    expect(9);
    var options = {
            viewBounds: new SuperMap.Bounds(84.30460372171433, 15.704362017314319, 108.04279582068568, 39.442554116285685),
            viewer: new SuperMap.Size(256,256),
            scale: 2.563206512274041E-8,
            units: "degree"
        },
        dpi = 95.99999999998124,
        url = GlobeParameter.mapServiceURL + "World Map",
        name = "TiledDynamicRESTLayer",
        map = new SuperMap.Map('map'),
        layer = new SuperMap.Layer.TiledDynamicRESTLayer(name, url, {}, options); 
    map.addLayer(layer);
    ok(layer instanceof SuperMap.Layer.TiledDynamicRESTLayer,"layer instanceof SuperMap.Layer.TiledDynamicRESTLayer");
    equals(layer.name, name, "name");
    equals(layer.CLASS_NAME, "SuperMap.Layer.TiledDynamicRESTLayer", "CLASS_NAME");
    equals(layer.url, url, "url");
    equals(layer.format, "png", "format");
    //equals(layer.dpi, dpi, "dpi");
    equals(layer.isBaseLayer, true, "isBaseLayer");
    deepEqual(layer.viewBounds, options.viewBounds, "viewBounds");
    deepEqual(layer.viewer, options.viewer, "viewer");
    deepEqual(layer.scale, options.scale, "scale");
    map.destroy();
});
test("TestTiledDynamicRESTLayer_constructorOptions", function () {
    expect(3);
    var options = {
            viewBounds: new SuperMap.Bounds(84.30460372171433, 15.704362017314319, 108.04279582068568, 39.442554116285685),
            viewer: new SuperMap.Size(256,256),
            scale: 2.563206512274041E-8,
            isBaseLayer: false,
            format: "jpg",
            units: "Degree"
        },
        url = GlobeParameter.mapServiceURL + "World Map",
        name = "TiledDynamicRESTLayer",
        layer = new SuperMap.Layer.TiledDynamicRESTLayer(name, url, {}, options); 
    ok(layer instanceof SuperMap.Layer.TiledDynamicRESTLayer,"layer instanceof SuperMap.Layer.TiledDynamicRESTLayer");
    equals(layer.format, "jpg", "format");
    equals(layer.isBaseLayer, false, "baseLayer");
});
test("TestTiledDynamicRESTLayer_constructorDefaultParams", function () {
    expect(4);
    var options = {
            viewBounds: new SuperMap.Bounds(84.30460372171433, 15.704362017314319, 108.04279582068568, 39.442554116285685),
            viewer: new SuperMap.Size(256,256),
            scale: 2.563206512274041E-8,
            units: "Degree"
        },
        url = GlobeParameter.mapServiceURL + "World Map",
        name = "TiledDynamicRESTLayer",
        layer = new SuperMap.Layer.TiledDynamicRESTLayer(name, url, null, options);
    equals(layer.params.transparent, false , "transparent");
    //equals(layer.params.maxVisibleVertex, 360000 , "maxVisibleVertex");
    equals(layer.params.cacheEnabled, true , "cacheEnabled");
    equals(layer.params.clipRegion, undefined , "clipRegion");
    equals(layer.params.clipRegionEnabled, undefined , "clipRegionEnabled");
});
test("TestTiledDynamicRESTLayer_constructorParams", function () {
    expect(9);
    var layer, layer2, layer3,
        options = {
            viewBounds: new SuperMap.Bounds(84.30460372171433, 15.704362017314319, 108.04279582068568, 39.442554116285685),
            viewer: new SuperMap.Size(256,256),
            scale: 2.563206512274041E-8,
            units: "Degree"
        },
        url = GlobeParameter.mapServiceURL + "World Map",
        name = "TiledDynamicRESTLayer",
        pointList = [new SuperMap.Geometry.Point(-180, -90),  new SuperMap.Geometry.Point(0, -90),
            new SuperMap.Geometry.Point(0, 90), new SuperMap.Geometry.Point(-180, 90), 
            new SuperMap.Geometry.Point(-180, -90)],
        linearRing = new SuperMap.Geometry.LinearRing(pointList),
        geometry = new SuperMap.Geometry.Polygon([linearRing]),
        params = {
            "transparent": true,
            "maxVisibleVertex": 10000,
            "cacheEnabled": false,
            "clipRegion": geometry
        };
    layer = new SuperMap.Layer.TiledDynamicRESTLayer(name, url, params, options);
    equals(layer.params.transparent, true, "transparent");
    equals(layer.params.maxVisibleVertex, 10000, "maxVisibleVertex");
    equals(layer.params.cacheEnabled, false, "cacheEnabled");
    
    var points = eval("(" + layer.params.clipRegion + ")").points;
    var iString = "points[0]=" + points[0].x + "," +  points[0].y + ";points[2]=" + points[2].x + "," +  points[2].y + ";"
    var expectString = "points[0]=-180,-90;points[2]=0,90;"
    equals(iString, expectString, "clipRegion");
    equals(layer.params.clipRegionEnabled, true, "clipRegionEnabled");
    params = {
        "clipRegion": "aa",
        "transparent": true
    }
    options.format = "jpg";
    layer2 = new SuperMap.Layer.TiledDynamicRESTLayer(name, url, params, options);
    ok(layer2.params.clipRegion === undefined, "clipRegion");
    ok(layer2.params.clipRegionEnabled === undefined, "clipRegionEnabled");
    equals(layer2.format, "png", "format_jpg");
    options.format = "bmp";
    layer3 = new SuperMap.Layer.TiledDynamicRESTLayer(name, url, params, options);
    equals(layer3.format, "png", "format_bmp");
});
test("TestTiledDynamicRESTLayer_mergeNewParams", function () {
    expect(6);
    var options = {
            viewBounds: new SuperMap.Bounds(84.30460372171433, 15.704362017314319, 108.04279582068568, 39.442554116285685),
            viewer: new SuperMap.Size(256,256),
            scale: 2.563206512274041E-8,
            units: "Degree"
        },
        url = GlobeParameter.mapServiceURL + "World Map",
        name = "TiledDynamicRESTLayer",
        pointList = [new SuperMap.Geometry.Point(-180, -90),  new SuperMap.Geometry.Point(0, -90),
            new SuperMap.Geometry.Point(0, 90), new SuperMap.Geometry.Point(-180, 90), 
            new SuperMap.Geometry.Point(-180, -90)],
        linearRing = new SuperMap.Geometry.LinearRing(pointList),
        geometry = new SuperMap.Geometry.Polygon([linearRing]),
        params = {
            "transparent": true,
            "maxVisibleVertex": 10000,
            "cacheEnabled": false,
            "clipRegion": geometry
        },
        layer = new SuperMap.Layer.TiledDynamicRESTLayer(name, url, params, options);
    layer.mergeNewParams ({
        "transparent": false,
        "maxVisibleVertex": 360000,
        "cacheEnabled": true,
        "clipRegion": "aa"
    });
    equals(layer.params.transparent, false, "transparent");
    equals(layer.params.maxVisibleVertex, 360000, "maxVisibleVertex");
    equals(layer.params.cacheEnabled, true, "cacheEnabled");
    
    var points = eval("(" + layer.params.clipRegion + ")").points;
    var iString = "points[0]=" + points[0].x + "," +  points[0].y + ";points[2]=" + points[2].x + "," +  points[2].y + ";"
    var expectString = "points[0]=-180,-90;points[2]=0,90;"
    equals(iString, expectString, "clipRegion");
    equals(layer.params.clipRegionEnabled, true, "clipRegionEnabled");
    pointList = [new SuperMap.Geometry.Point(-180, -90),  new SuperMap.Geometry.Point(180, -90),
            new SuperMap.Geometry.Point(180, 90), new SuperMap.Geometry.Point(-180, 90), 
            new SuperMap.Geometry.Point(-180, -90)];
    linearRing = new SuperMap.Geometry.LinearRing(pointList);
    geometry = new SuperMap.Geometry.Polygon([linearRing]);
    layer.mergeNewParams ({
        "clipRegion": geometry
    });
    
    var points = eval("(" + layer.params.clipRegion + ")").points;
    var iString = "points[0]=" + points[0].x + "," +  points[0].y + ";points[2]=" + points[2].x + "," +  points[2].y + ";"
    var expectString = "points[0]=-180,-90;points[2]=180,90;"
    equals(iString, expectString, "clipRegion");

});
test("TestTiledDynamicRESTLayer_destroy", function () {
    expect(12);
    var options = {
            viewBounds: new SuperMap.Bounds(84.30460372171433, 15.704362017314319, 108.04279582068568, 39.442554116285685),
            viewer: new SuperMap.Size(256,256),
            scale: 2.563206512274041E-8,
            units: "Degree"
        },
        url = GlobeParameter.mapServiceURL + "World Map",
        name = "TiledDynamicRESTLayer",
        layer = new SuperMap.Layer.TiledDynamicRESTLayer(name, url, {}, options); 
    layer.destroy();
    ok(layer != null, "layer is not null");
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
    //SuperMap.Layer.TiledDenamicRestLayer的destroy方法
    ok(layer.DEFAULT_PARAMS == null, "DEFAULT_PARAMS");
});
test("TestTiledDynamicRESTLayer_clone", function () {
    expect(11);
    var layer_clone, layer,
        url = GlobeParameter.mapServiceURL + "World Map",
        name = "TiledDynamicRESTLayer",
        options = {
            viewBounds: new SuperMap.Bounds(84.30460372171433, 15.704362017314319, 108.04279582068568, 39.442554116285685),
            viewer: new SuperMap.Size(256,256),
            scale: 2.563206512274041E-8,
            units: "Degree"
        };
    layer = new SuperMap.Layer.TiledDynamicRESTLayer(name, url, {}, options); 
    layer.name = "chanchun";
    layer.isBaseLayer = false;
    layer.format = "gif";
    layer_clone = layer.clone();
    ok(layer_clone instanceof SuperMap.Layer.TiledDynamicRESTLayer,"layer instanceof SuperMap.Layer.TiledDynamicRESTLayer");
    equals(layer.name, layer_clone.name, "name");
    equals(layer.url, layer_clone.url, "url");
    equals(layer.format, layer_clone.format, "format");
    equals(layer.dpi, layer_clone.dpi, "dpi");
    equals(layer.isBaseLayer, layer_clone.isBaseLayer, "isBaseLayer");
    deepEqual(layer.tileSize, layer_clone.tileSize, "tileSize");
    equals(layer.tileOriginCorner, layer_clone.tileOriginCorner, "tileOriginCorner");
    deepEqual(layer.viewBounds, layer_clone.viewBounds, "viewBounds");
    deepEqual(layer.viewer, layer_clone.viewer, "viewer");
    deepEqual(layer.scale, layer_clone.scale, "scale");
});

test("TestTiledDynamicRESTLayer_getTileUrl", function () {
    expect(2);
    var options = {
            scales: [1/500000000, 1/250000000, 1/125000000, 1/62500000
            , 1/31250000, 1/15625000],
            resolutions: [1.4966072995194117, 0.7483036497597059, 0.37415182487985293, 0.18707591243992647,
            0.09353795621996323, 0.04676897810998162], units: "Degree"
        },
        url = GlobeParameter.mapServiceURL + "World Map",
        name = "TiledDynamicRESTLayer",
        xyz = {x: 0, y: 0, z: 0},
        map = new SuperMap.Map("map"),
        layer = new SuperMap.Layer.TiledDynamicRESTLayer(name, url, {overlapDisplayed:false}, options);
    map.addLayer(layer);
    var tileUrl = GlobeParameter.mapServiceURL + "World Map" + "/tileImage." 
            + layer.format + "?"
            + "transparent=" + layer.params.transparent + "&cacheEnabled=" 
            + layer.params.cacheEnabled + "&width=" + layer.tileSize.w 
            + "&height=" + layer.tileSize.h + "&x=" + xyz.x + "&y=" + xyz.y 
            + "&scale=" + options.scales[xyz.z] + "&redirect=false" + (layer.token?"&_token=" + layer.token:"") + "&overlapDisplayed=false";//&overlapDisplayedOptions={'allowPointOverlap':true,'allowPointWithTextDisplay':true,'allowTextOverlap':false,'allowTextAndPointOverlap':true,'allowThemeGraduatedSymbolOverlap':false,'allowThemeGraphOverlap':false,'horizontalOverlappedSpaceSize':0,'verticalOverlappedSpaceSize':0}";
    //equals(layer.getTileUrl(xyz), tileUrl, "tileUrl");
    ok(layer.getTileUrl(xyz).indexOf(tileUrl)>=0, "tileUrl");
    layer.mergeNewParams({
        "cacheEnabled": false
    });
    var t = new Date().getTime();
    tileUrl = GlobeParameter.mapServiceURL + "World Map" + "/tileImage." 
        + layer.format + "?"
        + "transparent=" + layer.params.transparent + "&cacheEnabled=" 
        + layer.params.cacheEnabled + "&width=" + layer.tileSize.w 
        + "&height=" + layer.tileSize.h + "&x=" + xyz.x + "&y=" + xyz.y 
        + "&scale=" + options.scales[xyz.z] + "&redirect=false" + (layer.token?"&_token=" + layer.token:"") + "&t=" 
        + new Date().getTime() + "&overlapDisplayed=false";//&overlapDisplayedOptions={'allowPointOverlap':true,'allowPointWithTextDisplay':true,'allowTextOverlap':false,'allowTextAndPointOverlap':true,'allowThemeGraduatedSymbolOverlap':false,'allowThemeGraphOverlap':false,'horizontalOverlappedSpaceSize':0,'verticalOverlappedSpaceSize':0}";   ;
    //equals(layer.getTileUrl(xyz), tileUrl, "tileUrl");
    ok(layer.getTileUrl(xyz).indexOf(tileUrl)>=0, "tileUrl");
});
test("TestTiledDynamicRESTLayer_initResolutions", function () {
    expect(8);
    var options = {
            viewBounds: new SuperMap.Bounds(84.30460372171433, 15.704362017314319, 108.04279582068568, 39.442554116285685),
            viewer: new SuperMap.Size(256,256),
            scale: 2.563206512274041E-8,
            dpi: 96,
            scales: [1.9999999999999993e-9, 3.999999999999999e-9, 7.999999999999997e-9, 1.5999999999999994e-8
                , 3.199999999999999e-8, 6.399999999999998e-8], units: "Degree"
        },
        dpi = 96,
        url = GlobeParameter.mapServiceURL + "World Map",
        name = "TiledDynamicRESTLayer",
        map = new SuperMap.Map('map'),
        layer = new SuperMap.Layer.TiledDynamicRESTLayer(name, url, {}, options); 
    map.addLayer(layer);
    ok(layer instanceof SuperMap.Layer.TiledDynamicRESTLayer,"layer instanceof SuperMap.Layer.TiledDynamicRESTLayer");
    deepEqual(layer.resolutions, layer.resolutionsFromScales(options.scales), "resolutions");
    deepEqual(layer.scales, options.scales, "scales");
    equals(layer.numZoomLevels, options.scales.length, "numZoomLevels");
    equals(layer.maxScale, SuperMap.Util.getScaleFromResolutionDpi(layer.resolutions[layer.numZoomLevels-1], dpi, "degree"), "maxScale");
    equals(layer.minScale, SuperMap.Util.getScaleFromResolutionDpi(layer.resolutions[0], dpi, "degree"), "minScale");
    equals(layer.maxResolution, SuperMap.Util.getResolutionFromScaleDpi(layer.scales[0], dpi, "degree"), "maxResolution");
    equals(layer.minResolution, SuperMap.Util.getResolutionFromScaleDpi(layer.scales[layer.numZoomLevels-1], dpi, "degree"), "minResolution");
    map.destroy();
});
test("TestTiledDynamicRESTLayer_initResolutions2", function () {
    expect(7);
    var options = {
            viewBounds: new SuperMap.Bounds(84.30460372171433, 15.704362017314319, 108.04279582068568, 39.442554116285685),
            viewer: new SuperMap.Size(256,256),
            scale: 2.563206512274041E-8,
            maxScale: 6.399999999999998e-8,
            minScale: 1.9999999999999993e-9, 
            units: "Degree"
        },
        dpi = 96,
        url = GlobeParameter.mapServiceURL + "World Map",
        name = "TiledDynamicRESTLayer",
        map = new SuperMap.Map('map'),
        layer = new SuperMap.Layer.TiledDynamicRESTLayer(name, url, {}, options); 
    
    ok(layer instanceof SuperMap.Layer.TiledDynamicRESTLayer,"layer instanceof SuperMap.Layer.TiledDynamicRESTLayer");
    
    equals(layer.maxScale, options.maxScale, "maxScale");
    equals(layer.minScale, options.minScale, "minScale");
	map.addLayer(layer);
	deepEqual(layer.resolutions, layer.calculateResolutions(options), "resolutions");
    equals(layer.maxResolution, -1, "maxResolution");
    equals(layer.minResolution, -1, "minResolution");
    equals(layer.numZoomLevels, layer.resolutions.length, "numZoomLevels");
	
    map.destroy();
}); 

test("TestTiledDynamicRESTLayer_LayersID", function () {
    var options = {
            scales: [1/500000000, 1/250000000, 1/125000000, 1/62500000
            , 1/31250000, 1/15625000],
            resolutions: [1.4966072995194117, 0.7483036497597059, 0.37415182487985293, 0.18707591243992647,
            0.09353795621996323, 0.04676897810998162], units: "Degree"
        },
        url = GlobeParameter.mapServiceURL + "World Map",
        name = "TiledDynamicRESTLayer",
        xyz = {x: 0, y: 0, z: 0},
        map = new SuperMap.Map('map'),
        layer = new SuperMap.Layer.TiledDynamicRESTLayer(name, url, {layersID:""}, options),
        layer2 = new SuperMap.Layer.TiledDynamicRESTLayer(name, url, {layersID:"layersID"}, options);
    map.addLayer(layer,layer2);
    equals(layer.params.layersID, undefined, "layersID");
    equals(layer2.params.layersID, "layersID", "layersID");
});

test("TestTiledDynamicRESTLayer_UrlIsArray", function () {
    var options = {
            scales: [1/500000000, 1/250000000, 1/125000000, 1/62500000
            , 1/31250000, 1/15625000],
            resolutions: [1.4966072995194117, 0.7483036497597059, 0.37415182487985293, 0.18707591243992647,
            0.09353795621996323, 0.04676897810998162], units: "Degree"
        },
        url = "http://192.168.169.211:8090/iserver/services/map-world/rest/maps/World Map/tileImage.png?maxVisibleVertex=360000&transparent=false&cacheEnabled=false&width=256&height=256&x=0&y=0&scale=2e-9&redirect=false&t=1322720868913",
        name = "TiledDynamicRESTLayer",
        xyz = {x: 0, y: 0, z: 0},
        map = new SuperMap.Map('map'),
        layer = new SuperMap.Layer.TiledDynamicRESTLayer(name, url, {layersID:"layersID"}, options);
    map.addLayer(layer);
    var tileUrl =  layer.getTileUrl(xyz);
    equals(layer.url, url, "url");
});

test("TestTiledDynamicRESTLayer_Token",function(){
	expect(1);
    var options = {
            scales: [1/500000000, 1/250000000, 1/125000000, 1/62500000
            , 1/31250000, 1/15625000],
            resolutions: [1.4966072995194117, 0.7483036497597059, 0.37415182487985293, 0.18707591243992647,
            0.09353795621996323, 0.04676897810998162], units: "Degree"
        },
        url = GlobeParameter.mapServiceURL + "World",
        name = "TiledDynamicRESTLayer",
        xyz = {x: 0, y: 0, z: 0},
        map = new SuperMap.Map("map"),
        layer = new SuperMap.Layer.TiledDynamicRESTLayer(name, url, {token:88888}, options);
    map.addLayer(layer);
	ok(layer.getTileUrl(xyz).indexOf("token=88888")>0,"token=88888 exist");
});
