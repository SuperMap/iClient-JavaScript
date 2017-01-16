module("GetLibInfoEventArgs");

test("GetLibInfoEventArgs_Test", function () {
    var getLibInfoResult = new SuperMap.REST.GetLibInfoResult();
    var getLibInfoEventArgs = new SuperMap.REST.GetLibInfoEventArgs(getLibInfoResult, 'originResult');

    ok(getLibInfoEventArgs !== null, 'not null');
    equal(getLibInfoEventArgs.result, getLibInfoResult, 'getLibInfoEventArgs.result');
    equal(getLibInfoEventArgs.originResult, 'originResult', 'getLibInfoEventArgs.originResult');

    getLibInfoEventArgs.destroy();
    ok(getLibInfoEventArgs !== null, 'not null');
    ok(getLibInfoEventArgs.result === null, 'getLibInfoEventArgs.result is null');
    ok(getLibInfoEventArgs.originResult === null, 'getLibInfoEventArgs.result is null');
});



