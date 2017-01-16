module("ServiceException");

test("TestServiceException_fromJson",function(){
    var obj = SuperMap.ServiceException.fromJson(null);
    ok(obj == null, "SuperMap.ServiceException.fromJson(null)")
});
test("TestServiceException_fromJson_null",function(){
    var obj = SuperMap.ServiceException.fromJson();
    ok(obj == undefined, "SuperMap.ServiceException.fromJson()")
});