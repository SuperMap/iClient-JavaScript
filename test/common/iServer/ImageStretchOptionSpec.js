import { ImageStretchOption } from '@supermapgis/iclient-common/iServer';

var option = {
    stretchType: 'Gaussian',
    stdevCoefficient: 1,
    gaussianCoefficient: 1,
    useMedianValue: 1,
    minPercent: 1,
    maxPercent: 1
};
describe('ImageStretchOption', () => {
    it('constructor destroy', () => {
        var parameter = new ImageStretchOption(option);
        expect(parameter.stretchType).toEqual('Gaussian');
        expect(parameter.stdevCoefficient).toEqual(1);
        expect(parameter.gaussianCoefficient).toEqual(1);
        expect(parameter.useMedianValue).toEqual(1);
        expect(parameter.minPercent).toEqual(1);
        expect(parameter.maxPercent).toEqual(1);
        expect(parameter.CLASS_NAME).toEqual('SuperMap.ImageStretchOption');
        parameter.destroy();
        expect(parameter.stretchType).toEqual(undefined);
        expect(parameter.stdevCoefficient).toEqual(undefined);
        expect(parameter.gaussianCoefficient).toEqual(undefined);
        expect(parameter.useMedianValue).toEqual(undefined);
        expect(parameter.minPercent).toEqual(undefined);
        expect(parameter.maxPercent).toEqual(undefined);
    });

    it('constructFromObject', () => {
        var obj = ImageStretchOption.constructFromObject(option);
        var res = obj instanceof ImageStretchOption;
        expect(res).toBeTruthy();
    });

    it('constructFromObject other key', () => {
        var data = {
            test: 'test'
        };
        var obj = ImageStretchOption.constructFromObject(data);
        expect(obj.hasOwnProperty('test')).toBeFalsy();
    });
});
