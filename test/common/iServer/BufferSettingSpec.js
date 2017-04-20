require('../../../src/common/iServer/BufferSetting');

describe('testBufferSetting_constructor',function(){
    it('constructorDefault',function(){
        var bufferSetting = new SuperMap.BufferSetting();
        expect(bufferSetting).not.toBeNull();
        expect(bufferSetting.leftDistance).not.toBeNull();
        expect(bufferSetting.rightDistance).not.toBeNull();
        expect(bufferSetting.endType).toEqual(SuperMap.BufferEndType.FLAT);
        expect(bufferSetting.semicircleLineSegment).toEqual(4);

        bufferSetting.semicircleLineSegment = 5;
        bufferSetting.endType = SuperMap.BufferEndType.ROUND;
        bufferSetting.leftDistance.value = 150;
        expect(bufferSetting.endType).toEqual(SuperMap.BufferEndType.ROUND);
        expect(bufferSetting.leftDistance.value).toEqual(150);
        expect(bufferSetting.semicircleLineSegment).toEqual(5);

        bufferSetting.destroy();
        expect(bufferSetting.endType).toBeNull();
        expect(bufferSetting.leftDistance).toBeNull();
        expect(bufferSetting.rightDistance).toBeNull();
        expect(bufferSetting.semicircleLineSegment).toBeNull();
    });
    it('constructorCustom',function(){
        var bufferSetting = new SuperMap.BufferSetting({
            leftDistance: new SuperMap.BufferDistance({
                value: 200
            })
        });
        expect(bufferSetting).not.toBeNull();
        expect(bufferSetting.leftDistance).not.toBeNull();
        expect(bufferSetting.rightDistance).not.toBeNull();
        expect(bufferSetting.endType).toEqual(SuperMap.BufferEndType.FLAT);
        expect(bufferSetting.semicircleLineSegment).toEqual(4);
        bufferSetting.destroy();
    });
});