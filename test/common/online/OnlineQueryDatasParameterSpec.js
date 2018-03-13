import {OnlineQueryDatasParameter} from '../../../src/common/online/OnlineQueryDatasParameter';

describe('OnlineQueryDatasParameter, toJSON', () => {
    it('constructor', () => {
        var parameter = new OnlineQueryDatasParameter({fileName: "testFileName"});
        expect(parameter).not.toBeNull();
        expect(parameter.CLASS_NAME).toEqual("SuperMap.OnlineQueryDatasParameter");
        var json = parameter.toJSON();
        expect(json).not.toBeNull();
        expect(json.fileName).toEqual("testFileName");
    });
});