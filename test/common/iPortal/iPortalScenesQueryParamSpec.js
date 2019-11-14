import {IPortalScenesQueryParam} from '../../../src/common/iPortal/iPortalScenesQueryParam';

describe('iPortalScenesQueryParam', () => {
    it('constructor', () => {
        var param = new IPortalScenesQueryParam({userNames: 'test'});
        expect(param).not.toBeNull();
        expect(param.userNames).toEqual('test');
    });

    it('tags', () => {
        var param = new IPortalScenesQueryParam({ tags: 'test' });
        expect(param).not.toBeNull();
        expect(param.tags).toEqual('test');
    });

    it('orderBy', () => {
        var param = new IPortalScenesQueryParam({ orderBy: 'test' });
        expect(param).not.toBeNull();
        expect(param.orderBy).toEqual('test');
    });

    it('orderType', () => {
        var param = new IPortalScenesQueryParam({ orderType: 'test' });
        expect(param).not.toBeNull();
        expect(param.orderType).toEqual('test');
    });

    it('keywords', () => {
        var param = new IPortalScenesQueryParam({ keywords: 'test' });
        expect(param).not.toBeNull();
        expect(param.keywords).toEqual('test');
    });

    it('currentPage', () => {
        var param = new IPortalScenesQueryParam({ currentPage: 1 });
        expect(param).not.toBeNull();
        expect(param.currentPage).toEqual(1);
    });

    it('pageSize', () => {
        var param = new IPortalScenesQueryParam({ pageSize: 'test' });
        expect(param).not.toBeNull();
        expect(param.pageSize).toEqual('test');
    });

    it('dirIds', () => {
        var param = new IPortalScenesQueryParam({ dirIds: 'test' });
        expect(param).not.toBeNull();
        expect(param.dirIds).toEqual('test');
    });

    it('isNotInDir', () => {
        var param = new IPortalScenesQueryParam({ isNotInDir: 'test' });
        expect(param).not.toBeNull();
        expect(param.isNotInDir).toEqual('test');
    });

    it('filterFields', () => {
        var param = new IPortalScenesQueryParam({ filterFields: 'test' });
        expect(param).not.toBeNull();
        expect(param.filterFields).toEqual('test');
    });

    it('createStart', () => {
        var param = new IPortalScenesQueryParam({ createStart: 'test' });
        expect(param).not.toBeNull();
        expect(param.createStart).toEqual('test');
    });

    it('createEnd', () => {
        var param = new IPortalScenesQueryParam({ createEnd: 'test' });
        expect(param).not.toBeNull();
        expect(param.createEnd).toEqual('test');
    });
});
