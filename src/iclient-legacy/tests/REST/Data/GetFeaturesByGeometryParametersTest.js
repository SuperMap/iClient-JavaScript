module("GetFeaturesByGeometryParameters");

test("TestDefaultConstructor",function(){
    expect(10);
	var getFeaturesByGeometryParameters;
	getFeaturesByGeometryParameters = new SuperMap.REST.GetFeaturesByGeometryParameters();
	ok(getFeaturesByGeometryParameters != null, "not null");
	ok(getFeaturesByGeometryParameters.returnContent == true,"getFeaturesByGeometryParameters.returnContent is true")
    equal(getFeaturesByGeometryParameters.fromIndex, 0, "getFeaturesByGeometryParameters.fromIndex");
	equal(getFeaturesByGeometryParameters.toIndex, 19, "getFeaturesByGeometryParameters.toIndex");
	ok(getFeaturesByGeometryParameters.datasetNames == null, "getFeaturesByGeometryParameters.datasetNames is null");
	ok(getFeaturesByGeometryParameters.fields == null, "getFeaturesByGeometryParameters.fields is null");
	ok(getFeaturesByGeometryParameters.geometry == null, "getFeaturesByGeometryParameters.geometry is null");
	ok(getFeaturesByGeometryParameters.attributeFilter == null, "getFeaturesByGeometryParameters.attributeFilter is null");
	equal(getFeaturesByGeometryParameters.getFeatureMode, "SPATIAL", "getFeaturesByGeometryParameters.getFeatureMode is 'SOATIAL'");
	equal(getFeaturesByGeometryParameters.spatialQueryMode, SuperMap.REST.SpatialQueryMode.CONTAIN, "getFeaturesByGeometryParameters.spatialQueryMode is CONTAIN");
});

test("TestConstructor",function(){
    expect(15);
    var getFeaturesByGeometryParameters;
	getFeaturesByGeometryParameters = new SuperMap.REST.GetFeaturesByGeometryParameters({
        returnContent:false,
        fromIndex:5,
        toIndex:10,
        datasetNames:["WorldMap"],
		fields:["SMID","CustomID"],
		getFeatureMode:"SPATIAL_ATTRIBUTEFILTER",
		spatialQueryMode:SuperMap.REST.SpatialQueryMode.INTERSECT,
		attributeFilter:"SMID<10",
		geometry:new SuperMap.Geometry()
    });
    ok( getFeaturesByGeometryParameters != null, "not null" );
    ok(getFeaturesByGeometryParameters.returnContent == false,"getFeaturesByGeometryParameters.returnContent is false");
    equal(getFeaturesByGeometryParameters.fromIndex, 5, "getFeaturesByGeometryParameters.fromIndex");
    equal(getFeaturesByGeometryParameters.toIndex, 10, "getFeaturesByGeometryParameters.toIndex");
    ok(getFeaturesByGeometryParameters.datasetNames != null, "getFeaturesByGeometryParameters.datasetNames is not null");
	ok(getFeaturesByGeometryParameters.fields != null, "getFeaturesByGeometryParameters.fields is not null");
	ok(getFeaturesByGeometryParameters.geometry != null,"getFeaturesByGeometryParameters.geometry is not null");
	equal(getFeaturesByGeometryParameters.attributeFilter, "SMID<10", "getFeaturesByGeometryParameters.attributeFilter");
	equal(getFeaturesByGeometryParameters.getFeatureMode, "SPATIAL_ATTRIBUTEFILTER","SPATIAL_ATTRIBUTEFILTER.getFeatureMode");
	equal(getFeaturesByGeometryParameters.spatialQueryMode, SuperMap.REST.SpatialQueryMode.INTERSECT, "getFeaturesByGeometryParameters.spatialQueryMode");
	
	getFeaturesByGeometryParameters.destroy();
	ok(getFeaturesByGeometryParameters.datasetNames == null, "getFeaturesByGeometryParameters.datasetNames is null");
	ok(getFeaturesByGeometryParameters.fields == null, "getFeaturesByGeometryParameters.fields is null");
	ok(getFeaturesByGeometryParameters.geometry == null, "getFeaturesByGeometryParameters.geometry is null");
	ok(getFeaturesByGeometryParameters.attributeFilter == null, "getFeaturesByGeometryParameters.attributeFilter is null");
	ok(getFeaturesByGeometryParameters.spatialQueryMode == null, "getFeaturesByGeometryParameters.spatialQueryMode is null");
});

/**
 * 使用部分默认参数
 */
test("TestDefaultConstructor0",function(){
    expect(9);
    var getFeaturesByGeometryParameters;
	getFeaturesByGeometryParameters = new SuperMap.REST.GetFeaturesByGeometryParameters({
        toIndex:10,
        datasetNames:["WorldMap"],
		geometry:new SuperMap.Geometry(),
    });
    ok( getFeaturesByGeometryParameters!=null, "not null" );
    ok(getFeaturesByGeometryParameters.returnContent==true,"getFeaturesByGeometryParameters.returnContent is false");
    equal(getFeaturesByGeometryParameters.fromIndex,0,"getFeaturesByGeometryParameters.fromIndex");
    equal(getFeaturesByGeometryParameters.toIndex,10,"getFeaturesByGeometryParameters.toIndex");
    ok(getFeaturesByGeometryParameters.datasetNames!=null,"getFeaturesByGeometryParameters.datasetNames is not null");
	ok(getFeaturesByGeometryParameters.geometry != null, "getFeaturesByGeometryParameters.geometry is not null");
	equal(getFeaturesByGeometryParameters.getFeatureMode,"SPATIAL","getFeaturesByGeometryParameters.getFeatureMode");
	ok(getFeaturesByGeometryParameters.attributeFilter == null, "getFeaturesByGeometryParameters.attributeFilter is null");
	equal(getFeaturesByGeometryParameters.spatialQueryMode, SuperMap.REST.SpatialQueryMode.CONTAIN, "getFeaturesByGeometryParameters.spatialQueryMode is CONTAIN");
});