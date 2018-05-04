import {GeoHashGridAggParameter} from "../../../src/common/iServer";

describe('GeoHashGridAggParameter', () => {
    it('constructor destroy', () => {
        var option = {
            aggName: "testname",
            aggType: "testtype",
            aggFieldName: "testFieldname",
            subAgg: "testsubAgg",
            precision: 5
        };
        var parametersNull = new GeoHashGridAggParameter();
        expect(parametersNull).not.toBeNull();
        var parameter = new GeoHashGridAggParameter(option);
        expect(parameter.aggName).toEqual("testname");
        expect(parameter.aggType).toEqual("testtype");
        expect(parameter.aggFieldName).toEqual("testFieldname");
        expect(parameter.subAgg).toEqual("testsubAgg");
        expect(parameter.precision).toBe(5);
        expect(parameter.CLASS_NAME).toEqual("SuperMap.GeoHashGridAggParameter");
        parameter.destroy();
        expect(parameter.aggName).toBeNull();
        expect(parameter.aggType).toBeNull();
        expect(parameter.aggFieldName).toBeNull();
        expect(parameter.subAgg).toBeNull();
        expect(parameter.aggType).toBeNull();
    });
});