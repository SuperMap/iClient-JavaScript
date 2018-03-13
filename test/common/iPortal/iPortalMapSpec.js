import {IPortalMap} from '../../../src/common/iPortal/iPortalMap';

describe('iPortalMap', () => {
    it('constructor_default', () => {
        var iPortalMap = new IPortalMap();
        expect(iPortalMap).not.toBeNull();
        expect(iPortalMap.CLASS_NAME).toBe("SuperMap.iPortalServiceBase");
        expect(iPortalMap.authorizeSetting.length).toEqual(0);
        expect(iPortalMap.layers.length).toEqual(0);
        expect(iPortalMap.id).toEqual(0);
        expect(iPortalMap.epsgCode).toEqual(0);
        expect(iPortalMap.isDefaultBottomMap).toBe(false);
        var load = iPortalMap.load();
        expect(load).not.toBeNull();
    });
});