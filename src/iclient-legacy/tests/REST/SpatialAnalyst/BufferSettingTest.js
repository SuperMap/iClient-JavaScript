module("BufferSetting");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(12);

    var bufferSetting;
    bufferSetting = new SuperMap.REST.BufferSetting();

    ok(bufferSetting != null, "not null");
    equal(bufferSetting.endType, SuperMap.REST.BufferEndType.FLAT, "bufferSetting.endType");
    ok(bufferSetting.leftDistance!=null, "bufferSetting.leftDistance");
    ok(bufferSetting.rightDistance!=null, "bufferSetting.rightDistance");
    equal(bufferSetting.semicircleLineSegment, 4, "bufferSetting.semicircleLineSegment");

    bufferSetting.semicircleLineSegment = 5;
    bufferSetting.endType = SuperMap.REST.BufferEndType.ROUND;
    bufferSetting.leftDistance.value = 150;

    equal(bufferSetting.endType, SuperMap.REST.BufferEndType.ROUND, "bufferSetting.endType");
    equal(bufferSetting.leftDistance.value, 150, "bufferSetting.leftDistance.value");
    equal(bufferSetting.semicircleLineSegment, 5, "bufferSetting.semicircleLineSegment");
    
    bufferSetting.destroy();
    equal(bufferSetting.endType, null, "bufferSetting.endType");
    equal(bufferSetting.leftDistance, null, "bufferSetting.leftDistance");
    equal(bufferSetting.rightDistance, null, "bufferSetting.rightDistance");
    equal(bufferSetting.semicircleLineSegment, null, "bufferSetting.semicircleLineSegment");    
});

test("TestDefaultConstructor", function () {
    var bufferSetting;
    bufferSetting = new SuperMap.REST.BufferSetting({
        leftDistance: new SuperMap.REST.BufferDistance({
            value: 200
        })
    });

    ok(bufferSetting != null, "not null");
    equal(bufferSetting.endType, SuperMap.REST.BufferEndType.FLAT, "bufferSetting.endType");
    ok(bufferSetting.leftDistance!=null, "bufferSetting.leftDistance");
    ok(bufferSetting.rightDistance!=null, "bufferSetting.rightDistance");
    equal(bufferSetting.semicircleLineSegment, 4, "bufferSetting.semicircleLineSegment");
});