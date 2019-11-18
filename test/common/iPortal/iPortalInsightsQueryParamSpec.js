import {IPortalInsightsQueryParam} from '../../../src/common/iPortal/iPortalInsightsQueryParam';

describe('iPortalInsightsQueryParam', () => {
    it('constructor', () => {
        var param = new IPortalInsightsQueryParam({userNames: 'test'});
        expect(param).not.toBeNull();
        expect(param.userNames).toEqual('test');
    });

    it('createStart', () => {
        var param = new IPortalInsightsQueryParam({ createStart: 'test' });
        expect(param).not.toBeNull();
        expect(param.createStart).toEqual('test');
    });

    it('createEnd', () => {
        var param = new IPortalInsightsQueryParam({ createEnd: 'test' });
        expect(param).not.toBeNull();
        expect(param.createEnd).toEqual('test');
    });

    it('filterFields', () => {
        var param = new IPortalInsightsQueryParam({ filterFields: 'test' });
        expect(param).not.toBeNull();
        expect(param.filterFields).toEqual('test');
    });

    it('orderBy', () => {
        var param = new IPortalInsightsQueryParam({ orderBy: 'test' });
        expect(param).not.toBeNull();
        expect(param.orderBy).toEqual('test');
    });

    it('tags', () => {
        var param = new IPortalInsightsQueryParam({ tags: 'test' });
        expect(param).not.toBeNull();
        expect(param.tags).toEqual('test');
    });

    it('currentPage', () => {
        var param = new IPortalInsightsQueryParam({ currentPage: 1 });
        expect(param).not.toBeNull();
        expect(param.currentPage).toEqual(1);
    });

    it('keywords', () => {
        var param = new IPortalInsightsQueryParam({ keywords: 'test' });
        expect(param).not.toBeNull();
        expect(param.keywords).toEqual('test');
    });

    it('pageSize', () => {
        var param = new IPortalInsightsQueryParam({ pageSize: 'test' });
        expect(param).not.toBeNull();
        expect(param.pageSize).toEqual('test');
    });

    it('currentUser', () => {
        var param = new IPortalInsightsQueryParam({ currentUser: 'test' });
        expect(param).not.toBeNull();
        expect(param.currentUser).toEqual('test');
    });

    it('departmentIds', () => {
        var param = new IPortalInsightsQueryParam({ departmentIds: 'test' });
        expect(param).not.toBeNull();
        expect(param.departmentIds).toEqual('test');
    });

    it('dirIds', () => {
        var param = new IPortalInsightsQueryParam({ dirIds: 'test' });
        expect(param).not.toBeNull();
        expect(param.dirIds).toEqual('test');
    });

    it('groupIds', () => {
        var param = new IPortalInsightsQueryParam({ groupIds: 'test' });
        expect(param).not.toBeNull();
        expect(param.groupIds).toEqual('test');
    });

    it('isNotInDir', () => {
        var param = new IPortalInsightsQueryParam({ isNotInDir: true });
        expect(param).not.toBeNull();
        expect(param.isNotInDir).toBeTruthy();
    });

    it('permissionType', () => {
        var param = new IPortalInsightsQueryParam({ permissionType: 'test' });
        expect(param).not.toBeNull();
        expect(param.permissionType).toEqual('test');
    });

    it('resourceIds', () => {
        var param = new IPortalInsightsQueryParam({ resourceIds: 'test' });
        expect(param).not.toBeNull();
        expect(param.resourceIds).toEqual('test');
    });

    it('returnSubDir', () => {
        var param = new IPortalInsightsQueryParam({ returnSubDir: 'test' });
        expect(param).not.toBeNull();
        expect(param.returnSubDir).toEqual('test');
    });

    it('searchScope', () => {
        var param = new IPortalInsightsQueryParam({ searchScope: 'test' });
        expect(param).not.toBeNull();
        expect(param.searchScope).toEqual('test');
    });
});
