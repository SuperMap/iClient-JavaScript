import {UGCImage} from '../../../src/common/iServer/Image';
import {ServerStyle} from '../../../src/common/iServer/ServerStyle';
import {ServerColor} from '../../../src/common/iServer/ServerColor';

describe('Image', function () {
    it('constructor, destroy', function () {
        var image = new UGCImage();
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
        var image = new UGCImage();
        var jsonObject = {
            "color": "#a0559c"
        };
        image.transparentColor = new ServerColor(100, 120, 60);
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