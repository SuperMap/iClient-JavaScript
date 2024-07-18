import { MetricsAggParameter } from '@supermapgis/iclient-common/iServer';

describe('MetricsAggParameter', () => {
    it('constructor destroy', () => {
        var option = {
            aggType: 'max'
        };
        var parametersNull = new MetricsAggParameter();
        expect(parametersNull).not.toBeNull();
        var parameter = new MetricsAggParameter(option);
        expect(parameter.aggType).toEqual('max');
        expect(parameter.CLASS_NAME).toEqual('SuperMap.MetricsAggParameter');

        parameter.destroy();
        expect(parameter.aggType).toBeNull();
    });

    it('aggType', () => {
        var parameter = new MetricsAggParameter({ aggType: 'min' });
        expect(parameter.aggType).toEqual('min');
        parameter.destroy();
    });
});
