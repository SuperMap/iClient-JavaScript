module("TouchNavigation");
test("testTouchNavigation_constructorDefault", function () {
    expect(7);
    var touchNavigation = new SuperMap.Control.TouchNavigation();
    equal(touchNavigation.dragPan, null, "params.dragPan");
    equal(touchNavigation.dragPanOptions, null, "params.dragPanOptions");
    equal(touchNavigation.pinchZoom, null, "params.pinchZoom");
    equal(touchNavigation.pinchZoomOptions, null, "params.pinchZoomOptions");
    equal(touchNavigation.clickHandlerOptions, null, "params.clickHandlerOptions");
    equal(touchNavigation.documentDrag, false, "params.documentDrag");
    equal(touchNavigation.autoActivate, true, "params.autoActivate");
});
test("testTouchNavigation_destroy", function () {
    expect(4);
    var options = {
        dragPan: new SuperMap.Control.DragPan(),
        pinchZoom: new SuperMap.Control.PinchZoom()
    };
    var touchNavigation = new SuperMap.Control.TouchNavigation(options);
    ok(touchNavigation.dragPan != null, "destroy前dragPan不为空");
    ok(touchNavigation.pinchZoom != null, "destroy前pinchZoom不为空");
    touchNavigation.destroy();
    equal(touchNavigation.dragPan, null, "destroy后dragPan为空");
    equal(touchNavigation.pinchZoom, null, "destroy后pinchZoom为空");
});
test("testTouchNavigation_activate", function () {
    expect(2);
    var map = new SuperMap.Map("qunit-fixture");
    var vectorLayer = new SuperMap.Layer.Vector("vector layer");
    map.addLayers([vectorLayer]);
    var options = {autoActivate: false};
    var touchNavigation = new SuperMap.Control.TouchNavigation(options);
    map.addControl(touchNavigation);
    var det = touchNavigation.deactivate();
    equal(det, false, "将控件的状态设置为未激活");
    var act = touchNavigation.activate();
    equal(act, true, "function:activate");
    map.destroy();
});
test("testTouchNavigation_deactivate", function () {
    expect(2);
    var map = new SuperMap.Map("qunit-fixture");
    var vectorLayer = new SuperMap.Layer.Vector("vector layer");
    map.addLayers([vectorLayer]);
    var touchNavigation = new SuperMap.Control.TouchNavigation();
    map.addControl(touchNavigation);
    var act = touchNavigation.activate();
    equal(act, false, "控件的默认初始化状态为激活");
    var det = touchNavigation.deactivate();
    equal(det, true, "function:deactivate");
    map.destroy();
});
test("testTouchNavigation_draw", function () {
    expect(4);
    var touchNavigation = new SuperMap.Control.TouchNavigation();
    equal(touchNavigation.dragPan, null, "draw之前dragPan为空");
    equal(touchNavigation.pinchZoom, null, "draw之前pinchZoom为空");
    touchNavigation.draw();
    ok(touchNavigation.dragPan != null, "function:draw");
    ok(touchNavigation.pinchZoom != null, "function:draw");
});