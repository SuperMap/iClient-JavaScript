import {ThemeLabelUniqueItem} from '../../../src/common/iServer/ThemeLabelUniqueItem';

describe('ThemeLabelUniqueItem', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('constructor, destroy', () => {
        var themeLabel = new ThemeLabelUniqueItem({caption: "testCaption"});
        expect(themeLabel).not.toBeNull();
        expect(themeLabel.caption).toEqual("testCaption");
        expect(themeLabel.offsetX).toEqual(0);
        expect(themeLabel.offsetY).toEqual(0);
        expect(themeLabel.style).not.toBeNull();
        expect(themeLabel.style.CLASS_NAME).toEqual("SuperMap.ServerTextStyle");
        themeLabel.destroy();
        expect(themeLabel.caption).toBeNull();
        expect(themeLabel.offsetX).toBeNull();
        expect(themeLabel.offsetY).toBeNull();
        expect(themeLabel.style).toBeNull();
    });
    it('fromObj', () => {
        var themeLabel = new ThemeLabelUniqueItem({caption: "testCaption"});
        var newThemeLabel = new ThemeLabelUniqueItem.fromObj(themeLabel);
        expect(newThemeLabel).not.toBeNull();
        expect(newThemeLabel.caption).toEqual("testCaption");
        var newThemeLabel2 = new ThemeLabelUniqueItem.fromObj();
        expect(newThemeLabel2).not.toBeNull();
    });

});
