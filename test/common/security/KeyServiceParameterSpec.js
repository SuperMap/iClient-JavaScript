require('../../../src/common/security/KeyServiceParameter');

describe('KeyServiceParameter', function () {
    it('constructor, toJSON', function () {
        var options = {
            name: "testName",
            serviceIds: 1,
        };
        var parameter = new SuperMap.KeyServiceParameter(options);
        expect(parameter).not.toBeNull();
        expect(parameter.CLASS_NAME).toEqual("SuperMap.KeyServiceParameter");
        expect(parameter.clientType).toEqual("SERVER");
        expect(parameter.name).toEqual("testName");
        expect(parameter.serviceIds).toEqual(1);
        var json = parameter.toJSON();
        expect(json).not.toBeNull();
        expect(json.clientType).toEqual("SERVER");
        expect(json.name).toEqual("testName");
        expect(json.serviceIds).toEqual(1);
    });
});
