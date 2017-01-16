module("GetLibIDsEventArgs");

test('GetLibIDsEventArgs_Test', function () {
    expect(5);

    var getLibIDsResult = new SuperMap.REST.GetLibIDsResult();
    var getLibIDsEventArgs = new SuperMap.REST.GetLibIDsEventArgs(getLibIDsResult, 'originResult');

    ok(getLibIDsEventArgs !== null, 'null');
    equal(getLibIDsEventArgs.result, getLibIDsResult, "event.result");
    deepEqual(getLibIDsEventArgs.originResult, 'originResult', 'events.originResult');

    getLibIDsEventArgs.destroy();
    ok(getLibIDsEventArgs.result === null, 'null');
    ok(getLibIDsEventArgs.originResult === null, 'null');

});