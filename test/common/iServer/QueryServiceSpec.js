import {QueryServiceBase} from '../../../src/common/iServer/QueryServiceBase';

var url = GlobeParameter.mapServiceURL + "World Map";
var initQueryService = () => {
    return new QueryServiceBase(url);
}
describe('QueryService', () => {
    it("constructor", () => {
        var queryServices = initQueryService();
        expect(queryServices).not.toBeNull();
        expect(queryServices.url).toEqual(url + "/queryResults");
    });

    it('headers', () => {
        let myHeaders = new Headers();
        var queryService = new QueryServiceBase(url, { headers: myHeaders });
        expect(queryService).not.toBeNull();
        expect(queryService.headers).not.toBeNull();
        queryService.destroy();
    });
    
    it('crossOrigin', () => {
        var queryService = new QueryServiceBase(url, { crossOrigin: false });
        expect(queryService).not.toBeNull();
        expect(queryService.crossOrigin).toBeFalsy();
        queryService.destroy();
    });

});