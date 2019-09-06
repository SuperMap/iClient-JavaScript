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

    it('lineID', ()=>{
        var transferLine = new TransferLine({lineID: 1});
        expect(transferLine).not.toBeNull();
        expect(transferLine.lineID).toEqual(1);
        transferLine.destroy();
    })

    it('lineName', ()=>{
        var transferLine = new TransferLine({lineName: 'testLine'});
        expect(transferLine).not.toBeNull();
        expect(transferLine.lineName).toEqual('testLine');
        transferLine.destroy();
    })

    it('lineAliasName', ()=>{
        var transferLine = new TransferLine({lineAliasName: 'testLineAliasName'});
        expect(transferLine).not.toBeNull();
        expect(transferLine.lineAliasName).toEqual('testLineAliasName');
        transferLine.destroy();
    })

    it('startStopIndex', ()=>{
        var transferLine = new TransferLine({startStopIndex: 1});
        expect(transferLine).not.toBeNull();
        expect(transferLine.startStopIndex).toEqual(1);
        transferLine.destroy();
    })

    it('startStopName', ()=>{
        var transferLine = new TransferLine({startStopName: 'testStartStopName'});
        expect(transferLine).not.toBeNull();
        expect(transferLine.startStopName).toEqual('testStartStopName');
        transferLine.destroy();
    })

    it('startStopAliasName', ()=>{
        var transferLine = new TransferLine({startStopAliasName: 'testStartStopAliasName'});
        expect(transferLine).not.toBeNull();
        expect(transferLine.startStopAliasName).toEqual('testStartStopAliasName');
        transferLine.destroy();
    })

    it('endStopIndex', ()=>{
        var transferLine = new TransferLine({endStopIndex: 2});
        expect(transferLine).not.toBeNull();
        expect(transferLine.endStopIndex).toEqual(2);
        transferLine.destroy();
    })

    it('endStopName', ()=>{
        var transferLine = new TransferLine({endStopName: 'testEndStopName'});
        expect(transferLine).not.toBeNull();
        expect(transferLine.endStopName).toEqual('testEndStopName');
        transferLine.destroy();
    })

    it('endStopAliasName', ()=>{
        var transferLine = new TransferLine({endStopAliasName: 'testEndStopAliasName'});
        expect(transferLine).not.toBeNull();
        expect(transferLine.endStopAliasName).toEqual('testEndStopAliasName');
        transferLine.destroy();
    })
});