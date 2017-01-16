module("TransferGuideItem");

test("TestConstructor", function() {
    expect(12);
    
    var p = {"x":2,"y":3};
    var p1 = {"x":3,"y":4};
    var points = [new SuperMap.Geometry.Point(4933.319287022352, -3337.3849141502124),
                  new SuperMap.Geometry.Point(4960.9674060199022, -3349.3316322355736),
                  new SuperMap.Geometry.Point(5006.0235999418364, -3358.8890067038628),
                  new SuperMap.Geometry.Point(5075.3145648369318, -3378.0037556404409),
                  new SuperMap.Geometry.Point(5305.19551436013, -3376.9669111768926)],
        roadLine = new SuperMap.Geometry.LineString(points);
    var transGuideItem = new SuperMap.REST.TransferGuideItem({
        lineType: 1,
        distance: 10,
        endIndex: 10,
        startIndex: 10,
        startStopName: "test",
        endStopName: 'test',
        isWalking: false,
        passStopCount: 10,
        startPosition:p,
        endPosition: p1,
        route: roadLine,
        lineName:"test"
    });
    
    ok(transGuideItem !== null, 'null');
    //deepEqual(transGuideItem.route, roadLine, 'transGuideItem.route');
    equal(transGuideItem.lineType, 1, 'transGuideItem.lineType');
    equal(transGuideItem.distance, 10, 'transGuideItem.distance');
    equal(transGuideItem.endIndex, 10, 'transGuideItem.endIndex');
    equal(transGuideItem.startStopName, "test", 'transGuideItem.endStopInfo');
    equal(transGuideItem.isWalking, false, 'transGuideItem.isWalking');
    equal(transGuideItem.passStopCount, 10, 'transGuideItem.passStopCount');
    equal(transGuideItem.startIndex, 10, 'transGuideItem.startIndex');
    equal(transGuideItem.endStopName, "test", 'transGuideItem.endStopName');
    deepEqual(transGuideItem.startPosition, p, 'transGuideItem.startPosition');
    deepEqual(transGuideItem.endPosition, p1, 'transGuideItem.endPosition');   
    equal(transGuideItem.lineName, "test", 'transGuideItem.lineName');
});

test("TestDestroy", function() {
    expect(13);
    var p = new SuperMap.Geometry.Point(2,2);
    var line = new SuperMap.Geometry.LineString([p]);
    var transGuideItem = new SuperMap.REST.TransferGuideItem({
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
    });
    
    ok(transGuideItem !== null, 'null');
    transGuideItem.destroy();
    ok(transGuideItem.lineType === null, 'null');
    ok(transGuideItem.distance === null, 'null');
    ok(transGuideItem.endIndex === null, 'null');
    ok(transGuideItem.endPosition === null, 'null');
    ok(transGuideItem.isWalking === null, 'null');
    ok(transGuideItem.lineName === null, 'null');
    ok(transGuideItem.passStopCount === null, 'null');
    ok(transGuideItem.startIndex === null, 'null');
    ok(transGuideItem.startPosition === null, 'null');
    ok(transGuideItem.route === null, 'null');
    ok(transGuideItem.startStopName === null, 'null');
    ok(transGuideItem.endStopName === null, 'null');
});

test("TestFromJson", function() {
    expect(2);
    var undefined = SuperMap.REST.TransferGuideItem.fromJson();
    ok(typeof(undefined) === 'undefined', 'undefined');
    var p = new SuperMap.Geometry.Point(2,2);
    var line = new SuperMap.Geometry.LineString([p]);
    var params = {
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
    };
    var transGuideItem = SuperMap.REST.TransferStopInfo.fromJson(params);
    ok(transGuideItem !== null, 'null');
});




