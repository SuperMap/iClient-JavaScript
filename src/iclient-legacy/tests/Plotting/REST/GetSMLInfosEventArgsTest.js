module("GetSMLInfosEventArgs");

test("GetSMLInfosEventArgs_Test", function () {
    var getSMLInfosResult = new SuperMap.REST.GetSMLInfosResult();
    var getSMLInfosEventArgs = new SuperMap.REST.GetSMLInfosEventArgs(getSMLInfosResult, 'originResult');

    ok(getSMLInfosEventArgs !== null, 'not null');
    equal(getSMLInfosEventArgs.result, getSMLInfosResult, 'getSMLInfosEventArgs.result');
    equal(getSMLInfosEventArgs.originResult, 'originResult', 'getSMLInfosEventArgs.originResult');

    getSMLInfosEventArgs.destroy();
    ok(getSMLInfosEventArgs !== null, 'not null');
    ok(getSMLInfosEventArgs.result === null, 'getSMLInfosEventArgs.result is null');
    ok(getSMLInfosEventArgs.originResult === null, 'getSMLInfosEventArgs.originResult is null');
});

