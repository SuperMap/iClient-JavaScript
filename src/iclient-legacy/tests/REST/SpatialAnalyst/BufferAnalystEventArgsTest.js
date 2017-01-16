module("BufferAnalystEventArgs");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(3);

    var bufferAnalystEventArgs;
    bufferAnalystEventArgs = new SuperMap.REST.BufferAnalystEventArgs();

    ok(bufferAnalystEventArgs != null, "not null");
    equal(bufferAnalystEventArgs.result, null, "bufferAnalystEventArgs.result");
    equal(bufferAnalystEventArgs.originResult, null, "bufferAnalystEventArgs.originResult");
});

test("TestDefaultConstructor_1", function () {
    expect(5);

    var bufferAnalystEventArgs;
    bufferAnalystEventArgs = new SuperMap.REST.BufferAnalystEventArgs(new SuperMap.REST.GeometryBufferAnalystResult(),"teststring");

    ok(bufferAnalystEventArgs != null, "not null");
    ok(bufferAnalystEventArgs.result != null, "not null");
    ok(bufferAnalystEventArgs.originResult != null, "not null");
    
    bufferAnalystEventArgs.destroy();
    equal(bufferAnalystEventArgs.result, null, "bufferAnalystEventArgs.result");
    equal(bufferAnalystEventArgs.originResult, null, "bufferAnalystEventArgs.originResult");
});