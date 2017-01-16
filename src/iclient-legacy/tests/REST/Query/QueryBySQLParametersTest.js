module("QueryBySQLParameters");

test("TestDefaultConstructor",function(){
    var queryBySQLParameters;
    queryBySQLParameters = new SuperMap.REST.QueryBySQLParameters();
    ok( queryBySQLParameters!=null, "not null" );
    ok(queryBySQLParameters.customParams==null,"queryBySQLParameters.customParams is null");
    equal(queryBySQLParameters.expectCount,100000,"queryBySQLParameters.expectCount");
    equal(queryBySQLParameters.networkType,SuperMap.REST.GeometryType.LINE,"queryBySQLParameters.networkType");
    equal(queryBySQLParameters.queryOption,SuperMap.REST.QueryOption.ATTRIBUTEANDGEOMETRY,"queryBySQLParameters.queryOption");
    ok(queryBySQLParameters.queryParams==null,"queryBySQLParameters.queryParams is null")
    equal(queryBySQLParameters.startRecord,0,"queryBySQLParameters.startRecord");
    equal(queryBySQLParameters.holdTime,10,"queryBySQLParameters.holdTime"); 
    ok(queryBySQLParameters.returnCustomResult==false, "returnCustomResult" );
    ok(queryBySQLParameters.returnContent==true, "queryBySQLParameters.returnContent" );
});

test("TestConstructor",function(){
    var queryBySQLParameters;
    queryBySQLParameters = new SuperMap.REST.QueryBySQLParameters({
        customParams:null,
        expectCount:100,
        networkType:SuperMap.REST.GeometryType.POINT,
        queryOption:SuperMap.REST.QueryOption.ATTRIBUTE,
        queryParams:new SuperMap.REST.FilterParameter(),
        startRecord:5,
        holdTime:1,
        returnCustomResult:true,
        
        returnContent:false,
    });
    ok( queryBySQLParameters!=null, "not null" );
    ok(queryBySQLParameters.customParams==null,"queryBySQLParameters.customParams is null");
    equal(queryBySQLParameters.expectCount,100,"queryBySQLParameters.expectCount");
    equal(queryBySQLParameters.networkType,SuperMap.REST.GeometryType.POINT,"queryBySQLParameters.networkType");
    equal(queryBySQLParameters.queryOption,SuperMap.REST.QueryOption.ATTRIBUTE,"queryBySQLParameters.queryOption");
    ok(queryBySQLParameters.queryParams!=null,"queryBySQLParameters.queryParams is null")
    equal(queryBySQLParameters.startRecord,5,"queryBySQLParameters.startRecord");
    equal(queryBySQLParameters.holdTime,1,"queryBySQLParameters.holdTime"); 
    ok(queryBySQLParameters.returnCustomResult==true, "returnCustomResult" );
    ok(!queryBySQLParameters.returnContent, "returnContent" );
});

/**
    使用部分参数构建QueryParameters对象时应该将其余参数置为默认值
*/
test("TestDestructor0",function(){
    var queryBySQLParameters;
    queryBySQLParameters = new SuperMap.REST.QueryBySQLParameters({
        customParams:null,
        expectCount:100,
        networkType:SuperMap.REST.GeometryType.LINE,
        returnContent:false
    });
    ok( queryBySQLParameters!=null, "not null" );
    ok(queryBySQLParameters.customParams==null,"queryBySQLParameters.customParams is null");
    equal(queryBySQLParameters.expectCount,100,"queryBySQLParameters.expectCount");
    equal(queryBySQLParameters.networkType,SuperMap.REST.GeometryType.LINE,"queryBySQLParameters.networkType");
    equal(queryBySQLParameters.queryOption,SuperMap.REST.QueryOption.ATTRIBUTEANDGEOMETRY,"queryBySQLParameters.queryOption");
    ok(queryBySQLParameters.queryParams==null,"queryBySQLParameters.queryParams is null")
    equal(queryBySQLParameters.startRecord,0,"queryBySQLParameters.startRecord");
    equal(queryBySQLParameters.holdTime,10,"queryBySQLParameters.holdTime"); 
    ok( queryBySQLParameters.returnCustomResult==false, "returnCustomResult" );
    ok(!queryBySQLParameters.returnContent, "returnContent" );
});


test("TestDestructor",function(){
    var queryBySQLParameters;
    queryBySQLParameters = new SuperMap.REST.QueryBySQLParameters({
        customParams:null,
        expectCount:100,
        networkType:SuperMap.REST.GeometryType.POINT,
        queryOption:SuperMap.REST.QueryOption.ATTRIBUTE,
        queryParams:new SuperMap.REST.FilterParameter(),
        startRecord:5,
        holdTime:1,
        returnCustomResult:true,
        returnContent:false,
    });
    queryBySQLParameters.destroy();
    ok( queryBySQLParameters!=null, "not null" );
    ok(queryBySQLParameters.customParams==null,"queryBySQLParameters.customParams is null");
    ok(queryBySQLParameters.expectCount==null,"queryBySQLParameters.expectCount");
    ok(queryBySQLParameters.networkType==null,SuperMap.REST.GeometryType.POINT,"queryBySQLParameters.networkType");
    ok(queryBySQLParameters.queryOption==null,SuperMap.REST.QueryOption.ATTRIBUTE,"queryBySQLParameters.queryOption");
    ok(queryBySQLParameters.queryParams==null,"queryBySQLParameters.queryParams is null")
    ok(queryBySQLParameters.startRecord==null,"queryBySQLParameters.startRecord");
    ok(queryBySQLParameters.holdTime==null,"queryBySQLParameters.holdTime"); 
    ok(queryBySQLParameters.returnCustomResult==null, "queryBySQLParameters.returnCustomResult" );
    ok(queryBySQLParameters.returnContent==null, "queryBySQLParameters.returnContent" );
});