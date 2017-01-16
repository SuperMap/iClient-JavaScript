module("GeoRelationResult");

test("Test_Construct",function(){
	//默认值
    var geoRelationResult = new SuperMap.REST.GeoRelationResult();
    ok( geoRelationResult != null, "null" );
	equal(geoRelationResult.source, null, "geoRelationResult.source");
	equal(geoRelationResult.count, null, "geoRelationResult.count");
	equal(geoRelationResult.result, null, "geoRelationResult.result");
	equal(geoRelationResult.isFeatureResult, null, "geoRelationResult.Result");
});

test("Test_Construct_1",function(){
	//默认值
    var geoRelationResult = new SuperMap.REST.GeoRelationResult({
										source: 1,
										result: [5, 6],
										count:2,
										isFeatureResult: false
										});
    ok( geoRelationResult != null, "null" );
	equal(geoRelationResult.source, 1, "geoRelationResult.source");
	equal(geoRelationResult.count, 2, "geoRelationResult.count");
	equal(geoRelationResult.result.length, 2, "geoRelationResult.result");
	equal(geoRelationResult.isFeatureResult, false, "geoRelationResult.isFeatureResult");
    
	geoRelationResult.destroy();
    
    geoRelationResult.destroy();
    ok( geoRelationResult != null, "null" );
    equal(geoRelationResult.source, null,"geoRelationResult.source");
    ok(geoRelationResult.count == null, "geoRelationResult.count" );
	ok(geoRelationResult.result == null, "geoRelationResult.result" );
    ok(geoRelationResult.isFeatureResult == null, "geoRelationResult.isFeatureResult");
});

test("Test_fromJson",function(){
	//默认值
    var geoRelationResult = new SuperMap.REST.GeoRelationResult.fromJson({
						"source": 1,
						"result": [5, 6],
						"count": 2
					});
    ok( geoRelationResult != null, "null" );
	equal(geoRelationResult.source, 1, "geoRelationResult.source");
	equal(geoRelationResult.count, 2, "geoRelationResult.count");
	equal(geoRelationResult.result.length, 2, "geoRelationResult.result");
	equal(geoRelationResult.isFeatureResult, false, "geoRelationResult.isFeatureResult");
    //测试fromJson 转化空对象
    var geoRelationResult2 = SuperMap.REST.GeoRelationResult.fromJson({"result":[{"fieldNames":["SMID","SMSDRIW","SMSDRIN","SMSDRIE","SMSDRIS","SMUSERID","SMAREA","SMPERIMETER","SMGEOMETRYSIZE","CLASSID","NAME"],"ID":1,"fieldValues":["1","50.978516","-55.577652","8958.851","-7666.0244","0","6.759171449681847E7","33000.38050318773","104","42010",""],"geometry":{"center":{"y":-3860.8011357782884,"x":4503.410608703859},"id":1,"style":null,"parts":[6],"points":[{"y":-55.577652310411075,"x":52.11805047583772},{"y":-80.85101548817323,"x":8958.850874968857},{"y":-7666.0246192461655,"x":8951.671481804897},{"y":-7654.2197958280985,"x":3366.236219057173},{"y":-7663.294525702867,"x":50.9785151716903},{"y":-55.577652310411075,"x":52.11805047583772}],"type":"REGION"}}],"count":1,"source":{"fieldNames":["SMID","SMX","SMY","SMLIBTILEID","SMUSERID","SMGEOMETRYSIZE","NAME","X","Y"],"ID":1,"fieldValues":["1","4597.873059","-4567.922216","1","0","16","朝阳公园","4597.873059","-4567.922216"],"geometry":{"center":{"y":-4567.922216,"x":4597.873059},"id":1,"style":null,"parts":[1],"points":[{"y":-4567.922216,"x":4597.873059}],"type":"POINT"}}});
    
    ok(geoRelationResult2.source instanceof SuperMap.Feature, "geoRelationResult2.source instanceof Feature");
	equal(geoRelationResult2.count, 1, "geoRelationResult2.count");
	equal(geoRelationResult2.result.length, 1, "geoRelationResult2.result");
	ok(geoRelationResult2.result[0] instanceof SuperMap.Feature, "geoRelationResult2.result[0] intanceof Feature");
	equal(geoRelationResult2.isFeatureResult, true, "geoRelationResult2.isFeatureResult");
});