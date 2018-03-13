import {SmicText} from '../../../../src/common/overlay/levelRenderer/SmicText';

describe('SmicText', () => {
    var originalTimeout;
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

    it('constructor destroy', () => {
        var shape = new SmicText({
            style: {
                text: 'Label',
                x: 100,
                y: 100,
                textFont: '14px Arial'
            }
        });
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.type).toEqual("smictext");
        expect(shape.style.text).toEqual("Label");
        expect(shape.style.textFont).toEqual("14px Arial");
        expect(shape.style.x).toEqual(100);
        expect(shape.style.y).toEqual(100);
        shape.destroy();
        expect(shape.id).toBeNull();
        expect(shape.type).toBeNull();
        expect(shape.style).toBeNull();
    });

    it('brush_isHighlight', () => {
        var shape = new SmicText({
            style: {
                x: 100,
                y: 100,
                textFont: '14px Arial',
            }
        });
        shape.brush(ctx, true);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.type).toEqual("smictext");
        expect(shape.style.textFont).toEqual("14px Arial");
        expect(shape.style.x).toEqual(100);
        expect(shape.style.y).toEqual(100);
        shape.destroy();
    });

    it('brush_style1', () => {
        var shape = new SmicText({
            style: {
                text: 'Label1',
                x: 100,
                y: 100,
                textFont: '14px Arial',
                textBaseline: 'top',
                labelRect: true,
                brushType: "fill",
                textRotation: 10,
                maxWidth: 20,
            }
        });
        shape.refOriginalPosition = null;
        shape.brush(ctx, false);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.type).toEqual("smictext");
        expect(shape.style.text).toEqual("Label1");
        expect(shape.style.textFont).toEqual("14px Arial");
        expect(shape.style.x).toEqual(100);
        expect(shape.style.y).toEqual(100);
        expect(shape.style.textBaseline).toEqual("top");
        expect(shape.style.labelRect).toBeTruthy();
        expect(shape.style.brushType).toEqual("fill");
        expect(shape.style.textRotation).toEqual(10);
        expect(shape.style.maxWidth).toEqual(20);
        shape.style.textBaseline = 'bottom';
        shape.brush(ctx, false);
        expect(shape).not.toBeNull();
        expect(shape.style.textBaseline).toEqual("bottom");
        shape.style.textBaseline = 'both';
        shape.brush(ctx, false);
        expect(shape).not.toBeNull();
        expect(shape.style.textBaseline).toEqual("both");
        shape.style.textRotation = 0;
        shape.brush(ctx, false);
        expect(shape).not.toBeNull();
        expect(shape.style.textRotation).toEqual(0);
        shape.destroy();
    });

    it('brush_style2', () => {
        var shape = new SmicText({
            style: {
                text: 'Label2',
                x: 100,
                y: 100,
                textFont: '14px Arial',
                textBaseline: 'top',
                labelRect: true,
                brushType: "fill",
                textRotation: 10,
            }
        });
        shape.brush(ctx, false);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.type).toEqual("smictext");
        expect(shape.style.text).toEqual("Label2");
        expect(shape.style.textBaseline).toEqual("top");
        shape.style.textBaseline = 'bottom';
        shape.brush(ctx, false);
        expect(shape).not.toBeNull();
        expect(shape.style.textBaseline).toEqual("bottom");
        shape.style.textBaseline = 'both';
        shape.brush(ctx, false);
        expect(shape).not.toBeNull();
        expect(shape.style.textBaseline).toEqual("both");
        shape.style.textRotation = 0;
        shape.brush(ctx, false);
        expect(shape).not.toBeNull();
        expect(shape.style.textRotation).toEqual(0);
        shape.destroy();
    });

    it('brush_style3', () => {
        var shape = new SmicText({
            style: {
                text: 'Label3',
                x: 100,
                y: 100,
                textFont: '14px Arial',
                textBaseline: 'bottom',
                brushType: 'stroke',
                textRotation: 10,
                maxWidth: 20,
            }
        });
        shape.brush(ctx, false);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.type).toEqual("smictext");
        expect(shape.style.text).toEqual("Label3");
        expect(shape.style.brushType).toEqual("stroke");
        expect(shape.style.textBaseline).toEqual("bottom");
        shape.style.textBaseline = "top";
        shape.brush(ctx, false);
        expect(shape).not.toBeNull();
        expect(shape.style.textBaseline).toEqual("top");
        shape.style.textBaseline = "middle";
        shape.brush(ctx, false);
        expect(shape).not.toBeNull();
        expect(shape.style.textBaseline).toEqual("middle");
        shape.style.textRotation = 0;
        shape.brush(ctx, false);
        expect(shape).not.toBeNull();
        expect(shape.style.textRotation).toEqual(0);
        shape.destroy();
    });

    it('brush_style4', () => {
        var shape = new SmicText({
            style: {
                text: 'Label4',
                x: 100,
                y: 100,
                textFont: '14px Arial',
                textBaseline: 'bottom',
                brushType: 'stroke',
                textRotation: 10,
            }
        });
        shape.brush(ctx, false);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.type).toEqual("smictext");
        expect(shape.style.text).toEqual("Label4");
        expect(shape.style.brushType).toEqual("stroke");
        expect(shape.style.textBaseline).toEqual("bottom");
        shape.style.textBaseline = "top";
        shape.brush(ctx, false);
        expect(shape).not.toBeNull();
        expect(shape.style.textBaseline).toEqual("top");
        shape.style.textBaseline = "middle";
        shape.brush(ctx, false);
        expect(shape).not.toBeNull();
        expect(shape.style.textBaseline).toEqual("middle");
        shape.style.textRotation = 0;
        shape.brush(ctx, false);
        expect(shape).not.toBeNull();
        expect(shape.style.textRotation).toEqual(0);
        shape.destroy();
    });

    it('brush_style5', () => {
        var shape = new SmicText({
            style: {
                text: 'Label5',
                x: 100,
                y: 100,
                textFont: '14px Arial',
                textBaseline: 'middle',
                brushType: 'both',
                textRotation: 10,
                maxWidth: 20,
            }
        });
        shape.brush(ctx, true);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.type).toEqual("smictext");
        expect(shape.style.text).toEqual("Label5");
        expect(shape.style.brushType).toEqual("both");
        expect(shape.style.textBaseline).toEqual("middle");
        shape.style.textBaseline = "top";
        shape.brush(ctx, true);
        expect(shape).not.toBeNull();
        expect(shape.style.textBaseline).toEqual("top");
        shape.style.textBaseline = "bottom";
        shape.brush(ctx, true);
        expect(shape).not.toBeNull();
        expect(shape.style.textBaseline).toEqual("bottom");
        shape.style.textRotation = 0;
        shape.brush(ctx, true);
        expect(shape).not.toBeNull();
        expect(shape.style.textRotation).toEqual(0);
        shape.destroy();
    });

    it('brush_style6', () => {
        var shape = new SmicText({
            style: {
                text: 'Label6',
                x: 100,
                y: 100,
                textFont: '14px Arial',
                textBaseline: 'middle',
                brushType: 'both',
                textRotation: 10,
            }
        });
        shape.brush(ctx, true);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.type).toEqual("smictext");
        expect(shape.style.text).toEqual("Label6");
        expect(shape.style.brushType).toEqual("both");
        expect(shape.style.textBaseline).toEqual("middle");
        shape.style.textBaseline = "top";
        shape.brush(ctx, true);
        expect(shape).not.toBeNull();
        expect(shape.style.textBaseline).toEqual("top");
        shape.style.textBaseline = "bottom";
        shape.brush(ctx, true);
        expect(shape).not.toBeNull();
        expect(shape.style.textBaseline).toEqual("bottom");
        shape.style.textRotation = 0;
        shape.brush(ctx, true);
        expect(shape).not.toBeNull();
        expect(shape.style.textRotation).toEqual(0);
        shape.destroy();
    });

    it('brush_style7', () => {
        var shape = new SmicText({
            style: {
                text: 'Label7',
                x: 100,
                y: 100,
                textFont: '14px Arial',
                textBaseline: 'middle',
                brushType: 'fill1',
                textRotation: 10,
                maxWidth: 20,
            }
        });
        shape.brush(ctx, false);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.type).toEqual("smictext");
        expect(shape.style.text).toEqual("Label7");
        expect(shape.style.brushType).toEqual("fill1");
        expect(shape.style.textBaseline).toEqual("middle");
        shape.style.textBaseline = "top";
        shape.brush(ctx, false);
        expect(shape).not.toBeNull();
        expect(shape.style.textBaseline).toEqual("top");
        shape.style.textBaseline = "bottom";
        shape.brush(ctx, false);
        expect(shape).not.toBeNull();
        expect(shape.style.textBaseline).toEqual("bottom");
        shape.style.textRotation = 0;
        shape.brush(ctx, false);
        expect(shape).not.toBeNull();
        expect(shape.style.textRotation).toEqual(0);
        shape.destroy();
    });

    it('brush_style8', () => {
        var shape = new SmicText({
            style: {
                text: 'Label8',
                x: 100,
                y: 100,
                textFont: '14px Arial',
                textBaseline: 'middle',
                brushType: 'fill1',
                textRotation: 10,
            }
        });
        shape.brush(ctx, false);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.type).toEqual("smictext");
        expect(shape.style.text).toEqual("Label8");
        expect(shape.style.brushType).toEqual("fill1");
        expect(shape.style.textBaseline).toEqual("middle");
        shape.style.textBaseline = "top";
        shape.brush(ctx, false);
        expect(shape).not.toBeNull();
        expect(shape.style.textBaseline).toEqual("top");
        shape.style.textBaseline = "bottom";
        shape.brush(ctx, false);
        expect(shape).not.toBeNull();
        expect(shape.style.textBaseline).toEqual("bottom");
        shape.style.textRotation = 0;
        shape.brush(ctx, false);
        expect(shape).not.toBeNull();
        expect(shape.style.textRotation).toEqual(0);
        shape.destroy();
    });

    //返回文字包围盒矩形
    it('getRect', () => {
        var shape = new SmicText({
            style: {
                text: 'Label',
                x: 100,
                y: 100,
                textFont: '14px Arial'
            }
        });
        var style = {
            text: 'Label',
            x: 100,
            y: 100,
            textFont: '14px Arial',
            textBaseline: 'top',
            labelRect: true,
            brushType: "fill",
            textRotation: 10,
            maxWidth: 20,
        };
        shape.refOriginalPosition = null;
        var rect = shape.getRect(style);
        expect(rect).not.toBeNull();
        expect(rect.height).not.toBeNaN();
        expect(rect.width).not.toBeNaN();
        expect(rect.x).not.toBeNaN();
        expect(rect.y).not.toBeNaN();
        shape.destroy();
    });

    //返回忽略旋转和maxWidth时文字包围盒矩形
    it('getRectNoRotation_style1', () => {
        var shape = new SmicText({
            style: {
                text: 'Label',
                x: 100,
                y: 100,
                textFont: '14px Arial'
            }
        });
        var style1 = {
            text: 'Label',
            x: 100,
            y: 100,
            textFont: '14px Arial',
            textBaseline: 'top',
            labelRect: true,
            brushType: "fill",
            textRotation: 10,
            maxWidth: 20,
            textAlign: 'right',
        };
        shape.refOriginalPosition = null;
        var rect = shape.getRectNoRotation(style1);
        expect(rect).not.toBeNull();
        expect(rect.height).not.toBeNaN();
        expect(rect.width).not.toBeNaN();
        expect(rect.x).toEqual(80);
        expect(rect.y).toEqual(100);
        shape.destroy();
    });

    it('getRectNoRotation_style2', () => {
        var shape = new SmicText({
            style: {
                text: 'Label',
                x: 100,
                y: 100,
                textFont: '14px Arial'
            }
        });
        var style2 = {
            text: 'Label',
            x: 100,
            y: 100,
            textFont: '14px italic',
            textBaseline: 'top',
            labelRect: true,
            brushType: "fill",
            textRotation: 10,
            maxWidth: 20,
            textAlign: 'center',
        };
        shape.refOriginalPosition = null;
        var rect = shape.getRectNoRotation(style2);
        expect(rect).not.toBeNull();
        expect(rect.height).not.toBeNaN();
        expect(rect.width).not.toBeNaN();
        expect(rect.x).toEqual(90);
        expect(rect.y).toEqual(100);
        shape.destroy();
    });

    //获取文本背景框范围 redo = true 强制重新计算textBackground
    it('getTextBackground_redo_style1', () => {
        var shape = new SmicText({
            style: {
                text: 'Label',
                x: 100,
                y: 100,
                textFont: '14px Arial'
            }
        });
        var style1 = {
            text: 'Label',
            x: 100,
            y: 100,
            textFont: '14px Arial',
            textBaseline: 'top',
            labelRect: true,
            brushType: "fill",
            textRotation: 10,
            maxWidth: 20,
            textAlign: 'right',
        };
        shape.refOriginalPosition = null;
        var style = shape.getTextBackground(style1, true);
        expect(style).not.toBeNull();
        expect(style.length).toEqual(4);
        for (var i = 0; i < style.length; i++) {
            expect(style[i].length).toEqual(2);
            expect(style[i][0]).not.toBeNaN();
            expect(style[i][1]).not.toBeNaN();
        }
        shape.destroy();
    });

    it('getTextBackground_redo_style2', () => {
        var shape = new SmicText({
            style: {
                text: 'Label',
                x: 100,
                y: 100,
                textFont: '14px Arial'
            }
        });
        var style2 = {
            text: 'Label',
            x: 100,
            y: 100,
            textFont: '14px Arial',
            textBaseline: 'top',
            labelRect: true,
            brushType: "fill",
            textRotation: 0,
            maxWidth: 20,
            textAlign: 'right',
        };
        var style = shape.getTextBackground(style2, true);
        expect(shape).not.toBeNull();
        expect(style.length).toEqual(4);
        for (var i = 0; i < style.length; i++) {
            expect(style[i].length).toEqual(2);
            expect(style[i][0]).not.toBeNaN();
            expect(style[i][1]).not.toBeNaN();
        }
        shape.destroy();
    });

    //redo = false 不强制重新计算textBackground
    it('getTextBackground', () => {
        var shape = new SmicText({
            style: {
                text: 'Label',
                x: 100,
                y: 100,
                textFont: '14px Arial'
            }
        });
        var style1 = {
            text: 'Label',
            x: 100,
            y: 100,
            textFont: '14px Arial',
            textBaseline: 'top',
            labelRect: true,
            brushType: "fill",
            textRotation: 10,
            maxWidth: 20,
            textAlign: 'right',
            __textBackground: [[80, 80], [100, 100], [100, 120], [80, 120]]
        };
        var style = shape.getTextBackground(style1, false);
        expect(style).not.toBeNull();
        expect(style.length).toEqual(4);
        for (var i = 0; i < style.length; i++) {
            expect(style[i].length).toEqual(2);
            expect(style[i][0]).not.toBeNaN();
            expect(style[i][1]).not.toBeNaN();
        }
        shape.destroy();
    });
});