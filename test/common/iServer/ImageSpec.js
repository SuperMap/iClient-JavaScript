var Image = require('../../../src/common/iServer/Image').UGCImage;
var ServerStyle = require('../../../src/common/iServer/ServerStyle').ServerStyle;
var ServerColor = require('../../../src/common/iServer/ServerColor').ServerColor;

describe('Image', function () {
    it('constructor, destroy', function () {
        var image = new Image();
        expect(image.CLASS_NAME).toEqual("SuperMap.Image");
        expect(image.brightness).toBeNull();
        expect(image.colorSpaceType).toBeNull();
        expect(image.contrast).toBeNull();
        expect(image.displayBandIndexes).toBeNull();
        expect(image.transparent).toBeNull();
        expect(image.transparentColorTolerance).toBeNull();
        image.destroy();
    });

    it('fromJson, toServerJSONObject', function () {
        var image = new Image();
        var jsonObject = {
            "color": "#a0559c"
        };
        image.transparentColor = new ServerColor(100,120,60);
        image.fromJson(jsonObject);
        expect(image.color).toEqual("#a0559c");
        var newJsonObject = image.toServerJSONObject();
        expect(newJsonObject).not.toBeNull();
        expect(newJsonObject.color).toEqual("#a0559c");
        expect(newJsonObject.transparentColor.blue).toEqual(60);
        expect(newJsonObject.transparentColor.green).toEqual(120);
        expect(newJsonObject.transparentColor.red).toEqual(100);
        image.destroy();
    });
});