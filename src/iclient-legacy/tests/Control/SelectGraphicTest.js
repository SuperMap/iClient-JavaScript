module("SelectGraphic");
test("testSelectGraphic_constructor", function () {
    expect(9);
    var vectorLayer = new SuperMap.Layer.Vector("Vector Layer");
    var options = {
        scope: null
    };
    var selectGraphic = new SuperMap.Control.SelectGraphic(vectorLayer, options);
    equal(selectGraphic.clickout, true, "params.clickout");
    equal(selectGraphic.toggle, false, "params.toggle");
    equal(selectGraphic.repeat, false, "params.repeat");
    ok(selectGraphic.scope === selectGraphic, "params.scope");
    equal(selectGraphic.geometryTypes, null, "params.geometryTypes");
    ok(selectGraphic.layer === vectorLayer, "params.layer");
    equal(selectGraphic.layers, null, "params.layers");
    equal(selectGraphic.renderIntent, "select", "params.renderIntent");
    ok(selectGraphic.handlers !== null, "params.handlers");
});


