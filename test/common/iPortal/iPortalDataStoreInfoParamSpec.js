import {IPortalDataStoreInfoParam} from '../../../src/common/iPortal/iPortalDataStoreInfoParam';
import {IPortalDataConnectionInfoParam} from "../../../src/common/iPortal/iPortalDataConnectionInfoParam"
describe('iPortalDataStoreInfoParam', () => {
    it('type', () => {
        var param = new IPortalDataStoreInfoParam({type: 'test_type'});
        expect(param).not.toBeNull();
        expect(param.type).toEqual('test_type');
    });

    it('url', () => {
        var param = new IPortalDataStoreInfoParam({ url: 'hdfs://192.168.12.121:9000/iportal/beijing.csv' });
        expect(param).not.toBeNull();
        expect(param.url).toEqual('hdfs://192.168.12.121:9000/iportal/beijing.csv');
    });

    it('connectionInfo', () => {
        var connectionInfoParam = new IPortalDataConnectionInfoParam({
            dataBase:'192.168.13.212:9000'
        })
        var param = new IPortalDataStoreInfoParam({ connectionInfo: connectionInfoParam });
        expect(param).not.toBeNull();
        expect(param.connectionInfo.dataBase).toEqual('192.168.13.212:9000');
    });
});
