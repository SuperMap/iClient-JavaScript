module("EventPane");

test("EventPaneTest_constructor", function() {
    expect(6);
    var layer = new SuperMap.Layer.EventPane("event");
    equals(layer.CLASS_NAME, "SuperMap.Layer.EventPane", "eventPane_constructor");
    equals(layer.smoothDragPan, true, "eventPane_constructor");
    equals(layer.isBaseLayer, true, "eventPane_constructor");
    equals(layer.isFixed, true, "eventPane_constructor");
    ok(!!layer.pane, "eventPane_constructor");
    equals(layer.mapObject, null, "eventPane_constructor");
});

test("EventPaneTest_loadWarningMessage", function() {
    expect(5)
    var map = new SuperMap.Map("map");
    var layer = new SuperMap.Layer.EventPane("event");
    layer.map = map;
    layer.loadWarningMessage();
    equals(layer.div.style.backgroundColor, "darkblue", "eventPane_loadWarningMessage");
    ok(!!layer.div, "eventPane_loadWarningMessage");
    ok(!!layer.div.childNodes, "eventPane_loadWarningMessage");
    equals(layer.div.childNodes[0].style.padding, "7px", "eventPane_loadWarningMessage");
    equals(layer.div.childNodes[0].style.backgroundColor, "yellow", "eventPane_loadWarningMessage");
});

test("EventPaneTest_getWarningHTML", function() {
    expect(1)
    var layer = new SuperMap.Layer.EventPane("event");
    var html = layer.getWarningHTML();
    equals(html, "", "eventPane.getWarningHTML");
});

test("EventPaneTest_display", function() {
    expect(1)
    var layer = new SuperMap.Layer.EventPane("event");
    var display = "block";
    layer.div.style.display = "block";
    layer.display(display);
    equals(layer.pane.style.display, layer.div.style.display, "eventPane.display");
});

test("EventPaneTest_setZIndex", function() {
    expect(1)
    var layer = new SuperMap.Layer.EventPane("event");
    var zIndex = 10;
    layer.div.style.zIndex = 10;
    layer.setZIndex(zIndex);
    equals(layer.pane.style.zIndex, ++layer.div.style.zIndex, "eventPane.display");
});
