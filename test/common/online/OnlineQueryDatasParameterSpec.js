var OnlineQueryDatasParameter = require('../../../src/common/online/OnlineQueryDatasParameter').OnlineQueryDatasParameter;

describe('OnlineQueryDatasParameter, toJSON', function () {
    it('constructor', function () {
        var parameter = new OnlineQueryDatasParameter({fileName:"testFileName"});
        expect(parameter).not.toBeNull();
        expect(parameter.CLASS_NAME).toEqual("SuperMap.OnlineQueryDatasParameter");
        var json = parameter.toJSON();
        expect(json).not.toBeNull();
        expect(json.fileName).toEqual("testFileName");
    });
});