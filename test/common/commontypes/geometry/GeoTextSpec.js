require('../../../../src/common/commontypes/geometry/GeoText');

describe('common_GeoText', function () {

    it('GeoText_test', function () {
        var x = 100, y = 35, text = "中华人民共和国";
        var geoText = new SuperMap.Geometry.GeoText(x, y, text);
        geoText.bsInfo = {
            h: 100,
            w: 150
        };
        var geoTextFeature = new SuperMap.Feature.Vector(geoText);
        expect(geoText).not.toBeNull();
        expect(geoTextFeature).not.toBeNull();
        expect(geoTextFeature.CLASS_NAME).toEqual("SuperMap.Feature.Vector");
        expect(geoTextFeature.id).not.toBeNull();
        expect(geoTextFeature.geometry.CLASS_NAME).toEqual("SuperMap.Geometry.GeoText");
        expect(geoTextFeature.geometry.id).not.toBeNull();
        expect(geoTextFeature.geometry.text).toEqual(text);
        expect(geoTextFeature.geometry.x).toEqual(x);
        expect(geoTextFeature.geometry.y).toEqual(y);
        expect(geoTextFeature.geometry.bsInfo.w).toEqual(150);
        expect(geoTextFeature.geometry.bsInfo.h).toEqual(100);
        geoText.destroy();
        expect(geoTextFeature.geometry.text).toBeNull();
        expect(geoTextFeature.geometry.x).toBeNull();
        expect(geoTextFeature.geometry.y).toBeNull();
    });

    it('clone_test', function () {
        var x = 100, y = 35, text = "中华人民共和国";
        var geoText = new SuperMap.Geometry.GeoText(x, y, text);
        var obj = geoText.clone();
        expect(geoText).not.toBeNull();
        expect(geoText.id).not.toBeNull();
        expect(obj).not.toBeNull();
        expect(obj.id).not.toBeNull();
        expect(obj.id).not.toEqual(geoText.id);
        expect(obj.x).toEqual(geoText.x);
        expect(obj.x).toEqual(x);
        expect(obj.y).toEqual(geoText.y);
        expect(obj.y).toEqual(y);
        expect(obj.text).toEqual(geoText.text);
        expect(obj.text).toEqual(text);
        geoText.destroy();
    });

    it('calculateBounds_test', function () {
        var x = 100, y = 35, text = "中华人民共和国";
        var geoText = new SuperMap.Geometry.GeoText(x, y, text);
        geoText.calculateBounds();
        expect(geoText).not.toBeNull();
        expect(geoText.bounds).not.toBeNull();
        expect(geoText.bounds.bottom).toEqual(geoText.bounds.top);
        expect(geoText.bounds.bottom).toEqual(y);
        expect(geoText.bounds.left).toEqual(geoText.bounds.right);
        expect(geoText.bounds.left).toEqual(x);
        geoText.destroy();
    });
});