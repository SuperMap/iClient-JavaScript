require('../../../src/common/iPortal/iPortalMapsQueryParam');

describe('iPortalMapsQueryParam', function () {
    it('constructor', function () {
        var param = new SuperMap.iPortalMapsQueryParam({userNames:'test'});
        expect(param).not.toBeNull();
        expect(param.userNames).toEqual('test');
    });
});