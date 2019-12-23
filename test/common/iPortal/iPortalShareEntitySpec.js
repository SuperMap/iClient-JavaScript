import {IPortalShareEntity} from '../../../src/common/iPortal/iPortalShareEntity';

describe('IPortalShareEntity', () => {
    it('permissionType', () => {
        var param = new IPortalShareEntity({permissionType: 'SEARCH'});
        expect(param).not.toBeNull();
        expect(param.permissionType).toEqual('SEARCH');
    });

    it('entityType', () => {
        var param = new IPortalShareEntity({ entityType: "DEPARTMENT" });
        expect(param).not.toBeNull();
        expect(param.entityType).toEqual("DEPARTMENT");
    });

    it('entityName', () => {
        var param = new IPortalShareEntity({ entityName: "GUEST" });
        expect(param).not.toBeNull();
        expect(param.entityName).toEqual("GUEST");
    });

    it('entityId', () => {
        var param = new IPortalShareEntity({ entityId: 123 });
        expect(param).not.toBeNull();
        expect(param.entityId).toEqual(123);
    });
});
