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
});