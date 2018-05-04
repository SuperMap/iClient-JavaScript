import {FilterAggParameter} from "../../../src/common/iServer";

describe('FilterAggParameter', () => {
    it('constructor destroy', () => {
        var option = {
            filterParam: "testfilterParam",
            aggType: "testType"
        };
        var parametersNull = new FilterAggParameter();
        expect(parametersNull).not.toBeNull();
        var paramter = new FilterAggParameter(option);
        expect(paramter.filterParam).toEqual("testfilterParam");
        expect(paramter.aggType).toEqual("testType");
        expect(paramter.CLASS_NAME).toEqual("SuperMap.FilterAggParameter");
        paramter.destroy();
        expect(paramter.filterParam).toBeNull();
        expect(paramter.aggType).toBeNull();
    });
});