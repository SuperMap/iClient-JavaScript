import { AggQueryBuilderParameter } from '../../../src/common/iServer';

describe('AggQueryBuilderParameter', () => {
    it('constructor destroy', () => {
        var option = {
            name: 'testName',
            queryType: 'testType'
        };
        var parametersNull = new AggQueryBuilderParameter();
        expect(parametersNull).not.toBeNull();
        var parameters = new AggQueryBuilderParameter(option);
        expect(parameters).not.toBeNull();
        expect(parameters.name).toEqual('testName');
        expect(parameters.queryType).toEqual('testType');
        expect(parameters.CLASS_NAME).toEqual('SuperMap.AggQueryBuilderParameter');
        parameters.destroy();
        expect(parameters.name).toBeNull();
        expect(parameters.queryType).toBeNull();
    });

    it('name', () => {
        var parameter = new AggQueryBuilderParameter({ name: 'test' });
        expect(parameter.name).toEqual('test');
        parameter.destroy();
    });

    it('queryType', () => {
        var parameter = new AggQueryBuilderParameter({ queryType: 'test' });
        expect(parameter.queryType).toEqual('test');
        parameter.destroy();
    });
});
