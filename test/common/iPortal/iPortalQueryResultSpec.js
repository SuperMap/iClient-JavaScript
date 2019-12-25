import {IPortalQueryResult} from '../../../src/common/iPortal/iPortalQueryResult';

describe('iPortalQueryResult', () => {
    it('constructor_default', () => {
        var iPortalQueryResult = new IPortalQueryResult();
        expect(iPortalQueryResult).not.toBeNull();
        expect(iPortalQueryResult.total).toEqual(0);
        expect(iPortalQueryResult.currentPage).toEqual(1);
        expect(iPortalQueryResult.pageSize).toEqual(12);
    });
});