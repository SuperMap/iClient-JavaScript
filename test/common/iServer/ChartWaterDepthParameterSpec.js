import { ChartWaterDepthParameter } from '@supermapgis/iclient-common/iServer/ChartWaterDepthParameter';

describe('ChartWaterDepthParameter', () => {
    it('constructor, destroy', () => {
        var options = {
            dataSource: 'datasrouce',
            X: 100,
            Y: 20
        };
        var parameter = new ChartWaterDepthParameter(options);
        expect(parameter).not.toBeNull();
        expect(parameter.dataSource).toBe('datasrouce');
        expect(parameter.X).toBe(100);
        expect(parameter.Y).toBe(20);
        parameter.destroy();
        expect(parameter.dataSource).toBeNull();
        expect(parameter.X).toBeNull();
        expect(parameter.Y).toBeNull();
    });
});
