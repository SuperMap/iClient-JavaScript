﻿import {BufferDistance} from '../../../src/common/iServer/BufferDistance';

describe('BufferDistance', () => {
    it('constructor_default', () => {
        var bufferDistance = new BufferDistance();
        expect(bufferDistance).not.toBeNull();
        expect(bufferDistance.value).toEqual(100);
        expect(bufferDistance.exp).toBeNull();
        bufferDistance.destroy();
        expect(bufferDistance.value).toBeNull();
        expect(bufferDistance.exp).toBeNull();
    });
    it('constructor_value', () => {
        var bufferDistance = new BufferDistance({
            value: 200
        });
        expect(bufferDistance).not.toBeNull();
        expect(bufferDistance.value).toEqual(200);
        expect(bufferDistance.exp).toBeNull();
        bufferDistance.destroy();
        expect(bufferDistance.value).toBeNull();
        expect(bufferDistance.exp).toBeNull();
    });
});





