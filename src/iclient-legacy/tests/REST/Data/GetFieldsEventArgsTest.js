module("GetFieldsEventArgs");

test("GetFieldsEventArgs",function(){
    var getFieldsResult = new SuperMap.REST.GetFieldsResult();
    var getFieldsEventArgs=new SuperMap.REST.GetFieldsEventArgs(getFieldsResult, "jsonResult");
    ok( getFieldsEventArgs !== null, "not null" );
    equal(getFieldsEventArgs.result, getFieldsResult, "getFieldsEventArgs.result");
    equal(getFieldsEventArgs.originResult, "jsonResult", "getFieldsEventArgs.originResult");
    
    getFieldsEventArgs.destroy();
    ok(getFieldsEventArgs !== null, "not null" );
    ok(getFieldsEventArgs.result === null, "getFieldsEventArgs.result");
    ok(getFieldsEventArgs.originResult === null, "getFieldsEventArgs.originResult");
});