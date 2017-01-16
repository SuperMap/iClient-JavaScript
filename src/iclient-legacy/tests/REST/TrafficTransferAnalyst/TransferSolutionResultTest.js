module("TransferSolutionResult");

test("TestConstructor_destroy_fromJson", function() {
    expect(7);
    var guide =  new SuperMap.REST.TransferGuide({
		items: [new SuperMap.REST.TransferGuideItem(), new SuperMap.REST.TransferGuideItem()]
	});
	var solution = new SuperMap.REST.TransferSolution();
    var res = new SuperMap.REST.TransferSolutionResult({
        transferGuide: guide,
		transferSolutions: [solution]
    });
    
    ok(res !== null, 'null');
    deepEqual(res.transferGuide, guide, 'res.TransferGuide');
	deepEqual(res.transferSolutions, [solution], 'res.transferSolutions');
	
	res.destroy();
	ok(res.transferGuide === null, 'null');
	ok(res.transferSolutions === null, 'null');
	
	var undefined = SuperMap.REST.TransferSolutionResult.fromJson();
    ok(typeof(undefined) === 'undefined', 'undefined');

    var params = {
        transferGuide: guide,
		transferSolutions: [solution]
    };
    var res = SuperMap.REST.TransferSolutionResult.fromJson(params);
    ok(res !== null, 'null');
});




