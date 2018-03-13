import {TransferLine} from '../../../src/common/iServer/TransferLine';

describe('TransferLine', () => {
    it('constructor, destroy', () => {
        var transferLine = new TransferLine({lineName: 'testLine'});
        expect(transferLine).not.toBeNull();
        expect(transferLine.CLASS_NAME).toEqual("SuperMap.TransferLine");
        expect(transferLine.lineName).toEqual('testLine');
        transferLine.destroy();
        expect(transferLine.CLASS_NAME).toBeNull();
        expect(transferLine.lineName).toBeNull();
    });

    it('fromJson', () => {
        var transferLine = new TransferLine({lineName: 'testLine'});
        var result1 = new TransferLine.fromJson();
        expect(result1).not.toBeNull();
        var result2 = new TransferLine.fromJson(transferLine);
        expect(result2.lineName).toEqual('testLine');
        transferLine.destroy();
    });
});