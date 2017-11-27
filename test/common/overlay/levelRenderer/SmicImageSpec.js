require('../../../../src/common/overlay/levelRenderer/SmicImage');
var img = require('../../../resources/img/baiduTileTest.png');

describe('SmicImage', function () {
    var originalTimeout;
    var canvas, ctx;
    beforeAll(function () {
        canvas = window.document.createElement('CANVAS');
        canvas.width = 400;
        canvas.height = 400;
        canvas.style.border = "1px solid #000000";
        ctx = canvas.getContext('2d');
        window.document.body.appendChild(canvas);
    });
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(function () {
        window.document.body.removeChild(canvas);
    });

    it('constructor, destroy', function () {
        var image = new SuperMap.LevelRenderer.Shape.SmicImage({
            style: {
                image: img.src,
                x: 100,
                y: 100
            }
        });
        expect(image).not.toBeNull();
        expect(image.id).not.toBeNull();
        expect(image.type).toEqual("smicimage");
        expect(image.style.image).not.toBeNull();
        expect(image.style.x).toEqual(100);
        expect(image.style.y).toEqual(100);
        image.destroy();
        expect(image.id).toBeNull();
        expect(image.type).toBeNull();
        expect(image.style).toBeNull();
    });

    it('brush, clearCache', function (done) {
        var image = new SuperMap.LevelRenderer.Shape.SmicImage({
            style: {
                image: img.src,
                x: 100,
                y: 100,
                sx: 5,
                sy: 5,
            }
        });
        image.refOriginalPosition = null;
        image.brush(ctx, true, function () {
            image.brush(ctx, true, false);
            expect(image).not.toBeNull();
            expect(image.id).not.toBeNull();
            expect(image.type).toEqual("smicimage");
            expect(image.style.width).toEqual(128);
            expect(image.style.height).toEqual(128);
            expect(image.style.x).toEqual(100);
            expect(image.style.y).toEqual(100);
            expect(image.style.sx).toEqual(5);
            expect(image.style.sy).toEqual(5);
            expect(image.style.image).not.toBeNull();
            expect(image._imageCache).not.toBeNull();
            image.clearCache();
            expect(image._imageCache).toEqual({});
            image.destroy();
            done();
        });
    });

    it('getRect', function () {
        var image = new SuperMap.LevelRenderer.Shape.SmicImage({
            style: {
                image: img.src,
                x: 100,
                y: 100
            }
        });
        var style = {
            image: img.src,
            x: 100,
            y: 100,
            height: 128,
            width: 128,
        };
        var rect = image.getRect(style);
        expect(rect).not.toBeNull();
        expect(rect.width).toEqual(128);
        expect(rect.height).toEqual(128);
        expect(rect.x).toEqual(100);
        expect(rect.y).toEqual(100);
        image.destroy();
    });
});