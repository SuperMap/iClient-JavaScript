import {ThemeGridUnique} from '../../../src/common/iServer/ThemeGridUnique';
import {ThemeGridUniqueItem} from '../../../src/common/iServer/ThemeGridUniqueItem';

describe('ThemeGridUnique', () => {
    it('constructor, destroy', () => {
        var themeGrid = new ThemeGridUnique({
            items: [
                new ThemeGridUniqueItem({caption: "test1"}),
                new ThemeGridUniqueItem({caption: "test2"}),
                new ThemeGridUniqueItem({caption: "test3"}),
            ]
        });
        expect(themeGrid).not.toBeNull();
        expect(themeGrid.defaultcolor).not.toBeNull();
        expect(themeGrid.defaultcolor.red).toEqual(255);
        expect(themeGrid.items.length).toEqual(3);
        expect(themeGrid.items[0].caption).toEqual("test1");
        expect(themeGrid.items[1].caption).toEqual("test2");
        expect(themeGrid.items[2].caption).toEqual("test3");
        expect(themeGrid.type).toEqual("GRIDUNIQUE");
        themeGrid.destroy();
        expect(themeGrid.defaultcolor).toBeNull();
        expect(themeGrid.items).toBeNull();
        expect(themeGrid.type).toBeNull();
        expect(themeGrid.memoryData).toBeNull();
    });
    it('toServerJSONObject', () => {
        var themeGrid = new ThemeGridUnique({
            items: [
                new ThemeGridUniqueItem({caption: "test1"}),
                new ThemeGridUniqueItem({caption: "test2"})
            ]
        });
        var obj = themeGrid.toServerJSONObject();
        expect(obj).not.toBeNull();
        expect(obj.defaultcolor).not.toBeNull();
        expect(obj.defaultcolor.red).toEqual(255);
        expect(obj.items.length).toEqual(2);
        expect(obj.items[0].caption).toEqual("test1");
        expect(obj.items[1].caption).toEqual("test2");
        expect(obj.type).toEqual("GRIDUNIQUE");
        themeGrid.destroy();
    });

    it('fromObj', () => {
        var themeGrid = new ThemeGridUnique({
            items: [
                new ThemeGridUniqueItem({caption: "test1"}),
                new ThemeGridUniqueItem({caption: "test2"})
            ]
        });
        var newThemeGrid = new ThemeGridUnique.fromObj(themeGrid);
        expect(newThemeGrid).not.toBeNull();
        expect(newThemeGrid.defaultcolor).not.toBeNull();
        expect(newThemeGrid.defaultcolor.red).toEqual(255);
        expect(newThemeGrid.items.length).toEqual(2);
        expect(newThemeGrid.items[0].caption).toEqual("test1");
        expect(newThemeGrid.items[1].caption).toEqual("test2");
        expect(newThemeGrid.type).toEqual("GRIDUNIQUE");
        themeGrid.destroy();
        newThemeGrid.destroy();
    });
});