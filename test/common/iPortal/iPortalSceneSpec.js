import {IPortalScene} from '../../../src/common/iPortal/iPortalScene';

describe('iPortalScene', () => {
    it('constructor_default', () => {
        var iPortalScene = new IPortalScene();
        expect(iPortalScene).not.toBeNull();
        expect(iPortalScene.CLASS_NAME).toBe("SuperMap.iPortalServiceBase");
        expect(iPortalScene.authorizeSetting.length).toEqual(0);
        expect(iPortalScene.layers.length).toEqual(0);
        expect(iPortalScene.id).toEqual(0);
        var load = iPortalScene.load();
        expect(load).not.toBeNull();
    });
});