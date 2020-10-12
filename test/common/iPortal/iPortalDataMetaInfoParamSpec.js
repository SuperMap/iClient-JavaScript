import {IPortalDataMetaInfoParam} from '../../../src/common/iPortal/iPortalDataMetaInfoParam';
import {IPortalDataStoreInfoParam} from '../../../src/common/iPortal/iPortalDataStoreInfoParam';

describe('iPortalDataMetaInfoParam', () => {
    it('xField', () => {
        var param = new IPortalDataMetaInfoParam({xField: 'x'});
        expect(param).not.toBeNull();
        expect(param.xField).toEqual('x');
    });

    it('yField', () => {
        var param = new IPortalDataMetaInfoParam({ yField: 'y' });
        expect(param).not.toBeNull();
        expect(param.yField).toEqual('y');
    });

    it('fileEncoding', () => {
        var param = new IPortalDataMetaInfoParam({ fileEncoding: 'GBK' });
        expect(param).not.toBeNull();
        expect(param.fileEncoding).toEqual('GBK');
    });

    it('xIndex', () => {
        var param = new IPortalDataMetaInfoParam({ xIndex: 2 });
        expect(param).not.toBeNull();
        expect(param.xIndex).toEqual(2);
    });

    it('yIndex', () => {
        var param = new IPortalDataMetaInfoParam({ yIndex: 2 });
        expect(param).not.toBeNull();
        expect(param.yIndex).toEqual(2);
    });

    it('fieldTypes', () => {
        var param = new IPortalDataMetaInfoParam({ fieldTypes: [] });
        expect(param).not.toBeNull();
        expect(param.fieldTypes.length).toEqual(0);
    });

    it('separator', () => {
        var param = new IPortalDataMetaInfoParam({ separator: "," });
        expect(param).not.toBeNull();
        expect(param.separator).toEqual(",");
    });

    it('firstRowIsHead', () => {
        var param = new IPortalDataMetaInfoParam({ firstRowIsHead: false });
        expect(param).not.toBeNull();
        expect(param.firstRowIsHead).toEqual(false);
    });

    it('url', () => {
        var param = new IPortalDataMetaInfoParam({ url: "hdfs://192.168.12.121:9000/iportal/beijing.csv" });
        expect(param).not.toBeNull();
        expect(param.url).toEqual("hdfs://192.168.12.121:9000/iportal/beijing.csv");
    });

    it('dataStoreInfo', () => {
        var dataStoreInfoParam = new IPortalDataStoreInfoParam({
            type:'HDFS'
        })
        var param = new IPortalDataMetaInfoParam({ dataStoreInfo: dataStoreInfoParam });
        expect(param).not.toBeNull();
        expect(param.dataStoreInfo.type).toEqual('HDFS');
    });
});
