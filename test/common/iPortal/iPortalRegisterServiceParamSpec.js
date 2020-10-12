import {IPortalRegisterServiceParam} from '../../../src/common/iPortal/iPortalRegisterServiceParam';

describe('IPortalRegisterServiceParam', () => {
    it('type', () => {
        let param = new IPortalRegisterServiceParam({type: "SUPERMAP_REST"});
        expect(param).not.toBeNull();
        expect(param.type).toBe("SUPERMAP_REST");
    });
    
    it('tags', () => {
        let param = new IPortalRegisterServiceParam({tags: ["用户服务"]});
        expect(param).not.toBeNull();
        expect(param.tags[0]).toBe("用户服务");
    });

    it('entities', () => {
        let param = new IPortalRegisterServiceParam({entities: [
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

    it('metadata', () => {
        let param = new IPortalRegisterServiceParam({metadata: {}});
        expect(param).not.toBeNull();
        expect(param.metadata).toEqual({});
    });

    it("addedMapNames", () => {
        let param = new IPortalRegisterServiceParam({addedMapNames: ["中国1981-2010年1月平均气温分布图"]});
        expect(param).not.toBeNull();
        expect(param.addedMapNames[0]).toBe("中国1981-2010年1月平均气温分布图");
    });

    it("addedSceneNames", () => {
        let param = new IPortalRegisterServiceParam({addedSceneNames: ["CBD"]});
        expect(param).not.toBeNull();
        expect(param.addedSceneNames[0]).toBe("CBD");
    });
})