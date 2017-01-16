module("GenerateSpatialDataResult");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(5);

	var result = new SuperMap.REST.GenerateSpatialDataResult();

    ok(result !== null, "result not null");
    equal(result.recordset, null, "result.recordset");    
	equal(result.dataset, null, "result.dataset");
	equal(result.succeed, null, "result.succeed");
	equal(result.message, null, "result.message");
});

test("TestDefaultConstructor_custom", function () {
    expect(5);

	var result = new SuperMap.REST.GenerateSpatialDataResult({
		recordset: new SuperMap.REST.Recordset(),
		dataset: "generateSpatialData",
		succeed: true
	});

    ok(result != null, "result not null");
    ok(result.recordset != null, "result.recordset");    
	equal(result.dataset, "generateSpatialData", "result.dataset not null");
	equal(result.succeed, true, "result.succeed");
	equal(result.message, null, "result.message");    
});

test("TestDefaultConstructor_custom_destroy", function () {
    expect(5);

	var result = new SuperMap.REST.GenerateSpatialDataResult({
		recordset: new SuperMap.REST.Recordset(),
		dataset: "generateSpatialData",
		succeed: true
	});

	result.destroy();
	
    ok(result !== null, "result not null");
    equal(result.recordset, null, "result.recordset");    
	equal(result.dataset, null, "result.dataset");
	equal(result.succeed, null, "result.succeed");
	equal(result.message, null, "result.message");    
});

test("Test_fromJson", function () {
	expect(6);
	
    var jsonObj = SuperMap.REST.GenerateSpatialDataResult.fromJson();
	var jsonObj1 = SuperMap.REST.GenerateSpatialDataResult.fromJson({
		recordset: new SuperMap.REST.Recordset(),
		dataset: "sss",
		succeed: true,
		message: null
	});
	
    ok(typeof jsonObj === "undefined", "undefined");
	ok(jsonObj1 !== null, "jsonObj1");
	ok(jsonObj1.recordset !== null, "jsonObj1.recordset");
	equal(jsonObj1.dataset, "sss", "jsonObj1.dataset");
	equal(jsonObj1.succeed, true, "jsonObj1.succeed");
	equal(jsonObj1.message, null, "jsonObj1.message");
});