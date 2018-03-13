import {SmicRectangle} from '../../../../src/common/overlay/levelRenderer/SmicRectangle';

describe('SmicRectangle', () => {
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
        var shape = new SmicRectangle({
            style: {x: 0, y: 0, width: 100, height: 100, radius: [5, 5, 5, 5]}
        });
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.type).toEqual("smicrectangle");
        expect(shape.style).not.toBeNull();
        shape.destroy();
        expect(shape.id).toBeNull();
        expect(shape.type).toBeNull();
        expect(shape.style).toBeNull();
    });

    it('buildPath_radius', () => {
        var shape = new SmicRectangle({
            style: {x: 0, y: 0, width: 100, height: 100, radius: {}}
        });
        shape.refOriginalPosition = null;
        var style1 = {x: 0, y: 0, width: 100, height: 100, radius: 6};
        var style2 = {x: 0, y: 0, width: 100, height: 100, radius: [55]};
        var style3 = {x: 0, y: 0, width: 100, height: 100, radius: [5, 10]};
        var style4 = {x: 0, y: 0, width: 100, height: 100, radius: [5, 5, 10]};
        var style5 = {x: 0, y: 0, width: 100, height: 100, radius: [55, 50, 50, 55]};
        var style6 = {x: 0, y: 0, width: 100, height: 100, radius: [5, 50, 55, 5]};
        var style7 = {x: 0, y: 0, width: 100, height: 100, radius: null};
        spyOn(shape, 'buildPath').and.callThrough();
        spyOn(shape, '_buildRadiusPath').and.callThrough();
        shape.buildPath(ctx, shape.style);
        shape.buildPath(ctx, style1);
        shape.buildPath(ctx, style2);
        shape.buildPath(ctx, style3);
        shape.buildPath(ctx, style4);
        shape.buildPath(ctx, style5);
        shape.buildPath(ctx, style6);
        shape.buildPath(ctx, style7);
        expect(shape.buildPath).toHaveBeenCalledWith(ctx, shape.style);
        expect(shape.buildPath).toHaveBeenCalledWith(ctx, style1);
        expect(shape.buildPath).toHaveBeenCalledWith(ctx, style2);
        expect(shape.buildPath).toHaveBeenCalledWith(ctx, style3);
        expect(shape.buildPath).toHaveBeenCalledWith(ctx, style4);
        expect(shape.buildPath).toHaveBeenCalledWith(ctx, style5);
        expect(shape.buildPath).toHaveBeenCalledWith(ctx, style6);
        expect(shape.buildPath).toHaveBeenCalledWith(ctx, style7);
        expect(shape._buildRadiusPath.calls.any()).toEqual(true);
        expect(shape._buildRadiusPath.calls.count()).toEqual(7);
        expect(shape.buildPath.calls.count()).toEqual(8);
        expect(shape._buildRadiusPath).not.toBeNull();
        shape.destroy();
    });

    it('getRect', () => {
        var shape = new SmicRectangle({
            style: {x: 1, y: 1, width: 100, height: 100, radius: [5], brushType: 'fill'}
        });
        var style1 = {x: 0, y: 0, width: 100, height: 100, radius: [5]};
        shape.refOriginalPosition = null;
        spyOn(shape, 'getRect').and.callThrough();
        var rect = shape.getRect(shape.style);
        var rect1 = shape.getRect(style1);
        expect(shape.getRect).toHaveBeenCalledWith(shape.style);
        expect(shape.getRect).toHaveBeenCalledWith(style1);
        expect(rect).not.toBeNull();
        expect(rect1).not.toBeNull();
        expect(rect1.x).toEqual(0);
        expect(rect1.y).toEqual(0);
        expect(rect1.width).toEqual(100);
        expect(rect1.height).toEqual(100);
        expect(rect.x).toEqual(1);
        expect(rect.y).toEqual(1);
        expect(rect.width).toEqual(101);
        expect(rect.height).toEqual(101);
        shape.destroy();
    });
});