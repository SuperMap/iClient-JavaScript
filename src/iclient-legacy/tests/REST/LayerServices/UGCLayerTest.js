module("UGCLayer");

test("TestContructor", function(){
    expect(8);
    var b = new SuperMap.Bounds(1,2,3,4),
    info = new SuperMap.REST.UGCLayer({
        bounds: null,
        caption: "china",
        description: "",
        queryable: "vector",
        subLayers: [],
        name: "",
        visible: true,
        type: "UGC"
    });
    
    ok(info !== null,"not null");
    equal(info.caption, "china","info.cattion");
    equal(info.description, "","info.description");
    equal(info.queryable, "vector","info.queryable");
    deepEqual(info.subLayers, [],"info.subLayers");
    equal(info.name, "","info.name");
    equal(info.visible, true,"info.visible");
    equal(info.type, "UGC","info.type");
});

test("TestDestroy", function(){
    expect(9);
    var b = new SuperMap.Bounds(1,2,3,4),
    info = new SuperMap.REST.UGCLayer({
        bounds: null,
        caption: "china",
        description: "",
        queryable: "vector",
        subLayers: [],
        name: "",
        visible: true,
        type: "UGC"
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
});