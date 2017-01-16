module("Tianditu");

test("TestTianditu_constructor", function() {
	expect(7);
	var tianditu = new SuperMap.Layer.Tianditu();
	equals(tianditu.name, "Tianditu", "LayerName");
	equals(tianditu.layerType, "vec", "LayerType");
	equals(tianditu.isLabel, false, "isLabelLayer");
	equals(tianditu.zOffset, 1, "LayerZOffset");
	equals(tianditu.attribution, "Data by <a style='white-space: nowrap' target='_blank' href='http://www.tianditu.com'>Tianditu</a>", "LayerAttribution");
	equals(tianditu.url, "http://t${num}.tianditu.com/DataServer?T=${type}_${proj}&x=${x}&y=${y}&l=${z}", "LayerUrl");
	ok(tianditu instanceof SuperMap.CanvasLayer, "tianditu instanceof SuperMap.CanvasLayer");	
});

test("TestTianditu_clone", function() {
	expect(6);
	var obj = null,
		tianditu = new SuperMap.Layer.Tianditu({
			isLabel: true,
			layerType: "img",
			zOffset: 10
		});
	var newObj = tianditu.clone(obj);
	equals(newObj.name, tianditu.name, "Function:clone");
	equals(newObj.layerType, tianditu.layerType, "Function:clone");
	equals(newObj.isLabel, tianditu.isLabel, "Function:clone");
	equals(newObj.zOffset, tianditu.zOffset, "Function:clone");
	equals(newObj.attribution, tianditu.attribution, "Function:clone");
	equals(newObj.url, tianditu.url, "Function:clone");
});

test("TestTianditu_getTileUrl", function() {
	expect(8);
	var xyz = {
		x: 5, 
		y: 4, 
		z: 1
	},
		tianditu = new SuperMap.Layer.Tianditu();
	tianditu.projection = "EPSG:4326";
	tianditu.isLabel = false;
	var url = tianditu.getTileUrl(xyz);
	equals(url, "http://t2.tianditu.com/DataServer?T=vec_c&x=5&y=4&l=2", "Function:getTileUrl");
	
	tianditu.isLabel = true;
	tianditu.layerType = "vec";
	var url = tianditu.getTileUrl(xyz);
	equals(url, "http://t2.tianditu.com/DataServer?T=cva_c&x=5&y=4&l=2", "Function:getTileUrl");
	
	tianditu.layerType = "img";
	var url = tianditu.getTileUrl(xyz);
	equals(url, "http://t2.tianditu.com/DataServer?T=cia_c&x=5&y=4&l=2", "Function:getTileUrl");
	
	tianditu.layerType = "ter";
	var url = tianditu.getTileUrl(xyz);
	equals(url, "http://t2.tianditu.com/DataServer?T=cta_c&x=5&y=4&l=2", "Function:getTileUrl");
	
	tianditu.projection = "";
	tianditu.isLabel = false;
	var url = tianditu.getTileUrl(xyz);
	equals(url, "http://t2.tianditu.com/DataServer?T=ter_w&x=5&y=4&l=2", "Function:getTileUrl");
	
	tianditu.isLabel = true;
	tianditu.layerType = "vec";
	var url = tianditu.getTileUrl(xyz);
	equals(url, "http://t2.tianditu.com/DataServer?T=cva_w&x=5&y=4&l=2", "Function:getTileUrl");
	
	tianditu.layerType = "img";
	var url = tianditu.getTileUrl(xyz);
	equals(url, "http://t2.tianditu.com/DataServer?T=cia_w&x=5&y=4&l=2", "Function:getTileUrl");
	
	tianditu.layerType = "ter";
	var url = tianditu.getTileUrl(xyz);
	equals(url, "http://t2.tianditu.com/DataServer?T=cta_w&x=5&y=4&l=2", "Function:getTileUrl");
});

test("TestTianditu_setMap", function() {
	expect(2);
	var map = new SuperMap.Map("map"),
		tianditu = new SuperMap.Layer.Tianditu();
	tianditu.projection = "EPSG:4326";
	equals(tianditu.map, null, "Function:setMap");
	
	tianditu.setMap(map);
	var aa = tianditu;
	equals(tianditu.map.id.split("_")[0], "SuperMap.Map", "Function:setMap");
});

test("TestTianditu_setTiandituParam", function() {
	expect(60);
	var tianditu = new SuperMap.Layer.Tianditu();
	var projection = "EPSG:4326";
	var resolutions1 = [
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
	var resolutions2 = [
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
		0.000171661376953125
	];
	var resolutions3 = [
	  78271.51695,
	  39135.758475,
	  19567.8792375,
	  9783.93961875,
	  4891.969809375,
	  2445.9849046875,
	  1222.99245234375,
	  611.496226171875,
	  305.7481130859375,
	  152.87405654296876,
	  76.43702827148438,
	  38.21851413574219,
	  19.109257067871095,
	  9.554628533935547,
	  4.777314266967774,
	  2.388657133483887,
	  1.1943285667419434
	];
	var resolutions4 = [78271.51695,39135.758475,19567.8792375,9783.93961875,4891.969809375,2445.9849046875,1222.99245234375,611.496226171875,305.7481130859375,152.87405654296876,76.43702827148438,38.21851413574219,19.109257067871095];
	tianditu.layerType = "vec";
	tianditu.setTiandituParam(projection);
	equals(tianditu.zOffset, 1, "Function:setTiandituParam");
	equals(tianditu.numZoomLevels, 17, "Function:setTiandituParam");
	equals(tianditu.units, "degree", "Function:setTiandituParam");
	equals(tianditu.maxExtent.left, -180, "Function:setTiandituParam");
	equals(tianditu.maxExtent.bottom, -90, "Function:setTiandituParam");
	equals(tianditu.maxExtent.right, 180, "Function:setTiandituParam");
	equals(tianditu.maxExtent.top, 90, "Function:setTiandituParam");
	equals(tianditu.tileOrigin.lon, -180, "Function:setTiandituParam");
	equals(tianditu.tileOrigin.lat, 90, "Function:setTiandituParam");
	equals(tianditu.resolutions.toString(), resolutions1.toString(), "Function:setTiandituParam");
	
	tianditu.layerType = "img";
	tianditu.setTiandituParam(projection);
	equals(tianditu.zOffset, 1, "Function:setTiandituParam");
	equals(tianditu.numZoomLevels, 17, "Function:setTiandituParam");
	equals(tianditu.units, "degree", "Function:setTiandituParam");
	equals(tianditu.maxExtent.left, -180, "Function:setTiandituParam");
	equals(tianditu.maxExtent.bottom, -90, "Function:setTiandituParam");
	equals(tianditu.maxExtent.right, 180, "Function:setTiandituParam");
	equals(tianditu.maxExtent.top, 90, "Function:setTiandituParam");
	equals(tianditu.tileOrigin.lon, -180, "Function:setTiandituParam");
	equals(tianditu.tileOrigin.lat, 90, "Function:setTiandituParam");
	equals(tianditu.resolutions.toString(), resolutions1.toString(), "Function:setTiandituParam");
	
	tianditu.layerType = "ter";
	tianditu.setTiandituParam(projection);
	equals(tianditu.zOffset, 1, "Function:setTiandituParam");
	equals(tianditu.numZoomLevels, 13, "Function:setTiandituParam");
	equals(tianditu.units, "degree", "Function:setTiandituParam");
	equals(tianditu.maxExtent.left, -180, "Function:setTiandituParam");
	equals(tianditu.maxExtent.bottom, -90, "Function:setTiandituParam");
	equals(tianditu.maxExtent.right, 180, "Function:setTiandituParam");
	equals(tianditu.maxExtent.top, 90, "Function:setTiandituParam");
	equals(tianditu.tileOrigin.lon, -180, "Function:setTiandituParam");
	equals(tianditu.tileOrigin.lat, 90, "Function:setTiandituParam");
	equals(tianditu.resolutions.toString(), resolutions2.toString(), "Function:setTiandituParam");
	
	var projection = "";
	
	tianditu.layerType = "vec";
	tianditu.setTiandituParam(projection);
	equals(tianditu.zOffset, 1, "Function:setTiandituParam");
	equals(tianditu.numZoomLevels, 17, "Function:setTiandituParam");
	equals(tianditu.units, "m", "Function:setTiandituParam");
	equals(tianditu.maxExtent.left, -20037508.3392, "Function:setTiandituParam");
	equals(tianditu.maxExtent.bottom, -20037508.3392, "Function:setTiandituParam");
	equals(tianditu.maxExtent.right, 20037508.3392, "Function:setTiandituParam");
	equals(tianditu.maxExtent.top, 20037508.3392, "Function:setTiandituParam");
	equals(tianditu.tileOrigin.lon, -20037508.3392, "Function:setTiandituParam");
	equals(tianditu.tileOrigin.lat, 20037508.3392, "Function:setTiandituParam");
	equals(tianditu.resolutions.toString(), resolutions3.toString(), "Function:setTiandituParam");
	
	tianditu.layerType = "img";
	tianditu.setTiandituParam(projection);
	equals(tianditu.zOffset, 1, "Function:setTiandituParam");
	equals(tianditu.numZoomLevels, 17, "Function:setTiandituParam");
	equals(tianditu.units, "m", "Function:setTiandituParam");
	equals(tianditu.maxExtent.left, -20037508.3392, "Function:setTiandituParam");
	equals(tianditu.maxExtent.bottom, -20037508.3392, "Function:setTiandituParam");
	equals(tianditu.maxExtent.right, 20037508.3392, "Function:setTiandituParam");
	equals(tianditu.maxExtent.top, 20037508.3392, "Function:setTiandituParam");
	equals(tianditu.tileOrigin.lon, -20037508.3392, "Function:setTiandituParam");
	equals(tianditu.tileOrigin.lat, 20037508.3392, "Function:setTiandituParam");
	equals(tianditu.resolutions.toString(), resolutions3.toString(), "Function:setTiandituParam");
	
	tianditu.layerType = "ter";
	tianditu.setTiandituParam(projection);
	equals(tianditu.zOffset, 1, "Function:setTiandituParam");
	equals(tianditu.numZoomLevels, 13, "Function:setTiandituParam");
	equals(tianditu.units, "m", "Function:setTiandituParam");
	equals(tianditu.maxExtent.left, -20037508.3392, "Function:setTiandituParam");
	equals(tianditu.maxExtent.bottom, -20037508.3392, "Function:setTiandituParam");
	equals(tianditu.maxExtent.right, 20037508.3392, "Function:setTiandituParam");
	equals(tianditu.maxExtent.top, 20037508.3392, "Function:setTiandituParam");
	equals(tianditu.tileOrigin.lon, -20037508.3392, "Function:setTiandituParam");
	equals(tianditu.tileOrigin.lat, 20037508.3392, "Function:setTiandituParam");
	equals(tianditu.resolutions.toString(), resolutions4.toString(), "Function:setTiandituParam");
});
