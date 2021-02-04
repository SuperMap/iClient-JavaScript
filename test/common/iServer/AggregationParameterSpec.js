import { AggregationParameter } from '../../../src/common/iServer';

describe('AggregationParameter', () => {
    it('constructor destroy', () => {
        var option = {
            aggName: 'testname',
            aggType: 'testtype',
            aggFieldName: 'testFieldname',
        };
        var parametersNull = new AggregationParameter();
        expect(parametersNull).not.toBeNull();
        var parameter = new AggregationParameter(option);
        expect(parameter.aggName).toEqual('testname');
        expect(parameter.aggType).toEqual('testtype');
        expect(parameter.aggFieldName).toEqual('testFieldname');
        expect(parameter.CLASS_NAME).toEqual('SuperMap.AggregationParameter');
        parameter.destroy();
        expect(parameter.aggName).toBeNull();
        expect(parameter.aggType).toBeNull();
        expect(parameter.aggFieldName).toBeNull();
    });

    it('aggName', () => {
        var parameter = new AggregationParameter({ aggName: 'test' });
        expect(parameter.aggName).toEqual('test');
        parameter.destroy();
    });

    it('aggType', () => {
        var parameter = new AggregationParameter({ aggType: 'test' });
        expect(parameter.aggType).toEqual('test');
        parameter.destroy();
    });

    it('aggFieldName', () => {
        var parameter = new AggregationParameter({ aggFieldName: 'test' });
        expect(parameter.aggFieldName).toEqual('test');
        parameter.destroy();
    });
});
