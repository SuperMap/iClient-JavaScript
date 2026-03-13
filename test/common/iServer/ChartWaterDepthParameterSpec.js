import { ChartWaterDepthParameter } from '@supermapgis/iclient-common/iServer/ChartWaterDepthParameter';

describe('ChartWaterDepthParameter', () => {
    it('constructor, destroy', () => {
        var options = {
            X: 100,
            Y: 20
        };
        var parameter = new ChartWaterDepthParameter(options);
        expect(parameter).not.toBeNull();
        expect(parameter.X).toBe(100);
        expect(parameter.Y).toBe(20);
        parameter.destroy();
        expect(parameter.X).toBeNull();
        expect(parameter.Y).toBeNull();
    });
});
