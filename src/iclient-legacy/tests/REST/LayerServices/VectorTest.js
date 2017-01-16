module("Vector");

test("TestContructor", function(){
    expect(21);
    var b = new SuperMap.Bounds(1,2,3,4),
    set = new SuperMap.REST.DatasetInfo(),
    items = new SuperMap.REST.JoinItem(),
    style = new SuperMap.REST.ServerStyle(),
    info = new SuperMap.REST.Vector({
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
        displayFilter:'',
        jsonItems:items,
        representationField:'',
        ugcLayerType:'vector',
        style:style
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
    equal(info.displayFilter, "","info.displayFilter");
    deepEqual(info.jsonItems, items,"info.jsonItems");
    equal(info.representationField, "","info.representationField");
    equal(info.ugcLayerType, "vector","info.ugcLayerType");
    deepEqual(info.style, style, "info.style");
});

test("TestDestroy", function(){
    expect(22);
    var b = new SuperMap.Bounds(1,2,3,4),
    set = new SuperMap.REST.DatasetInfo(),
    items = new SuperMap.REST.JoinItem(),
    style = new SuperMap.REST.ServerStyle(),
    info = new SuperMap.REST.Vector({
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
        jsonItems:items,
        representationField:'',
        ugcLayerType:'vector',
        style:style
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
    ok(info.style === null, "info.style");
});

test("Test_fromJSON_toServerJSONObject", function(){
    var info = new SuperMap.REST.Vector();
    info.fromJson({"symbolScalable":false,
    "visible":true,
    "symbolScale":0,
    "caption":"Rivers@World",
    "type":"UGC",
    "representationField":"",
    "joinItems":null,
    "ugcLayerType":"VECTOR",
    "completeLineSymbolDisplayed":false,
    "opaqueRate":100,
    "bounds":{"rightTop":{"y":71.392489545,"x":160.76359563636362},"leftBottom":{"y":-36.96944545454546,"x":-164.88743636363634},"bottom":-36.96944545454546,"left":-164.88743636363634,"right":160.76359563636362,"top":71.392489545},
    "minScale":0,
    "subLayers":null,
    "style":{
        "fillBackOpaque":true,
        "lineWidth":0.1,
        "fillBackColor":{
            "red":255,
            "blue":255,
            "green":255},
        "fillForeColor":{"red":208,"blue":240,"green":255},
        "markerAngle":0,
        "markerSize":2.4,
        "fillGradientOffsetRatioX":0,
        "fillGradientOffsetRatioY":0,
        "lineColor":{"red":165,"blue":221,"green":191},
        "fillOpaqueRate":100,
        "fillGradientMode":"NONE",
        "fillSymbolID":0,
        "fillGradientAngle":0,
        "markerSymbolID":0,
        "lineSymbolID":0},
    "displayFilter":"",
    "description":"",
    "name":"Rivers@World",
    "datasetInfo":{
        "bounds":{"rightTop":{"y":71.392489545,"x":160.76359563636362},"leftBottom":{"y":-36.96944545454546,"x":-164.88743636363634},"bottom":-36.96944545454546,"left":-164.88743636363634,"right":160.76359563636362,"top":71.392489545},
        "recordCount":0,
        "isFileCache":false,
        "tableName":null,
        "description":null,
        "name":"Rivers",
        "prjCoordSys":null,
        "isReadOnly":false,
        "charset":null,
        "encodeType":null,
        "dataSourceName":"World",
        "type":"LINE"},
    "minVisibleGeometrySize":0.4,
    "maxScale":0,
    "queryable":false});
    
    //测试fromJSON结果
    ok(info !== null,"not null");
    ok(info.bounds != null ,"info.bounds");
    ok(info.bounds.top == 71.392489545 ,"info.bounds.top");
    equal(info.caption, "Rivers@World","info.caption");
    equal(info.description, "","info.description");
    equal(info.queryable, false,"info.queryable");
    ok(info.subLayers == null,"info.subLayers");
    
    equal(info.name, "Rivers@World","info.name");
    equal(info.visible, true,"info.visible");
    equal(info.type, "UGC","info.type");
    equal(info.completeLineSymbolDisplayed, false,"info.completeLineSymbolDisplayed");
    equal(info.symbolScalable, false,"info.symbolScalable");
    equal(info.maxScale, 0,"info.maxScale");
    equal(info.minScale, 0,"info.minScale");
    equal(info.minVisibleGeometrySize, 0.4,"info.minVisibleGeometrySize");
    equal(info.opaqueRate, 100,"info.opaqueRate");
    equal(info.symbolScale, 0,"info.symbolScale");
    ok(info.datasetInfo != null,"info.datasetInfo");
    equal(info.displayFilter, "","info.displayFilter");
    ok(info.joinItems == null,"info.joinItems");
    equal(info.representationField, "","info.representationField");
    equal(info.ugcLayerType, "VECTOR","info.ugcLayerType");    

    
    //测试toServerJSONObject结果
    var jsonObj = info.toServerJSONObject();
    ok(jsonObj.bounds != null ,"jsonObj.bounds");
    ok(jsonObj.bounds.rightTop.y == 71.392489545 ,"jsonObj.bounds.rightTop.y");
    equal(jsonObj.caption, "Rivers@World","jsonObj.caption");
    equal(jsonObj.description, "","jsonObj.description");
    equal(jsonObj.queryable, false,"jsonObj.queryable");
    ok(jsonObj.subLayers == null,"jsonObj.subLayers");
    
    equal(jsonObj.name, "Rivers@World","jsonObj.name");
    equal(jsonObj.visible, true,"jsonObj.visible");
    equal(jsonObj.type, "UGC","jsonObj.type");
    equal(jsonObj.completeLineSymbolDisplayed, false,"jsonObj.completeLineSymbolDisplayed");
    equal(jsonObj.symbolScalable, false,"jsonObj.symbolScalable");
    equal(jsonObj.maxScale, 0,"jsonObj.maxScale");
    equal(jsonObj.minScale, 0,"jsonObj.minScale");
    equal(jsonObj.minVisibleGeometrySize, 0.4,"jsonObj.minVisibleGeometrySize");
    equal(jsonObj.opaqueRate, 100,"jsonObj.opaqueRate");
    equal(jsonObj.symbolScale, 0,"jsonObj.symbolScale");
    ok(jsonObj.datasetInfo != null,"jsonObj.datasetInfo");
    equal(jsonObj.displayFilter, "","jsonObj.displayFilter");
    ok(jsonObj.joinItems == null,"jsonObj.joinItems");
    equal(jsonObj.representationField, "","jsonObj.representationField");
    equal(jsonObj.ugcLayerType, "VECTOR","jsonObj.ugcLayerType");    

});