import {SmicStar} from '../../../../src/common/overlay/levelRenderer/SmicStar';

describe('SmicStar', () => {
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
        var star = new SmicStar({
            style: {
                x: 200,
                y: 100,
                r: 150,
                n: 5,
                text: '五角星'
            },
        });
        expect(star).not.toBeNull();
        expect(star.type).toEqual("smicstar");
        expect(star.id).not.toBeNull();
        expect(star.style.x).toEqual(200);
        expect(star.style.y).toEqual(100);
        expect(star.style.r).toEqual(150);
        expect(star.style.n).toEqual(5);
        expect(star.style.text).toEqual("五角星");
        star.destroy();
        expect(star.type).toBeNull();
        expect(star.id).toBeNull();
        expect(star.style).toBeNull();
    });

    //创建 n 角星（n>3）路径。
    it('buildPath', () => {
        var star = new SmicStar({
            style: {
                x: 200,
                y: 100,
                r: 150,
                n: 3,
                text: '三角星'
            },
        });
        star.refOriginalPosition = null;
        var style = {
            x: 200,
            y: 100,
            r: 150,
            n: 3,
            text: '三角星',
            color: '#a09f3e'
        };
        star.buildPath(ctx, style);
        expect(star).not.toBeNull();
        expect(star.type).toEqual("smicstar");
        expect(star.id).not.toBeNull();
        expect(star.style.x).toEqual(200);
        expect(star.style.y).toEqual(100);
        expect(star.style.r).toEqual(150);
        expect(star.style.n).toEqual(3);
        expect(star.style.text).toEqual("三角星");
        star.destroy();
    });

    //返回 n 角星包围盒矩形
    it('getRect_brushType = fill', () => {
        var star = new SmicStar({
            style: {
                x: 200,
                y: 100,
                r: 150,
                n: 5,
                text: '五角星'
            },
        });
        star.refOriginalPosition = null;
        var style = {
            x: 200,
            y: 100,
            r: 150,
            n: 5,
            text: '五角星',
            brushType: 'fill'
        };
        var rect = star.getRect(style);
        expect(rect).not.toBeNull();
        expect(rect.height).toEqual(301);
        expect(rect.width).toEqual(301);
        expect(rect.x).toEqual(50);
        expect(rect.y).toEqual(-50);
        star.destroy();
    });

    it('getRect_brushType = null', () => {
        var star = new SmicStar({
            style: {
                x: 200,
                y: 100,
                r: 150,
                n: 5,
                text: '五角星'
            },
        });
        star.refOriginalPosition = null;
        var style = {
            x: 200,
            y: 100,
            r: 150,
            n: 5,
            text: '五角星',
        };
        var rect = star.getRect(style);
        expect(rect).not.toBeNull();
        expect(rect.height).toEqual(300);
        expect(rect.width).toEqual(300);
        expect(rect.x).toEqual(50);
        expect(rect.y).toEqual(-50);
        star.destroy();
    });
});