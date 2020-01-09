import {IPortalAddResourceParam} from '../../../src/common/iPortal/iPortalAddResourceParam';

describe('IPortalAddResourceParam', () => {
    it('rootUrl', () => {
        let param = new IPortalAddResourceParam({rootUrl: "http://rdc.ispeco.com:8080/iserver/services/map-Population/rest"});
        expect(param).not.toBeNull();
        expect(param.rootUrl).toBe("http://rdc.ispeco.com:8080/iserver/services/map-Population/rest");
    });

    it('tags', () => {
        let param = new IPortalAddResourceParam({tags: ["用户地图"]});
        expect(param).not.toBeNull();
        expect(param.tags[0]).toBe("用户地图");
    });

    it('entities', () => {
        let param = new IPortalAddResourceParam({entities: [
            {
                permissionType: "SEARCH",
                entityType: "USER",
                entityName: "GUEST",
                entityId: null
            }
        ]});
        expect(param).not.toBeNull();
        expect(param.entities[0].permissionType).toBe("SEARCH");
        expect(param.entities[0].entityType).toBe("USER");
        expect(param.entities[0].entityName).toBe("GUEST");
        expect(param.entities[0].entityId).toBeNull();
    });
})