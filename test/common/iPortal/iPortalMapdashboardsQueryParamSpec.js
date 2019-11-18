import {IPortalMapdashboardsQueryParam} from '../../../src/common/iPortal/iPortalMapdashboardsQueryParam';

describe('iPortalMapdashboardsQueryParam', () => {
    it('constructor', () => {
        var param = new IPortalMapdashboardsQueryParam({userNames: 'test'});
        expect(param).not.toBeNull();
        expect(param.userNames).toEqual('test');
    });

    it('tags', () => {
        var param = new IPortalMapdashboardsQueryParam({ tags: 'test' });
        expect(param).not.toBeNull();
        expect(param.tags).toEqual('test');
    });

    it('orderBy', () => {
        var param = new IPortalMapdashboardsQueryParam({ orderBy: 'test' });
        expect(param).not.toBeNull();
        expect(param.orderBy).toEqual('test');
    });

    it('filterFields', () => {
        var param = new IPortalMapdashboardsQueryParam({ filterFields: 'test' });
        expect(param).not.toBeNull();
        expect(param.filterFields).toEqual('test');
    });

    it('currentUser', () => {
        var param = new IPortalMapdashboardsQueryParam({ currentUser: 'test' });
        expect(param).not.toBeNull();
        expect(param.currentUser).toEqual('test');
    });

    it('dirIds', () => {
        var param = new IPortalMapdashboardsQueryParam({ dirIds: 'test' });
        expect(param).not.toBeNull();
        expect(param.dirIds).toEqual('test');
    });

    it('returnSubDir', () => {
        var param = new IPortalMapdashboardsQueryParam({ returnSubDir: true });
        expect(param).not.toBeNull();
        expect(param.returnSubDir).toBeTruthy();
    });

    it('isNotInDir', () => {
        var param = new IPortalMapdashboardsQueryParam({ isNotInDir: true });
        expect(param).not.toBeNull();
        expect(param.isNotInDir).toBeTruthy();
    });

    it('groupIds', () => {
        var param = new IPortalMapdashboardsQueryParam({ groupIds: 'test' });
        expect(param).not.toBeNull();
        expect(param.groupIds).toEqual('test');
    });

    it('departmentIds', () => {
        var param = new IPortalMapdashboardsQueryParam({ departmentIds: 'test' });
        expect(param).not.toBeNull();
        expect(param.departmentIds).toEqual('test');
    });

    it('resourceIds', () => {
        var param = new IPortalMapdashboardsQueryParam({ resourceIds: 'test' });
        expect(param).not.toBeNull();
        expect(param.resourceIds).toEqual('test');
    });

    it('searchScope', () => {
        var param = new IPortalMapdashboardsQueryParam({ searchScope: 'test' });
        expect(param).not.toBeNull();
        expect(param.searchScope).toEqual('test');
    });

    it('permissionType', () => {
        var param = new IPortalMapdashboardsQueryParam({ permissionType: 'test' });
        expect(param).not.toBeNull();
        expect(param.permissionType).toEqual('test');
    });

    it('keywords', () => {
        var param = new IPortalMapdashboardsQueryParam({ keywords: 'test' });
        expect(param).not.toBeNull();
        expect(param.keywords).toEqual('test');
    });

    it('currentPage', () => {
        var param = new IPortalMapdashboardsQueryParam({ currentPage: 'test' });
        expect(param).not.toBeNull();
        expect(param.currentPage).toEqual('test');
    });

    it('pageSize', () => {
        var param = new IPortalMapdashboardsQueryParam({ pageSize: 'test' });
        expect(param).not.toBeNull();
        expect(param.pageSize).toEqual('test');
    });

    it('orderType', () => {
        var param = new IPortalMapdashboardsQueryParam({ orderType: 'test' });
        expect(param).not.toBeNull();
        expect(param.orderType).toEqual('test');
    });
});
