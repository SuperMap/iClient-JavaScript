import {IPortalDataConnectionInfoParam} from '../../../src/common/iPortal/iPortalDataConnectionInfoParam';

describe('iPortalDataConnectionInfoParam', () => {
    it('dataBase', () => {
        var param = new IPortalDataConnectionInfoParam({dataBase: 'test_dataBase'});
        expect(param).not.toBeNull();
        expect(param.dataBase).toEqual('test_dataBase');
    });

    it('server', () => {
        var param = new IPortalDataConnectionInfoParam({ server: 'hdfs://192.168.12.121:9000/iportal/beijing.csv' });
        expect(param).not.toBeNull();
        expect(param.server).toEqual('hdfs://192.168.12.121:9000/iportal/beijing.csv');
    });
});
