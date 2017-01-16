module("DataSetInfo");

test("TestContructor_toServerJSONObject", function(){
    expect(18);
    info = new SuperMap.REST.DatasetInfo({
        bounds: {"rightTop":{"y":89.99999999999997,"x":180},"leftBottom":{"y":-89.99999999999997,"x":-180},"bottom":-89.99999999999997,"left":-180,"right":180,"top":89.99999999999997},
        dataSourceName: "china",
        description: "",
        encodeType: "vector",
        isReadOnly: true,
        name: "",
        prjCoordSys: "EPSG:4326",
        tableName: "",
        type: "UGC"
    });
    
    ok(info !== null,"not null");
    equal(info.dataSourceName, "china","info.dataSourceName");
    equal(info.description, "","info.description");
    equal(info.encodeType, "vector","info.encodeType");
    equal(info.isReadOnly, true,"info.isReadOnly");
    equal(info.name, "","info.name");
    equal(info.prjCoordSys, "EPSG:4326","info.prjCoordSys");
    equal(info.tableName, "","info.tableName");
    equal(info.type, "UGC","info.type");
    
    var jsonObj = info.toServerJSONObject();
    ok(jsonObj != null, "jsonObj != null");
    equal(jsonObj.dataSourceName, "china","jsonObj.dataSourceName");
    equal(jsonObj.description, "","jsonObj.description");
    equal(jsonObj.encodeType, "vector","jsonObj.encodeType");
    equal(jsonObj.isReadOnly, true,"jsonObj.isReadOnly");
    equal(jsonObj.name, "","jsonObj.name");
    equal(jsonObj.prjCoordSys, "EPSG:4326","jsonObj.prjCoordSys");
    equal(jsonObj.tableName, "","jsonObj.tableName");
    equal(jsonObj.type, "UGC","jsonObj.type");
});

test("TestDestroy", function(){
    expect(9);
    info = new SuperMap.REST.DatasetInfo({
        bounds: null,
        dataSourceName: "china",
        description: "",
        encodeType: "vector",
        isReadOnly: true,
        name: "",
        prjCoordSys: "EPSG:4326",
        tableName: "",
        type: "UGC"
    });
    
    ok(info != null,"not null");
    info.destroy();
    ok(info.dataSourceName === null,"info.dataSourceName");
    ok(info.description === null,"info.description");
    ok(info.encodeType === null,"info.encodeType");
    ok(info.isReadOnly === null,"info.isReadOnly");
    ok(info.name === null,"info.name");
    ok(info.prjCoordSys === null,"info.prjCoordSys");
    ok(info.tableName === null,"info.tableName");
    ok(info.type === null,"info.type");
});