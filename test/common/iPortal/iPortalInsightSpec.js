import {IPortalInsight} from '../../../src/common/iPortal/iPortalInsight';

describe('IPortalInsight', () => {
    it('constructor_default', () => {
        var iPortalInsight = new IPortalInsight();
        expect(iPortalInsight).not.toBeNull();
        expect(iPortalInsight.CLASS_NAME).toBe("SuperMap.iPortalServiceBase");
        expect(iPortalInsight.authorizeSetting.length).toEqual(0);
        expect(iPortalInsight.id).toEqual(0);
        var load = iPortalInsight.load();
        expect(load).not.toBeNull();
    });
});