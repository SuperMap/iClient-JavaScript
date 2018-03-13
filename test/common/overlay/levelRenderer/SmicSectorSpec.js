import {SmicSector} from '../../../../src/common/overlay/levelRenderer/SmicSector';

describe('SmicSector', () => {
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
        var shape = new SmicSector({
            style: {x: 100, y: 100, r: 60, r0: 30, startAngle: 0, endAngle: 180}
        });
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.type).toEqual("smicsector");
        expect(shape.style).not.toBeNull();
        shape.destroy();
        expect(shape.id).toBeNull();
        expect(shape.type).toBeNull();
        expect(shape.style).toBeNull();
    });

    it('buildPath', () => {
        var shape = new SmicSector({
            style: {x: 100, y: 100, r: 60, r0: 30, startAngle: 0, endAngle: 180}
        });
        shape.refOriginalPosition = null;
        spyOn(shape, 'buildPath').and.callThrough();
        spyOn(ctx, 'lineTo').and.callThrough();
        spyOn(ctx, 'closePath').and.callThrough();
        shape.buildPath(ctx, shape.style);
        expect(shape.buildPath).toHaveBeenCalledWith(ctx, shape.style);
        expect(ctx.lineTo).toHaveBeenCalled();
        expect(ctx.closePath).toHaveBeenCalled();
        shape.destroy();
    });

    it('getRect', () => {
        var shape = new SmicSector({
            style: {x: 100, y: 100, r: 60, r0: 30, startAngle: 0, endAngle: 120}
        });
        var style1 = {x: 100, y: 100, r: 60, r0: 0, startAngle: 0, endAngle: 90};
        shape.refOriginalPosition = null;
        spyOn(shape, 'getRect').and.callThrough();
        var rect = shape.getRect(shape.style);
        var rect1 = shape.getRect(style1);
        expect(shape.getRect).toHaveBeenCalledWith(shape.style);
        expect(shape.getRect).toHaveBeenCalledWith(style1);
        expect(rect).not.toBeNull();
        expect(rect1).not.toBeNull();
        expect(rect1.x).not.toBeNaN();
        expect(rect1.y).not.toBeNaN();
        expect(rect1.width).not.toBeNaN();
        expect(rect1.height).not.toBeNaN();
        expect(rect.x).not.toBeNaN();
        expect(rect.y).not.toBeNaN();
        expect(rect.width).not.toBeNaN();
        expect(rect.height).not.toBeNaN();
        shape.destroy();
    });
});