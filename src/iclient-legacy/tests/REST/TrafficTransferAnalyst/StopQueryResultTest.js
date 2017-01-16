module("StopQueryResult");

test("TestConstructor", function() {
    expect(2);
    var infos = [
        new SuperMap.REST.TransferStopInfo(),
        new SuperMap.REST.TransferStopInfo()
    ];
    var res = new SuperMap.REST.StopQueryResult({
        transferStopInfos: infos
    });
    
    ok(res !== null, 'null');
    deepEqual(res.transferStopInfos, infos, 'res.TransferStopInfos');
});

test("TestDestroy", function() {
    expect(2);
    var infos = [
        new SuperMap.REST.TransferStopInfo(),
        new SuperMap.REST.TransferStopInfo()
    ];
    var res = new SuperMap.REST.StopQueryResult({
        transferStopInfos: infos
    });
    
    ok(res !== null, 'null');
    res.destroy();
    ok(res.transferStopInfos === null, 'null');
});

test("TestFromJson", function() {
    expect(2);
    var undefined = SuperMap.REST.StopQueryResult.fromJson();
    ok(typeof(undefined) === 'undefined', 'undefined');
    
    var infos = [
        new SuperMap.REST.TransferStopInfo({
            alias: 'test',
            id: '11111',
            name: 'test',
            position: {x: 20, y: 30},
            stopID: '110005620'
        }),
        new SuperMap.REST.TransferStopInfo({
            alias: 'test',
            id: '11111',
            name: 'test',
            position: {x: 20, y: 30},
            stopID: '110005620'
        }),
    ];
    var res = SuperMap.REST.StopQueryResult.fromJson(infos);
    ok(res !== null, 'null');
});




