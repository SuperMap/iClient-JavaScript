import {SmicIsogon} from '../../../../src/common/overlay/levelRenderer/SmicIsogon';

describe('SmicIsogon', () => {
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
        var polygon = new SmicIsogon({
            style: {
                n: 4,
                x: 150,
                y: 150,
                r: 100,
                text: "正四边形"
            }
        });
        expect(polygon).not.toBeNull();
        expect(polygon.type).toEqual("smicisogon");
        expect(polygon.id).not.toBeNull();
        expect(polygon.style.x).toEqual(150);
        expect(polygon.style.y).toEqual(150);
        expect(polygon.style.r).toEqual(100);
        expect(polygon.style.n).toEqual(4);
        expect(polygon.style.text).toEqual("正四边形");
        polygon.destroy();
        expect(polygon.type).toBeNull();
        expect(polygon.id).toBeNull();
        expect(polygon.style).toBeNull();
    });

    it('buildPath_n > 3', () => {
        var polygon = new SmicIsogon({
            style: {
                n: 4,
                x: 150,
                y: 150,
                r: 100,
                text: "正四边形"
            }
        });
        polygon.refOriginalPosition = null;
        var style = {
            n: 4,
            x: 150,
            y: 150,
            r: 100,
            text: "正四边形"
        };
        polygon.buildPath(ctx, style);
        expect(polygon).not.toBeNull();
        expect(polygon.type).toEqual("smicisogon");
        expect(polygon.id).not.toBeNull();
        expect(polygon.style.x).toEqual(150);
        expect(polygon.style.y).toEqual(150);
        expect(polygon.style.r).toEqual(100);
        expect(polygon.style.n).toEqual(4);
        expect(polygon.style.text).toEqual("正四边形");
        polygon.destroy();
    });

    //此处待开发完善修改
    xit('buildPath_n < 3', () => {
        var polygon = new SmicIsogon({
            style: {
                n: 2,
                x: 150,
                y: 150,
                r: 100,
                text: "正四边形"
            }
        });
        polygon.refOriginalPosition = null;
        var style = {
            n: 2,
            x: 150,
            y: 150,
            r: 100,
            text: "正四边形"
        };
        polygon.buildPath(ctx, style);
        expect(polygon).not.toBeNull();
        // expect(polygon.type).toEqual("smicisogon");
        // expect(polygon.id).not.toBeNull();
        // expect(polygon.style.x).toEqual(150);
        // expect(polygon.style.y).toEqual(150);
        // expect(polygon.style.r).toEqual(100);
        // expect(polygon.style.n).toEqual(4);
        // expect(polygon.style.text).toEqual("正四边形");
        polygon.destroy();
    });

    it('getRect_brushType = fill', () => {
        var polygon = new SmicIsogon({
            style: {
                n: 4,
                x: 150,
                y: 150,
                r: 100,
                text: "正四边形"
            }
        });
        polygon.refOriginalPosition = null;
        var style = {
            n: 4,
            x: 150,
            y: 150,
            r: 100,
            text: "正四边形",
            brushType: 'fill'
        };
        var rect = polygon.getRect(style);
        expect(rect).not.toBeNull();
        expect(rect.height).toEqual(201);
        expect(rect.width).toEqual(201);
        expect(rect.x).toEqual(50);
        expect(rect.y).toEqual(50);
        polygon.destroy();
    });

    it('getRect_brushType = null', () => {
        var polygon = new SmicIsogon({
            style: {
                n: 4,
                x: 150,
                y: 150,
                r: 100,
                text: "正四边形"
            }
        });
        polygon.refOriginalPosition = null;
        var style = {
            n: 4,
            x: 150,
            y: 150,
            r: 100,
            text: "正四边形",
        };
        var rect = polygon.getRect(style);
        expect(rect).not.toBeNull();
        expect(rect.height).toEqual(200);
        expect(rect.width).toEqual(200);
        expect(rect.x).toEqual(50);
        expect(rect.y).toEqual(50);
        polygon.destroy();
    });
});