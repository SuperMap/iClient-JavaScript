import {SmicPolygon} from '../../../../src/common/overlay/levelRenderer/SmicPolygon';

describe('SmicPolygon', () => {
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

    it('constructor, destroy', () => {
        var shape = new SmicPolygon({
            style: {
                //100x100的正方形
                pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            }
        });
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.type).toEqual("smicpolygon");
        expect(shape.style).not.toBeNull();
        expect(shape.style.pointList.length).toEqual(4);
        for (var i = 0; i < shape.style.pointList.length; i++) {
            expect(shape.style.pointList[i].length).toEqual(2);
            expect(shape.style.pointList[i][0]).not.toBeNaN();
            expect(shape.style.pointList[i][1]).not.toBeNaN();
        }
        shape.destroy();
        expect(shape.id).toBeNull();
        expect(shape.type).toBeNull();
        expect(shape.style).toBeNull();
    });

    //笔触 isHighlight = false 不使用高亮属性
    it('brush_isHighlight = false', () => {
        var shape = new SmicPolygon({
            style: {
                //100x100的正方形
                pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            }
        });
        shape.holePolygonPointLists = [[0, 0, 0], [100, 100, 0], [100, 0, 100], [0, 0, 100]];
        shape.refOriginalPosition = null;
        shape.brush(ctx, false);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.type).toEqual("smicpolygon");
        expect(shape.style).not.toBeNull();
        expect(shape.style.pointList.length).toEqual(4);
        expect(shape.holePolygonPointLists.length).toEqual(4);
        for (var i = 0; i < shape.holePolygonPointLists.length; i++) {
            expect(shape.holePolygonPointLists[i].length).toEqual(3);
            expect(shape.holePolygonPointLists[i][0]).not.toBeNaN();
            expect(shape.holePolygonPointLists[i][1]).not.toBeNaN();
            expect(shape.holePolygonPointLists[i][2]).not.toBeNaN();
        }
        shape.destroy();
    });

    //笔触 使用高亮属性
    it('brush', () => {
        var shape = new SmicPolygon({
            style: {
                //100x100的正方形
                pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
                lineType: 'dashed',
            },
        });
        shape.holePolygonPointLists = [[0, 0, 0], [100, 100, 0], [100, 0, 100], [0, 0, 100]];
        shape.refOriginalPosition = null;
        shape.brush(ctx, true);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.type).toEqual("smicpolygon");
        expect(shape.style).not.toBeNull();
        expect(shape.style.pointList.length).toEqual(4);
        expect(shape.holePolygonPointLists.length).toEqual(4);
        for (var i = 0; i < shape.holePolygonPointLists.length; i++) {
            expect(shape.holePolygonPointLists[i].length).toEqual(3);
            expect(shape.holePolygonPointLists[i][0]).not.toBeNaN();
            expect(shape.holePolygonPointLists[i][1]).not.toBeNaN();
            expect(shape.holePolygonPointLists[i][2]).not.toBeNaN();
        }
        shape.destroy();
    });

    it('buildPath_style1', () => {
        var shape = new SmicPolygon({
            style: {
                //100x100的正方形
                pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
                lineType: 'solid',
            },
        });
        var style1 = {
            //100x100的正方形
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            lineType: 'solid',
            showShadow: true,
            smooth: 'spline',
        };
        shape.refOriginalPosition = null;
        shape.buildPath(ctx, style1);
        expect(shape).not.toBeNull();
        style1.lineType = "dotted";
        shape.buildPath(ctx, style1);
        expect(shape).not.toBeNull();
        style1.lineType = "dot";
        shape.buildPath(ctx, style1);
        expect(shape).not.toBeNull();
        style1.lineType = "dash";
        shape.buildPath(ctx, style1);
        expect(shape).not.toBeNull();
        style1.lineType = "longdash";
        shape.buildPath(ctx, style1);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.type).toEqual("smicpolygon");
        expect(shape.style).not.toBeNull();
        expect(shape.style.pointList.length).toEqual(4);
        expect(shape.style.lineType).toEqual("solid");
        shape.destroy();
    });

    it('buildPath_style2', () => {
        var shape = new SmicPolygon({
            style: {
                pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
                lineType: 'solid',
            },
        });
        var style2 = {
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            lineType: 'dashed',
            showShadow: true,
            smooth: 'spline',
            lineCap: 'round',
        };
        shape.refOriginalPosition = null;
        shape.buildPath(ctx, style2);
        expect(shape).not.toBeNull();
        style2.lineType = "dotted";
        shape.buildPath(ctx, style2);
        expect(shape).not.toBeNull();
        style2.lineType = "dot";
        shape.buildPath(ctx, style2);
        expect(shape).not.toBeNull();
        style2.lineType = "dash";
        shape.buildPath(ctx, style2);
        expect(shape).not.toBeNull();
        style2.lineType = "longdash";
        shape.buildPath(ctx, style2);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.type).toEqual("smicpolygon");
        expect(shape.style).not.toBeNull();
        expect(shape.style.pointList.length).toEqual(4);
        expect(shape.style.lineType).toEqual("solid");
        shape.destroy();
    });

    it('buildPath_style3', () => {
        var shape = new SmicPolygon({
            style: {
                //100x100的正方形
                pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
                lineType: 'dashed',
            },
        });
        var style3 = {
            //100x100的正方形
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            lineType: 'dashed',
            showShadow: true,
            smooth: 'bezier',
        };
        shape.buildPath(ctx, style3);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.type).toEqual("smicpolygon");
        expect(shape.style).not.toBeNull();
        expect(shape.style.pointList.length).toEqual(4);
        expect(shape.style.lineType).toEqual("dashed");
        shape.destroy();
    });

    it('buildPath_style4', () => {
        var shape = new SmicPolygon({
            style: {
                //100x100的正方形
                pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
                lineType: 'longdashdot',
            },
        });
        var style4 = {
            //100x100的正方形
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            lineType: 'longdashdot',
            showShadow: true,
            smooth: 'spline',
        };
        shape.buildPath(ctx, style4);
        expect(shape).not.toBeNull();
        style4.lineType = "dashot";
        shape.buildPath(ctx, style4);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.type).toEqual("smicpolygon");
        expect(shape.style).not.toBeNull();
        expect(shape.style.pointList.length).toEqual(4);
        expect(shape.style.lineType).toEqual("longdashdot");
        shape.destroy();
    });

    it('buildPath_style5', () => {
        var shape = new SmicPolygon({
            style: {
                //100x100的正方形
                pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
                lineType: 'longdashdot',
            },
        });
        var style5 = {
            //100x100的正方形
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            lineType: 'longdashdot',
            showShadow: true,
            smooth: 'spline',
            lineCap: 'round',
        };
        shape.buildPath(ctx, style5);
        expect(shape).not.toBeNull();
        style5.lineType = "dashot";
        shape.buildPath(ctx, style5);
        expect(shape).not.toBeNull();
        expect(shape.id).not.toBeNull();
        expect(shape.type).toEqual("smicpolygon");
        expect(shape.style).not.toBeNull();
        expect(shape.style.pointList.length).toEqual(4);
        expect(shape.style.lineType).toEqual("longdashdot");
        shape.destroy();
    });

    it('getRect_style1', () => {
        var shape = new SmicPolygon({
            style: {
                pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            }
        });
        var style1 = {
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            lineType: 'solid',
            showShadow: true,
            smooth: 'spline',
            brushType: 'fill'
        };
        shape.refOriginalPosition = null;
        var rect = shape.getRect(style1, shape.refOriginalPosition);
        expect(rect).not.toBeNull();
        expect(rect.height).toEqual(101);
        expect(rect.width).toEqual(101);
        expect(rect.x).toEqual(-0);
        expect(rect.y).toEqual(-0);
        shape.destroy();

    });

    it('getRect_style2', () => {
        var shape = new SmicPolygon({
            style: {
                pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            }
        });
        var style2 = {
            pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
            lineType: 'solid',
            showShadow: true,
            smooth: 'spline',
        };
        var rect = shape.getRect(style2, shape.refOriginalPosition);
        expect(rect).not.toBeNull();
        expect(rect.height).toEqual(100);
        expect(rect.width).toEqual(100);
        expect(rect.x).toEqual(0);
        expect(rect.y).toEqual(0);
        shape.destroy();
    });
});