module("QueryResult");

test("TestQueryResult",function(){
    var recordset = new SuperMap.REST.Recordset();
    var recordsets = new Array(recordset);
    var resourceInfo = new SuperMap.REST.ResourceInfo();
    var queryResult = new SuperMap.REST.QueryResult({
        totalCount:200,
        recordsets:recordsets,
        resourceInfo:resourceInfo
    });
    ok( queryResult!=null, "null" );
    equal(queryResult.totalCount,200,"queryResult.totalCount");
    ok(queryResult.currentCount==null, "queryResult.currentCount" );
    ok(queryResult.customResponse==null, "queryResult.customResponse" );
    equal(queryResult.recordsets,recordsets,"queryResult.recordsets");
    equal(queryResult.resourceInfo,resourceInfo,"queryResult.resourceInfo");
    
    queryResult.destroy();
    ok(queryResult=!null, "null" );
    ok(queryResult.totalCount==null,"queryResult.totalCount");
    ok(queryResult.currentCount==null, "queryResult.currentCount" );
    ok(queryResult.customResponse==null, "queryResult.customResponse" );
    ok(queryResult.recordsets==null,"queryResult.recordsets");
    ok(queryResult.resourceInfo==null,"queryResult.resourceInfo");
    //测试fromJson 转化空对象
    ok(SuperMap.REST.QueryResult.fromJson(null)==null,"SuperMap.REST.QueryResult.fromJson");
});