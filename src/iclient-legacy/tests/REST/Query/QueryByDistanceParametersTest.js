module("QueryByDistanceParameters");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function() {
    expect(13);
    var queryByDistanceParameters;
    queryByDistanceParameters = new SuperMap.REST.QueryByDistanceParameters();
    ok(queryByDistanceParameters != null, "not null" );
    ok(queryByDistanceParameters.customParams == null, "queryByDistanceParameters.customParams is null");
    equal(queryByDistanceParameters.distance, 0, "queryByDistanceParameters.distance");
    equal(queryByDistanceParameters.expectCount, 100000, "queryByDistanceParameters.expectCount");
    ok(queryByDistanceParameters.geometry == null, "queryByDistanceParameters.geometry is null");
    equal(queryByDistanceParameters.holdTime, 10, "queryByDistanceParameters.holdTime"); 
    ok(queryByDistanceParameters.isNearest == null, "queryByDistanceParameters.isNearest is null");
    equal(queryByDistanceParameters.networkType, SuperMap.REST.GeometryType.LINE, "queryByDistanceParameters.networkType");
    equal(queryByDistanceParameters.queryOption, SuperMap.REST.QueryOption.ATTRIBUTEANDGEOMETRY, "queryByDistanceParameters.queryOption");
    ok(queryByDistanceParameters.queryParams == null, "queryByDistanceParameters.queryParams is null")
    equal(queryByDistanceParameters.startRecord, 0, "queryByDistanceParameters.startRecord");
    ok(queryByDistanceParameters.returnCustomResult == false,                                                                                                                                      "returnCustomResult" );
    ok(queryByDistanceParameters.returnContent == true, "queryByDistanceParameters.returnContent" );
});

//测试设置参数值的有效性
test("TestConstructor",function() {
    expect(13);
    var queryByDistanceParameters;
    queryByDistanceParameters = new SuperMap.REST.QueryByDistanceParameters({
        customParams: null,
        expectCount: 100,
        networkType: SuperMap.REST.GeometryType.POINT,
        queryOption: SuperMap.REST.QueryOption.ATTRIBUTE,
        queryParams: new SuperMap.REST.FilterParameter(),
        startRecord: 2,
        holdTime: 1,
        returnCustomResult: true,
        returnContent: false,
        distance: 5,
        geometry: new SuperMap.Geometry.Point(50, 50),
        isNearest: true
    });
    ok( queryByDistanceParameters != null, "not null" );
    ok(queryByDistanceParameters.customParams == null, "queryByDistanceParameters.customParams is null");
    equal(queryByDistanceParameters.expectCount, 100, "queryByDistanceParameters.expectCount");
    equal(queryByDistanceParameters.networkType, SuperMap.REST.GeometryType.POINT, "queryByDistanceParameters.networkType");
    equal(queryByDistanceParameters.queryOption, SuperMap.REST.QueryOption.ATTRIBUTE, "queryByDistanceParameters.queryOption");
    ok(queryByDistanceParameters.queryParams != null, "queryByDistanceParameters.queryParams is not null")
    equal(queryByDistanceParameters.startRecord, 2, "queryByDistanceParameters.startRecord");
    equal(queryByDistanceParameters.holdTime, 1, "queryByDistanceParameters.holdTime"); 
    ok(queryByDistanceParameters.returnCustomResult == true, "returnCustomResult" );
    ok(!queryByDistanceParameters.returnContent, "returnContent" );
    equal(queryByDistanceParameters.distance, 5, "queryByDistanceParameters.distance"); 
    ok(queryByDistanceParameters.geometry != null, "queryByDistanceParameters.geometry is not null");
    ok(queryByDistanceParameters.isNearest == true, "isNearest" );
});

//使用部分参数构建QueryParameters对象时应该将其余参数置为默认值
test("TestDestructor0", function() {
    expect(13);
    var queryByDistanceParameters;
    queryByDistanceParameters = new SuperMap.REST.QueryByDistanceParameters({
        customParams: null,
        expectCount: 100,
        networkType: SuperMap.REST.GeometryType.LINE,
        returnContent: false,
        distance: 5,
        isNearest: false,
        geometry: new SuperMap.Geometry.Point(50, 50)
    });
    ok( queryByDistanceParameters != null, "not null" );
    ok(queryByDistanceParameters.customParams == null, "queryByDistanceParameters.customParams is null");
    equal(queryByDistanceParameters.expectCount, 100, "queryByDistanceParameters.expectCount");
    equal(queryByDistanceParameters.networkType, SuperMap.REST.GeometryType.LINE, "queryByDistanceParameters.networkType");
    equal(queryByDistanceParameters.queryOption, SuperMap.REST.QueryOption.ATTRIBUTEANDGEOMETRY, "queryByDistanceParameters.queryOption");
    ok(queryByDistanceParameters.queryParams == null, "queryByDistanceParameters.queryParams is null")
    equal(queryByDistanceParameters.startRecord, 0, "queryByDistanceParameters.startRecord");
    equal(queryByDistanceParameters.holdTime, 10, "queryByDistanceParameters.holdTime"); 
    ok( queryByDistanceParameters.returnCustomResult == false, "returnCustomResult" );
    ok(!queryByDistanceParameters.returnContent, "returnContent" );
    equal(queryByDistanceParameters.distance, 5, "queryByDistanceParameters.distance"); 
    ok( queryByDistanceParameters.isNearest == false, "isNearest" );
    ok(queryByDistanceParameters.geometry != null, "queryByDistanceParameters.geometry is not null");
});

//测试destroy方法的有效性
test("TestDestructor", function() {
    expect(14);
    var queryByDistanceParameters;
    queryByDistanceParameters = new SuperMap.REST.QueryByDistanceParameters({
        customParams: null,
        expectCount: 100,
        networkType: SuperMap.REST.GeometryType.POINT,
        queryOption: SuperMap.REST.QueryOption.ATTRIBUTE,
        queryParams: new Array(new SuperMap.REST.FilterParameter()),
        startRecord: 5,
        holdTime: 1,
        returnCustomResult: true,
        returnContent: false,
        distance: 5,
        isNearest: true,
        geometry: new SuperMap.Geometry.Point(50, 50)
    });
    queryByDistanceParameters.destroy();
    ok( queryByDistanceParameters != null, "not null" );
    ok(queryByDistanceParameters.customParams == null, "queryByDistanceParameters.customParams is null");
    ok(queryByDistanceParameters.expectCount == null, "queryByDistanceParameters.expectCount");
    ok(queryByDistanceParameters.networkType == null, SuperMap.REST.GeometryType.POINT, "queryByDistanceParameters.networkType");
    ok(queryByDistanceParameters.queryOption == null, SuperMap.REST.QueryOption.ATTRIBUTE, "queryByDistanceParameters.queryOption");
    ok(queryByDistanceParameters.queryParams == null, "queryByDistanceParameters.queryParams is null")
    ok(queryByDistanceParameters.startRecord == null, "queryByDistanceParameters.startRecord");
    ok(queryByDistanceParameters.holdTime == null, "queryByDistanceParameters.holdTime"); 
    ok(queryByDistanceParameters.returnCustomResult == null, "queryByDistanceParameters.returnCustomResult" );
    ok(queryByDistanceParameters.returnContent == null, "queryByDistanceParameters.returnContent" );
    ok(queryByDistanceParameters.isNearest == null, "queryByDistanceParameters.isNearest is null");
    ok(queryByDistanceParameters.distance == null, "queryByDistanceParameters.distance is null");
    ok(queryByDistanceParameters.geometry == null, "queryByDistanceParameters.geometry is null");
    ok(queryByDistanceParameters.isNearest == null, "queryByDistanceParameters.isNearest is null");
});