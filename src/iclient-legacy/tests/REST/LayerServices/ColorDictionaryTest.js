module("ColorDictionary");

test("TestContructor_toServerJSONObject", function(){
    expect(6);
	var color = new SuperMap.REST.ServerColor(20,26,27),
    info = new SuperMap.REST.ColorDictionary({
		elevation: "100.0",
		color: color
    });
    
    ok(info !== null,"not null");
    equal(info.elevation, "100.0","info.elevation");
    deepEqual(info.color, color,"info.color");
    
    var jsonObj = info.toServerJSONObject();
    ok(jsonObj != null, "jsonObj != null");
    equal(info.elevation, "100.0","info.elevation");
    deepEqual(info.color, color,"info.color");
});

test("TestDestroy", function(){
    expect(3);
    var color = new SuperMap.REST.ServerColor(20,26,27),
    info = new SuperMap.REST.ColorDictionary({
		elevation: "100.0",
		color: color
    });
    
    ok(info != null,"not null");
    info.destroy();
    ok(info.elevation === null,"info.elevation");
    ok(info.color === null,"info.color");
    
});