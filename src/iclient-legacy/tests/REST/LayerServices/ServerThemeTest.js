module("ServerTheme");

test("TestContructor", function(){
    expect(22);
    var b = new SuperMap.Bounds(1,2,3,4),
    set = new SuperMap.REST.DatasetInfo(),
    items = new SuperMap.REST.JoinItem(),
    theme = new SuperMap.REST.Theme(),
    info = new SuperMap.REST.ServerTheme({
        bounds: b,
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
        joinItems:items,
        representationField:'',
        ugcLayerType:'vector',
        theme:theme,
    });
    
    ok(info !== null,"not null");
    deepEqual(info.bounds, b,"info.bounds");
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
    deepEqual(info.joinItems, items,"info.joinItems");
    equal(info.representationField, "","info.representationField");
    equal(info.ugcLayerType, "vector","info.ugcLayerType");
    deepEqual(info.theme, theme,"info.theme");
});

test("TestDestroy", function(){
    expect(22);
    var b = new SuperMap.Bounds(1,2,3,4),
    set = new SuperMap.REST.DatasetInfo(),
    items = new SuperMap.REST.JoinItem(),
    theme = new SuperMap.REST.Theme(),
    info = new SuperMap.REST.ServerTheme({
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
        theme:theme
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
    ok(info.theme === null,"info.theme");
});

test("test_fromJSON_toServerJSONObject", function(){
    var info = new SuperMap.REST.ServerTheme();
    info.fromJson({
        "bounds": {
            "bottom": -41.210395812988,
            "left": -99.127571105957,
            "leftBottom": {
                "x": -99.127571105957,
                "y": -41.210395812988
            },
            "right": 175.1449432373,
            "rightTop": {
                "x": 175.1449432373,
                "y": 64.313262939453
            },
            "top": 64.313262939453
        },
        "caption": "layer-4798722301270701937",
        "completeLineSymbolDisplayed": false,
        "datasetInfo": {
            "bounds": {
                "bottom": -41.210395812988,
                "left": -99.127571105957,
                "leftBottom": {
                    "x": -99.127571105957,
                    "y": -41.210395812988
                },
                "right": 175.1449432373,
                "rightTop": {
                    "x": 175.1449432373,
                    "y": 64.313262939453
                },
                "top": 64.313262939453
            },
            "charset": null,
            "dataSourceName": "World",
            "description": null,
            "encodeType": null,
            "isFileCache": false,
            "isReadOnly": false,
            "name": "Capitals",
            "prjCoordSys": null,
            "recordCount": 0,
            "tableName": null,
            "type": "POINT"
        },
        "description": "",
        "displayFilter": null,
        "joinItems": null,
        "maxScale": 0,
        "minScale": 0,
        "minVisibleGeometrySize": 0.4,
        "name": "Capitals@World",
        "opaqueRate": 100,
        "queryable": false,
        "representationField": "",
        "subLayers": {},
        "symbolScalable": false,
        "symbolScale": 0,
        "theme": {
            "alongLine": true,
            "alongLineDirection": "LEFT_BOTTOM_TO_RIGHT_TOP",
            "angleFixed": false,
            "backStyle": {
                "fillBackColor": {
                    "blue": 255,
                    "green": 255,
                    "red": 255
                },
                "fillBackOpaque": false,
                "fillForeColor": {
                    "blue": 0,
                    "green": 0,
                    "red": 255
                },
                "fillGradientAngle": 0,
                "fillGradientMode": "NONE",
                "fillGradientOffsetRatioX": 0,
                "fillGradientOffsetRatioY": 0,
                "fillOpaqueRate": 100,
                "fillSymbolID": 0,
                "lineColor": {
                    "blue": 0,
                    "green": 0,
                    "red": 0
                },
                "lineSymbolID": 0,
                "lineWidth": 1,
                "markerAngle": 0,
                "markerSize": 1,
                "markerSymbolID": 0
            },
            "flowEnabled": false,
            "items": null,
            "labelBackShape": "NONE",
            "labelExpression": "CAPITAL",
            "labelOverLengthMode": "NONE",
            "labelRepeatInterval": 0,
            "leaderLineDisplayed": false,
            "leaderLineStyle": {
                "fillBackColor": {
                    "blue": 255,
                    "green": 255,
                    "red": 255
                },
                "fillBackOpaque": false,
                "fillForeColor": {
                    "blue": 0,
                    "green": 0,
                    "red": 255
                },
                "fillGradientAngle": 0,
                "fillGradientMode": "NONE",
                "fillGradientOffsetRatioX": 0,
                "fillGradientOffsetRatioY": 0,
                "fillOpaqueRate": 100,
                "fillSymbolID": 0,
                "lineColor": {
                    "blue": 0,
                    "green": 0,
                    "red": 0
                },
                "lineSymbolID": 0,
                "lineWidth": 1,
                "markerAngle": 0,
                "markerSize": 1,
                "markerSymbolID": 0
            },
            "matrixCells": null,
            "maxLabelLength": -1,
            "maxTextHeight": 0,
            "maxTextWidth": 0,
            "memoryData": {
                "东京": "dongjing",
                "北京": "beijing",
                "新德里": "xindeli"
            },
            "minTextHeight": 0,
            "minTextWidth": 0,
            "numericPrecision": 0,
            "offsetFixed": false,
            "offsetX": "0.0",
            "offsetY": "0.0",
            "overlapAvoided": true,
            "rangeExpression": "",
            "repeatIntervalFixed": false,
            "repeatedLabelAvoided": false,
            "smallGeometryLabeled": false,
            "type": "LABEL",
            "uniformMixedStyle": null,
            "uniformStyle": {
                "align": "BASELINECENTER",
                "backColor": {
                    "blue": 255,
                    "green": 255,
                    "red": 255
                },
                "backOpaque": false,
                "bold": false,
                "fontHeight": 6,
                "fontName": "Times New Roman",
                "fontScale": 0,
                "fontWeight": 400,
                "fontWidth": 0,
                "foreColor": {
                    "blue": 10,
                    "green": 250,
                    "red": 10
                },
                "italic": false,
                "italicAngle": 0,
                "opaqueRate": 0,
                "outline": false,
                "rotation": 0,
                "shadow": false,
                "sizeFixed": true,
                "strikeout": false,
                "underline": false
            }
        },
        "themeElementPosition": null,
        "type": "UGC",
        "ugcLayerType": "THEME",
        "visible": true
    });
    ok(info != null, "info != null");
    ok(info.bounds != null,"info.bounds");
    equal(info.caption, "layer-4798722301270701937","info.cattion");
    equal(info.description, "","info.description");
    equal(info.queryable, false,"info.queryable");
    ok(info.subLayers != null,"info.subLayers");
    equal(info.name, "Capitals@World","info.name");
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
    equal(info.displayFilter, null,"info.displayFilter");
    equal(info.representationField, "","info.representationField");
    equal(info.ugcLayerType, "THEME","info.ugcLayerType");
    ok(info.theme != null,"info.theme");
    
    var jsonObj = info.toServerJSONObject();
    ok(jsonObj != null, "jsonObj != null");
    ok(jsonObj.bounds != null,"jsonObj.bounds");
    equal(jsonObj.caption, "layer-4798722301270701937","jsonObj.cattion");
    equal(jsonObj.description, "","jsonObj.description");
    equal(jsonObj.queryable, false,"jsonObj.queryable");
    ok(jsonObj.subLayers != null,"jsonObj.subLayers");
    equal(jsonObj.name, "Capitals@World","jsonObj.name");
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
    equal(jsonObj.displayFilter, null,"jsonObj.displayFilter");
    equal(jsonObj.representationField, "","jsonObj.representationField");
    equal(jsonObj.ugcLayerType, "THEME","jsonObj.ugcLayerType");
    ok(jsonObj.theme != null,"jsonObj.theme");
    

});