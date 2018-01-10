require('../../../src/common/iPortal/iPortalServicesQueryParam');

describe('iPortalMapsQueryParam', function () {
    it('constructor', function () {
        var param = new SuperMap.iPortalServicesQueryParam({userNames:'test'});
        expect(param).not.toBeNull();
        expect(param.userNames).toEqual('test');
    });
});