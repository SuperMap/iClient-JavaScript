import {IPortalUser} from '../../../src/common/iPortal/iPortalUser';

describe('IPortalUser', () => {
    it('constructor_default', () => {
        var iportalUrl = 'https://iptl.supermap.io/iportal';
        var iPortalUser = new IPortalUser(iportalUrl);
        expect(iPortalUser.iportalUrl).toBe("https://iptl.supermap.io/iportal");
    });

    it('deleteResources', ()=> {
        var iportalUrl = 'https://iptl.supermap.io/iportal';
        var iPortalUser = new IPortalUser(iportalUrl);
        expect(iPortalUser.deleteResources({ids: [], resourceType: "MAP"}) instanceof Promise).toBeTruthy();
    });

    it('addMap', () => {
        let iportalUrl = 'https://iptl.supermap.io/iportal';
        let iPortalUser = new IPortalUser(iportalUrl);
        // 传入错误的参数
        let addMapParams = {
            rootUrl: "http://rdc.ispeco.com:8080/iserver/services/map-Population/rest",
            tags: ["用户地图"],
            authorizeSetting: [
                {
                    permissionType: "SEARCH",
                    entityType: "USER",
                    entityName: "GUEST",
                    entityId: null
                }
            ]
        };
        iPortalUser.addMap(addMapParams).then(res => {
            expect(res).toBe("addMapParams is not instanceof IPortalAddMapParam !");
        })
    });

    it('addScene', () => {
        let iportalUrl = 'https://iptl.supermap.io/iportal';
        let iPortalUser = new IPortalUser(iportalUrl);
        // 传入错误的参数
        let addSceneParams = {
            rootUrl: "http://rdc.ispeco.com:8080/iserver/services/3D-CBD/rest",
            tags: ["用户场景"],
            authorizeSetting: [
                {
                    permissionType: "SEARCH",
                    entityType: "USER",
                    entityName: "GUEST",
                    entityId: null
                }
            ]
        };
        iPortalUser.addScene(addSceneParams).then(res => {
            expect(res).toBe("addSceneParams is not instanceof IPortalAddSceneParam !");
        })
    });

    it('registerService', () => {
        let iportalUrl = 'https://iptl.supermap.io/iportal';
        let iPortalUser = new IPortalUser(iportalUrl);
        // 传入错误的参数
        let registerServiceParams = {
            type: "SUPERMAP_REST",
            tags: [],
            authorizeSetting: [
                {
                    permissionType: "SEARCH",
                    entityType: "USER",
                    entityName: "GUEST",
                    entityId: null
                }
            ],
            metadata: [],
            addedMapNames: [],
            addedSceneNames: []
        }
        iPortalUser.registerService(registerServiceParams).then(res => {
            expect(res).toBe("registerParams is not instanceof iPortalRegisterServiceParam !");
        })
    })
});