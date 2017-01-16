module("HeatPoint");

test("HeatPoint_constructor",function () {
    expect(12);
    
	var heatPointDefault = new SuperMap.Layer.HeatPoint();
	equals(heatPointDefault.lon, 0.0, "default_lon = 0.0");
	equals(heatPointDefault.lat, 0.0, "default_lat = 0.0");
	equals(heatPointDefault.value, 0.0, "default_value = 0.0");
	equals(heatPointDefault.geoRadius, null, "default_geoRadius = null");
	
	var heatPoint = new SuperMap.Layer.HeatPoint({
			lon: 20,
			lat: 16,
			value: 15,
			geoRadius: 17
		});
	equals(heatPoint.lon, 20, "custom_heatPoint_lon");
	equals(heatPoint.lat, 16, "custom_heatPoint_lat");
	equals(heatPoint.value, 15, "custom_heatPoint_value");
	equals(heatPoint.geoRadius, 17, "custom_heatPoint_geoRadius");
	
	heatPoint.destroy();
	
	ok(heatPoint.lon == null, "custom_heatPoint_lon");
	ok(heatPoint.lat == null, "custom_heatPoint_lat");
	ok(heatPoint.value == null, "custom_heatPoint_value");
	ok(heatPoint.geoRadius == null, "custom_heatPoint_geoRadius");
});

