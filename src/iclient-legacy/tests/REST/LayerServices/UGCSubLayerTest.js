module("UGCSubLayer");

test("TestContructor", function(){
    expect(21);
    var set = new SuperMap.REST.DatasetInfo(),
    items = new SuperMap.REST.JoinItem(),
    info = new SuperMap.REST.UGCSubLayer({
        bounds: null,
        caption: "china",
        description: "",
        queryable: "vector",
        subLayers: [],
        name: "",
        visible: true,
        type: "UGC",
        completeLineSymbolDisplayed:true,
        maxScale:1,
        minScale:1,
        minVisibleGeometrySize:1,
        opaqueRate:1,
        symbolScalable:true,
        symbolScale:1,
        datasetInfo:set,
        displayFilter:'smid > 1',
        jsonItems:[items],
        representationField:'',
        ugcLayerType:'vector'
    });
    
    ok(info !== null,"not null");
    equal(info.caption, "china","info.cattion");
    equal(info.description, "","info.description");
    equal(info.queryable, "vector","info.queryable");
    deepEqual(info.subLayers, [],"info.subLayers");
    equal(info.name, "","info.name");
    equal(info.visible, true,"info.visible");
    equal(info.type, "UGC","info.type");
    equal(info.completeLineSymbolDisplayed, true,"info.completeLineSymbolDisplayed");
    equal(info.symbolScalable, true,"info.symbolScalable");
    equal(info.maxScale, 1,"info.maxScale");
    equal(info.minScale, 1,"info.minScale");
    equal(info.minVisibleGeometrySize, 1,"info.minVisibleGeometrySize");
    equal(info.opaqueRate, 1,"info.opaqueRate");
    equal(info.symbolScale, 1,"info.symbolScale");
    deepEqual(info.datasetInfo, set,"info.datasetInfo");
    equal(info.displayFilter, "smid > 1","info.displayFilter");
    equal(info.jsonItems.length, 1, "info.jsonItems.length");
	deepEqual(info.jsonItems[0], items,"info.jsonItems");
    equal(info.representationField, "","info.representationField");
    equal(info.ugcLayerType, "vector","info.ugcLayerType");
});

test("TestDestroy", function(){
    expect(21);
    var b = new SuperMap.Bounds(1,2,3,4),
    set = new SuperMap.REST.DatasetInfo(),
    items = new SuperMap.REST.JoinItem(),
    info = new SuperMap.REST.UGCSubLayer({
        bounds: null,
        dataSourceName: "china",
        description: "",
        encodeType: "vector",
        isReadOnly: true,
        name: "",
        prjCoordSys: "EPSG:4326",
        tableName: "",
        type: "UGC",
        completeLineSymbolDisplayed:true,
        maxScale:1,
        minScale:1,
        minVisibleGeometrySize:1,
        opaqueRate:1,
        symbolScalable:true,
        symbolScale:1,
        datasetInfo:set,
        displayFilter:'',
        jsonItems:[items],
        representationField:'',
        ugcLayerType:'vector'
    });
    
    ok(info != null,"not null");
    info.destroy();
    ok(info.bounds === null,"info.bounds");
    ok(info.caption === null,"info.caption");
    ok(info.description === null,"info.description");
    ok(info.queryable === null,"info.queryable");
    ok(info.subLayers === null,"info.subLayers");
    ok(info.name === null,"info.name");
    ok(info.visible === null,"info.visible");
    ok(info.type === null,"info.type");
    ok(info.completeLineSymbolDisplayed === null,"info.completeLineSymbolDisplayed");
    ok(info.symbolScalable === null,"info.symbolScalable");
    ok(info.maxScale === null,"info.maxScale");
    ok(info.minScale === null,"info.minScale");
    ok(info.minVisibleGeometrySize === null,"info.minVisibleGeometrySize");
    ok(info.opaqueRate === null,"info.opaqueRate");
    ok(info.symbolScale === null,"info.symbolScale");
    ok(info.datasetInfo === null,"info.datasetInfo");
    ok(info.displayFilter === null,"info.displayFilter");
    ok(info.jsonItems === null,"info.jsonItems");
    ok(info.representationField === null,"info.representationField");
    ok(info.ugcLayerType === null,"info.ugcLayerType");
});

test("fronJson_ToServerJSONObject", function(){
	expect(22);
	var sublayerObject = {"scale":5.51753868646E-9,"clipRegion":{"center":null,"id":0,"style":null,"parts":null,"points":null,"type":"REGION"},"prjCoordSys":{"epsgCode":3857,"coordUnit":"METER","name":"User Define","projection":{"name":"Mercator","type":"PRJ_MERCATOR"},"coordSystem":{"unit":"DEGREE","spatialRefType":"SPATIALREF_EARTH_LONGITUDE_LATITUDE","primeMeridian":{"name":"Greenwich","type":"PRIMEMERIDIAN_GREENWICH","longitudeValue":0},"name":"GCS_WGS_1984","type":"GCS_WGS_1984","datum":{"spheroid":{"axis":6378137,"flatten":0.0033528107,"name":"WGS_1984","type":"SPHEROID_WGS_1984"},"name":"D_WGS_1984","type":"DATUM_WGS_1984"}},"type":"PCS_USER_DEFINED","distanceUnit":"METER","projectionParam":{"secondPointLongitude":0,"firstPointLongitude":0,"falseNorthing":0,"secondStandardParallel":0,"firstStandardParallel":0,"centralMeridian":0,"centralParallel":0,"scaleFactor":0,"azimuth":0,"falseEasting":0}},"minVisibleTextSize":0.1,"center":{"y":-2.1420419216156006E-8,"x":0},"cacheEnabled":false,"textOrientationFixed":false,"textAngleFixed":false,"customEntireBounds":null,"userToken":{"userID":""},"description":"","name":"China","visibleScales":[],"colorMode":"DEFAULT","paintBackground":true,"maxScale":1.0E12,"viewBounds":{"rightTop":{"y":6138002.575274207,"x":6138002.575274228},"leftBottom":{"y":-6138002.57527425,"x":-6138002.575274228},"bottom":-6138002.57527425,"left":-6138002.575274228,"right":6138002.575274228,"top":6138002.575274207},"visibleScalesEnabled":false,"overlapDisplayedOptions":{"allowPointOverlap":true,"allowTextOverlap":false,"horizontalOverlappedSpaceSize":0,"verticalOverlappedSpaceSize":0,"allowThemeGraphOverlap":false,"allowThemeGraduatedSymbolOverlap":false,"allowTextAndPointOverlap":true,"allowPointWithTextDisplay":true},"resourceParameter":null,"maxVisibleTextSize":1000,"antialias":true,"customEntireBoundsEnabled":false,"overlapDisplayed":false,"clipRegionEnabled":false,"markerAngleFixed":false,"maxVisibleVertex":3600000,"angle":0,"bounds":{"rightTop":{"y":1.9994875249347314E7,"x":2.0037508342789244E7},"leftBottom":{"y":-1.999487524934734E7,"x":-2.0037508342789244E7},"bottom":-1.999487524934734E7,"left":-2.0037508342789244E7,"right":2.0037508342789244E7,"top":1.9994875249347314E7},"backgroundStyle":{"fillBackOpaque":true,"lineWidth":0.1,"fillBackColor":{"red":255,"blue":255,"green":255},"fillForeColor":{"red":255,"blue":255,"green":255},"markerAngle":0,"markerSize":2.4,"fillGradientOffsetRatioX":0,"fillGradientOffsetRatioY":0,"lineColor":{"red":0,"blue":0,"green":0},"fillOpaqueRate":100,"fillGradientMode":"NONE","fillSymbolID":0,"fillGradientAngle":0,"markerSymbolID":0,"lineSymbolID":0},"dynamicPrjCoordSyses":[{"epsgCode":0,"coordUnit":null,"name":null,"projection":null,"coordSystem":null,"type":"PCS_ALL","distanceUnit":null,"projectionParam":null}],"minScale":0,"coordUnit":"METER","customParams":"","dynamicProjection":true,"distanceUnit":"METER","viewer":{"height":256,"leftTop":{"y":0,"x":0},"width":256,"bottom":256,"left":0,"rightBottom":{"y":256,"x":256},"right":256,"top":0,},displayFilter: "smid > 1"};
	var subLayer = new SuperMap.REST.UGCSubLayer();
	subLayer.fromJson(sublayerObject);
	
	ok(subLayer != null,"not null");
    ok(subLayer.bounds != null,"subLayer.bounds");
    equal(subLayer.caption, null,"subLayer.caption");
    equal(subLayer.description, "","subLayer.description");
    equal(subLayer.queryable, null,"subLayer.queryable");
    deepEqual(subLayer.subLayers, null,"subLayer.subLayers");
    equal(subLayer.name, "China","subLayer.name");
    equal(subLayer.visible, null,"subLayer.visible");
    equal(subLayer.type, null,"subLayer.type");
    equal(subLayer.completeLineSymbolDisplayed, null,"subLayer.completeLineSymbolDisplayed");
    equal(subLayer.symbolScalable, null,"subLayer.symbolScalable");
    equal(subLayer.maxScale, 1000000000000,"subLayer.maxScale");
    equal(subLayer.minScale, 0,"subLayer.minScale");
    equal(subLayer.minVisibleGeometrySize, null,"subLayer.minVisibleGeometrySize");
    equal(subLayer.opaqueRate, null,"subLayer.opaqueRate");
    equal(subLayer.symbolScale, null,"subLayer.symbolScale");
    deepEqual(subLayer.datasetsubLayer, undefined,"subLayer.datasetsubLayer");
    equal(subLayer.displayFilter, "smid > 1","subLayer.displayFilter");
    equal(subLayer.jsonItems, undefined, "subLayer.jsonItems.length");
    equal(subLayer.representationField, null,"subLayer.representationField");
    equal(subLayer.ugcLayerType, null,"subLayer.ugcLayerType");
	
	var obj = subLayer.toServerJSONObject();
	ok(obj != null,"toServerJSONObject != null");
});