module("EditFeaturesEventArgs");

test("EditFeaturesEventArgs_Test",function(){
    var editFeaturesResult = new SuperMap.REST.EditFeaturesResult();
    var editFeaturesEventArgs=new SuperMap.REST.EditFeaturesEventArgs(editFeaturesResult, "jsonResult");
    ok( editFeaturesEventArgs !== null, "not null" );
    equal(editFeaturesEventArgs.result, editFeaturesResult, "editFeaturesEventArgs.result");
    equal(editFeaturesEventArgs.originResult, "jsonResult", "editFeaturesEventArgs.originResult");
    
    editFeaturesEventArgs.destroy();
    ok(editFeaturesEventArgs !== null, "not null" );
    ok(editFeaturesEventArgs.result === null, "editFeaturesEventArgs.result");
    ok(editFeaturesEventArgs.originResult === null, "editFeaturesEventArgs.originResult");
});