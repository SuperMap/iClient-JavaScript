module("GetFeaturesServiceBase");
function initGetFeaturesService() {
    var getFeaturesServiceBase = new SuperMap.REST.GetFeaturesServiceBase(GlobeParameter.dataServiceURL, {
		eventListeners: {
			processCompleted: function(){},
			processFailed: function(){}
		}
	});
    return getFeaturesServiceBase;
}

test("Constructor_Test",function(){
    expect(2);
    var getFeaturesServiceBase = initGetFeaturesService();
    ok(getFeaturesServiceBase !== null,"not null");
    if(getFeaturesServiceBase.isInTheSameDomain) {
        equal(getFeaturesServiceBase.url,GlobeParameter.dataServiceURL+"/featureResults.json?","url");
    } else {
        equal(getFeaturesServiceBase.url,GlobeParameter.dataServiceURL+"/featureResults.jsonp?","url");
    }
	getFeaturesServiceBase.destroy();
});

test("Constructor_token",function(){
	var getFeaturesServiceBase = new SuperMap.REST.GetFeaturesServiceBase(GlobeParameter.dataServiceURL, {token:88888});
    ok(getFeaturesServiceBase !== null,"not null");
    ok(getFeaturesServiceBase.token == 88888,"token parameter exist");
});