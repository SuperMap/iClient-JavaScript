module("GetFeaturesBySQLParameters");

test("DefaultConstructor_Test",function(){
    var getFeatureParameters;
    getFeatureParameters = new SuperMap.REST.GetFeaturesByBufferParameters();
    ok(getFeatureParameters !== null, "not null" );
	ok(getFeatureParameters.datasetNames === null, "getFeatureParameters.datasetNames is null");
	ok(getFeatureParameters.fields === null, "getFeatureParameters.fields is null");
    ok(getFeatureParameters.bufferDistance === null, "getFeatureParameters.bufferDistance is null");
	ok(getFeatureParameters.attributeFilter === null, "getFeatureParameters.attributeFilter is null");
	ok(getFeatureParameters.geometry === null, "getFeatureParameters.geometry is null");
    equal(getFeatureParameters.returnContent, true, "getFeatureParameters.returnContent");
    equal(getFeatureParameters.fromIndex, 0, "getFeatureParameters.fromIndex");
    equal(getFeatureParameters.toIndex, 19, "getFeatureParameters.toIndex");
});

test("Constructor_Test",function(){
    var getFeatureParameters,
	    datasetNames = ["World:Countries"],
		fields = ["SMID","CustomID"],
		geometry = new SuperMap.Geometry.Point(15,20);
    getFeatureParameters = new SuperMap.REST.GetFeaturesByBufferParameters({
        bufferDistance:30,
        returnContent:true,
        fromIndex:2,
        toIndex:30,
        attributeFilter:"SMID<10",
		fields:fields,
		geometry:geometry,
		datasetNames:datasetNames
    });
    ok(getFeatureParameters !== null, "not null" );
    equal(getFeatureParameters.returnContent,true,"getFeatureParameters.returnContent");
    equal(getFeatureParameters.fromIndex,2,"getFeatureParameters.fromIndex");
    equal(getFeatureParameters.toIndex,30,"getFeatureParameters.toIndex");
	equal(getFeatureParameters.bufferDistance,30,"getFeatureParameters.bufferDistance");
    equal(getFeatureParameters.geometry, geometry,"getFeatureParameters.geometry");
    equal(getFeatureParameters.fields, fields,"getFeatureParameters.fields");	
	equal(getFeatureParameters.datasetNames, datasetNames,"getFeatureParameters.datasetNames"); 
	equal(getFeatureParameters.attributeFilter, "SMID<10","getFeatureParameters.attributeFilter"); 
	
	getFeatureParameters.destroy();
	ok(getFeatureParameters.datasetNames === null, "getFeatureParameters.datasetNames is null");
	ok(getFeatureParameters.fields === null, "getFeatureParameters.fields is null");
    ok(getFeatureParameters.bufferDistance === null, "getFeatureParameters.bufferDistance is null");
	ok(getFeatureParameters.attributeFilter === null, "getFeatureParameters.attributeFilter is null");
	ok(getFeatureParameters.geometry === null, "getFeatureParameters.geometry is null");
});

/**
    使用部分参数构建GetFeaturesBySQLParameters对象时,应该将其余参数置为默认值
*/
test("Constructor_TestPart",function(){
    var getFeatureParameters,
	    datasetNames = ["World:Countries"],
		geometry = new SuperMap.Geometry.Point(15,20);
    getFeatureParameters = new SuperMap.REST.GetFeaturesBySQLParameters({
        bufferDistance:30,
		datasetNames:datasetNames,
		attributeFilter:"SMID<10",
        geometry:geometry
    });
    ok(getFeatureParameters !== null, "not null" );
    equal(getFeatureParameters.returnContent,true,"getFeatureParameters.returnContent");
    equal(getFeatureParameters.fromIndex,0,"getFeatureParameters.fromIndex");
    equal(getFeatureParameters.toIndex,19,"getFeatureParameters.toIndex");
	equal(getFeatureParameters.bufferDistance,30,"getFeatureParameters.bufferDistance");
    equal(getFeatureParameters.geometry, geometry,"getFeatureParameters.geometry"); 
	equal(getFeatureParameters.datasetNames, datasetNames,"getFeatureParameters.datasetNames"); 
	equal(getFeatureParameters.attributeFilter, "SMID<10","getFeatureParameters.attributeFilter");
});

test("Deconstructor_Test",function(){
    var getFeatureParameters,
	    datasetNames = ["World:Countries"],
		geometry = new SuperMap.Geometry.Point(15,20);
    getFeatureParameters = new SuperMap.REST.GetFeaturesByBufferParameters({
        bufferDistance:30,
        returnContent:true,
        fromIndex:2,
        toIndex:30,
        attributeFilter:"SMID<10",
		geometry:geometry,
		datasetNames:datasetNames
    });
	getFeatureParameters.destroy();
	ok(getFeatureParameters !== null, "not null" );
    ok(getFeatureParameters.returnContent === null,"getFeatureParameters.returnContent");
    ok(getFeatureParameters.fromIndex === null,"getFeatureParameters.fromIndex");
    ok(getFeatureParameters.toIndex ===null ,"getFeatureParameters.toIndex");
	ok(getFeatureParameters.bufferDistance === null,"getFeatureParameters.bufferDistance");
    ok(getFeatureParameters.geometry === null,"getFeatureParameters.geometry");
	ok(getFeatureParameters.attributeFilter === null,"getFeatureParameters.attributeFilter");
	ok(getFeatureParameters.datasetNames === null,"getFeatureParameters.datasetNames");
});
