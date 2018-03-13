import {IPortalService} from '../../../src/common/iPortal/iPortalService';

describe('iPortalService', () => {
    it('constructor_default', () => {
        var iPortalService = new IPortalService();
        expect(iPortalService).not.toBeNull();
        expect(iPortalService.CLASS_NAME).toBe("SuperMap.iPortalServiceBase");
        expect(iPortalService.enable).toBe(true);
        expect(iPortalService.id).toEqual(0);
        expect(iPortalService.isBatch).toBe(false);
        expect(iPortalService.isDataItemService).toBe(false);
        var load = iPortalService.load();
        expect(load).not.toBeNull();
    });
});