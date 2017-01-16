module("QueryByBoundsParameters");

test("TestDefaultConstructor",function(){
    expect(11);
    var queryByBoundsParameters;
    queryByBoundsParameters = new SuperMap.REST.QueryByBoundsParameters();
    ok( queryByBoundsParameters!=null, "not null" );
    ok(queryByBoundsParameters.customParams==null,"queryByBoundsParameters.customParams is null");
    equal(queryByBoundsParameters.expectCount,100000,"queryByBoundsParameters.expectCount");
    equal(queryByBoundsParameters.networkType,SuperMap.REST.GeometryType.LINE,"queryByBoundsParameters.networkType");
    equal(queryByBoundsParameters.queryOption,SuperMap.REST.QueryOption.ATTRIBUTEANDGEOMETRY,"queryByBoundsParameters.queryOption");
    ok(queryByBoundsParameters.queryParams==null,"queryByBoundsParameters.queryParams is null")
    equal(queryByBoundsParameters.startRecord,0,"queryByBoundsParameters.startRecord");
    equal(queryByBoundsParameters.holdTime,10,"queryByBoundsParameters.holdTime"); 
    ok(queryByBoundsParameters.returnCustomResult==false, "returnCustomResult" );
    ok(queryByBoundsParameters.returnContent==true, "queryByBoundsParameters.returnContent" );
    ok(queryByBoundsParameters.bounds==null,"queryByBoundsParameters.bounds is null")
});

test("TestConstructor",function(){
    expect(11);
    var queryByBoundsParameters;
    queryByBoundsParameters = new SuperMap.REST.QueryByBoundsParameters({
        customParams:null,
        expectCount:100,
        networkType:SuperMap.REST.GeometryType.POINT,
        queryOption:SuperMap.REST.QueryOption.ATTRIBUTE,
        queryParams:new SuperMap.REST.FilterParameter(),
        startRecord:5,
        holdTime:1,
        returnCustomResult:true,
        returnContent:false,
        bounds:new SuperMap.Bounds()
    });
    ok( queryByBoundsParameters!=null, "not null" );
    ok(queryByBoundsParameters.customParams==null,"queryByBoundsParameters.customParams is null");
    equal(queryByBoundsParameters.expectCount,100,"queryByBoundsParameters.expectCount");
    equal(queryByBoundsParameters.networkType,SuperMap.REST.GeometryType.POINT,"queryByBoundsParameters.networkType");
    equal(queryByBoundsParameters.queryOption,SuperMap.REST.QueryOption.ATTRIBUTE,"queryByBoundsParameters.queryOption");
    ok(queryByBoundsParameters.queryParams!=null,"queryByBoundsParameters.queryParams is null")
    equal(queryByBoundsParameters.startRecord,5,"queryByBoundsParameters.startRecord");
    equal(queryByBoundsParameters.holdTime,1,"queryByBoundsParameters.holdTime"); 
    ok(queryByBoundsParameters.returnCustomResult==true, "returnCustomResult" );
    ok(!queryByBoundsParameters.returnContent, "returnContent" );
    ok(queryByBoundsParameters.bounds!=null,"queryByBoundsParameters.bounds"); 
});

//使用部分参数构建QueryParameters对象时应该将其余参数置为默认值
test("TestDestructor0",function(){
    expect(11);
    var queryByBoundsParameters;
    queryByBoundsParameters = new SuperMap.REST.QueryByBoundsParameters({
        customParams:null,
        expectCount:100,
        networkType:SuperMap.REST.GeometryType.LINE,
        returnContent:false
    });
    ok( queryByBoundsParameters!=null, "not null" );
    ok(queryByBoundsParameters.customParams==null,"queryByBoundsParameters.customParams is null");
    equal(queryByBoundsParameters.expectCount,100,"queryByBoundsParameters.expectCount");
    equal(queryByBoundsParameters.networkType,SuperMap.REST.GeometryType.LINE,"queryByBoundsParameters.networkType");
    equal(queryByBoundsParameters.queryOption,SuperMap.REST.QueryOption.ATTRIBUTEANDGEOMETRY,"queryByBoundsParameters.queryOption");
    ok(queryByBoundsParameters.queryParams==null,"queryByBoundsParameters.queryParams is null")
    equal(queryByBoundsParameters.startRecord,0,"queryByBoundsParameters.startRecord");
    equal(queryByBoundsParameters.holdTime,10,"queryByBoundsParameters.holdTime"); 
    ok( queryByBoundsParameters.returnCustomResult==false, "returnCustomResult" );
    ok(!queryByBoundsParameters.returnContent, "returnContent" );
    ok(queryByBoundsParameters.bounds==null,"queryByBoundsParameters.bounds"); 
});

test("TestDestructor",function(){
    expect(11);
    var queryByBoundsParameters;
    queryByBoundsParameters = new SuperMap.REST.QueryByBoundsParameters({
        customParams:null,
        expectCount:100,
        networkType:SuperMap.REST.GeometryType.POINT,
        queryOption:SuperMap.REST.QueryOption.ATTRIBUTE,
        queryParams:new Array(new SuperMap.REST.FilterParameter()),
        startRecord:5,
        holdTime:1,
        returnCustomResult:true,
        returnContent:false,
        bounds:new SuperMap.Bounds()
    });
    queryByBoundsParameters.destroy();
    ok( queryByBoundsParameters!=null, "not null" );
    ok(queryByBoundsParameters.customParams==null,"queryByBoundsParameters.customParams is null");
    ok(queryByBoundsParameters.expectCount==null,"queryByBoundsParameters.expectCount");
    ok(queryByBoundsParameters.networkType==null,SuperMap.REST.GeometryType.POINT,"queryByBoundsParameters.networkType");
    ok(queryByBoundsParameters.queryOption==null,SuperMap.REST.QueryOption.ATTRIBUTE,"queryByBoundsParameters.queryOption");
    ok(queryByBoundsParameters.queryParams==null,"queryByBoundsParameters.queryParams is null")
    ok(queryByBoundsParameters.startRecord==null,"queryByBoundsParameters.startRecord");
    ok(queryByBoundsParameters.holdTime==null,"queryByBoundsParameters.holdTime"); 
    ok(queryByBoundsParameters.returnCustomResult==null, "queryByBoundsParameters.returnCustomResult" );
    ok(queryByBoundsParameters.returnContent==null, "queryByBoundsParameters.returnContent" );
    ok(queryByBoundsParameters.bounds==null,"queryByBoundsParameters.bounds"); 
});