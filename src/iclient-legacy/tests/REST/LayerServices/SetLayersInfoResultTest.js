module("SetLayersInfoResult");

test("SetLayersInfoResult_Test",function(){
    var setLayersInfoResult = new SuperMap.REST.SetLayersInfoResult({
        succeed: true,
        newResourceID: "newID",
		newResourceLocation: "http://newID"
    }); 
    ok(setLayersInfoResult !== null, "not null" );
    equal(setLayersInfoResult.succeed, true,"setLayersInfoResult.succeed");
    ok(setLayersInfoResult.newResourceID === "newID", "setLayersInfoResult.newResourceID" );
    equal(setLayersInfoResult.newResourceLocation,"http://newID","setLayersInfoResult.newResourceLocation");
    
    setLayersInfoResult.destroy();
    ok(setLayersInfoResult !== null, "not null" );
    ok(setLayersInfoResult.succeed === null,"setLayersInfoResult.succeed");
    ok(setLayersInfoResult.newResourceID === null, "setLayersInfoResult.newResourceID" );
	ok(setLayersInfoResult.newResourceLocation === null, "setLayersInfoResult.newResourceLocation" );
    //测试fromJson 转化空对象
    ok(SuperMap.REST.SetLayersInfoResult.fromJson(null) === undefined,"SuperMap.REST.SetLayersInfoResult.fromJson");
});