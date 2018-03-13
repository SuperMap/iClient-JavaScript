import {Online} from '../../../src/common/online/Online';

describe('Online', () => {
    it('constructor', () => {
        var online = new Online();
        expect(online.rootUrl).toEqual("http://www.supermapol.com");
        expect(online.webUrl).toEqual("http://www.supermapol.com/web");
        expect(online.mDatasUrl).toEqual("http://www.supermapol.com/web/mycontent/datas");
    });
});