import {LabelMixedTextStyle} from '../../../src/common/iServer/LabelMixedTextStyle';
import {ServerTextStyle} from '../../../src/common/iServer/ServerTextStyle';
import {ServerColor} from '../../../src/common/iServer/ServerColor';

describe('LabelMixedTextStyle', () => {
    it('constructor, destroy', () => {
        var options = {
            defaultStyle: new ServerTextStyle(),
            //文本的分隔符
            separator: "",
            separatorEnabled: false,
            splitIndexes: [1, 3, 4, 9],
            styles: [
                new ServerTextStyle({backColor: new ServerColor(250, 105, 25)}),
                new ServerTextStyle({backColor: new ServerColor(150, 105, 25)}),
                new ServerTextStyle({backColor: new ServerColor(105, 105, 25)}),
                new ServerTextStyle({backColor: new ServerColor(25, 105, 25)})
            ]
        };

        var labelMixedTextStyle = new LabelMixedTextStyle(options);
        expect(labelMixedTextStyle).not.toBeNull();
        expect(labelMixedTextStyle.defaultStyle).not.toBeNull();
        expect(labelMixedTextStyle.separatorEnabled).toBeFalsy();
        expect(labelMixedTextStyle.splitIndexes.length).toEqual(4);
        expect(labelMixedTextStyle.splitIndexes[0]).toEqual(1);
        expect(labelMixedTextStyle.splitIndexes[1]).toEqual(3);
        expect(labelMixedTextStyle.splitIndexes[2]).toEqual(4);
        expect(labelMixedTextStyle.splitIndexes[3]).toEqual(9);
        expect(labelMixedTextStyle.styles.length).toEqual(4);
        labelMixedTextStyle.destroy();
        expect(labelMixedTextStyle.defaultStyle).toBeNull();
        expect(labelMixedTextStyle.separatorEnabled).toBeNull();
        expect(labelMixedTextStyle.splitIndexes).toBeNull();
        expect(labelMixedTextStyle.styles).toBeNull();
    });

    it('fromJson', () => {
        var obj = {
            text: "this is a test",
            styles: [
                {backColor: new ServerColor(250, 105, 25)}
            ]
        };
        var newStyle = LabelMixedTextStyle.fromObj(obj);
        expect(newStyle).not.toBeNull();
        expect(newStyle.styles.length).toEqual(1);
        expect(newStyle.styles[0].backColor.blue).toEqual(25);
        expect(newStyle.styles[0].backColor.green).toEqual(105);
        expect(newStyle.styles[0].backColor.red).toEqual(250);
        //没有参数obj时，自动return 
        var result = LabelMixedTextStyle.fromObj();
        expect(result).toBeUndefined();
    });
});