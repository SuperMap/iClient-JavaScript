module("TransferStopInfo");

test("TestConstructor", function() {
    expect(6);
    var info = new SuperMap.REST.TransferStopInfo({
        alias: 'test',
        id: '11111',
        name: 'test',
        position: {x: 20, y: 30},
        stopID: '110005620'
    });
    
    ok(info !== null, 'null');
    equal(info.alias, 'test', 'info.alias');
    equal(info.id, '11111', 'info.id');
    equal(info.name, 'test', 'info.name');
    deepEqual(info.position, {x: 20, y: 30}, 'info.id');
    equal(info.stopID, '110005620', 'info.stopID');
});

test("TestDestroy", function() {
    expect(6);
    var info = new SuperMap.REST.TransferStopInfo({
        alias: 'test',
        id: '11111',
        name: 'test',
        position: {x: 20, y: 30},
        stopID: '110005620'
    });
    
    ok(info !== null, 'null');
    info.destroy();
    ok(info.alias === null, 'null');
    ok(info.id === null, 'null');
    ok(info.name === null, 'null');
    ok(info.position === null, 'null');
    ok(info.stopID === null, 'null');
});

test("TestFromJson", function() {
    expect(2);
    var undefined = SuperMap.REST.TransferStopInfo.fromJson();
    ok(typeof(undefined) === 'undefined', 'undefined');
    
    var params = {
        alias: 'test',
        id: '11111',
        name: 'test',
        position: {x: 20, y: 30},
        stopID: '110005620'
    };
    var info = SuperMap.REST.TransferStopInfo.fromJson(params);
    ok(info !== null, 'null');
});




