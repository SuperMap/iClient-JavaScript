import {OverlapDisplayedOptions} from '../../../src/common/iServer/OverlapDisplayedOptions';

describe('OverlapDisplayedOptions', () => {
    it('constructor, destroy', () => {
        var overlapDisplayed = new OverlapDisplayedOptions();
        expect(overlapDisplayed).not.toBeNull();
        expect(overlapDisplayed.CLASS_NAME).toEqual("SuperMap.OverlapDisplayedOptions");
        expect(overlapDisplayed.allowPointOverlap).toBeTruthy();
        expect(overlapDisplayed.allowPointWithTextDisplay).toBeTruthy();
        expect(overlapDisplayed.allowTextOverlap).toBeFalsy();
        expect(overlapDisplayed.allowTextAndPointOverlap).toBeTruthy();
        expect(overlapDisplayed.allowThemeGraduatedSymbolOverlap).toBeFalsy();
        expect(overlapDisplayed.allowThemeGraphOverlap).toBeFalsy();
        expect(overlapDisplayed.ugcLayer).not.toBeNull();
        expect(overlapDisplayed.ugcLayer.CLASS_NAME).toEqual("SuperMap.UGCLayer");
        overlapDisplayed.destroy();
        expect(overlapDisplayed.CLASS_NAME).toBeNull();
        expect(overlapDisplayed.allowPointOverlap).toBeNull();
        expect(overlapDisplayed.allowPointWithTextDisplay).toBeNull();
        expect(overlapDisplayed.allowTextOverlap).toBeNull();
        expect(overlapDisplayed.allowTextAndPointOverlap).toBeNull();
        expect(overlapDisplayed.allowThemeGraduatedSymbolOverlap).toBeNull();
        expect(overlapDisplayed.allowThemeGraphOverlap).toBeNull();
        expect(overlapDisplayed.ugcLayer).toBeNull();
    });

    it('toServerJSONObject, fromJson', () => {
        var overlapDisplayed = new OverlapDisplayedOptions();
        var json = overlapDisplayed.toServerJSONObject();
        expect(json).not.toBeNull();
        expect(json.allowPointOverlap).toBeTruthy();
        expect(json.allowPointWithTextDisplay).toBeTruthy();
        expect(json.allowTextOverlap).toBeFalsy();
        expect(json.allowTextAndPointOverlap).toBeTruthy();
        expect(json.allowThemeGraduatedSymbolOverlap).toBeFalsy();
        expect(json.allowThemeGraphOverlap).toBeFalsy();
        expect(json.ugcLayer).not.toBeNull();
        //将服务端JSON对象转换成当前客户端对象
        overlapDisplayed.fromJson(json);
        overlapDisplayed.destroy();
    });

    it('toString', () => {
        var overlapDisplayed = new OverlapDisplayedOptions();
        var string = overlapDisplayed.toString();
        expect(string).not.toBeNull();
        expect(string).toContain("'allowPointOverlap':true");
        overlapDisplayed.destroy();
    });
});