module("TransferGuide");

test("TestConstructor", function() {
    expect(6);
    var items = [new SuperMap.REST.TransferGuideItem(),
                 new SuperMap.REST.TransferGuideItem()];
    var guide = new SuperMap.REST.TransferGuide({
        count: 10,
        items: items,
        totalDistance: 10,
        totalWeight: 10,
        transferCount: 10
    });
    
    ok(guide !== null, 'null');
    equal(guide.count, 10, 'guide.count');
    deepEqual(guide.items, items, 'guide.items');
    equal(guide.totalDistance, 10, 'guide.totalDistance');
    deepEqual(guide.totalWeight, 10, 'guide.totalWeight');
    equal(guide.transferCount, 10, 'guide.transferCount');
});

test("TestDestroy", function() {
    expect(6);
    var items = [new SuperMap.REST.TransferGuideItem(),
                 new SuperMap.REST.TransferGuideItem()];
    var guide = new SuperMap.REST.TransferGuide({
        count: 10,
        items: items,
        totalDistance: 10,
        totalWeight: 10,
        transferCount: 10
    });
    
    ok(guide !== null, 'null');
    guide.destroy();
    ok(guide.count === null, 'null');
    ok(guide.items === null, 'null');
    ok(guide.totalDistance === null, 'null');
    ok(guide.totalWeight === null, 'null');
    ok(guide.transferCount === null, 'null');
});

test("TestFromJson", function() {
    expect(2);
    var undefined = SuperMap.REST.TransferGuide.fromJson();
    ok(typeof(undefined) === 'undefined', 'undefined');
    var p = new SuperMap.Geometry.Point(2,2);
	var line = new SuperMap.Geometry.LineString([p]);
    var items = [new SuperMap.REST.TransferGuideItem({
		lineType: 1,
        distance: 10,
        endIndex: 10,
		startIndex: 10,
		startStopName: "test",
		endStopName: 'test',
        isWalking: false,
        passStopCount: 10,
        startPosition:p,
		endPosition: p,
        route: line,
		lineName:"test"
		}),
        new SuperMap.REST.TransferGuideItem({
			lineType: 1,
			distance: 10,
			endIndex: 10,
			startIndex: 10,
			startStopName: "test",
			endStopName: 'test',
			isWalking: false,
			passStopCount: 10,
			startPosition:p,
			endPosition: p,
			route: line,
			lineName:"test"
		})];
    var params = {
        count: 10,
        items: items,
        totalDistance: 10,
        totalWeight: 10,
        transferCount: 10
    };
    var guide = SuperMap.REST.TransferGuide.fromJson(params);
    ok(guide !== null, 'null');
});




