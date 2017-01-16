module("GeoRelationAnalystResult");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(2);

	var result = new SuperMap.REST.GeoRelationAnalystResult();

    ok(result !== null, "result not null");
    equal(result.geoRelationResults, null, "result.geoRelationResults");    
});

test("TestDefaultConstructor_custom_destroy", function () {
    expect(4);

	var result = new SuperMap.REST.GeoRelationAnalystResult({
		geoRelationResults: [new SuperMap.REST.GeoRelationResult()]
	});

    ok(result != null, "result not null");
    ok(result.geoRelationResults != null, "result.geoRelationResults"); 
	
	result.destroy();
	ok(result != null, "result not null");
    equal(result.geoRelationResults, null, "result.geoRelationResults"); 
});


test("Test_fromJson", function () {
	expect(4);
	
    var jsonObj = SuperMap.REST.GeoRelationAnalystResult.fromJson();
	var jsonObj1 = SuperMap.REST.GeoRelationAnalystResult.fromJson([{"count": 1,
							 "source": 1,
							 "result": [5,6]}]);
	
    ok(typeof jsonObj === "undefined", "undefined");
	ok(jsonObj1 !== null, "jsonObj1");
	ok(jsonObj1.geoRelationResults != null , "jsonObj1.geoRelationResults");
	equal(jsonObj1.geoRelationResults[0].source, 1, "jsonObj1.geoRelationResults[0].source");
});