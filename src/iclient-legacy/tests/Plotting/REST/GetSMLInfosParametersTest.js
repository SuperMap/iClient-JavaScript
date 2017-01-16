module("GetSMLInfosParameters");

test("GetSMLInfosParameters_destroy_toJson", function () {
    var getSMLInfosParameters = new SuperMap.REST.GetSMLInfosParameters({start:1, count:1});

    ok(getSMLInfosParameters !== null, 'not null');
    equal(getSMLInfosParameters.start, 1, 'parames.start');
    equal(getSMLInfosParameters.count, 1, 'parames.count');
    getSMLInfosParameters.destroy();
    ok(getSMLInfosParameters.start === null, 'getSMLInfosParameters.start is null');
    ok(getSMLInfosParameters.count === null, 'getSMLInfosParameters.count is null');


    var undefined = SuperMap.REST.GetSMLInfosParameters.toUrlParameters(getSMLInfosParameters);
    equal(undefined, "", "SuperMap.REST.GetSMLInfosParameters.toUrlParameters");

    var urlParameters = SuperMap.REST.GetSMLInfosParameters.toUrlParameters({start: 1, count: 1});
    ok(urlParameters !== null, "SuperMap.REST.GetSMLInfosParameters.toUrlParameters");
});