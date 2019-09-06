import { GeoBoundingBoxQueryBuilderParameter } from '../../../src/common/iServer';

describe('GeoBoundingBoxQueryBuilderParameter', () => {
    it('constructor destroy', () => {
        var option = {
            name: 'testname',
            bounds: 'testbounds',
            queryType: 'testtype'
        };
        var parametersNull = new GeoBoundingBoxQueryBuilderParameter();
        expect(parametersNull).not.toBeNull();
        var parameter = new GeoBoundingBoxQueryBuilderParameter(option);
        expect(parameter.bounds).toEqual('testbounds');
        expect(parameter.queryType).toEqual('testtype');
        expect(parameter.CLASS_NAME).toEqual('SuperMap.GeoBoundingBoxQueryBuilderParameter');
        parameter.destroy();
        expect(parameter.bounds).toBeNull();
        expect(parameter.queryType).toBeNull();
    });

    it('bounds', () => {
        var parameter = new GeoBoundingBoxQueryBuilderParameter({ bounds: 'testbounds' });
        expect(parameter.bounds).toEqual('testbounds');
        parameter.destroy();
    });

    it('queryType', () => {
        var parameter = new GeoBoundingBoxQueryBuilderParameter({ queryType: 'testtype' });
        expect(parameter.queryType).toEqual('testtype');
        parameter.destroy();
    });
});
