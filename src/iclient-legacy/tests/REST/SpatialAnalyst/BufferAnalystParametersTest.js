module("BufferAnalystParameters");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(3);

    var bufferAnalystParameters;
    bufferAnalystParameters = new SuperMap.REST.BufferAnalystParameters({
        bufferSetting: new SuperMap.REST.BufferSetting()
    });

    ok(bufferAnalystParameters != null, "not null");
    ok(bufferAnalystParameters.bufferSetting != null, "not null");
    
    bufferAnalystParameters.destroy();
    equal(bufferAnalystParameters.bufferSetting, null, "bufferAnalystParameters.bufferSetting");
});