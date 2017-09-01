require('../../../src/common/iServer/QueryService');

var url = GlobeParameter.mapServiceURL + "World Map";
function initQueryService() {
    return new SuperMap.QueryService(url);
}

describe('testQueryService',function(){
    it("constructor",function(){
        var queryServices = initQueryService();
        expect(queryServices).not.toBeNull();
        expect(queryServices.url).toEqual(url + "/queryResults.json?");
    });
});