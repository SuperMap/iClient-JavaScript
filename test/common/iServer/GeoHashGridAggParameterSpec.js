import { GeoHashGridAggParameter } from '../../../src/common/iServer';

describe('GeoHashGridAggParameter', () => {
    it('constructor destroy', () => {
        var option = {
            precision: 10
        };
        var parametersNull = new GeoHashGridAggParameter();
        expect(parametersNull).not.toBeNull();
        var parameter = new GeoHashGridAggParameter(option);
        expect(parameter.precision).toEqual(10);
        expect(parameter.CLASS_NAME).toEqual('SuperMap.GeoHashGridAggParameter');
        parameter.destroy();
        expect(parameter.precision).toBeNull();
        expect(parameter.aggType).toBeNull();
    });

    it('precision', () => {
        var parameter = new GeoHashGridAggParameter({ precision: 6 });
        expect(parameter.precision).toEqual(6);
        parameter.destroy();
    });

    it('toJsonParameters', () => {
        var parameter = new GeoHashGridAggParameter({ precision: 5 });
        parameter.destroy();
    });
});
