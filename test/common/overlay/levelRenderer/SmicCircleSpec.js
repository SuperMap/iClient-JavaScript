import {SmicCircle} from '../../../../src/common/overlay/levelRenderer/SmicCircle';

describe('SmicCircle', () => {
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
        var shape = new SmicCircle({
            style: {x: 100, y: 100, r: 60}
        });
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.type).toEqual("smiccircle");
        expect(shape.style).not.toBeNull();
        shape.destroy();
        expect(shape.id).toBeNull();
        expect(shape.type).toBeNull();
        expect(shape.style).toBeNull();
    });

    it('buildPath', () => {
        var shape = new SmicCircle({
            style: {x: 100, y: 100, r: 60}
        });
        shape.refOriginalPosition = null;
        spyOn(shape, 'buildPath').and.callThrough();
        shape.buildPath(ctx, shape.style);
        expect(shape.buildPath).toHaveBeenCalledWith(ctx, shape.style);
        shape.destroy();
    });

    it('getRect', () => {
        var shape = new SmicCircle({
            style: {x: 100, y: 100, r: 60}
        });
        shape.refOriginalPosition = null;
        var style1 = {x: 100, y: 100, r: 60, brushType: 'stroke'};
        spyOn(shape, 'getRect').and.callThrough();
        var rect = shape.getRect(shape.style);
        var rect1 = shape.getRect(style1);
        expect(shape.getRect).toHaveBeenCalledWith(shape.style);
        expect(shape.getRect).toHaveBeenCalledWith(style1);
        expect(rect).not.toBeNull();
        expect(rect1).not.toBeNull();
        expect(rect.width).toEqual(120);
        expect(rect.height).toEqual(120);
        expect(rect.x).toEqual(40);
        expect(rect.y).toEqual(40);
        expect(rect1.width).toEqual(121);
        expect(rect1.height).toEqual(121);
        expect(rect1.x).toEqual(40);
        expect(rect1.y).toEqual(40);
        shape.destroy();
    });
});