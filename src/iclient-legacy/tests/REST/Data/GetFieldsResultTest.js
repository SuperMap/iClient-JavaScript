module("GetFieldsResult");

test("GetFieldsResult_Test",function(){
    var fieldNames = ["SMID","SMUSER"];
    var childUriList = ["http:///url1","http://url2"];
    var getFieldsResult = new SuperMap.REST.GetFieldsResult({
        fieldNames: fieldNames,
        childUriList: childUriList
    }); 
    ok(getFieldsResult !== null, "not null" );
    equal(getFieldsResult.fieldNames.length,2,"getFieldsResult.fieldNames.length");
    ok(getFieldsResult.fieldNames[0] === "SMID", "getFieldsResult.fieldNames" );
    equal(getFieldsResult.childUriList,childUriList,"getFieldsResult.childUriList");
    
    getFieldsResult.destroy();
    ok(getFieldsResult !== null, "not null" );
    ok(getFieldsResult.fieldNames === null,"getFieldsResult.fieldNames");
    ok(getFieldsResult.childUriList === null, "getFieldsResult.childUriList" );
    //测试fromJson 转化空对象
    ok(SuperMap.REST.GetFieldsResult.fromJson(null) === undefined,"SuperMap.REST.GetFieldsResult.fromJson");
});