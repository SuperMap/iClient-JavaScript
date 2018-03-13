import {ThemeDotDensity} from '../../../src/common/iServer/ThemeDotDensity';

describe('ThemeDotDensity', () => {
    it('constructor, destroy', () => {
        var options = {
            dotExpression: 'test',
            value: 1
        };
        var themeDotDensity = new ThemeDotDensity(options);
        expect(themeDotDensity.dotExpression).toEqual('test');
        expect(themeDotDensity.type).toEqual("DOTDENSITY");
        expect(themeDotDensity.value).toEqual(1);
        expect(themeDotDensity.style).not.toBeNull();
        themeDotDensity.destroy();
        expect(themeDotDensity.value).toBeNull();
        expect(themeDotDensity.style).toBeNull();
        expect(themeDotDensity.dotExpression).toBeNull();
    });

    it('toServerJSONObject', () => {
        var options = {
            dotExpression: 'test',
            value: 1
        };
        var themeDotDensity = new ThemeDotDensity(options);
        var json = themeDotDensity.toServerJSONObject();
        expect(json).not.toBeNull();
        expect(json.dotExpression).toEqual('test');
        expect(json.type).toEqual("DOTDENSITY");
        expect(json.value).toEqual(1);
        expect(json.style).not.toBeNull();
        themeDotDensity.destroy();
    });

    it('fromObj', () => {
        var options = {
            dotExpression: 'test',
            value: 1
        };
        var themeDotDensity = new ThemeDotDensity(options);
        var newObject = new ThemeDotDensity.fromObj(themeDotDensity);
        expect(newObject).not.toBeNull();
        expect(newObject.dotExpression).toEqual('test');
        expect(newObject.type).toEqual("DOTDENSITY");
        expect(newObject.value).toEqual(1);
        expect(newObject.style).not.toBeNull();
        var newObject1 = new ThemeDotDensity.fromObj();
        expect(newObject1).not.toBeNull();
        themeDotDensity.destroy();
    });

});