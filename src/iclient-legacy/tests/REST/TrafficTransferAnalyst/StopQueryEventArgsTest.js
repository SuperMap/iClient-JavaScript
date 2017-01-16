module("StopQueryEventArgs");

test("TestConstructor", function() {
    expect(3);
    var result = new SuperMap.REST.StopQueryResult();
    var event = new SuperMap.REST.StopQueryEventArgs(result, 'originResult');
    
    ok(event !== null, 'null');
    deepEqual(event.result, result, 'event.result');
    equal(event.originResult, 'originResult', 'event.originResult');
});

test("TestDestroy", function() {
    expect(3);
    var result = new SuperMap.REST.StopQueryResult();
    var event = new SuperMap.REST.StopQueryEventArgs(result, 'originResult');
    
    ok(event !== null, 'null');
    event.destroy();
    ok(event.result === null, 'null');
    ok(event.originResult === null, 'null');
});




