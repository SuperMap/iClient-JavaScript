import {IPortalAddDataParam} from '../../../src/common/iPortal/iPortalAddDataParam';

describe('iPortalAddDataParam', () => {
    it('fileName', () => {
        var param = new IPortalAddDataParam({fileName: 'test_fileName'});
        expect(param).not.toBeNull();
        expect(param.fileName).toEqual('test_fileName');
    });

    it('type', () => {
        var param = new IPortalAddDataParam({ type: 'EXCEL' });
        expect(param).not.toBeNull();
        expect(param.type).toEqual('EXCEL');
    });

    it('tags', () => {
        var param = new IPortalAddDataParam({ tags: ["ab"] });
        expect(param).not.toBeNull();
        expect(param.tags[0]).toEqual('ab');
    });

    it('dataMetaInfo', () => {
        var param = new IPortalAddDataParam({ dataMetaInfo: {fileEncoding:"UTF-8"} });
        expect(param).not.toBeNull();
        expect(param.dataMetaInfo.fileEncoding).toEqual('UTF-8');
    });
});
