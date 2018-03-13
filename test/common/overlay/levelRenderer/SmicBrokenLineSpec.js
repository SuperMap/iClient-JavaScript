import {SmicBrokenLine} from '../../../../src/common/overlay/levelRenderer/SmicBrokenLine';

describe('SmicBrokenLine', () => {
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
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(() => {
        window.document.body.removeChild(canvas);
    });

    it('constructor, destroy', () => {
        var shape = new SmicBrokenLine({
            style: {
                pointList: [[0, 0], [100, 100], [100, 0]],
                smooth: 'bezier'
            }
        });
        expect(shape).not.toBeNull();
        expect(shape.brushTypeOnly).toEqual("stroke");
        expect(shape.id).not.toBeNull();
        expect(shape.textPosition).toEqual("end");
        expect(shape.type).toEqual("smicbroken-line");
        expect(shape.style.smooth).toEqual("bezier");
        expect(shape.style.pointList.length).toEqual(3);
        expect(shape.style.pointList[1][0]).toEqual(100);
        expect(shape.style.pointList[1][1]).toEqual(100);
        expect(shape.style.pointList[2][0]).toEqual(100);
        expect(shape.style.pointList[2][1]).toEqual(0);
        shape.destroy();
        expect(shape.brushTypeOnly).toBeNull();
        expect(shape.id).toBeNull();
        expect(shape.textPosition).toBeNull();
        expect(shape.type).toBeNull();
        expect(shape.style).toBeNull();
    });

    //只有一个点时，将不会继续绘制路径，直接退出
    it('buildPath_onePoint', () => {
        var shape = new SmicBrokenLine({
            style: {
                pointList: [[0, 0], [100, 100], [100, 0]],
                smooth: 'bezier'
            }
        });
        shape.refOriginalPosition = null;
        var style = {
            pointList: [[0, 0]],
        };
        shape.buildPath(ctx, style);
        expect(shape).not.toBeNull();
        expect(shape.brushTypeOnly).toEqual("stroke");
        expect(shape.id).not.toBeNull();
        expect(shape.textPosition).toEqual("end");
        expect(shape.type).toEqual("smicbroken-line");
        expect(shape.style.smooth).toEqual("bezier");
        expect(shape.style.pointList.length).toEqual(3);
        shape.destroy();
    });

    //buildPath_pointList情况下，smooth = bezier
    it('buildPath_smooth = bezier', () => {
        var shape = new SmicBrokenLine({
            style: {
                pointList: [[0, 0], [100, 100], [100, 0]],
                smooth: 'bezier'
            }
        });
        shape.refOriginalPosition = null;
        var style = {
            pointList: [[0, 0], [100, 100], [100, 0]],
            smooth: 'bezier'
        };
        shape.buildPath(ctx, style);
        expect(shape).not.toBeNull();
        expect(shape.brushTypeOnly).toEqual("stroke");
        expect(shape.id).not.toBeNull();
        expect(shape.textPosition).toEqual("end");
        expect(shape.type).toEqual("smicbroken-line");
        expect(shape.style.smooth).toEqual("bezier");
        expect(shape.style.pointList.length).toEqual(3);
        shape.destroy();
    });

    //buildPath_pointList情况下，smooth = spline
    it('buildPath_smooth = spline', () => {
        var shape = new SmicBrokenLine({
            style: {
                pointList: [[0, 0], [100, 100], [100, 0]],
                smooth: 'spline'
            }
        });
        shape.refOriginalPosition = null;
        var style = {
            pointList: [[0, 0], [100, 100], [100, 0]],
            smooth: 'spline',
        };
        shape.buildPath(ctx, style);
        expect(shape).not.toBeNull();
        expect(shape.brushTypeOnly).toEqual("stroke");
        expect(shape.id).not.toBeNull();
        expect(shape.textPosition).toEqual("end");
        expect(shape.type).toEqual("smicbroken-line");
        expect(shape.style.smooth).toEqual("spline");
        expect(shape.style.pointList.length).toEqual(3);
        shape.destroy();
    });

    //buildPath_pointList情况下，smooth = spline 测试不同的style.lineType（默认为solid）
    it('buildPath_lineType', () => {
        var shape = new SmicBrokenLine({
            style: {
                pointList: [[0, 0], [100, 100], [100, 0]],
                lineCap: "round",
                smooth: 'spline'
            }
        });
        shape.refOriginalPosition = null;
        var style = {
            pointList: [[0, 0], [100, 100], [100, 0]],
            smooth: 'spline',
            lineCap: "round",
            lineType: 'dashed'
        };
        shape.buildPath(ctx, style);
        expect(shape).not.toBeNull();
        expect(shape).not.toBeNull();
        expect(shape.brushTypeOnly).toEqual("stroke");
        expect(shape.id).not.toBeNull();
        expect(shape.textPosition).toEqual("end");
        expect(shape.type).toEqual("smicbroken-line");
        expect(shape.style.smooth).toEqual("spline");
        expect(shape.style.pointList.length).toEqual(3);
        style.lineType = 'dotted';
        shape.buildPath(ctx, style);
        expect(shape).not.toBeNull();
        style.lineType = 'dot';
        shape.buildPath(ctx, style);
        expect(shape).not.toBeNull();
        style.lineType = 'dash';
        shape.buildPath(ctx, style);
        expect(shape).not.toBeNull();
        style.lineType = 'longdash';
        shape.buildPath(ctx, style);
        expect(shape).not.toBeNull();
        style.lineType = 'dashot';
        shape.buildPath(ctx, style);
        expect(shape).not.toBeNull();
        style.lineType = 'longdashdot';
        shape.buildPath(ctx, style);
        expect(shape).not.toBeNull();
        shape.destroy();
    });

    it('getRect', () => {
        var shape = new SmicBrokenLine({
            style: {
                pointList: [[0, 0], [100, 100], [100, 0]],
                lineCap: "round",
            }
        });
        shape.refOriginalPosition = null;
        var style = {
            pointList: [[0, 0], [100, 100], [100, 0]],
            smooth: 'spline',
            lineCap: "round",
            lineType: 'dashed'
        };
        var rect = shape.getRect(style);
        expect(rect).not.toBeNull();
        expect(rect.height).toEqual(100);
        expect(rect.width).toEqual(100);
        expect(rect.x).toEqual(0);
        expect(rect.y).toEqual(0);
        shape.destroy();
    });
});