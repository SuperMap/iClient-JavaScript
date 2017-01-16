module("TransferPathEventArgs");

test("TestConstructor_destroy", function() {
    expect(5);
    var result = new SuperMap.REST.TransferPathResult();
    var event = new SuperMap.REST.TransferPathEventArgs(result, 'originResult');
    
    ok(event !== null, 'null');
    deepEqual(event.result, result, 'event.result');
    equal(event.originResult, 'originResult', 'event.originResult');
	
	event.destroy();
    ok(event.result === null, 'null');
    ok(event.originResult === null, 'null');
});




