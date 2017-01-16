module("ServerFeature");

test("TestServerFeature",function(){
    var serverFeature = new SuperMap.REST.ServerFeature();
    serverFeature.geometry = new SuperMap.Geometry.Point(0,0);
    ok( serverFeature!=null, "null" );
    //测试fromJson 转化空对象
    ok(SuperMap.REST.ServerFeature.fromJson(null)==null,"SuperMap.REST.ServerFeature.fromJson");
    
    serverFeature.destroy();
    ok( serverFeature!=null, "null" );
    equal(serverFeature.fieldNames,null,"serverFeature.fieldNames");
    ok(serverFeature.fieldValues==null, "serverFeature.fieldValues" );
    ok(serverFeature.geometry==null, "serverFeature.geometry" );
});