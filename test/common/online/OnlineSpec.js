var Online = require('../../../src/common/online/Online').Online;

describe('Online',function () {
    it('constructor',function () {
        var online = new Online();
        expect(online.rootUrl).toEqual("http://www.supermapol.com");
        expect(online.webUrl).toEqual("http://www.supermapol.com/web");
        expect(online.mDatasUrl).toEqual("http://www.supermapol.com/web/mycontent/datas");
    });
});