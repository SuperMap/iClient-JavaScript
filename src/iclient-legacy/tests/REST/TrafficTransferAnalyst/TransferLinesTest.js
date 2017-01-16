module("TransferLines");

test("Test-Constructor_destroy_fromJson", function() {
    expect(7);
    var line = new SuperMap.REST.TransferLine({
        lineID: '11',
        lineName: 'test',
        startStopIndex: 2,
        startStopName: 'test',
        endStopIndex: 5,
        endStopName: 'test'
    });
	
	var lines = new SuperMap.REST.TransferLines({
		lineItems: [line]
	});
    
    ok(line !== null, 'line not null');
	ok(lines !== null, 'lines not null');
	equal(lines.lineItems.length, 1, "lines.lineItems.length");
    deepEqual(lines.lineItems[0], line, 'lines.lineItems[0]');
	
	line.destroy();
	lines.destroy();
	ok(lines.lineItems === null, "lines.lineItems");
	
	var undefined = SuperMap.REST.TransferLines.fromJson();
    ok(typeof(undefined) === 'undefined', 'undefined');
    
    var params = {
        lineItems: line
    };
    
    var info = SuperMap.REST.TransferLine.fromJson(params);
    ok(info !== null, 'null');
});




