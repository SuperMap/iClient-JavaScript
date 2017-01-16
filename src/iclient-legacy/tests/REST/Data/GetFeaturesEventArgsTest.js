module("GetFeaturesEventArgs");

test("GetFeaturesEventArgs_Test",function(){
    var getFeaturesResult = new SuperMap.REST.GetFeaturesResult();
    var getFeaturesEventArgs=new SuperMap.REST.GetFeaturesEventArgs(getFeaturesResult, "jsonResult");
    ok( getFeaturesEventArgs !== null, "not null" );
    equal(getFeaturesEventArgs.result, getFeaturesResult, "getFeaturesEventArgs.result");
    equal(getFeaturesEventArgs.originResult, "jsonResult", "getFeaturesEventArgs.originResult");
    
    getFeaturesEventArgs.destroy();
    ok(getFeaturesEventArgs !== null, "not null" );
    ok(getFeaturesEventArgs.result === null, "getFeaturesEventArgs.result");
    ok(getFeaturesEventArgs.originResult === null, "getFeaturesEventArgs.originResult");
});