module("VersionedOGC");
test("TestVersionedOGC_constructorDefault", function() {
    expect(8);
    var params = new SuperMap.Format.XML.VersionedOGC();
    ok(params !== null, "params not null");
    equal(params.defaultVersion, null, "params.defaultVersion");
    equal(params.version, null, "params.version");
    equal(params.profile, null, "params.profile");
    equal(params.errorProperty, null, "params.errorProperty");
    equal(params.name, "VersionedOGC", "params.name");
    equal(params.stringifyOutput, false, "params.stringifyOutput");
    equal(params.parser, null, "params.parser");
});
