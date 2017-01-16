module("DatasetBufferAnalystResult");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(5);

    var dsBufferAnalystResult;
    dsBufferAnalystResult = new SuperMap.REST.DatasetBufferAnalystResult();

    ok(dsBufferAnalystResult != null, "not null");
    equal(dsBufferAnalystResult.recordset, null, "dsBufferAnalystResult.recordset");
    equal(dsBufferAnalystResult.succeed, null, "dsBufferAnalystResult.succeed");
	equal(dsBufferAnalystResult.dataset, null, "dsBufferAnalystResult.dataset");
    
    dsBufferAnalystResult.destroy();
    equal(dsBufferAnalystResult.recordset, null, "dsBufferAnalystResult.recordset");
});

test("TestDefaultConstructor_custom", function () {
    expect(4);
    var dsBufferAnalystResult,
        myRecordset = new SuperMap.REST.Recordset();
    dsBufferAnalystResult = new SuperMap.REST.DatasetBufferAnalystResult({
        recordset: myRecordset
    });

    ok(dsBufferAnalystResult != null, "not null");
    equal(dsBufferAnalystResult.recordset, myRecordset, "dsBufferAnalystResult.recordset");
    equal(dsBufferAnalystResult.succeed, null, "dsBufferAnalystResult.succeed");
	equal(dsBufferAnalystResult.dataset, null, "dsBufferAnalystResult.dataset");
});

test("TestDefaultConstructor_fromJson_null", function () {
    var dsBufferAnalystResult;
    dsBufferAnalystResult = SuperMap.REST.DatasetBufferAnalystResult.fromJson();
    equal(dsBufferAnalystResult, undefined, "fromJson(null)");
});