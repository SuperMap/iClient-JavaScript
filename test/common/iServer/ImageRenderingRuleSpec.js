import {
    ImageGFHillShade,
    ImageGFSlope,
    ImageGFAspect,
    ImageGFOrtho,
    ImageStretchOption,
    ImageRenderingRule
} from '@supermap/iclient-common/iServer';

var option = {
    displayMode: 'Composite',
    displayBands: [4, 3, 2],
    stretchOption: new ImageStretchOption({
        stretchType: 'Gaussian',
        stdevCoefficient: 1,
        gaussianCoefficient: 1,
        useMedianValue: 1,
        minPercent: 1,
        maxPercent: 1
    }),
    interpolationMode: 'NearestNeighbor',
    colorScheme: ['255,0,0'],
    colorTable: ['500: 255,0,0'],
    brightness: 100,
    contrast: 100,
    noData: [2],
    noDataColor: '255,0,0',
    noDataTransparent: true,
    backgroundValue: '255,0,0',
    backgroundColor: '255,0,0',
    backgroundTransparent: true,
    gridFuncOptions: [
        new ImageGFHillShade({ girdFuncName: 'GFHillShade1', Azimuth: 45, Altitude: 2, ZFactor: 1 }),
        new ImageGFSlope({ girdFuncName: 'GFSlope1', Altitude: 25, ZFactor: 1 }),
        new ImageGFAspect({ girdFuncName: 'GFAspect', Azimuth: 360 }),
        new ImageGFOrtho({ girdFuncName: 'GFOrtho1' })
    ]
};
describe('ImageRenderingRule', () => {
    it('constructor destroy', () => {
        var parameter = new ImageRenderingRule(option);
        expect(parameter.displayMode).toEqual('Composite');
        expect(parameter.displayBands.length).toEqual(option.displayBands.length);
        expect(parameter.stretchOption).not.toBeNull();
        expect(parameter.interpolationMode).toEqual('NearestNeighbor');
        expect(parameter.colorScheme.length).toEqual(option.colorScheme.length);
        expect(parameter.colorTable.length).toEqual(option.colorTable.length);
        expect(parameter.brightness).toEqual(100);
        expect(parameter.contrast).toEqual(100);
        expect(parameter.noData.length).toEqual(option.noData.length);
        expect(parameter.noDataColor).toEqual(option.noDataColor);
        expect(parameter.backgroundValue).toEqual(option.backgroundValue);
        expect(parameter.backgroundColor).toEqual(option.backgroundColor);
        expect(parameter.backgroundTransparent).toBeTruthy();
        expect(parameter.noDataTransparent).toBeTruthy();
        expect(parameter.gridFuncOptions.length).toBe(4);
        expect(parameter.CLASS_NAME).toEqual('SuperMap.ImageRenderingRule');
        parameter.destroy();
        expect(parameter.displayMode).toEqual(undefined);
        expect(parameter.displayBands).toEqual(undefined);
        expect(parameter.stretchOption).toEqual(undefined);
        expect(parameter.interpolationMode).toEqual(undefined);
        expect(parameter.colorScheme).toEqual(undefined);
        expect(parameter.colorTable).toEqual(undefined);
        expect(parameter.brightness).toEqual(undefined);
        expect(parameter.contrast).toEqual(undefined);
        expect(parameter.noData).toEqual(undefined);
        expect(parameter.noDataColor).toEqual(undefined);
        expect(parameter.backgroundValue).toEqual(undefined);
        expect(parameter.backgroundColor).toEqual(undefined);
        expect(parameter.backgroundTransparent).toEqual(undefined);
        expect(parameter.gridFuncOptions).toEqual(undefined);
    });

    it('constructFromObject', () => {
        var obj = ImageRenderingRule.constructFromObject(option);
        var res = obj instanceof ImageRenderingRule;
        expect(res).toBeTruthy();
    });

    it('constructFromObject other key', () => {
        var data = {
            test: 'test'
        };
        var obj = ImageRenderingRule.constructFromObject(data);
        expect(obj.hasOwnProperty('test')).toBeFalsy();
    });
});
