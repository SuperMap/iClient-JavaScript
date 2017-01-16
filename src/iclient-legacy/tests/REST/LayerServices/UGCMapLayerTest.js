module("UGCMapLayer");

test("TestContructor", function(){
    expect(15);
    var info = new SuperMap.REST.UGCMapLayer({
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
        symbolScale:1
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
});

test("TestDestroy", function(){
    expect(16);
    var info = new SuperMap.REST.UGCMapLayer({
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
        symbolScale:1
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
});