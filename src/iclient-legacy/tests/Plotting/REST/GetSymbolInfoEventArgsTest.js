module("GetSymbolInfoEventArgs");

test("GetSymbolInfoEventArgs_Test", function () {
    var getSymbolInfoResult = new SuperMap.REST.GetSymbolInfoResult();
    var getSymbolInfoEventArgs = new SuperMap.REST.GetSymbolInfoEventArgs(getSymbolInfoResult, 'originResult');

    ok(getSymbolInfoEventArgs !== null, 'not null');
    equal(getSymbolInfoEventArgs.result, getSymbolInfoResult, 'getSymbolInfoEventArgs.result');
    equal(getSymbolInfoEventArgs.originResult, 'originResult', 'getSymbolInfoEventArgs.originResult');

    getSymbolInfoEventArgs.destroy();
    ok(getSymbolInfoEventArgs !== null, 'not null');
    ok(getSymbolInfoEventArgs.result === null, 'getSymbolInfoEventArgs.result is null');
    ok(getSymbolInfoEventArgs.originResult === null, 'getSymbolInfoEventArgs.originResult is null');
});



