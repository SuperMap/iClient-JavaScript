module("Image");

test("TestImage_constructorDefault", function () {
    expect(10);
    var name="Image",
        url="Images/Day.jpg",
        bounds= new SuperMap.Bounds(-180, -90, 180, 90),

        layer=new SuperMap.Layer.Image(name,url,bounds);

    ok(layer instanceof SuperMap.Layer.Image, "layer instanceof SuperMap.Layer.Image");
    equals(layer.name, name, "name");
    equals(layer.CLASS_NAME, "SuperMap.Layer.Image", "CLASS_NAME");
    equals(layer.isBaseLayer, true, "isBaseLayer");
    equals(layer.extent, bounds, "extent");
    equals(layer.url, url, "url");
    //equals(layer.useCanvas, true, "useCanvas");           //测试时不一定都是支持canvas的浏览器
    equals(layer.changeDx, 0, "changeDx");
    equals(layer.changeDy, 0, "changeDy");
    equals(layer.memoryImg, null, "memoryImg");
    equals(layer.tile, null, "tile");
});
test("TestImage_destroy",function () {
    expect(9);
    var name="Image",
        url="Images/Day.jpg",
        bounds= new SuperMap.Bounds(-180, -90, 180, 90),

        layer=new SuperMap.Layer.Image(name,url,bounds);
    layer.destroy();
    ok(layer.url == null, "url");
    ok(layer.name == null, "name");
    ok(layer.useCanvas == true, "useCanvas");
    ok(layer.extent == null, "extent");
    ok(layer.changeDx == 0, "changeDx");
    ok(layer.changeDy == 0, "changeDy");
    ok(layer.memoryImg == null, "memoryImg");
    ok(layer.tile == null, "tile");
    ok(layer.isBaseLayer == true, "isBaseLayer");
});

test("TestImage_clone", function() {
	expect(6);
	var obj = null,
		name = "Image",
        url = "Images/Day.jpg",
        bounds = new SuperMap.Bounds(-180, -90, 180, 90),
        imageLayer = new SuperMap.Layer.Image(name,url,bounds);
    var newObj = imageLayer.clone(obj);
    equals(newObj.name, imageLayer.name, "Function:clone");
    equals(newObj.url, imageLayer.url, "Function:clone");
    equals(newObj.extent.left, imageLayer.extent.left, "Function:clone");
    equals(newObj.extent.bottom, imageLayer.extent.bottom, "Function:clone");
    equals(newObj.extent.right, imageLayer.extent.right, "Function:clone");
    equals(newObj.extent.top, imageLayer.extent.top, "Function:clone");
});

test("TestImage_moveTo", function() {
	expect(12);
	var zoomeChanged = true,
		dragging =true.
		name = "Image",
        url = "Images/Day.jpg",
        bounds = new SuperMap.Bounds(-180, -90, 180, 90),
        imageLayer = new SuperMap.Layer.Image(name,url,bounds);
    var param={
        name:"China",
        url:GlobeParameter.ChinaURL,
        params:{cacheEnabled:true},
    };
    var layer=new SuperMap.Layer.TiledVectorLayer(param.name,param.url,param.params,param.options);
    var map = new SuperMap.Map({
        div:"map",
        layers:[layer],
        center:new SuperMap.LonLat(0,0),
        zoom:0
    });
    imageLayer.map = map;
 	imageLayer.useCanvas = true;
    var newBounds = new SuperMap.Bounds([20, 10, 100, 80]);
    imageLayer.moveTo(newBounds, zoomeChanged, dragging);
    ok(imageLayer.tile instanceof SuperMap.Tile, "Function:moveTo");
    equals(imageLayer.tile.CLASS_NAME, "SuperMap.Tile.CanvasImage", "Function:moveTo");
    
    imageLayer.moveTo(newBounds, zoomeChanged, dragging);
    equals(imageLayer.tile.position.x, 122, "Function:moveTo");
    equals(imageLayer.tile.position.y, 186, "Function:moveTo");
    equals(imageLayer.tile.position.CLASS_NAME, "SuperMap.Pixel", "Function:moveTo");
    
    imageLayer.useCanvas = false;
    imageLayer.tile = null;
    imageLayer.moveTo(newBounds, zoomeChanged, dragging);
    ok(imageLayer.tile instanceof SuperMap.Tile, "Function:moveTo");
    equals(imageLayer.tile.CLASS_NAME, "SuperMap.Tile.Image", "Function:moveTo");
    
    imageLayer.moveTo(newBounds, zoomeChanged, dragging);
    equals(imageLayer.tile.position.x, imageLayer.tileOriginPx.x, "Function:moveTo");
    equals(imageLayer.tile.position.y, imageLayer.tileOriginPx.y, "Function:moveTo");
    equals(imageLayer.tile.position.CLASS_NAME, imageLayer.tileOriginPx.CLASS_NAME, "Function:moveTo");
    
    equals(imageLayer.tile.frame.style.display, "", "Function:moveTo");
    equals(imageLayer.tile.imgDiv.style.opacity, "1", "Function:moveTo");
});

test("TestImage_moveByPx", function() {
	expect(2);
	var zoomeChanged = true,
		dragging =true.
		name = "Image",
        url = "Images/Day.jpg",
        bounds = new SuperMap.Bounds(-180, -90, 180, 90),
        imageLayer = new SuperMap.Layer.Image(name,url,bounds);
    var param={
        name:"China",
        url:GlobeParameter.ChinaURL,
        params:{cacheEnabled:true},
    };
    var layer=new SuperMap.Layer.TiledVectorLayer(param.name,param.url,param.params,param.options);
    var map = new SuperMap.Map({
        div:"map",
        layers:[layer],
        center:new SuperMap.LonLat(0,0),
        zoom:0
    });
    imageLayer.map = map;
    imageLayer.useCanvas = true;
    var newBounds = new SuperMap.Bounds([20, 10, 100, 80]);
    imageLayer.moveTo(newBounds, zoomeChanged, dragging);
    imageLayer.moveByPx(10, 20);
    equals(imageLayer.changeDx, 10, "Function:moveByPx");
    equals(imageLayer.changeDy, 20, "Function:moveByPx");
});

test("TestImage_drawCanvasTile", function() {
	
	var zoomeChanged = true,
		dragging =true.
		name = "Image",
        url = "Images/Day.jpg",
        bounds = new SuperMap.Bounds(-180, -90, 180, 90),
        imageLayer = new SuperMap.Layer.Image(name,url,bounds);
    var param={
        name:"China",
        url:GlobeParameter.ChinaURL,
        params:{cacheEnabled:true},
    };
    var layer=new SuperMap.Layer.TiledVectorLayer(param.name,param.url,param.params,param.options);
    var map = new SuperMap.Map({
        div:"map",
        layers:[layer],
        center:new SuperMap.LonLat(0,0),
        zoom:0
    });
    imageLayer.map = map;
    imageLayer.useCanvas = true;
    var newBounds = new SuperMap.Bounds([20, 10, 100, 80]);
    imageLayer.moveTo(newBounds, zoomeChanged, dragging);
    var position = {
    	x: 0,
    	y: 0
    };
    var image = imageLayer.tile.lastImage;
    imageLayer.drawCanvasTile(image, position);
    equals(imageLayer.canvas.width, 500, "Function:drawCanvasTile");
    equals(imageLayer.canvas.height, 500, "Function:drawCanvasTile");
});

test("TestImage_getMemoryImg", function() {
	expect(1);
	var name = "Image",
        url = "Images/Day.jpg",
        bounds = new SuperMap.Bounds(-180, -90, 180, 90),
        imageLayer = new SuperMap.Layer.Image(name,url,bounds);
    imageLayer.memoryImg = url;
	var memoryTile = imageLayer.getMemoryImg();
	equals(memoryTile, url, "Function:getMemoryImg");
});

test("TestImage_addMemoryImg", function() {
	expect(1);
	var name = "Image",
        url = "Images/Day.jpg",
        bounds = new SuperMap.Bounds(-180, -90, 180, 90),
        imageLayer = new SuperMap.Layer.Image(name,url,bounds);
    var newBounds = new SuperMap.Bounds([20, 10, 100, 80]);
	imageLayer.addMemoryImg(newBounds, url);
	equals(imageLayer.memoryImg, url, "Function:addMemoryImg");
});

test("TestImage_getXYZ", function() {
	expect(3);
	var name = "Image",
        url = "Images/Day.jpg",
        bounds = new SuperMap.Bounds(-180, -90, 180, 90),
        imageLayer = new SuperMap.Layer.Image(name,url,bounds);
    var newBounds = new SuperMap.Bounds([20, 10, 100, 80]);
	var xyz = imageLayer.getXYZ(newBounds);
	equals(xyz.x, 0, "Function:getXYZ");
	equals(xyz.y, 0, "Function:getXYZ");
	equals(xyz.z, 0, "Function:getXYZ");
});

test("TestImage_setTileSize", function() {
	expect(2);
	var zoomeChanged = true,
		dragging =true.
		name = "Image",
        url = "Images/Day.jpg",
        bounds = new SuperMap.Bounds(-180, -90, 180, 90),
        imageLayer = new SuperMap.Layer.Image(name,url,bounds);
    var param={
        name:"China",
        url:GlobeParameter.ChinaURL,
        params:{cacheEnabled:true},
    };
    var layer=new SuperMap.Layer.TiledVectorLayer(param.name,param.url,param.params,param.options);
    var map = new SuperMap.Map({
        div:"map",
        layers:[layer],
        center:new SuperMap.LonLat(0,0),
        zoom:0
    });
    imageLayer.map = map;
    imageLayer.setTileSize();
    equals(imageLayer.tileSize.w, 256, "Function:setTileSize");
    equals(imageLayer.tileSize.h, 128, "Function:setTileSize");
});

test("TestImage_getURL", function() {
	expect(1);
	var name = "Image",
        url = "Images/Day.jpg",
        bounds = new SuperMap.Bounds(-180, -90, 180, 90),
        imageLayer = new SuperMap.Layer.Image(name,url,bounds);
	var myUrl = imageLayer.getURL();
	equals(myUrl, url, "Function:getURL");
});

test("TestImage_initResolutions", function() {
	expect(16);
	var name = "Image",
        url = "Images/Day.jpg",
        bounds = new SuperMap.Bounds(-180, -90, 180, 90),
        imageLayer = new SuperMap.Layer.Image(name,url,bounds);
    var resolutions = [
	  0.703125,
	  0.3515625,
	  0.17578125,
	  0.087890625,
	  0.0439453125,
	  0.02197265625,
	  0.010986328125,
	  0.0054931640625,
	  0.00274658203125,
	  0.001373291015625,
	  0.0006866455078125,
	  0.00034332275390625,
	  0.000171661376953125,
	  0.0000858306884765625,
	  0.00004291534423828125,
	  0.000021457672119140625,
	  0.000010728836059570312
	];
	var scales = [
		0,
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		10,
		11,
		12,
		13,
		14,
		15,
		16,
	];
	imageLayer.resolutions = resolutions;
	imageLayer.scales = scales;
	imageLayer.initResolutions();
	equals(imageLayer.maxResolution, 0.703125, "Function:initResolutions");
	equals(imageLayer.minResolution, 0.000010728836059570312, "Function:initResolutions");
	equals(imageLayer.maxScale, 16, "Function:initResolutions");
	equals(imageLayer.minScale, 0, "Function:initResolutions");
	
	imageLayer.resolutions = null;
	imageLayer.scales = null;
	imageLayer.maxResolution = null;
	imageLayer.minResolution = null;
	imageLayer.maxScale = null;
	imageLayer.minScale = null;
	imageLayer.map = null;
	var param={
        name:"China",
        url:GlobeParameter.ChinaURL,
        params:{cacheEnabled:true},
    };
    var layer=new SuperMap.Layer.TiledVectorLayer(param.name,param.url,param.params,param.options);
    var map = new SuperMap.Map({
        div:"map",
        layers:[layer],
        center:new SuperMap.LonLat(0,0),
        zoom:0,
        resolutions: resolutions,
        scales: scales
    });
    imageLayer.map = map;
	imageLayer.initResolutions();
	equals(imageLayer.resolutions.toString(), resolutions.toString(), "Function:initResolutions");
	equals(imageLayer.scales.toString(), scales.toString(), "Function:initResolutions");
	equals(imageLayer.maxResolution, 0.703125, "Function:initResolutions");
	equals(imageLayer.minResolution, 0.000010728836059570312, "Function:initResolutions");
	equals(imageLayer.maxScale, 16, "Function:initResolutions");
	equals(imageLayer.minScale, 0, "Function:initResolutions");
	
	imageLayer.resolutions = null;
	imageLayer.scales = null;
	imageLayer.maxResolution = null;
	imageLayer.minResolution = null;
	imageLayer.maxScale = null;
	imageLayer.minScale = null;
	imageLayer.map = null;
	var param={
        name:"China",
        url:GlobeParameter.ChinaURL,
        params:{cacheEnabled:true},
    };
    var layer=new SuperMap.Layer.TiledVectorLayer(param.name,param.url,param.params,param.options);
    var map = new SuperMap.Map({
        div:"map",
        layers:[layer],
        center:new SuperMap.LonLat(0,0),
        zoom:0,
    });
    layer.resolutions = resolutions;
    layer.scales = scales;
    map.baseLayer = layer;
    imageLayer.map = map;
    imageLayer.initResolutions();
	equals(imageLayer.resolutions.toString(), resolutions.toString(), "Function:initResolutions");
	equals(imageLayer.scales.toString(), "-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1", "Function:initResolutions");
	equals(imageLayer.maxResolution, 0.703125, "Function:initResolutions");
	equals(imageLayer.minResolution, 0.000010728836059570312, "Function:initResolutions");
	equals(imageLayer.maxScale, -1, "Function:initResolutions");
	equals(imageLayer.minScale, -1, "Function:initResolutions");
});

test("TestImage_calculateResolutionsLevel", function() {
	expect(2);
	var name = "Image",
        url = "Images/Day.jpg",
        bounds = new SuperMap.Bounds(-180, -90, 180, 90),
        imageLayer = new SuperMap.Layer.Image(name,url,bounds);
	var param={
        name:"China",
        url:GlobeParameter.ChinaURL,
        params:{cacheEnabled:true},
    };
    var layer=new SuperMap.Layer.TiledVectorLayer(param.name,param.url,param.params,param.options);
    var map = new SuperMap.Map({
        div:"map",
        layers:[layer],
        center:new SuperMap.LonLat(0,0),
        zoom:0,
    });
    var resolutions = [
	  0.703125,
	  0.3515625,
	  0.17578125,
	  0.087890625,
	  0.0439453125,
	  0.02197265625,
	  0.010986328125,
	  0.0054931640625,
	  0.00274658203125,
	  0.001373291015625,
	  0.0006866455078125,
	  0.00034332275390625,
	  0.000171661376953125,
	  0.0000858306884765625,
	  0.00004291534423828125,
	  0.000021457672119140625,
	  0.000010728836059570312
	];
    layer.resolutions = resolutions;
    map.baseLayer = layer;
    imageLayer.map = map;
    var resolutions1 = [
	  0.7031251,
	  0.3515625,
	  0.17578125,
	  0.087890625,
	  0.0439453125,
	  0.02197265625,
	  0.010986328125,
	  0.0054931640625,
	  0.00274658203125
	];
	var level = imageLayer.calculateResolutionsLevel(resolutions1);
	equals(level, 0, "Function:calculateResolutionsLevel");
	
	var resolutions2 = [
	  0.0439453125,
	  0.02197265625,
	  0.010986328125,
	  0.0054931640625,
	  0.00274658203125
	];
	var level = imageLayer.calculateResolutionsLevel(resolutions2);
	equals(level, 4, "Function:calculateResolutionsLevel");
});
