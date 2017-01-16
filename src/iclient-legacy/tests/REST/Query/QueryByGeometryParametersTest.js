module("QueryByGeometryParameters");

test("TestDefaultConstructor",function(){
    expect(12);
    var queryByGeometryParameters = new SuperMap.REST.QueryByGeometryParameters();
    ok( queryByGeometryParameters!=null, "not null" );
    ok(queryByGeometryParameters.customParams==null,"queryByGeometryParameters.customParams is null");
    equal(queryByGeometryParameters.expectCount,100000,"queryByGeometryParameters.expectCount");
    equal(queryByGeometryParameters.networkType,SuperMap.REST.GeometryType.LINE,"queryByGeometryParameters.networkType");
    equal(queryByGeometryParameters.queryOption,SuperMap.REST.QueryOption.ATTRIBUTEANDGEOMETRY,"queryByGeometryParameters.queryOption");
    equal(queryByGeometryParameters.spatialQueryMode,SuperMap.REST.SpatialQueryMode.INTERSECT,"queryByGeometryParameters.spatialQueryMode");
    ok(queryByGeometryParameters.queryParams==null,"queryByGeometryParameters.queryParams is null")
    equal(queryByGeometryParameters.startRecord,0,"queryByGeometryParameters.startRecord");
    equal(queryByGeometryParameters.holdTime,10,"queryByGeometryParameters.holdTime"); 
    ok(queryByGeometryParameters.returnCustomResult==false, "returnCustomResult" );
    ok(queryByGeometryParameters.returnContent==true, "queryByGeometryParameters.returnContent" );
    ok(queryByGeometryParameters.geometry==null,"queryByGeometryParameters.geometry is null");
});

test("TestConstructor",function(){
    expect(12);
    var queryByGeometryParameters;
    queryByGeometryParameters = new SuperMap.REST.QueryByGeometryParameters({
        customParams:null,
        expectCount:100,
        networkType:SuperMap.REST.GeometryType.POINT,
        queryOption:SuperMap.REST.QueryOption.ATTRIBUTE,
        queryParams:new SuperMap.REST.FilterParameter(),
        spatialQueryMode:SuperMap.REST.SpatialQueryMode.CROSS,
        startRecord:5,
        holdTime:1,
        returnCustomResult:true,
        returnContent:false,
        geometry:new SuperMap.Geometry()
    });
    ok( queryByGeometryParameters!=null, "not null" );
    ok(queryByGeometryParameters.customParams==null,"queryByGeometryParameters.customParams is null");
    equal(queryByGeometryParameters.expectCount,100,"queryByGeometryParameters.expectCount");
    equal(queryByGeometryParameters.networkType,SuperMap.REST.GeometryType.POINT,"queryByGeometryParameters.networkType");
    equal(queryByGeometryParameters.queryOption,SuperMap.REST.QueryOption.ATTRIBUTE,"queryByGeometryParameters.queryOption");
    ok(queryByGeometryParameters.queryParams!=null,"queryByGeometryParameters.queryParams is null")
    equal(queryByGeometryParameters.spatialQueryMode,SuperMap.REST.SpatialQueryMode.CROSS,"queryByGeometryParameters.spatialQueryMode");
    equal(queryByGeometryParameters.startRecord,5,"queryByGeometryParameters.startRecord");
    equal(queryByGeometryParameters.holdTime,1,"queryByGeometryParameters.holdTime"); 
    ok(queryByGeometryParameters.returnCustomResult==true, "returnCustomResult" );
    ok(!queryByGeometryParameters.returnContent, "returnContent" );
    ok(queryByGeometryParameters.geometry!=null,"queryByGeometryParameters.geometry"); 
});

//使用部分参数构建QueryParameters对象时应该将其余参数置为默认值
test("TestDestructor0",function(){
    expect(12);
    var queryByGeometryParameters;
    queryByGeometryParameters = new SuperMap.REST.QueryByGeometryParameters({
        customParams:null,
        expectCount:100,
        networkType:SuperMap.REST.GeometryType.LINE,
        returnContent:false
    });
    ok( queryByGeometryParameters!=null, "not null" );
    ok(queryByGeometryParameters.customParams==null,"queryByGeometryParameters.customParams is null");
    equal(queryByGeometryParameters.expectCount,100,"queryByGeometryParameters.expectCount");
    equal(queryByGeometryParameters.networkType,SuperMap.REST.GeometryType.LINE,"queryByGeometryParameters.networkType");
    equal(queryByGeometryParameters.queryOption,SuperMap.REST.QueryOption.ATTRIBUTEANDGEOMETRY,"queryByGeometryParameters.queryOption");
    equal(queryByGeometryParameters.spatialQueryMode,SuperMap.REST.SpatialQueryMode.INTERSECT,"queryByGeometryParameters.spatialQueryMode");
    ok(queryByGeometryParameters.queryParams==null,"queryByGeometryParameters.queryParams is null")
    equal(queryByGeometryParameters.startRecord,0,"queryByGeometryParameters.startRecord");
    equal(queryByGeometryParameters.holdTime,10,"queryByGeometryParameters.holdTime"); 
    ok( queryByGeometryParameters.returnCustomResult==false, "returnCustomResult" );
    ok(!queryByGeometryParameters.returnContent, "returnContent" );
    ok(queryByGeometryParameters.geometry==null,"queryByGeometryParameters.geometry"); 
    
});

test("TestDestructor",function(){
    expect(12);
    var queryByGeometryParameters;
    queryByGeometryParameters = new SuperMap.REST.QueryByGeometryParameters({
        customParams:null,
        expectCount:100,
        networkType:SuperMap.REST.GeometryType.POINT,
        queryOption:SuperMap.REST.QueryOption.ATTRIBUTE,
        queryParams:new Array(new SuperMap.REST.FilterParameter()),
        startRecord:5,
        holdTime:1,
        returnCustomResult:true,
        returnContent:false,
        geometry:new SuperMap.Geometry()
    });
    queryByGeometryParameters.destroy();
    ok( queryByGeometryParameters!=null, "not null" );
    ok(queryByGeometryParameters.customParams==null,"queryByGeometryParameters.customParams is null");
    ok(queryByGeometryParameters.expectCount==null,"queryByGeometryParameters.expectCount");
    ok(queryByGeometryParameters.networkType==null,SuperMap.REST.GeometryType.POINT,"queryByGeometryParameters.networkType");
    ok(queryByGeometryParameters.queryOption==null,SuperMap.REST.QueryOption.ATTRIBUTE,"queryByGeometryParameters.queryOption");
    ok(queryByGeometryParameters.spatialQueryMode==null,"queryByGeometryParameters.spatialQueryMode")
    ok(queryByGeometryParameters.queryParams==null,"queryByGeometryParameters.queryParams is null")
    ok(queryByGeometryParameters.startRecord==null,"queryByGeometryParameters.startRecord");
    ok(queryByGeometryParameters.holdTime==null,"queryByGeometryParameters.holdTime"); 
    ok(queryByGeometryParameters.returnCustomResult==null, "queryByGeometryParameters.returnCustomResult" );
    ok(queryByGeometryParameters.returnContent==null, "queryByGeometryParameters.returnContent" );
    ok(queryByGeometryParameters.geometry==null,"queryByGeometryParameters.geometry"); 
});