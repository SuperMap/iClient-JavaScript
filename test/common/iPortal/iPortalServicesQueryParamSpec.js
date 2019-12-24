import {IPortalServicesQueryParam} from '../../../src/common/iPortal/iPortalServicesQueryParam';

describe('iPortalServicesQueryParam', () => {
    it('constructor', () => {
        var param = new IPortalServicesQueryParam({userNames: 'test'});
        expect(param).not.toBeNull();
        expect(param.userNames).toEqual('test');
    });

    it('tags', () => {
        var param = new IPortalServicesQueryParam({ tags: 'test' });
        expect(param).not.toBeNull();
        expect(param.tags).toEqual('test');
    });

    it('suggest', () => {
        var param = new IPortalServicesQueryParam({ suggest: true });
        expect(param).not.toBeNull();
        expect(param.suggest).toBeTruthy();
    });

    it('sourceTypes', () => {
        var param = new IPortalServicesQueryParam({ sourceTypes: 'test' });
        expect(param).not.toBeNull();
        expect(param.sourceTypes).toEqual('test');
    });

    it('keywords', () => {
        var param = new IPortalServicesQueryParam({ keywords: 'test' });
        expect(param).not.toBeNull();
        expect(param.keywords).toEqual('test');
    });

    it('epsgCode', () => {
        var param = new IPortalServicesQueryParam({ epsgCode: 'test' });
        expect(param).not.toBeNull();
        expect(param.epsgCode).toEqual('test');
    });

    it('orderBy', () => {
        var param = new IPortalServicesQueryParam({ orderBy: 'test' });
        expect(param).not.toBeNull();
        expect(param.orderBy).toEqual('test');
    });

    it('pageSize', () => {
        var param = new IPortalServicesQueryParam({ pageSize: 'test' });
        expect(param).not.toBeNull();
        expect(param.pageSize).toEqual('test');
    });

    it('dirIds', () => {
        var param = new IPortalServicesQueryParam({ dirIds: 'test' });
        expect(param).not.toBeNull();
        expect(param.dirIds).toEqual('test');
    });

    it('isNotInDir', () => {
        var param = new IPortalServicesQueryParam({ isNotInDir: 'test' });
        expect(param).not.toBeNull();
        expect(param.isNotInDir).toEqual('test');
    });

    it('updateStart', () => {
        var param = new IPortalServicesQueryParam({ updateStart: 'test' });
        expect(param).not.toBeNull();
        expect(param.updateStart).toEqual('test');
    });

    it('updateEnd', () => {
        var param = new IPortalServicesQueryParam({ updateEnd: 'test' });
        expect(param).not.toBeNull();
        expect(param.updateEnd).toEqual('test');
    });

    it('visitStart', () => {
        var param = new IPortalServicesQueryParam({ visitStart: 'test' });
        expect(param).not.toBeNull();
        expect(param.visitStart).toEqual('test');
    });

    it('visitEnd', () => {
        var param = new IPortalServicesQueryParam({ visitEnd: 'test' });
        expect(param).not.toBeNull();
        expect(param.visitEnd).toEqual('test');
    });

    it('filterFields', () => {
        var param = new IPortalServicesQueryParam({ filterFields: 'test' });
        expect(param).not.toBeNull();
        expect(param.filterFields).toEqual('test');
    });
});
