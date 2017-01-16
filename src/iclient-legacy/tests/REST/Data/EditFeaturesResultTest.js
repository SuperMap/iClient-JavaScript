module("EditFeaturesResult");

test("EditFeaturesResult_Test",function(){
    var ids, resourceInfo, editFeaturesResult;

	ids = new Array(),
	resourceInfo = new SuperMap.REST.ResourceInfo();
    editFeaturesResult = new SuperMap.REST.EditFeaturesResult({
        IDs:ids,
        resourceInfo:resourceInfo
    }); 
	
    ok(editFeaturesResult !== null, "not null" );
    equal(editFeaturesResult.IDs,ids,"editFeaturesResult.IDs");
    equal(editFeaturesResult.resourceInfo,resourceInfo,"editFeaturesResult.resourceInfo");
    
    editFeaturesResult.destroy();
    ok(editFeaturesResult !== null, "not null" );
    ok(editFeaturesResult.IDs === null,"editFeaturesResult.IDs");
    ok(editFeaturesResult.resourceInfo === null,"editFeaturesResult.resourceInfo");
    //测试fromJson 转化空对象
    ok(SuperMap.REST.EditFeaturesResult.fromJson(null) === undefined,"SuperMap.REST.EditFeaturesResult.fromJson");
	deepEqual(SuperMap.REST.EditFeaturesResult.fromJson([2,1,3]).IDs, [2,1,3], "SuperMap.REST.EditFeaturesResult.fromJson");
	deepEqual(SuperMap.REST.EditFeaturesResult.fromJson({resourceInfo: resourceInfo}).resourceInfo, resourceInfo, "SuperMap.REST.EditFeaturesResult.fromJson");
});