module("GetSymbolInfoResult");

test("GetSymbolInfoResult_Test", function () {
    var resourceInfo = {};
    var getSymbolInfoResult = new SuperMap.REST.GetSymbolInfoResult({resourceInfo:resourceInfo});

    ok(getSymbolInfoResult !== null, 'not null');
    equal(getSymbolInfoResult.resourceInfo, resourceInfo, 'getSymbolInfoResult.resourceInfo');

    getSymbolInfoResult.destroy();
    ok(getSymbolInfoResult !== null, 'not null');
    ok(getSymbolInfoResult.resourceInfo === null, 'getSymbolInfoResult.resourceInfo is null');

    ok(SuperMap.REST.GetSymbolInfoResult.fromJson(null) === undefined,"SuperMap.REST.GetSymbolInfoResult.fromJson");
    equal(SuperMap.REST.GetSymbolInfoResult.fromJson(resourceInfo).resourceInfo, resourceInfo, "SuperMap.REST.GetSymbolInfoResult.fromJson");
});




