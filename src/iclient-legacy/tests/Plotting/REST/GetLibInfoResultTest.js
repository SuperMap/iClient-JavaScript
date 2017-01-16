module("GetLibInfoResult");

test("GetLibInfoResult_Test", function () {
    var resourceInfo = {};
    var getLibInfoResult = new SuperMap.REST.GetLibInfoResult({resourceInfo:resourceInfo});

    ok(getLibInfoResult !== null, 'not null');
    equal(getLibInfoResult.resourceInfo, resourceInfo, 'getLibInfoResult.resourceInfo');
    getLibInfoResult.destroy();
    ok(getLibInfoResult !== null, 'not null');
    ok(getLibInfoResult.resourceInfo === null, 'null');

    ok(SuperMap.REST.GetLibInfoResult.fromJson(null) === undefined,"SuperMap.REST.GetLibInfoResult.fromJson");
    equal(SuperMap.REST.GetLibInfoResult.fromJson(resourceInfo).resourceInfo, resourceInfo, "SuperMap.REST.GetLibInfoResult.fromJson");
});




