import {AggregationParameter} from "../../../src/common/iServer";

describe('AggregationParameter', () => {
    it('constructor destroy', () => {
        var option = {
            aggName: "testname",
            aggType: "testtype",
            aggFieldName: "testFieldname",
            subAgg: "testsubAgg"
        };
        var parametersNull = new AggregationParameter();
        expect(parametersNull).not.toBeNull();
        var parameter = new AggregationParameter(option);
        expect(parameter.aggName).toEqual("testname");
        expect(parameter.aggType).toEqual("testtype");
        expect(parameter.aggFieldName).toEqual("testFieldname");
        expect(parameter.subAgg).toEqual("testsubAgg");
        expect(parameter.CLASS_NAME).toEqual("SuperMap.AggregationParameter");
        parameter.destroy();
        expect(parameter.aggName).toBeNull();
        expect(parameter.aggType).toBeNull();
        expect(parameter.aggFieldName).toBeNull();
        expect(parameter.subAgg).toBeNull();
    });
});