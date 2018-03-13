import {SmicRing} from '../../../../src/common/overlay/levelRenderer/SmicRing';

describe('SmicRing', () => {
    var canvas, ctx;
    beforeAll(() => {
        canvas = window.document.createElement('CANVAS');
        canvas.width = 400;
        canvas.height = 400;
        canvas.style.border = "1px solid #000000";
        ctx = canvas.getContext('2d');
        window.document.body.appendChild(canvas);
    });
    afterAll(() => {
        window.document.body.removeChild(canvas);
    });

    it('constructor, destroy', () => {
        var shape = new SmicRing({
            style: {x: 100, y: 100, r0: 30, r: 50}
        });
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.style).not.toBeNull();
        expect(shape.type).toEqual("smicring");
        expect(shape.refOriginalPosition).not.toBeNull();
        shape.destroy();
        expect(shape.id).toBeNull();
        expect(shape.style).toBeNull();
        expect(shape.type).toBeNull();
        expect(shape.refOriginalPosition).toBeNull();
    });

    it('buildPath', () => {
        var shape = new SmicRing({
            style: {x: 100, y: 100, r0: 30, r: 50}
        });
        shape.refOriginalPosition = null;
        spyOn(shape, 'buildPath').and.callThrough();
        shape.buildPath(ctx, shape.style);
        expect(shape.buildPath).toHaveBeenCalledWith(ctx, shape.style);
        shape.destroy();
    });

    it('getRect', () => {
        var shape = new SmicRing({
            style: {x: 100, y: 100, r0: 30, r: 50}
        });
        var style1 = {x: 100, y: 100, r0: 30, r: 50, brushType: 'fill'};
        shape.refOriginalPosition = null;
        spyOn(shape, 'getRect').and.callThrough();
        var rect = shape.getRect(shape.style);
        var rect1 = shape.getRect(style1);
        expect(shape.getRect).toHaveBeenCalledWith(shape.style);
        expect(shape.getRect).toHaveBeenCalledWith(style1);
        expect(rect).not.toBeNull();
        expect(rect1).not.toBeNull();
        expect(rect.width).toEqual(100);
        expect(rect.height).toEqual(100);
        expect(rect.x).toEqual(50);
        expect(rect.y).toEqual(50);
        expect(rect1.width).toEqual(101);
        expect(rect1.height).toEqual(101);
        expect(rect1.x).toEqual(50);
        expect(rect1.y).toEqual(50);
        shape.destroy();
    });
});