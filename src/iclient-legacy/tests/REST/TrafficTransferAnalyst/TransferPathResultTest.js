module("TransferPathResult");

test("TestConstructor_destroy_fromJson", function() {
    expect(5);
	var guide = new SuperMap.REST.TransferGuide()
    var res = new SuperMap.REST.TransferPathResult({
        transferGuide: guide
    });
    
    ok(res !== null, 'null');
    deepEqual(res.transferGuide, guide, 'res.TransferGuide');
	
	res.destroy();
	ok(res.transferGuide === null, 'null');
	
	var undefined = SuperMap.REST.TransferPathResult.fromJson();
    ok(typeof(undefined) === 'undefined', 'undefined');
    
    var params = {
        count: 2,
		items:[new SuperMap.REST.TransferGuideItem(),new SuperMap.REST.TransferGuideItem()],
		totalDistance: 100,
		transferCount: 1
    };
    var res = SuperMap.REST.TransferPathResult.fromJson(params);
    ok(res !== null, 'null');
});




