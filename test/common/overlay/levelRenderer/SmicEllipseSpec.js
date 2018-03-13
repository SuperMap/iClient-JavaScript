import {SmicEllipse} from '../../../../src/common/overlay/levelRenderer/SmicEllipse';

describe('SmicEllipse', () => {
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
        var shape = new SmicEllipse({
            style: {x: 100, y: 100, a: 40, b: 20}
        });
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.type).toEqual("smicellipse");
        expect(shape.style).not.toBeNull();
        shape.destroy();
        expect(shape.id).toBeNull();
        expect(shape.type).toBeNull();
        expect(shape.style).toBeNull();
    });

    it('buildPath', () => {
        var shape = new SmicEllipse({
            style: {x: 100, y: 100, a: 40, b: 20}
        });
        shape.refOriginalPosition = null;
        spyOn(shape, 'buildPath').and.callThrough();
        spyOn(ctx, 'moveTo').and.callThrough();
        spyOn(ctx, 'bezierCurveTo').and.callThrough();
        spyOn(ctx, 'closePath').and.callThrough();
        shape.buildPath(ctx, shape.style);
        expect(shape.buildPath).toHaveBeenCalledWith(ctx, shape.style);
        expect(ctx.moveTo).toHaveBeenCalled();
        expect(ctx.bezierCurveTo).toHaveBeenCalled();
        expect(ctx.closePath).toHaveBeenCalled();
        shape.destroy();
    });

    it('getRect', () => {
        var shape = new SmicEllipse({
            style: {x: 100, y: 100, a: 40, b: 20}
        });
        var style1 = {x: 100, y: 100, a: 40, b: 20, brushType: 'stroke'};
        shape.refOriginalPosition = null;
        spyOn(shape, 'getRect').and.callThrough();
        var rect = shape.getRect(shape.style);
        var rect1 = shape.getRect(style1);
        expect(shape.getRect).toHaveBeenCalledWith(shape.style);
        expect(shape.getRect).toHaveBeenCalledWith(style1);
        expect(rect).not.toBeNull();
        expect(rect1).not.toBeNull();
        expect(rect.x).toEqual(60);
        expect(rect.y).toEqual(80);
        expect(rect.width).toEqual(80);
        expect(rect.height).toEqual(40);
        expect(rect1.x).toEqual(60);
        expect(rect1.y).toEqual(80);
        expect(rect1.width).toEqual(81);
        expect(rect1.height).toEqual(41);
        shape.destroy();
    });
});