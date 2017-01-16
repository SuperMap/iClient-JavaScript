module("Grid");

test("TestContructor", function(){
    expect(34);
    var b = new SuperMap.Bounds(1,2,3,4),
    set = new SuperMap.REST.DatasetInfo(),
    items = new SuperMap.REST.JoinItem(),
    colors = new SuperMap.REST.ServerColor(),
    style = new SuperMap.REST.ServerStyle(),
    info = new SuperMap.REST.Grid({
        bounds: b,
        caption: "china",
        description: "",
        queryable: false,
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
        joinItems:items,
        representationField:'',
        ugcLayerType:'vector',
        brightness:1,
        colorGradientType:SuperMap.REST.ColorGradientType.BLACK_WHITE,
        colors:colors,
        contrast:1,
        dashStyle:style,
        gridType:SuperMap.REST.GridType.CROSS,
        horizontalSpacing:1,
        sizeFixed:true,
        solidStyle:style,
        specialColor:colors,
        specialValue:1,
        specialValueTransparent:true,
        verticalSpacing:1
    });
    
    ok(info !== null,"not null");
    deepEqual(info.bounds, b,"info.bounds");
    equal(info.caption, "china","info.cattion");
    equal(info.description, "","info.description");
    equal(info.queryable, false,"info.queryable");
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
    deepEqual(info.joinItems, items,"info.joinItems");
    equal(info.representationField, "","info.representationField");
    equal(info.ugcLayerType, "vector","info.ugcLayerType");
    equal(info.brightness, 1,"info.brightness");
    deepEqual(info.colorGradientType, "BLACKWHITE","info.colorGradientType");
    deepEqual(info.colors, colors,"info.colors");
    equal(info.contrast, 1,"info.contrast");
    deepEqual(info.dashStyle, style,"info.dashStyle");
    equal(info.gridType, "CROSS","info.gridType");
    equal(info.horizontalSpacing, 1,"info.horizontalSpacing");
    equal(info.sizeFixed, true,"info.sizeFixed");
    deepEqual(info.solidStyle, style,"info.solidStyle");
    deepEqual(info.specialColor, colors,"info.specialColor");
    equal(info.specialValue, 1,"info.specialValue");
    equal(info.specialValueTransparent, true,"info.specialValueTransparent");
    equal(info.verticalSpacing, 1,"info.verticalSpacing");
});

test("TestDestroy", function(){
    expect(34);
    var b = new SuperMap.Bounds(1,2,3,4),
    set = new SuperMap.REST.DatasetInfo(),
    items = new SuperMap.REST.JoinItem(),
    colors = new SuperMap.REST.ServerColor(),
    style = new SuperMap.REST.ServerStyle(),
    info = new SuperMap.REST.Grid({
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
        joinItems:items,
        representationField:'',
        ugcLayerType:'vector',
        brightness:1,
        colorGradientType:SuperMap.REST.ColorGradientType.BLACK_WHITE,
        colors:colors,
        contrast:1,
        dashStyle:style,
        gridType:SuperMap.REST.GridType.CROSS,
        horizontalSpacing:1,
        sizeFixed:true,
        solidStyle:style,
        specialColor:colors,
        specialValue:1,
        specialValueTransparent:true,
        verticalSpacing:1
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
    ok(info.joinItems === null,"info.joinItems");
    ok(info.representationField === null,"info.representationField");
    ok(info.ugcLayerType === null,"info.ugcLayerType");
    ok(info.brightness === null,"info.brightness");
    ok(info.colorGradientType === null,"info.colorGradientType");
    ok(info.colors === null,"info.colors");
    ok(info.contrast === null,"info.contrast");
    ok(info.dashStyle === null,"info.dashStyle");
    ok(info.gridType === null,"info.gridType");
    ok(info.horizontalSpacing === null,"info.horizontalSpacing");
    ok(info.sizeFixed === null,"info.sizeFixed");
    ok(info.solidStyle === null,"info.solidStyle");
    ok(info.specialColor === null,"info.specialColor");
    ok(info.specialValue === null,"info.specialValue");
    ok(info.specialValueTransparent === null,"info.specialValueTransparent");
    ok(info.verticalSpacing === null,"info.verticalSpacing");
});

test("Test_fromJSON_toServerJSONObject", function(){
    var info = new SuperMap.REST.Grid();
    info.fromJson({
    "specialColor":{
        "red":255,
        "blue":255,
        "green":255},
    "symbolScalable":false,
    "visible":false,
    "horizontalSpacing":0,
    "type":"UGC",
    "representationField":"",
    "joinItems":null,
    "ugcLayerType":"GRID",
    "completeLineSymbolDisplayed":false,
    "contrast":0,
    "brightness":0,
    "sizeFixed":false,
    "subLayers":{},
    "displayFilter":"",
    "specialValue":-9999,
    "description":"",
    "name":"JingjinTerrain@Jingjin",
    "verticalSpacing":0,
    "maxScale":0,
    "solidStyle":null,
    "dashStyle":null,
    "colorGradientType":null,
    "colors":null,
    "symbolScale":0,
    "caption":"JingjinTerrain@Jingjin",
    "gridType":"GRID",
    "opaqueRate":50,
    "bounds":{"rightTop":{"y":41.040833371,"x":118.0716665038},"leftBottom":{"y":38.56666680399909,"x":115.4383332758},"bottom":38.56666680399909,"left":115.4383332758,"right":118.0716665038,"top":41.040833371},
    "minScale":0,
    "specialValueTransparent":false,
    "datasetInfo":{
        "bounds":{"rightTop":{"y":41.040833371,"x":118.0716665038},"leftBottom":{"y":38.56666680399909,"x":115.4383332758},"bottom":38.56666680399909,"left":115.4383332758,"right":118.0716665038,"top":41.040833371},
        "recordCount":0,
        "isFileCache":false,
        "tableName":null,
        "description":null,
        "name":"JingjinTerrain",
        "prjCoordSys":null,
        "isReadOnly":false,
        "charset":null,
        "encodeType":null,
        "dataSourceName":"Jingjin",
        "type":"GRID"},
    "minVisibleGeometrySize":0,
    "queryable":false,
    "type":"UGC"
    });
    //测试fromJSON结果
    ok(info !== null,"not null");
    ok(info.bounds != null ,"info.bounds");
    ok(info.bounds.top == 41.040833371 ,"info.bounds.top");
    equal(info.caption, "JingjinTerrain@Jingjin","info.cattion");
    equal(info.description, "","info.description");
    equal(info.queryable, false,"info.queryable");
    ok(info.subLayers != null,"info.subLayers");
    equal(info.subLayers.layers, undefined, "info.subLayers.layers")
    
    equal(info.name, "JingjinTerrain@Jingjin","info.name");
    equal(info.visible, false,"info.visible");
    equal(info.type, "UGC","info.type");
    equal(info.completeLineSymbolDisplayed, false,"info.completeLineSymbolDisplayed");
    equal(info.symbolScalable, false,"info.symbolScalable");
    equal(info.maxScale, 0,"info.maxScale");
    equal(info.minScale, 0,"info.minScale");
    equal(info.minVisibleGeometrySize, 0,"info.minVisibleGeometrySize");
    equal(info.opaqueRate, 50,"info.opaqueRate");
    equal(info.symbolScale, 0,"info.symbolScale");
    ok(info.datasetInfo != null,"info.datasetInfo");
    equal(info.displayFilter, "","info.displayFilter");
    ok(info.joinItems == null,"info.joinItems");
    equal(info.representationField, "","info.representationField");
    equal(info.ugcLayerType, "GRID","info.ugcLayerType");
    equal(info.brightness, 0,"info.brightness");
    ok(info.colorGradientType == null,"info.colorGradientType");
    ok(info.colors == null,"info.colors");
    equal(info.contrast, 0,"info.contrast");
    ok(info.dashStyle ==  null,"info.dashStyle");
    ok(info.solidStyle == null,"info.solidStyle");
    equal(info.gridType, "GRID","info.gridType");
    equal(info.horizontalSpacing, 0,"info.horizontalSpacing");
    equal(info.sizeFixed, false,"info.sizeFixed");
    ok(info.specialColor != null,"info.specialColor");
    equal(info.specialValue, -9999,"info.specialValue");
    equal(info.specialValueTransparent, false,"info.specialValueTransparent");
    equal(info.verticalSpacing, 0,"info.verticalSpacing");
    
    var jsonObj = info.toServerJSONObject();
    ok(jsonObj !== null,"not null");
    ok(jsonObj.bounds != null ,"jsonObj.bounds");
    ok(jsonObj.bounds.rightTop.y == 41.040833371 ,"jsonObj.bounds.rightTop.y");
    equal(jsonObj.caption, "JingjinTerrain@Jingjin","jsonObj.cattion");
    equal(jsonObj.description, "","jsonObj.description");
    equal(jsonObj.queryable, false,"jsonObj.queryable");
    ok(jsonObj.subLayers != null,"jsonObj.subLayers");
    equal(jsonObj.subLayers.layers, undefined, "jsonObj.subLayers.layers")
    
    equal(jsonObj.name, "JingjinTerrain@Jingjin","jsonObj.name");
    equal(jsonObj.visible, false,"jsonObj.visible");
    equal(jsonObj.type, "UGC","jsonObj.type");
    equal(jsonObj.completeLineSymbolDisplayed, false,"jsonObj.completeLineSymbolDisplayed");
    equal(jsonObj.symbolScalable, false,"jsonObj.symbolScalable");
    equal(jsonObj.maxScale, 0,"jsonObj.maxScale");
    equal(jsonObj.minScale, 0,"jsonObj.minScale");
    equal(jsonObj.minVisibleGeometrySize, 0,"jsonObj.minVisibleGeometrySize");
    equal(jsonObj.opaqueRate, 50,"jsonObj.opaqueRate");
    equal(jsonObj.symbolScale, 0,"jsonObj.symbolScale");
    ok(jsonObj.datasetInfo != null,"jsonObj.datasetInfo");
    equal(jsonObj.displayFilter, "","jsonObj.displayFilter");
    ok(jsonObj.joinItems == null,"jsonObj.joinItems");
    equal(jsonObj.representationField, "","jsonObj.representationField");
    equal(jsonObj.ugcLayerType, "GRID","jsonObj.ugcLayerType");
    equal(jsonObj.brightness, 0,"jsonObj.brightness");
    ok(jsonObj.colorGradientType == null,"jsonObj.colorGradientType");
    ok(jsonObj.colors == null,"jsonObj.colors");
    equal(jsonObj.contrast, 0,"jsonObj.contrast");
    ok(jsonObj.dashStyle == null,"jsonObj.dashStyle");
    ok(jsonObj.solidStyle == null,"jsonObj.solidStyle");
    equal(jsonObj.gridType, "GRID","jsonObj.gridType");
    equal(jsonObj.horizontalSpacing, 0,"jsonObj.horizontalSpacing");
    equal(jsonObj.sizeFixed, false,"jsonObj.sizeFixed");
    ok(jsonObj.specialColor != null,"jsonObj.specialColor");
    equal(jsonObj.specialValue, -9999,"jsonObj.specialValue");
    equal(jsonObj.specialValueTransparent, false,"jsonObj.specialValueTransparent");
    equal(jsonObj.verticalSpacing, 0,"jsonObj.verticalSpacing");
    
    //测试toServerJSONObject结果
});