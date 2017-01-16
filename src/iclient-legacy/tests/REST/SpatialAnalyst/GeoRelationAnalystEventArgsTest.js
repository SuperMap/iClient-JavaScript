module("GeoRelationAnalystEventArgs");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
	expect(4);
	
    var eventArgs, result;
	
    result = new SuperMap.REST.GeoRelationAnalystResult();
    eventArgs = new SuperMap.REST.GeoRelationAnalystEventArgs(result,"string");

    ok(result != null, "result not null");
	ok(eventArgs != null, "eventArgs not null");
    equal(eventArgs.result, result, "eventArgs.result");
    equal(eventArgs.originResult, "string", "eventArgs.originResult");
});

//测试destroy()方法的有效性
test("TestDefaultConstructor_destroy", function () {
	expect(4);
	
    var eventArgs, result;
	
    result = new SuperMap.REST.GeoRelationAnalystResult();
    eventArgs = new SuperMap.REST.GeoRelationAnalystEventArgs(result,"string");

    ok(eventArgs.result != null, "result not null");
	ok(eventArgs != null, "eventArgs not null");
	
    eventArgs.destroy();
    
    equal(eventArgs.result, null, "eventArgs.result");
    equal(eventArgs.originResult, null, "eventArgs.originResult");
});