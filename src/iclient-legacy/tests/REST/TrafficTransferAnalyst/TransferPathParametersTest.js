module("TransferPathParameters");

test("TestConstructor_destroy_toJson", function() {
    expect(7);
    var params = new SuperMap.REST.TransferPathParameters({
        transferLines:[{"lineID":27,"startStopIndex":3,"endStopIndex":4},{"lineID":11,"startStopIndex":5,"endStopIndex":9}],
        points: [10,20]
    });
    
    ok(params !== null, 'null');
    deepEqual(params.points, [10,20], 'params.points');
    deepEqual(params.transferLines, [{"lineID":27,"startStopIndex":3,"endStopIndex":4},{"lineID":11,"startStopIndex":5,"endStopIndex":9}], 'params.walkingRatio');
	
	params.destroy();
	ok(params.transferLines === null, 'null');
    ok(params.points === null, 'null');
	
	var undefined = SuperMap.REST.TransferPathParameters.toJson();
    ok(typeof(undefined) === 'undefined', 'undefined');
    
    var params = {
        transferLines:[{"lineID":27,"startStopIndex":3,"endStopIndex":4},{"lineID":11,"startStopIndex":5,"endStopIndex":9}],
        points: [10,20]
    };
    var params = SuperMap.REST.TransferPathParameters.toJson(params);
    ok(params !== null, 'null');
});




