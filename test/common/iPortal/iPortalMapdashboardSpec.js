import {IPortalMapdashboard} from '../../../src/common/iPortal/iPortalMapdashboard';

describe('iPortalMapdashboard', () => {
    it('constructor_default', () => {
        var iPortalMapdashboard = new IPortalMapdashboard();
        expect(iPortalMapdashboard).not.toBeNull();
        expect(iPortalMapdashboard.CLASS_NAME).toBe("SuperMap.iPortalServiceBase");
        expect(iPortalMapdashboard.authorizeSetting.length).toEqual(0);
        expect(iPortalMapdashboard.tags.length).toEqual(0);
        expect(iPortalMapdashboard.id).toEqual(0);
        expect(iPortalMapdashboard.visitCount).toEqual(0);
        var load = iPortalMapdashboard.load();
        expect(load).not.toBeNull();
    });
});