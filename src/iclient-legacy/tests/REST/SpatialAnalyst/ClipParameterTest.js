module("ClipParameter");
test("TestClipParameter_constructorDefault", function () {
    expect(6);
    var params = new SuperMap.REST.ClipParameter();
    ok(params !== null, "params not null");
    equal(params.clipDatasetName, null, "params.clipDatasetName");
    equal(params.clipDatasourceName, null, "params.clipDatasourceName");
    equal(params.clipRegion, null, "params.clipRegion");
    equal(params.isClipInRegion, false, "params.isClipInRegion");
    equal(params.isExactClip, null, "params.isExactClip");
});
test("TestClipParameter_constructor_destroy", function () {
    expect(10);
    //配置剪裁参数
    var params = new SuperMap.REST.ClipParameter({
        clipDatasetName: "Park@Changchun",
        clipDatasourceName: "spatialanalyst",
        clipRegion: null,
        isClipInRegion: false,
        isExactClip: false
    });
    equal(params.clipDatasetName, "Park@Changchun", "function:constructor");
    equal(params.clipDatasourceName, "spatialanalyst", "function:constructor");
    equal(params.clipRegion, null, "function:constructor");
    equal(params.isClipInRegion, false, "function:constructor");
    equal(params.isExactClip, false, "function:constructor");

    params.destroy();
    equal(params.clipDatasetName, null, "function:destroy");
    equal(params.clipDatasourceName, null, "function:destroy");
    equal(params.clipRegion, null, "function:destroy");
    equal(params.isClipInRegion, null, "function:destroy");
    equal(params.isExactClip, null, "function:destroy");
});
test("TestClipParameter_toJSON", function () {
    expect(2);
    //isClipInRegion为false
    var params = new SuperMap.REST.ClipParameter({
        clipDatasetName: "Park@Changchun",
        clipDatasourceName: "spatialanalyst",
        clipRegion: null,
        isClipInRegion: false,
        isExactClip: false
    });
    equal(params.toJSON(), null, "function:toJSON_isClipInRegionFalse");

    //isClipInRegion为true
    var params1 = new SuperMap.REST.ClipParameter({
        clipDatasetName: "Park@Changchun",
        clipDatasourceName: "spatialanalyst",
        clipRegion: null,
        isClipInRegion: true,
        isExactClip: false
    });
    var strClipParameter = params1.toJSON();
    var expectStrClipParameter = "";
    expectStrClipParameter += "'isClipInRegion':" + SuperMap.Util.toJSON(params1.isClipInRegion)
        + "," + "'clipDatasetName':" + SuperMap.Util.toJSON(params1.clipDatasetName)
        + "," + "'clipDatasourceName':" + SuperMap.Util.toJSON(params1.clipDatasourceName)
        + "," + "'isExactClip':" + SuperMap.Util.toJSON(params1.isExactClip);
    equal(strClipParameter, "{" + expectStrClipParameter + "}", "function:toJSON") + "}";
});
