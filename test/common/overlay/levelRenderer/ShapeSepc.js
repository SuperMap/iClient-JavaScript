import {Shape} from '../../../../src/common/overlay/levelRenderer/Shape';
import {SmicPolygon} from '../../../../src/common/overlay/levelRenderer/SmicPolygon';

describe('Shape', () => {
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

    it('constructor, destroy, getHighlightZoom', () => {
        var options = {
            style: {
                x: 50,
                y: 50,
                width: 300,
                height: 300,
                text: 'shape test',
                textAlign: 'center',
            }
        };
        var shape = new Shape(options);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.style.x).toEqual(50);
        expect(shape.style.y).toEqual(50);
        expect(shape.style.width).toEqual(300);
        expect(shape.style.height).toEqual(300);
        expect(shape.style.text).toEqual("shape test");
        expect(shape.style.textAlign).toEqual("center");
        var zoom = shape.getHighlightZoom();
        expect(zoom).toEqual(6);
        shape.destroy();
        expect(shape.id).toBeNull();
        expect(shape.style).toBeNull();
        expect(shape.refOriginalPosition).toBeNull();
        expect(shape.highlightStyle).toBeNull();
        expect(shape.clickable).toBeNull();
        expect(shape.z).toBeNull();
    });

    //绘制图形
    it('brush, beforeBrush, afterBrush', () => {
        var options = {
            style: {
                __rect: {
                    x: 50,
                    y: 50,
                    width: 300,
                    height: 300,
                },
                text: 'test',
                textAlign: 'center',
                textPosition: 'inside',
                brushType: 'fill',
                lineWidth: 1
            }
        };
        var shape = new Shape(options);
        shape.brush(ctx, false);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.style.__rect).not.toBeNull();
        expect(shape.style.text).toEqual("test");
        expect(shape.style.textAlign).toEqual("center");
        expect(shape.style.textPosition).toEqual("inside");
        expect(shape.style.brushType).toEqual("fill");
        expect(shape.style.lineWidth).toEqual(1);
        expect(shape.highlightStyle).toBeNull();
        shape.style.brushType = 'stroke';
        shape.brush(ctx, false);
        expect(shape).not.toBeNull();
        expect(shape.style.brushType).toEqual("stroke");
        shape.style.brushType = 'both';
        shape.brush(ctx, false);
        expect(shape).not.toBeNull();
        expect(shape.style.brushType).toEqual("both");
        shape.destroy();
    });

    //具体绘制操作前的一些公共操作
    it('beforeBrush, setContext', () => {
        var options = {
            style: {
                __rect: {
                    x: 50,
                    y: 50,
                    width: 300,
                    height: 300,
                },
                text: 'test',
                textAlign: 'center',
                textPosition: 'inside',
                brushType: 'fill',
                lineWidth: 1
            },
            brushTypeOnly: 'stroke'
        };
        var shape = new Shape(options);
        var style = shape.beforeBrush(ctx, true);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.style).not.toBeNull();
        expect(style).not.toBeNull();
        expect(style.__rect).not.toBeNull();
        expect(style.text).toEqual("test");
        expect(style.textAlign).toEqual("center");
        expect(style.textPosition).toEqual("inside");
        expect(style.brushType).toEqual("stroke");
        expect(style.lineWidth).toEqual(1);
        shape.destroy();
    });

    it('doClip', () => {
        var options = {
            style: {
                __rect: {
                    x: 50,
                    y: 50,
                    width: 300,
                    height: 300,
                },
                text: 'test',
                textAlign: 'center',
                textPosition: 'inside',
                brushType: 'fill',
                lineWidth: 1
            }
        };
        var shape = new Shape(options);
        shape.__clipShapes[0] = new SmicPolygon({
            style: {
                pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
                lineType: 'longdashdot',
            },
        });
        shape.doClip(ctx);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.style).not.toBeNull();
        expect(shape.__dirty).toBeTruthy();
        expect(shape.__clipShapes[0].CLASS_NAME).toEqual("SuperMap.LevelRenderer.Shape.SmicPolygon");
        expect(shape.__clipShapes[0].type).toEqual("smicpolygon");
        shape.destroy();
    });

    //根据默认样式扩展高亮样式
    it('getHighlightStyle', () => {
        var style = {
            text: 'test',
            textAlign: 'center',
            textPosition: 'inside',
            brushType: 'fill',
            lineWidth: 1,
        };
        var highlightstyle = {
            text: 'test',
            textAlign: 'center',
            textPosition: 'inside',
            brushType: 'fill',
            lineWidth: 1,
        };
        var shape = new Shape({
            style: {
                __rect: {
                    x: 50,
                    y: 50,
                    width: 300,
                    height: 300,
                },
                text: 'test',
                textAlign: 'center'
            }
        });
        var newStyle = shape.getHighlightStyle(style, highlightstyle, "fill");
        expect(newStyle).not.toBeNull();
        expect(newStyle.brushType).toEqual("fill");
        expect(newStyle.lineWidth).toEqual(1);
        expect(newStyle.strokeColor).toEqual("rgba(0,0,255,1)");
        expect(newStyle.text).toEqual("test");
        expect(newStyle.textAlign).toEqual("center");
        expect(newStyle.textPosition).toEqual("inside");
        shape.destroy();
    });

    it('drift', () => {
        var shape = new Shape({
            style: {
                __rect: {
                    x: 50,
                    y: 50,
                    width: 300,
                    height: 300,
                },
                text: 'test',
                textAlign: 'center'
            }
        });
        shape.drift(10, 10);
        expect(shape).not.toBeNull();
        expect(shape.position[0]).toEqual(10);
        expect(shape.position[1]).toEqual(10);
        shape.destroy();
    });

    it('getRect', () => {
        var shape = new Shape({
            style: {
                __rect: {
                    x: 50,
                    y: 50,
                    width: 300,
                    height: 300,
                },
                text: 'test',
                textAlign: 'center',
            },
            type: "smicpolygon"
        });
        var style = {
            text: 'test',
            textAlign: 'center',
            textPosition: 'inside',
            brushType: 'fill',
            lineWidth: 1,
        };
        shape.getRect(style);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.style.__rect).not.toBeNull();
        expect(shape.style.text).toEqual("test");
        expect(shape.style.textAlign).toEqual("center");
        expect(shape.type).toEqual("smicpolygon");
        shape.destroy();
    });

    it('isCover', () => {
        var shape = new Shape({
            style: {
                __rect: {
                    x: 50,
                    y: 50,
                    width: 300,
                    height: 300,
                },
                text: 'test',
                textAlign: 'center'
            }
        });
        var isCover = shape.isCover(100, 100);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.style).not.toBeNull();
        expect(isCover).toBeFalsy();
        shape.destroy();
    });

    it('isCover_needTransform, getTansform ', () => {
        var shape = new Shape({
            style: {
                __rect: {
                    x: 50,
                    y: 50,
                    width: 300,
                    height: 300,
                },
                text: 'test',
                textAlign: 'center'
            },
            needTransform: true,
            transform: true
        });
        var isCover = shape.isCover(100, 100);
        expect(isCover).not.toBeNull();
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.style).not.toBeNull();
        expect(isCover).toBeFalsy();
        shape.destroy();
    });

    it('drawText_textPosition = right', () => {
        var shape = new Shape({
            style: {
                __rect: {
                    x: 50,
                    y: 50,
                    width: 300,
                    height: 300,
                },
                text: 'test',
                textAlign: 'center',
                textPosition: 'right',
                brushType: 'fill',
                lineWidth: 1
            }

        });
        var style = {
            __rect: {
                x: 50,
                y: 50,
                width: 300,
                height: 300,
            },
            text: 'test',
            textAlign: 'center',
            textPosition: 'left',
        };
        shape.drawText(ctx, style, shape.style);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.style.text).toEqual("test");
        expect(shape.style.textAlign).toEqual("center");
        expect(shape.style.brushType).toEqual("fill");
        expect(shape.style.lineWidth).toEqual(1);
        style.textPosition = 'right';
        shape.drawText(ctx, style, shape.style);
        expect(shape).not.toBeNull();
        expect(shape.style.textPosition).toEqual("right");
        style.textPosition = 'top';
        shape.drawText(ctx, style, shape.style);
        expect(shape).not.toBeNull();
        style.textPosition = 'bottom';
        shape.drawText(ctx, style, shape.style);
        expect(shape).not.toBeNull();
        shape.destroy();
    });

    it('drawText_pointList', () => {
        var shape = new Shape({
            style: {
                __rect: {
                    x: 50,
                    y: 50,
                    width: 300,
                    height: 300,
                },

                text: 'test',
                textAlign: 'center',
                textPosition: 'right',
                brushType: 'fill',
                lineWidth: 1
            }

        });
        var style = {
            __rect: {
                x: 50,
                y: 50,
                width: 300,
                height: 300,
            },
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            text: 'test',
            textAlign: 'center',
            textPosition: 'start',
        };
        shape.drawText(ctx, style, shape.style);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.style).not.toBeNull();
        expect(shape.style.__rect).not.toBeNull();
        expect(shape.style.text).toEqual("test");
        expect(shape.style.textAlign).toEqual("center");
        expect(shape.style.textPosition).toEqual("right");
        style.textPosition = 'end';
        shape.drawText(ctx, style, shape.style);
        expect(shape).not.toBeNull();
        shape.destroy();
    });

    it('drawText_textPosition = start', () => {
        var shape = new Shape({
            style: {
                __rect: {
                    x: 50,
                    y: 50,
                    width: 300,
                    height: 300,
                },

                text: 'test',
                textAlign: 'center',
                textPosition: 'right',
                brushType: 'fill',
                lineWidth: 1
            }

        });

        var style = {
            __rect: {
                x: 50,
                y: 50,
                width: 300,
                height: 300,
            },
            text: 'test',
            textAlign: 'center',
            textPosition: 'start',
        };
        shape.drawText(ctx, style, shape.style);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.style.text).toEqual("test");
        expect(shape.style.textAlign).toEqual("center");
        expect(shape.style.brushType).toEqual("fill");
        expect(shape.style.lineWidth).toEqual(1);
        expect(shape.style.textPosition).toEqual("right");
        shape.destroy();
    });

    it('drawText_textFont', () => {
        var shape = new Shape({
            style: {
                __rect: {
                    x: 50,
                    y: 50,
                    width: 300,
                    height: 300,
                },
                text: 'test',
                textAlign: 'center',
                textPosition: 'right',
                brushType: 'fill',
            }
        });

        var style = {
            __rect: {
                x: 50,
                y: 50,
                width: 300,
                height: 300,
            },
            text: 'test',
            textAlign: 'center',
            textPosition: 'specific',
            labelXOffset: 1,
            labelYOffset: 1,
            textFont: 'bold 18px verdana',

        };
        shape.drawText(ctx, style, shape.style);
        expect(shape).not.toBeNull();
        style.textAlign = 'end';
        shape.drawText(ctx, style, shape.style);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.style.__rect).not.toBeNull();
        expect(shape.style.text).toEqual("test");
        expect(shape.style.textAlign).toEqual("center");
        expect(shape.style.brushType).toEqual("fill");
        expect(shape.style.textPosition).toEqual("right");
        shape.destroy();
    });

    //图形发生改变
    it('modSelf', () => {
        var shape = new Shape({
            style: {
                __rect: {
                    x: 50,
                    y: 50,
                    width: 300,
                    height: 300,
                },
                text: 'test',
            },
            highlightStyle: {
                brushType: 'fill',
                lineWidth: 1,
            }
        });
        shape.modSelf();
        shape.isSilent();
        expect(shape).not.toBeNull();
        expect(shape.style.text).toEqual("test");
        expect(shape.highlightStyle.brushType).toEqual("fill");
        expect(shape.highlightStyle.lineWidth).toEqual(1);
        expect(shape.hoverable).toBeTruthy();
        shape.destroy();
    });
});