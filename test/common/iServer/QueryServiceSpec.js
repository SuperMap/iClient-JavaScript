import {QueryService} from '../../../src/common/iServer/QueryService';

var url = GlobeParameter.mapServiceURL + "World Map";
var initQueryService = () => {
    return new QueryService(url);
}
describe('QueryService', () => {
    it("constructor", () => {
        var queryServices = initQueryService();
        expect(queryServices).not.toBeNull();
        expect(queryServices.url).toEqual(url + "/queryResults.json?");
    });

    it('headers', () => {
        let myHeaders = new Headers();
        var queryService = new QueryService(url, { headers: myHeaders });
        expect(queryService).not.toBeNull();
        expect(queryService.headers).not.toBeNull();
        queryService.destroy();
    });
    
    it('crossOrigin', () => {
        var queryService = new QueryService(url, { crossOrigin: false });
        expect(queryService).not.toBeNull();
        expect(queryService.crossOrigin).toBeFalsy();
        queryService.destroy();
    });

});