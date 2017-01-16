module("TransferSolutionParameters");

test("TestConstructor_destroy_toJson", function() {
    expect(13);
    var params = new SuperMap.REST.TransferSolutionParameters({
        solutionCount: 20,
        transferTactic: SuperMap.REST.TransferTactic.LESS_TIME,
		transferPreference: SuperMap.REST.TransferPreference.NONE,
        walkingRatio: 20,
        points: [10,20]
    });
    
    ok(params !== null, 'null');
    equal(params.solutionCount, 20, 'params.solutionCount');
    equal(params.transferTactic, 'LESS_TIME', 'params.transferTactic');
	equal(params.transferPreference, 'NONE', 'params.transferPreference');
    deepEqual(params.points, [10,20], 'params.points');
    equal(params.walkingRatio, 20, 'params.walkingRatio');
	
	params.destroy();
    ok(params.solutionCount === null, 'null');
    ok(params.transferTactic === null, 'null');
	ok(params.transferPreference === null, 'null');
    ok(params.walkingRatio === null, 'null');
    ok(params.points === null, 'null');
	
	var undefined = SuperMap.REST.TransferSolutionParameters.toJson();
    ok(typeof(undefined) === 'undefined', 'undefined');
    
    var params = {
        solutionCount: 20,
        transferTactic: SuperMap.REST.TransferTactic.LESS_TIME,
		transferPreference: SuperMap.REST.TransferPreference.NONE,
        walkingRatio: 20,
        points: [10,20]
    };
    var params = SuperMap.REST.TransferSolutionParameters.toJson(params);
    ok(params !== null, 'null');
});




