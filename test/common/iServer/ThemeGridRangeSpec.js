import {ThemeGridRange} from '../../../src/common/iServer/ThemeGridRange';
import {ThemeGridRangeItem} from '../../../src/common/iServer/ThemeGridRangeItem';

describe('ThemeGridRange', () => {
    it('constructor, destroy', () => {
        var options = {
            items: [new ThemeGridRangeItem({caption: "test1"}),
                new ThemeGridRangeItem({caption: "test2"})],
        };
        var themeGridRange = new ThemeGridRange(options);
        expect(themeGridRange).not.toBeNull();
        expect(themeGridRange.reverseColor).not.toBeNull();
        expect(themeGridRange.colorGradientType).toEqual("YELLOWRED");
        expect(themeGridRange.items.length).toEqual(2);
        expect(themeGridRange.items[0].caption).toEqual("test1");
        expect(themeGridRange.items[1].caption).toEqual("test2");
        expect(themeGridRange.rangeMode).toEqual("EQUALINTERVAL");
        expect(themeGridRange.type).toEqual("GRIDRANGE");
        var json = themeGridRange.items[0].toServerJSONObject();
        expect(json).not.toBeNull();
        expect(json.caption).toEqual("test1");
        expect(json.visible).toBeTruthy();
        var newItems1 = new ThemeGridRangeItem.fromObj(themeGridRange.items[0]);
        expect(newItems1.caption).toEqual("test1");
        expect(newItems1.color.red).toEqual(255);
        var newItems2 = new ThemeGridRangeItem.fromObj();
        expect(newItems2).not.toBeNull();
        themeGridRange.destroy();
        expect(themeGridRange.items).toBeNull();
        expect(themeGridRange.reverseColor).toBeNull();
        expect(themeGridRange.rangeMode).toBeNull();
        expect(themeGridRange.rangeParameter).toBeNull();
        expect(themeGridRange.colorGradientType).toBeNull();
    });

    it('fromObj', () => {
        var options = {
            items: [new ThemeGridRangeItem({caption: "test1"})],
        };
        var themeGridRange = new ThemeGridRange(options);
        var newThemeGridRange = new ThemeGridRange.fromObj(themeGridRange);
        expect(newThemeGridRange).not.toBeNull();
        expect(newThemeGridRange.items[0].caption).toEqual("test1");
        expect(newThemeGridRange.colorGradientType).toEqual("YELLOWRED");
        expect(newThemeGridRange.rangeMode).toEqual("EQUALINTERVAL");
        expect(newThemeGridRange.type).toEqual("GRIDRANGE");
        var newThemeGridRange1 = new ThemeGridRange.fromObj();
        expect(newThemeGridRange1).not.toBeNull();
        newThemeGridRange.destroy();
    });
});
