require('../../../src/common/iServer/TransferLine');

describe('TransferLine', function () {
    it('constructor, destroy', function () {
        var transferLine = new SuperMap.TransferLine({lineName: 'testLine'});
        expect(transferLine).not.toBeNull();
        expect(transferLine.CLASS_NAME).toEqual("SuperMap.TransferLine");
        expect(transferLine.lineName).toEqual('testLine');
        transferLine.destroy();
        expect(transferLine.CLASS_NAME).toBeNull();
        expect(transferLine.lineName).toBeNull();
    });

    it('fromJson', function () {
        var transferLine = new SuperMap.TransferLine({lineName: 'testLine'});
        var result1 = new SuperMap.TransferLine.fromJson();
        expect(result1).not.toBeNull();
        var result2 = new SuperMap.TransferLine.fromJson(transferLine);
        expect(result2.lineName).toEqual('testLine');
        transferLine.destroy();
    });
});