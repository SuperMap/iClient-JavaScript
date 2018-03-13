import {ThemeRange} from '../../../src/common/iServer/ThemeRange';
import {ThemeRangeItem} from '../../../src/common/iServer/ThemeRangeItem';

describe('ThemeRange', () => {
    it('constructor, destroy', () => {
        var options = {
            items: [new ThemeRangeItem({caption: 'test1'})],
        };
        var themeRange = new ThemeRange(options);
        expect(themeRange).not.toBeNull();
        expect(themeRange.colorGradientType).toEqual("YELLOWRED");
        expect(themeRange.precision).toEqual("1.0E-12");
        expect(themeRange.items[0].caption).toEqual('test1');
        expect(themeRange.rangeMode).toEqual("EQUALINTERVAL");
        expect(themeRange.type).toEqual("RANGE");
        var json = themeRange.items[0].toServerJSONObject();
        expect(json).not.toBeNull();
        expect(json.caption).toEqual('test1');
        expect(json.style).not.toBeNull();
        var newObject = new ThemeRangeItem.fromObj(themeRange.items[0]);
        expect(newObject).not.toBeNull();
        expect(newObject.caption).toEqual('test1');
        expect(newObject.style).not.toBeNull();
        var newObject1 = new ThemeRangeItem.fromObj();
        expect(newObject1).not.toBeNull();
        themeRange.destroy();
        expect(themeRange.items).toBeNull();
        expect(themeRange.rangeExpression).toBeNull();
        expect(themeRange.rangeMode).toBeNull();
        expect(themeRange.rangeParameter).toBeNull();
        expect(themeRange.colorGradientType).toBeNull();
    });

    it('fromObj', () => {
        var options = {
            items: [new ThemeRangeItem({caption: 'test1'})],
        };
        var themeRange = new ThemeRange(options);
        var newObject = new ThemeRange.fromObj(themeRange);
        expect(newObject).not.toBeNull();
        expect(newObject.colorGradientType).toEqual("YELLOWRED");
        expect(newObject.precision).toEqual("1.0E-12");
        expect(newObject.items[0].caption).toEqual('test1');
        expect(newObject.rangeMode).toEqual("EQUALINTERVAL");
        expect(newObject.type).toEqual("RANGE");
        var newObject1 = new ThemeRange.fromObj();
        expect(newObject1).not.toBeNull();
        themeRange.destroy();
    });
});