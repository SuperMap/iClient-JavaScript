module("QueryService");

function initQueryService() {
    var queryServices = new SuperMap.REST.QueryService("http://localhost:8090/iserver/services/map-world/rest/maps/World Map");
    return queryServices;
}

test("TestConstructor",function(){
    expect(2);
    var queryServices = initQueryService();
    ok(queryServices!=null,"not null");
    if(queryServices.isInTheSameDomain) {
        equal(queryServices.url,"http://localhost:8090/iserver/services/map-world/rest/maps/World Map/queryResults.json?","url");
    } else {
        equal(queryServices.url,"http://localhost:8090/iserver/services/map-world/rest/maps/World Map/queryResults.jsonp?","url");
    }
});