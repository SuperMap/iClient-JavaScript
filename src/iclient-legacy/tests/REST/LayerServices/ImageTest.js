module("Image");

test("TestContructor", function(){
    expect(28);
    var b = new SuperMap.Bounds(1,2,3,4),
    set = new SuperMap.REST.DatasetInfo(),
    items = new SuperMap.REST.JoinItem(),
    colors = new SuperMap.REST.ServerColor(),
    subLayers = [],
    info = new SuperMap.REST.Image({
        bounds: b,
        caption: "china",
        description: "",
        queryable: "vector",
        subLayers: subLayers,
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
        displayFilter:'',
        jsonItems:items,
        representationField:'',
        ugcLayerType:'vector',
        brightness:1,
        colorSpaceType:"",
        contrast:1,
        displayBandIndexes:[],
        transparent:true,
        transparentColor:colors,
        transparentColorTolerance:1
    });
    
    ok(info !== null,"not null");
    deepEqual(info.bounds, b,"info.bounds");
    equal(info.caption, "china","info.cattion");
    equal(info.description, "","info.description");
    equal(info.queryable, "vector","info.queryable");
    deepEqual(info.subLayers, subLayers,"info.subLayers");
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
    equal(info.displayFilter, "","info.displayFilter");
    deepEqual(info.jsonItems, items,"info.jsonItems");
    equal(info.representationField, "","info.representationField");
    equal(info.ugcLayerType, "vector","info.ugcLayerType");
    equal(info.brightness, 1,"info.brightness");
    equal(info.colorSpaceType, "","info.colorSpaceType");
    equal(info.contrast, 1,"info.contrast");
    deepEqual(info.displayBandIndexes, [],"info.displayBandIndexes");
    equal(info.transparent, true,"info.transparent");
    deepEqual(info.transparentColor, colors,"info.transparentColor");
    equal(info.transparentColorTolerance, 1,"info.transparentColorTolerance");
});

test("TestDestroy", function(){
    expect(28);
    var b = new SuperMap.Bounds(1,2,3,4),
    set = new SuperMap.REST.DatasetInfo(),
    items = new SuperMap.REST.JoinItem(),
    colors = new SuperMap.REST.ServerColor(),
    style = new SuperMap.REST.ServerStyle(),
    info = new SuperMap.REST.Image({
        bounds: b,
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
        jsonItems:items,
        representationField:'',
        ugcLayerType:'vector',
        brightness:1,
        colorSpaceType:"",
        contrast:1,
        displayBandIndexes:[],
        transparent:true,
        transparentColor:colors,
        transparentColorTolerance:1
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
    ok(info.brightness === null,"info.brightness");
    ok(info.colorSpaceType === null,"info.colorSpaceType");
    ok(info.contrast === null,"info.contrast");
    ok(info.displayBandIndexes === null,"info.displayBandIndexes");
    ok(info.transparent === null,"info.transparent");
    ok(info.transparentColor === null,"info.transparentColor");
    ok(info.transparentColorTolerance === null,"info.transparentColorTolerance");
});

test("Test_fromJSON_toServerJSONObject", function(){
    var info = new SuperMap.REST.Image();
    info.fromJson({"symbolScalable":false,
    "visible":true,
    "type":"UGC",
    "joinItems":null,
    "representationField":"",
    "ugcLayerType":"IMAGE",
    "completeLineSymbolDisplayed":false,
    "brightness":0,
    "contrast":0,
    "displayFilter":null,
    "transparentColorTolerance":0,
    "subLayers":null,
    "colorSpaceType":"RGB",
    "description":"",
    "name":"Day@World",
    "transparent":false,
    "maxScale":0,
    "symbolScale":0,
    "caption":"Day@World",
    "transparentColor":{
        "red":255,
        "blue":255,
        "green":255},
    "opaqueRate":25,
    "bounds":{"rightTop":{"y":89.999999999,"x":180},"leftBottom":{"y":-89.999999999,"x":-180},"bottom":-89.999999999,"left":-180,"right":180,"top":89.999999999},
    "minScale":0,
    "displayBandIndexes":[-1,-1,-1],
    "datasetInfo":{
        "bounds":{"rightTop":{"y":89.999999999,"x":180},"leftBottom":{"y":-89.999999999,"x":-180},"bottom":-89.999999999,"left":-180,"right":180,"top":89.999999999},
        "recordCount":0,
        "isFileCache":false,
        "tableName":null,
        "description":null,
        "name":"Day",
        "prjCoordSys":null,
        "isReadOnly":false,
        "charset":null,
        "encodeType":null,
        "dataSourceName":"World",
        "type":"IMAGE"},
    "minVisibleGeometrySize":0,
    "queryable":false});
    
    //测试fromJSON结果
    ok(info !== null,"not null");
    ok(info.bounds != null ,"info.bounds");
    ok(info.bounds.top == 89.999999999 ,"info.bounds.top");
    equal(info.caption, "Day@World","info.cattion");
    equal(info.description, "","info.description");
    equal(info.queryable, false,"info.queryable");
    ok(info.subLayers == null,"info.subLayers");
    
    equal(info.name, "Day@World","info.name");
    equal(info.visible, true,"info.visible");
    equal(info.type, "UGC","info.type");
    equal(info.completeLineSymbolDisplayed, false,"info.completeLineSymbolDisplayed");
    equal(info.symbolScalable, false,"info.symbolScalable");
    equal(info.maxScale, 0,"info.maxScale");
    equal(info.minScale, 0,"info.minScale");
    equal(info.minVisibleGeometrySize, 0,"info.minVisibleGeometrySize");
    equal(info.opaqueRate, 25,"info.opaqueRate");
    equal(info.symbolScale, 0,"info.symbolScale");
    ok(info.datasetInfo != null,"info.datasetInfo");
    equal(info.displayFilter, null,"info.displayFilter");
    ok(info.joinItems == null,"info.joinItems");
    equal(info.representationField, "","info.representationField");
    equal(info.ugcLayerType, "IMAGE","info.ugcLayerType");
    equal(info.brightness, 0,"info.brightness");
    equal(info.contrast, 0,"info.contrast");    
    equal(info.colorSpaceType, "RGB","info.colorSpaceType");
    ok(info.displayBandIndexes != null,"info.displayBandIndexes");
    equal(info.transparent, false,"info.transparent");
    ok(info.transparentColor != null,"info.transparentColor");
    equal(info.transparentColorTolerance, 0,"info.transparentColorTolerance");

    
    //测试toServerJSONObject结果
    var jsonObj = info.toServerJSONObject();
    ok(jsonObj.bounds != null ,"jsonObj.bounds");
    ok(jsonObj.bounds.rightTop.y == 89.999999999 ,"jsonObj.bounds.rightTop.y");
    equal(jsonObj.caption, "Day@World","jsonObj.cattion");
    equal(jsonObj.description, "","jsonObj.description");
    equal(jsonObj.queryable, false,"jsonObj.queryable");
    ok(jsonObj.subLayers == null,"jsonObj.subLayers");
    
    equal(jsonObj.name, "Day@World","jsonObj.name");
    equal(jsonObj.visible, true,"jsonObj.visible");
    equal(jsonObj.type, "UGC","jsonObj.type");
    equal(jsonObj.completeLineSymbolDisplayed, false,"jsonObj.completeLineSymbolDisplayed");
    equal(jsonObj.symbolScalable, false,"jsonObj.symbolScalable");
    equal(jsonObj.maxScale, 0,"jsonObj.maxScale");
    equal(jsonObj.minScale, 0,"jsonObj.minScale");
    equal(jsonObj.minVisibleGeometrySize, 0,"jsonObj.minVisibleGeometrySize");
    equal(jsonObj.opaqueRate, 25,"jsonObj.opaqueRate");
    equal(jsonObj.symbolScale, 0,"jsonObj.symbolScale");
    ok(jsonObj.datasetInfo != null,"jsonObj.datasetInfo");
    equal(jsonObj.displayFilter, null,"jsonObj.displayFilter");
    ok(jsonObj.joinItems == null,"jsonObj.joinItems");
    equal(jsonObj.representationField, "","jsonObj.representationField");
    equal(jsonObj.ugcLayerType, "IMAGE","jsonObj.ugcLayerType");
    equal(jsonObj.brightness, 0,"jsonObj.brightness");
    equal(jsonObj.contrast, 0,"jsonObj.contrast");    
    equal(jsonObj.colorSpaceType, "RGB","jsonObj.colorSpaceType");
    ok(jsonObj.displayBandIndexes != null,"jsonObj.displayBandIndexes");
    equal(jsonObj.transparent, false,"jsonObj.transparent");
    ok(jsonObj.transparentColor != null,"jsonObj.transparentColor");
    equal(jsonObj.transparentColorTolerance, 0,"jsonObj.transparentColorTolerance");
});