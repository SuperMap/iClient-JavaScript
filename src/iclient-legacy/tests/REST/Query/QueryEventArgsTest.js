module("QueryEventArgs");

test("TestQueryEventArgs",function(){
    var qeryResult = new SuperMap.REST.QueryResult();
    var queryEventArgs=new SuperMap.REST.QueryEventArgs(qeryResult,"jsonResult");
    ok( queryEventArgs!=null, "null" );
    equal(queryEventArgs.result,qeryResult,"queryEventArgs.result ");
    equal(queryEventArgs.originResult,"jsonResult","queryEventArgs.originResult");
    
    queryEventArgs.destroy();
    ok( queryEventArgs=!null, "null" );
    ok(queryEventArgs.result==null,"queryEventArgs.result ");
    ok(queryEventArgs.originResult==null,"queryEventArgs.originResult");
});