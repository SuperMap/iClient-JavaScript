import {Util} from '../../../../src/common/overlay/levelRenderer/Util';

describe('Util', () => {
    it('constructor', () => {
        var util = new Util();
        expect(util).not.toBeNull();
        expect(util.BUILTIN_OBJECT).not.toBeNull();
    });

    it('clone', () => {
        var util = new Util();
        var source1 = [1, 2, 3];
        var source2 = {describe: "test"};
        var result1 = util.clone(source1);
        var result2 = util.clone(source2);
        expect(result1).not.toBeNull();
        expect(result1.length).toEqual(3);
        expect(result1[0]).toEqual(1);
        expect(result1[1]).toEqual(2);
        expect(result1[2]).toEqual(3);
        expect(result2).not.toBeNull();
        expect(result2.describe).toEqual("test");
    });

    //合并源对象的单个属性到目标对象
    it('mergeItem, merge', () => {
        var util = new Util();
        var target = {style: {font: "10px"}};
        var source1 = {style: {font: "14px"}, describe: "test1"};
        expect(target.style.font).toEqual("10px");
        util.mergeItem(target, source1, "style", true);
        expect(target.style.font).toEqual("14px");
    });

    it('getPixelContext, adjustCanvasSize, getPixelOffset', () => {
        var util = new Util();
        var pixelCtx = util.getPixelContext();
        expect(pixelCtx).not.toBeNull();
        expect(pixelCtx.fillStyle).toEqual("#000000");
        expect(pixelCtx.textAlign).toEqual("start");
        expect(util._height).toEqual(150);
        expect(util._width).toEqual(300);
        expect(util._canvas).not.toBeNull();
        expect(util._canvas.height).toEqual(150);
        expect(util._canvas.width).toEqual(300);
        util.adjustCanvasSize(400, 200);
        expect(util._canvas.height).toEqual(300);
        expect(util._canvas.width).toEqual(500);
        util.adjustCanvasSize(-500, -400);
        expect(util._canvas.height).toEqual(550);
        expect(util._canvas.width).toEqual(800);
        var offset = util.getPixelOffset();
        expect(offset.x).toEqual(0);
        expect(offset.y).toEqual(0);
    });

    it('indexOf', () => {
        var util = new Util();
        var array1 = [10, 20, 30];
        var result = util.indexOf(array1, 20);
        expect(result).toEqual(1);
    });

    it('inherits', () => {
        var baseClazz = (a) => {
            this.b = null;
            return this.b + a;
        };
        var clazz = (a) => {
            this.b = null;
            return this.b - a;
        };
        var util = new Util();
        util.inherits(clazz, baseClazz);
        expect(baseClazz).not.toBeNull();
        expect(clazz).not.toBeNull();
    });
});