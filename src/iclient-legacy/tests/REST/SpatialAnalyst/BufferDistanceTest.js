module("BufferDistance");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(5);

    var bufferDistance;
    bufferDistance = new SuperMap.REST.BufferDistance();

    ok(bufferDistance != null, "not null");
    equal(bufferDistance.value, 100, "bufferDistance.value");
    equal(bufferDistance.exp, null, "bufferDistance.exp");
    
    bufferDistance.destroy();
    equal(bufferDistance.exp, null, "bufferDistance.exp");
    equal(bufferDistance.value, null, "bufferDistance.value");
});

test("TestDefaultConstructor_custom", function () {
    expect(5);

    var bufferDistance;
    bufferDistance = new SuperMap.REST.BufferDistance({
        value: 200
    });

    ok(bufferDistance != null, "not null");
    equal(bufferDistance.value, 200, "bufferDistance.value");
    equal(bufferDistance.exp, null, "bufferDistance.exp");
    
    bufferDistance.destroy();
    equal(bufferDistance.exp, null, "bufferDistance.exp");
    equal(bufferDistance.value, null, "bufferDistance.value");
});