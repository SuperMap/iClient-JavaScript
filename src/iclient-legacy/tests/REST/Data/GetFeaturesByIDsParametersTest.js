module("GetFeaturesByIDsParameters");

test("TestDefaultConstructor",function(){
    expect(7);
    var getFeaturesByIDsParameters;
    getFeaturesByIDsParameters = new SuperMap.REST.GetFeaturesByIDsParameters();
    ok( getFeaturesByIDsParameters!=null, "not null" );
    ok(getFeaturesByIDsParameters.returnContent==true,"getFeaturesByIDsParameters.returnContent is true");
    equal(getFeaturesByIDsParameters.fromIndex,0,"getFeaturesByIDsParameters.fromIndex");
    equal(getFeaturesByIDsParameters.toIndex,19,"getFeaturesByIDsParameters.toIndex");
    ok(getFeaturesByIDsParameters.datasetNames==null,"getFeaturesByIDsParameters.datasetNames is null");
	ok(getFeaturesByIDsParameters.IDs==null,"getFeaturesByIDsParameters.IDs is null");
	ok(getFeaturesByIDsParameters.fields==null,"getFeaturesByIDsParameters.fields is null");
});

test("TestConstructor",function(){
    expect(13);
    var getFeaturesByIDsParameters;
	getFeaturesByIDsParameters = new SuperMap.REST.GetFeaturesByIDsParameters({
        returnContent:true,
        fromIndex:5,
        toIndex:10,
        datasetNames:["WorldMap","China"],
		IDs:[1,2,3],
		fields:["SMID","CustomID"]
    });
    ok( getFeaturesByIDsParameters!=null, "not null" );
    ok(getFeaturesByIDsParameters.returnContent==true,"getFeaturesByIDsParameters.returnContent is true");
    equal(getFeaturesByIDsParameters.fromIndex,5,"getFeaturesByIDsParameters.fromIndex");
    equal(getFeaturesByIDsParameters.toIndex,10,"getFeaturesByIDsParameters.toIndex");
    ok(getFeaturesByIDsParameters.datasetNames!=null,"getFeaturesByIDsParameters.datasetNames is not null");
	equal(getFeaturesByIDsParameters.datasetNames.length,2,"getFeaturesByIDsParameters.datasetNames.length is 2");
	ok(getFeaturesByIDsParameters.IDs!=null,"getFeaturesByIDsParameters.IDs is not null");
	equal(getFeaturesByIDsParameters.IDs.length,3,"getFeaturesByIDsParameters.IDs.length");
	ok(getFeaturesByIDsParameters.fields!=null,"getFeaturesByIDsParameters.fields is not null");
	equal(getFeaturesByIDsParameters.fields.length,2,"getFeaturesByIDsParameters.fields.length");
	
	getFeaturesByIDsParameters.destroy();
    ok(getFeaturesByIDsParameters.datasetNames==null,"getFeaturesByIDsParameters.datasetNames is null");
	ok(getFeaturesByIDsParameters.IDs==null,"getFeaturesByIDsParameters.IDs is null");
	ok(getFeaturesByIDsParameters.fields==null,"getFeaturesByIDsParameters.fields is null");
});

/**
 * 使用部分默认参数
 */
test("TestDefaultConstructor0",function(){
    expect(7);
    var getFeaturesByIDsParameters;
	getFeaturesByIDsParameters = new SuperMap.REST.GetFeaturesByIDsParameters({
        toIndex:10,
        datasetNames:["WorldMap","China"]
    });
    ok( getFeaturesByIDsParameters!=null, "not null" );
    ok(getFeaturesByIDsParameters.returnContent==true,"getFeaturesByIDsParameters.returnContent is false");
    equal(getFeaturesByIDsParameters.fromIndex,0,"getFeaturesByIDsParameters.fromIndex");
    equal(getFeaturesByIDsParameters.toIndex,10,"getFeaturesByIDsParameters.toIndex");
    ok(getFeaturesByIDsParameters.datasetNames!=null,"getFeaturesByIDsParameters.datasetNames is not null");
	equal(getFeaturesByIDsParameters.datasetNames.length,2,"getFeaturesByIDsParameters.datasetNames.length is 2");
	ok(getFeaturesByIDsParameters.IDs==null,"getFeaturesByIDsParameters.IDs is null");
});