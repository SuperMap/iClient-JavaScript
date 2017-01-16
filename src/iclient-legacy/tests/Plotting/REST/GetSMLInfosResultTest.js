module("GetSMLInfosResult");

test("GetSMLInfosResult_Test", function () {
    var fileArray = [1, 1];
    var getSMLInfosResult = new SuperMap.REST.GetSMLInfosResult({fileArray:fileArray});

    ok(getSMLInfosResult !== null, 'not null');
    equal(getSMLInfosResult.fileArray, fileArray, 'getSMLInfosResult.fileArray');

    getSMLInfosResult.destroy();
    ok(getSMLInfosResult !== null, 'not null');
    ok(getSMLInfosResult.fileArray === null, 'getSMLInfosResult.fileArray isnull');

    ok(SuperMap.REST.GetSMLInfosResult.fromJson(null) === undefined,"SuperMap.REST.GetSMLInfosResult.fromJson");
    equal(SuperMap.REST.GetSMLInfosResult.fromJson(fileArray).fileArray, fileArray, "SuperMap.REST.GetSMLInfosResult.fromJson");
});




