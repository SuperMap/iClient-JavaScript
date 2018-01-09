require('../../../src/common/iPortal/iPortalService');

describe('iPortalService', function () {
    it('constructor_default', function () {
        var iPortalService = new SuperMap.iPortalService();
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