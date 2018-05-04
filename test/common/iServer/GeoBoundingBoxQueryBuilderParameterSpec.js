import {GeoBoundingBoxQueryBuilderParameter} from "../../../src/common/iServer";

describe('GeoBoundingBoxQueryBuilderParameter', () => {
    it('constructor destroy', () => {
        var option = {
            name: "testname",
            bounds: "testbounds",
            queryType: "testtype"
        };
        var parametersNull = new GeoBoundingBoxQueryBuilderParameter();
        expect(parametersNull).not.toBeNull();
        var parameter = new GeoBoundingBoxQueryBuilderParameter(option);
        expect(parameter.bounds).toEqual("testbounds");
        expect(parameter.queryType).toEqual("testtype");
        expect(parameter.CLASS_NAME).toEqual("SuperMap.GeoBoundingBoxQueryBuilderParameter");
        parameter.destroy();
        expect(parameter.bounds).toBeNull();
        expect(parameter.queryType).toBeNull();
    });
});