import { MetricsAggParameter, BucketAggParameter } from '@supermapgis/iclient-common/iServer';

describe('BucketAggParameter', () => {
    it('constructor destroy', () => {
        var subAgg = new MetricsAggParameter();
        var option = {
            subAggs: [subAgg]
        };
        var parametersNull = new BucketAggParameter();
        expect(parametersNull).not.toBeNull();
        var parameter = new BucketAggParameter(option);
        expect(parameter.subAggs[0].aggType).toEqual('avg');
        expect(parameter.CLASS_NAME).toEqual('SuperMap.BucketAggParameter');

        parameter.destroy();
        expect(parameter.subAggs).toBeNull();
    });

    it('subAggs', () => {
        var subAgg = new MetricsAggParameter({ aggType: 'min' });
        var option = {
            subAggs: [subAgg]
        };
        var parameter = new BucketAggParameter(option);
        expect(parameter.subAggs[0].aggType).toEqual('min');
        parameter.destroy();
    });
});
