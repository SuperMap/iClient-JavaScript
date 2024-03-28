import { AttachmentsParameters } from '../../../src/common/iServer';
describe('AttachmentsParameters', () => {
    it('constructor destroy', () => {
        var option = {
            dataSourceName: 'testDataSourceName',
            dataSetName: 'testDataSetName',
            featureId: '1',
        };
        var parametersNull = new AttachmentsParameters();
        expect(parametersNull).not.toBeNull();
        var parameter = new AttachmentsParameters(option);
        expect(parameter.dataSourceName).toEqual('testDataSourceName');
        expect(parameter.dataSetName).toEqual('testDataSetName');
        expect(parameter.featureId).toEqual('1');
        parameter.destroy();
        expect(parameter.dataSourceName).toBeNull();
        expect(parameter.dataSetName).toBeNull();
        expect(parameter.featureId).toBeNull();
    });
});