import { EditAttachmentsParameters } from '../../../src/common/iServer';
describe('EditAttachmentsParameters', () => {
    it('constructor destroy', () => {
        var option = {
            file: new File(['file1 contents'], 'file1.txt', { type: 'text/plain' }),
            IDs: [1,2],
            editType: 'ADD',
        };
        var parametersNull = new EditAttachmentsParameters();
        expect(parametersNull).not.toBeNull();
        var parameter = new EditAttachmentsParameters(option);
        expect(parameter.file).not.toBeNull();
        expect(parameter.IDs).toEqual([1,2]);
        expect(parameter.editType).toEqual('ADD');
        parameter.destroy();
        expect(parameter.file).toBeNull();
        expect(parameter.IDs).toBeNull();
        expect(parameter.editType).toBeNull();
    });
});