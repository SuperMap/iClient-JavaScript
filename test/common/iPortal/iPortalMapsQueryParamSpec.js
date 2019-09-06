import {IPortalMapsQueryParam} from '../../../src/common/iPortal/iPortalMapsQueryParam';

describe('iPortalMapsQueryParam', () => {
    it('constructor', () => {
        var param = new IPortalMapsQueryParam({userNames: 'test'});
        expect(param).not.toBeNull();
        expect(param.userNames).toEqual('test');
    });

    it('tags', () => {
        var param = new IPortalMapsQueryParam({ tags: 'test' });
        expect(param).not.toBeNull();
        expect(param.tags).toEqual('test');
    });

    it('suggest', () => {
        var param = new IPortalMapsQueryParam({ suggest: true });
        expect(param).not.toBeNull();
        expect(param.suggest).toBeTruthy();
    });

    it('sourceTypes', () => {
        var param = new IPortalMapsQueryParam({ sourceTypes: 'test' });
        expect(param).not.toBeNull();
        expect(param.sourceTypes).toEqual('test');
    });

    it('keywords', () => {
        var param = new IPortalMapsQueryParam({ keywords: 'test' });
        expect(param).not.toBeNull();
        expect(param.keywords).toEqual('test');
    });

    it('epsgCode', () => {
        var param = new IPortalMapsQueryParam({ epsgCode: 'test' });
        expect(param).not.toBeNull();
        expect(param.epsgCode).toEqual('test');
    });

    it('orderBy', () => {
        var param = new IPortalMapsQueryParam({ orderBy: 'test' });
        expect(param).not.toBeNull();
        expect(param.orderBy).toEqual('test');
    });

    it('pageSize', () => {
        var param = new IPortalMapsQueryParam({ pageSize: 'test' });
        expect(param).not.toBeNull();
        expect(param.pageSize).toEqual('test');
    });

    it('dirIds', () => {
        var param = new IPortalMapsQueryParam({ dirIds: 'test' });
        expect(param).not.toBeNull();
        expect(param.dirIds).toEqual('test');
    });

    it('isNotInDir', () => {
        var param = new IPortalMapsQueryParam({ isNotInDir: 'test' });
        expect(param).not.toBeNull();
        expect(param.isNotInDir).toEqual('test');
    });

    it('updateStart', () => {
        var param = new IPortalMapsQueryParam({ updateStart: 'test' });
        expect(param).not.toBeNull();
        expect(param.updateStart).toEqual('test');
    });

    it('updateEnd', () => {
        var param = new IPortalMapsQueryParam({ updateEnd: 'test' });
        expect(param).not.toBeNull();
        expect(param.updateEnd).toEqual('test');
    });

    it('visitStart', () => {
        var param = new IPortalMapsQueryParam({ visitStart: 'test' });
        expect(param).not.toBeNull();
        expect(param.visitStart).toEqual('test');
    });

    it('visitEnd', () => {
        var param = new IPortalMapsQueryParam({ visitEnd: 'test' });
        expect(param).not.toBeNull();
        expect(param.visitEnd).toEqual('test');
    });

    it('filterFields', () => {
        var param = new IPortalMapsQueryParam({ filterFields: 'test' });
        expect(param).not.toBeNull();
        expect(param.filterFields).toEqual('test');
    });
});
