require('../../../src/common/online/OnlineData');

describe('OnlineData', function () {
    it('constructor_default', function () {
        var onlineData = new SuperMap.OnlineData();
        expect(onlineData).not.toBeNull();
        expect(onlineData.CLASS_NAME).toBe("SuperMap.OnlineData");
        expect(onlineData.serverType).toBe("ONLINE");
        var load = onlineData.load();
        expect(load).not.toBeNull();
        var publishedServices = onlineData.getPublishedServices();
        expect(publishedServices).toBeNull();
        var authorizeSetting = onlineData.getAuthorizeSetting();
        expect(authorizeSetting).toBeNull();
    });

});