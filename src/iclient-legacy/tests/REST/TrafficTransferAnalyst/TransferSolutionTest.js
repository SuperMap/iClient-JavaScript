module("TransferSolution");

test("Test-Constructor_destroy_fromJson", function() {
    expect(11);
    var line = new SuperMap.REST.TransferLine({
        lineID: '11',
        lineName: 'test',
        startStopIndex: 2,
        startStopName: 'test',
        endStopIndex: 5,
        endStopName: 'test'
    });
	
	var lines = new SuperMap.REST.TransferSolution({
		lineItems: [line]
	});
	
	var solution = new SuperMap.REST.TransferSolution({
		transferCount:0,
		linesItems:[lines]
	});
    
    ok(line !== null, 'line not null');
	ok(lines !== null, 'lines not null');
	ok(solution !== null, 'solution not null');
	equal(lines.lineItems.length, 1, "lines.lineItems.length");
	equal(solution.linesItems[0].lineItems.length, 1, "solution.linesItems[0].lineItems.length");
    deepEqual(lines.lineItems[0], line, 'lines.lineItems[0]');
	deepEqual(solution.linesItems[0], lines, 'solution.linesItems[0]');
	
	line.destroy();
	lines.destroy();
	solution.destroy();
	ok(solution.linesItems === null, "solution.linesItems");
	ok(solution.transferCount === null, "solution.transferCount");
	
	var undefined = SuperMap.REST.TransferSolution.fromJson();
    ok(typeof(undefined) === 'undefined', 'undefined');
    
    var params = {
        solutionItems: [lines]
    };
    
    var info = SuperMap.REST.TransferSolution.fromJson(params);
    ok(info !== null, 'null');
});




