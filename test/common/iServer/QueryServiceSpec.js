require('../../../src/common/iServer/QueryService');

var url = GlobeParameter.mapServiceURL + "World Map";
function initQueryService() {
    return new SuperMap.REST.QueryService(url);
}

describe('testQueryService',function(){
    it("constructor",function(){
        var queryServices = initQueryService();
        expect(queryServices).not.toBeNull();
        if(queryServices.isInTheSameDomain) {
            expect(queryServices.url).toEqual(url + "/queryResults.json?");
        } else {
            expect(queryServices.url).toEqual(url + "/queryResults.jsonp?");
        }
    });
});