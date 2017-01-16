module("QueryParameters");

test("TestDefaultConstructor",function(){
    expect(9);
    var queryParameters;
    queryParameters = new SuperMap.REST.QueryParameters();
    ok( queryParameters!=null, "not null" );
    ok(queryParameters.customParams==null,"queryParameters.customParams is null");
    equal(queryParameters.expectCount,100000,"queryParameters.expectCount");
    equal(queryParameters.networkType,SuperMap.REST.GeometryType.LINE,"queryParameters.networkType");
    equal(queryParameters.queryOption,SuperMap.REST.QueryOption.ATTRIBUTEANDGEOMETRY,"queryParameters.queryOption");
    ok(queryParameters.queryParams==null,"queryParameters.queryParams is null")
    equal(queryParameters.startRecord,0,"queryParameters.startRecord");
    equal(queryParameters.holdTime,10,"queryParameters.holdTime"); 
    ok( queryParameters.returnCustomResult==false, "returnCustomResult" );
});

test("TestConstructor",function(){
    expect(9);
    var queryParameters;
    queryParameters = new SuperMap.REST.QueryParameters({
        customParams:null,
        expectCount:100,
        networkType:SuperMap.REST.GeometryType.POINT,
        queryOption:SuperMap.REST.QueryOption.ATTRIBUTE,
        queryParams:new SuperMap.REST.FilterParameter(),
        startRecord:5,
        holdTime:1,
        returnCustomResult:true
    });
    ok( queryParameters!=null, "not null" );
    ok(queryParameters.customParams==null,"queryParameters.customParams is null");
    equal(queryParameters.expectCount,100,"queryParameters.expectCount");
    equal(queryParameters.networkType,SuperMap.REST.GeometryType.POINT,"queryParameters.networkType");
    equal(queryParameters.queryOption,SuperMap.REST.QueryOption.ATTRIBUTE,"queryParameters.queryOption");
    ok(queryParameters.queryParams!=null,"queryParameters.queryParams is null")
    equal(queryParameters.startRecord,5,"queryParameters.startRecord");
    equal(queryParameters.holdTime,1,"queryParameters.holdTime"); 
    ok( queryParameters.returnCustomResult==true, "returnCustomResult" );
});

/**
    使用部分参数构建QueryParameters对象时应该将其余参数置为默认值
*/
test("TestDefaultConstructor0",function(){
    expect(9);
    var queryParameters;
    queryParameters = new SuperMap.REST.QueryParameters({
        customParams:null,
        expectCount:100,
        networkType:SuperMap.REST.GeometryType.LINE
    });
    ok( queryParameters!=null, "not null" );
    ok(queryParameters.customParams==null,"queryParameters.customParams is null");
    equal(queryParameters.expectCount,100,"queryParameters.expectCount");
    equal(queryParameters.networkType,SuperMap.REST.GeometryType.LINE,"queryParameters.networkType");
    equal(queryParameters.queryOption,SuperMap.REST.QueryOption.ATTRIBUTEANDGEOMETRY,"queryParameters.queryOption");
    ok(queryParameters.queryParams==null,"queryParameters.queryParams is null")
    equal(queryParameters.startRecord,0,"queryParameters.startRecord");
    equal(queryParameters.holdTime,10,"queryParameters.holdTime"); 
    ok( queryParameters.returnCustomResult==false, "returnCustomResult" );
});


test("TestDestructor",function(){
    expect(9);
    var queryParameters;
    queryParameters = new SuperMap.REST.QueryParameters({
        customParams:null,
        expectCount:100,
        networkType:SuperMap.REST.GeometryType.POINT,
        queryOption:SuperMap.REST.QueryOption.ATTRIBUTE,
        queryParams:new SuperMap.REST.FilterParameter(),
        startRecord:5,
        holdTime:1,
        returnCustomResult:true
    });
    queryParameters.destroy();
    ok( queryParameters!=null, "not null" );
    ok(queryParameters.customParams==null,"queryParameters.customParams is null");
    ok(queryParameters.expectCount==null,"queryParameters.expectCount");
    ok(queryParameters.networkType==null,SuperMap.REST.GeometryType.POINT,"queryParameters.networkType");
    ok(queryParameters.queryOption==null,SuperMap.REST.QueryOption.ATTRIBUTE,"queryParameters.queryOption");
    ok(queryParameters.queryParams==null,"queryParameters.queryParams is null")
    ok(queryParameters.startRecord==null,"queryParameters.startRecord");
    ok(queryParameters.holdTime==null,"queryParameters.holdTime"); 
    ok( queryParameters.returnCustomResult==null, "returnCustomResult" );
});