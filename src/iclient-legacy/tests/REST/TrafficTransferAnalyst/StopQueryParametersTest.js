module("StopQueryParameters");

test("TestConstructor", function() {
    expect(3);
    var info = new SuperMap.REST.StopQueryParameters({
        keyWord: '天安门',
        returnPosition: true
    });
    
    ok(info !== null, 'null');
    equal(info.keyWord, '天安门', 'info.keyWord');
    equal(info.returnPosition, true, 'info.returnPosition');
});

test("TestDestroy", function() {
    expect(3);
    var info = new SuperMap.REST.StopQueryParameters({
        keyWord: '天安门',
        returnPosition: true
    });
    
    ok(info !== null, 'null');
    info.destroy();
    ok(info.keyWord === null, 'null');
    ok(info.returnPosition === null, 'null');
});