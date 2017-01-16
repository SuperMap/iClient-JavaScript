module("GetFeaturesResult");

test("GetFeaturesResult_Test",function(){
    var recordset = new SuperMap.REST.Recordset();
    var features = [new SuperMap.Feature.Vector()];
    var resourceInfo = new SuperMap.REST.ResourceInfo();
    var getFeaturesResult = new SuperMap.REST.GetFeaturesResult({
        featureCount:200,
		featureUriList:null,
		features: features,
        resourceInfo:resourceInfo
    }); 
    ok(getFeaturesResult !== null, "not null" );
    equal(getFeaturesResult.featureCount,200,"getFeaturesResult.featureCount");
    ok(getFeaturesResult.featureUriList === null, "getFeaturesResult.featureUriList" );
    equal(getFeaturesResult.features,features,"getFeaturesResult.features");
    equal(getFeaturesResult.resourceInfo,resourceInfo,"getFeaturesResult.resourceInfo");
    
    getFeaturesResult.destroy();
    ok(getFeaturesResult !== null, "not null" );
    ok(getFeaturesResult.featureCount === null,"getFeaturesResult.featureCount");
    ok(getFeaturesResult.featureUriList === null, "getFeaturesResult.featureUriList" );
    ok(getFeaturesResult.features === null,"getFeaturesResult.features");
    ok(getFeaturesResult.resourceInfo === null,"getFeaturesResult.resourceInfo");
    //测试fromJson 转化空对象
    ok(SuperMap.REST.GetFeaturesResult.fromJson(null) === undefined,"SuperMap.REST.GetFeaturesResult.fromJson");
});