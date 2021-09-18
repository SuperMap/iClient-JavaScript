import { ImageGFSlope } from '@supermap/iclient-common/iServer';

var option = {
    girdFuncName: 'GFSlope1',
    Altitude: 25,
    ZFactor: 1
};
describe('ImageGFSlope', () => {
    it('constructor destroy', () => {
        var parameter = new ImageGFSlope(option);
        expect(parameter.girdFuncName).toEqual('GFSlope1');
        expect(parameter.Altitude).toEqual(25);
        expect(parameter.ZFactor).toEqual(1);
        expect(parameter.CLASS_NAME).toEqual('SuperMap.ImageGFSlope');
        parameter.destroy();
        expect(parameter.girdFuncName).toEqual('GFSlope');
        expect(parameter.Altitude).toEqual(45);
        expect(parameter.ZFactor).toEqual(1);
    });

    it('constructFromObject', () => {
        var obj = ImageGFSlope.constructFromObject(option);
        var res = obj instanceof ImageGFSlope;
        expect(res).toBeTruthy();
    });

    it('constructFromObject other key', () => {
        var data = {
            test: 'test'
        };
        var obj = ImageGFSlope.constructFromObject(data);
        expect(obj.hasOwnProperty('test')).toBeFalsy();
    });
});
