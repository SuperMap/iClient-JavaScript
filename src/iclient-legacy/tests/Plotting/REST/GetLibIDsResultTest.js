module("GetLibIDsResult");

test("GetLibIDsResult_Test", function () {
    var resourceInfo = [100];
    var getLibIDsResult = new SuperMap.REST.GetLibIDsResult({resourceInfo:resourceInfo});

    ok(getLibIDsResult !== null, 'not null');
    equal(getLibIDsResult.resourceInfo, resourceInfo, 'getLibIDsResult.resourceInfo');
    getLibIDsResult.destroy();
    ok(getLibIDsResult !== null, 'not null');
    ok(getLibIDsResult.resourceInfo === null, 'getLibIDsResult.resourceInfo is null');

    ok(SuperMap.REST.GetLibIDsResult.fromJson(null) === undefined,"SuperMap.REST.GetLibIDsResult.fromJson");
    equal(SuperMap.REST.GetLibIDsResult.fromJson(resourceInfo).resourceInfo, resourceInfo, "SuperMap.REST.GetLibIDsResult.fromJson");
});