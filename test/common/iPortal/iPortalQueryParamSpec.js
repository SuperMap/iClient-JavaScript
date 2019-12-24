import {IPortalQueryParam} from '../../../src/common/iPortal/iPortalQueryParam';

describe('IPortalQueryParam', () => {
    it('resourceType', () => {
        var param = new IPortalQueryParam({resourceType: 'MAP'});
        expect(param).not.toBeNull();
        expect(param.resourceType).toEqual('MAP');
    });

    it('pageSize', () => {
        var param = new IPortalQueryParam({ pageSize: 9 });
        expect(param).not.toBeNull();
        expect(param.pageSize).toEqual(9);
    });

    it('currentPage', () => {
        var param = new IPortalQueryParam({ currentPage: 2 });
        expect(param).not.toBeNull();
        expect(param.currentPage).toEqual(2);
    });

    it('orderBy', () => {
        var param = new IPortalQueryParam({ orderBy: 'HEATLEVEL' });
        expect(param).not.toBeNull();
        expect(param.orderBy).toEqual('HEATLEVEL');
    });

    it('orderType', () => {
        var param = new IPortalQueryParam({ orderType: 'ASC' });
        expect(param).not.toBeNull();
        expect(param.orderType).toEqual('ASC');
    });

    it('searchType', () => {
        var param = new IPortalQueryParam({ searchType: 'SHARETOME_RES' });
        expect(param).not.toBeNull();
        expect(param.searchType).toEqual('SHARETOME_RES');
    });

    it('tags', () => {
        var param = new IPortalQueryParam({ tags: ['test'] });
        expect(param).not.toBeNull();
        expect(param.tags[0]).toEqual('test');
    });

    it('dirIds', () => {
        var param = new IPortalQueryParam({ dirIds: [1,2] });
        expect(param).not.toBeNull();
        expect(param.dirIds[1]).toEqual(2);
    });

    it('resourceSubTypes', () => {
        var param = new IPortalQueryParam({ resourceSubTypes: ['type'] });
        expect(param).not.toBeNull();
        expect(param.resourceSubTypes[0]).toEqual('type');
    });

    it('aggregationTypes', () => {
        var param = new IPortalQueryParam({ aggregationTypes: ["SUBTYPE","TAG"] });
        expect(param).not.toBeNull();
        expect(param.aggregationTypes[1]).toEqual('TAG');
    });

    it('text', () => {
        var param = new IPortalQueryParam({ text: 'test' });
        expect(param).not.toBeNull();
        expect(param.text).toEqual('test');
    });

    it('groupIds', () => {
        var param = new IPortalQueryParam({ groupIds: [1,3] });
        expect(param).not.toBeNull();
        expect(param.groupIds[1]).toEqual(3);
    });

    it('departmentIds', () => {
        var param = new IPortalQueryParam({ departmentIds: [3] });
        expect(param).not.toBeNull();
        expect(param.departmentIds[0]).toEqual(3);
    });
});
