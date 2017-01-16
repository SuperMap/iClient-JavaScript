module("HeatMapLayer");

test("HeatMapLayer_constructor",function () {
    expect(6);
    
	var heatMapLayer = new SuperMap.Layer.HeatMapLayer("test");
	equals(heatMapLayer.radius, 50, "default_radius =50");
	equals(heatMapLayer.features, null, "default_features = null");
	heatMapLayer.destroy();
	heatMapLayer = new SuperMap.Layer.HeatMapLayer("test",{
		radius:30,
        features:[new SuperMap.Feature.Vector()]
		});
	
	equals(heatMapLayer.radius, 30, "heatMapLayer.radius");
	equals(heatMapLayer.features.length, 1, "heatMapLayer.features");
	
	heatMapLayer.destroy();
	
	ok(heatMapLayer.radius == null, ".heatMapLayer.radius");
	ok(heatMapLayer.features == null, "heatMapLayer.features");
});

test("heatMapLayer_controlPoints",function(){
	var heatMapLayer = new SuperMap.Layer.HeatMapLayer("test",{
        "featureWeight":"value"
    });
	var heatPoints = [];
	for(var i = 0; i< 10; i++){
		//heatPoints.push(new SuperMap.Layer.HeatPoint({lon:0,lat:0,value:5}));
        heatPoints.push(new SuperMap.Feature.Vector(new SuperMap.Geometry.Point( 0,0),{
            "value":5
        }));
	}
	heatMapLayer.addFeatures(heatPoints);
	equals(heatMapLayer.features.length, 10, "addFeatures_complete");
	
	heatMapLayer.removeFeatures(heatPoints.slice(0,5));
	equals(heatMapLayer.features.length, 5, "removefeatures_complete");
	
	heatMapLayer.removeAllFeatures();
	equals(heatMapLayer.features.length, 0, "removeAllFeatures_complete");
});
test("HeatMapLayer_featureRadius",function () {
    expect(4);
    var heatMapLayer = new SuperMap.Layer.HeatMapLayer("test",{
        featureRadius:20,
        features:[new SuperMap.Feature.Vector()]
    });
    equals(heatMapLayer.featureRadius, 20, "heatMapLayer.featureRadius");
    equals(heatMapLayer.features.length, 1, "heatMapLayer.features");
    heatMapLayer.destroy();
    ok(heatMapLayer.featureRadius == null, "heatMapLayer.featureRadius");
    ok(heatMapLayer.features == null, "heatMapLayer.features");
});
test("HeatMapLayer_colors",function () {
    expect(4);
    var heatMapLayer = new SuperMap.Layer.HeatMapLayer("test"),
    colors = [new SuperMap.REST.ServerColor(170,240,233)];
    heatMapLayer.colors = colors;
    equals(heatMapLayer.colors[0].red, 170, "heatMapLayer.colors");
    equals(heatMapLayer.colors[0].green, 240, "heatMapLayer.colors");
    equals(heatMapLayer.colors[0].blue, 233, "heatMapLayer.colors");
    heatMapLayer.destroy();
    ok(heatMapLayer.colors == null,"heatMapLayer.colors");
});

