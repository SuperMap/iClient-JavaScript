module("TransferLine");

test("Test-Constructor_destroy_fromJson", function() {
    expect(15);
    var info = new SuperMap.REST.TransferLine({
        lineID: 11,
        lineName: 'test',
        startStopIndex: 2,
        startStopName: 'test',
        endStopIndex: 5,
        endStopName: 'test'
    });
    
    ok(info !== null, 'null');
    equal(info.lineID, 11, 'info.lineID');
    equal(info.lineName, 'test', 'info.lineName');
    equal(info.startStopIndex, 2, 'info.startStopIndex');
    equal(info.startStopName, 'test', 'info.startStopName');
    equal(info.endStopIndex, 5, 'info.endStopIndex');
    equal(info.endStopName, 'test', 'info.endStopName');
	
	info.destroy();
    ok(info.lineID === null, 'info.lineID');
    ok(info.lineName === null, 'info.lineName');
    ok(info.startStopIndex === null, 'info.startStopIndex');
    ok(info.startStopName === null, 'info.startStopName');
    ok(info.endStopIndex === null, 'info.endStopIndex');
    ok(info.endStopName === null, 'info.endStopName');
	
	var undefined = SuperMap.REST.TransferLine.fromJson();
    ok(typeof(undefined) === 'undefined', 'undefined');
    
    var params = {
        lineID: '11',
        lineName: 'test',
        startStopIndex: 2,
        startStopName: 'test',
        endStopIndex: 5,
        endStopName: 'test'
    };
    
    var info = SuperMap.REST.TransferLine.fromJson(params);
    ok(info !== null, 'null');
});




