module("JoinItem");

test("TestConstructor",function(){
    var joinItem = new SuperMap.REST.JoinItem({
        foreignTableName:"foreignTableName",
        joinType: SuperMap.REST.JoinType.INNERJOIN
    });
    ok( joinItem!=null, "null" );
    equal(joinItem.foreignTableName,"foreignTableName","joinItem.foreignTableName ");
    ok(joinItem.joinFilter==null,"joinItem.joinFilter");
    equal(joinItem.joinType,SuperMap.REST.JoinType.INNERJOIN,"joinItem.joinType ");
});

test("TestDestructor",function(){
    var joinItem = new SuperMap.REST.JoinItem({
        foreignTableName:"foreignTableName",
        joinType: SuperMap.REST.JoinType.INNERJOIN
    });
    ok( joinItem!=null, "null" );
    equal(joinItem.foreignTableName,"foreignTableName","joinItem.foreignTableName ");
    ok(joinItem.joinFilter==null,"joinItem.joinFilter");
    equal(joinItem.joinType,SuperMap.REST.JoinType.INNERJOIN,"joinItem.joinType ");
    
    joinItem.destroy();
    ok( joinItem != null, "null" );
    ok(joinItem.foreignTableName==null,"joinItem.foreignTableName ");
    ok(joinItem.joinFilter==null,"joinItem.joinFilter");
    ok(joinItem.joinType==null,"joinItem.joinType ");
});

test("Test_toServerJSONObject", function(){
	var joinItem = new SuperMap.REST.JoinItem({
		foreignTableName:"foreignTableName",
        joinType: SuperMap.REST.JoinType.INNERJOIN
	})
	
	var jsonObj = joinItem.toServerJSONObject();
	ok(jsonObj != null, "jsonObj !null");
	equal(joinItem.foreignTableName, jsonObj.foreignTableName, "jsonObj.foreignTableName");
	equal(joinItem.joinType, jsonObj.joinType, "jsonObj.joinType" );
	ok(jsonObj.joinFilter == null, "jsonObj.joinFilter");
	ok(jsonObj.CLASS_NANME == undefined, "jsonObj.class_name");
	ok(jsonObj.initialize == undefined, "jsonObj.initialize");
});