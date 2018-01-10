var Pixel = require('../../../src/common/commontypes/Pixel').Pixel;

describe('Pixel', function () {
    it('constructor, destroy', function () {
        var pixel = new Pixel();
        expect(pixel).not.toBeNull();
        expect(pixel.x).toEqual(0.0);
        expect(pixel.y).toEqual(0.0);
        pixel.destroy();
        expect(pixel.x).toBeNull();
        expect(pixel.y).toBeNull();
        expect(pixel.mode).toBeNull();
    });

    it('toString', function () {
        var pixel = new Pixel(100, 50);
        var str = pixel.toString();
        expect(str).toEqual("x=100,y=50");
        pixel.destroy();
    });

    it('equals', function () {
        var pixel = new Pixel(100, 50);
        var pixel2 = new Pixel(100, 50);
        var isEquals = pixel.equals(pixel2);
        expect(isEquals).toBeTruthy();
        pixel.destroy();
        pixel2.destroy();
    });

    it('distanceTo', function () {
        var pixel = new Pixel(100, 50);
        var pixel2 = new Pixel(110, 30);
        var distance = pixel.distanceTo(pixel2);
        expect(distance).not.toBeNaN();
        pixel.destroy();
        pixel2.destroy();
    });

    it('offset', function () {
        var pixel = new Pixel(100,50);
        var pixel2 = new Pixel(30,20);
        var pixel3 = pixel.offset(pixel2);
        expect(pixel3.x).toEqual(130);
        expect(pixel3.y).toEqual(70);
        pixel.destroy();
        pixel2.destroy();
        pixel3.destroy();
    });
});